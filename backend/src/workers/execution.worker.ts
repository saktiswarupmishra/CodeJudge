/**
 * Code Execution Worker
 * BullMQ worker that processes code execution jobs
 * Runs code in Docker containers and evaluates results
 */
import { Worker, Job } from 'bullmq';
import { SubmissionResult } from '@prisma/client';
import { prisma } from '../config/database';
import { getRedisConnection } from '../config/redis';
import { executeInDocker } from '../utils/docker';
import { normalizeOutput, sanitizeCode, containsDangerousPatterns } from '../utils/validator';
import { wsManager } from '../utils/websocket';
import { ExecutionJobData } from '../types';

/**
 * Start the execution worker
 */
export function startExecutionWorker() {
  const worker = new Worker<ExecutionJobData>(
    'code-execution',
    async (job: Job<ExecutionJobData>) => {
      const { submissionId, code, language, testCases } = job.data;

      console.log(`⚙️  Processing submission #${submissionId} (${language})`);

      try {
        // Security check
        if (containsDangerousPatterns(code)) {
          await updateSubmission(submissionId, {
            result: SubmissionResult.RUNTIME_ERROR,
            output: 'Code contains potentially dangerous patterns.',
          });
          return;
        }

        const sanitizedCode = sanitizeCode(code);
        let allPassed = true;
        let totalTime = 0;
        let totalMemory = 0;
        let failedOutput = '';

        // Run against each test case
        for (let i = 0; i < testCases.length; i++) {
          const tc = testCases[i];

          try {
            const result = await executeInDocker(sanitizedCode, language, tc.input);

            totalTime += result.executionTime;
            totalMemory += result.memoryUsage;

            // Check for timeout
            if (result.timedOut) {
              await updateSubmission(submissionId, {
                result: SubmissionResult.TIME_LIMIT_EXCEEDED,
                executionTime: totalTime,
                memoryUsage: totalMemory / (i + 1),
                output: `Time Limit Exceeded on test case ${i + 1}`,
              });
              return;
            }

            // Check for runtime error
            if (result.exitCode !== 0) {
              await updateSubmission(submissionId, {
                result: SubmissionResult.RUNTIME_ERROR,
                executionTime: totalTime,
                memoryUsage: totalMemory / (i + 1),
                output: result.stderr || result.stdout || 'Runtime Error',
              });
              return;
            }

            // Compare output
            const actualOutput = normalizeOutput(result.stdout);
            const expectedOutput = normalizeOutput(tc.expectedOutput);

            if (actualOutput !== expectedOutput) {
              allPassed = false;
              failedOutput = `Test case ${i + 1}: Expected "${expectedOutput}" but got "${actualOutput}"`;
              break;
            }
          } catch (execError: any) {
            await updateSubmission(submissionId, {
              result: SubmissionResult.RUNTIME_ERROR,
              output: `Execution error: ${execError.message}`,
            });
            return;
          }
        }

        // Determine final result
        const avgTime = totalTime / testCases.length;
        const avgMemory = totalMemory / testCases.length;

        if (allPassed) {
          await updateSubmission(submissionId, {
            result: SubmissionResult.ACCEPTED,
            executionTime: Math.round(avgTime * 100) / 100,
            memoryUsage: Math.round(avgMemory * 100) / 100,
            output: `All ${testCases.length} test cases passed!`,
          });
        } else {
          await updateSubmission(submissionId, {
            result: SubmissionResult.WRONG_ANSWER,
            executionTime: Math.round(avgTime * 100) / 100,
            memoryUsage: Math.round(avgMemory * 100) / 100,
            output: failedOutput,
          });
        }

        console.log(`✅ Submission #${submissionId} processed`);
      } catch (error: any) {
        console.error(`❌ Worker error for submission #${submissionId}:`, error.message);
        await updateSubmission(submissionId, {
          result: SubmissionResult.RUNTIME_ERROR,
          output: `Internal error: ${error.message}`,
        });
      }
    },
    {
      connection: getRedisConnection(),
      skipVersionCheck: true,
      concurrency: 3,
      limiter: {
        max: 10,
        duration: 1000,
      },
    }
  );

  worker.on('completed', (job) => {
    console.log(`📋 Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err.message);
  });

  worker.on('error', (err) => {
    console.error('❌ Worker error:', err.message);
  });

  console.log('✅ Execution worker started (concurrency: 3)');
  return worker;
}

/**
 * Update submission and notify via WebSocket
 */
async function updateSubmission(
  submissionId: number,
  data: {
    result: SubmissionResult;
    executionTime?: number;
    memoryUsage?: number;
    output?: string;
  }
) {
  const submission = await prisma.submission.update({
    where: { id: submissionId },
    data: {
      result: data.result,
      executionTime: data.executionTime,
      memoryUsage: data.memoryUsage,
      output: data.output,
    },
    include: {
      problem: { select: { id: true, title: true } },
    },
  });

  // Notify via WebSocket
  wsManager.notifySubmissionUpdate(submission.userId, {
    submissionId: submission.id,
    problemId: submission.problemId,
    problemTitle: submission.problem.title,
    result: submission.result,
    executionTime: submission.executionTime,
    memoryUsage: submission.memoryUsage,
    output: submission.output,
  });
}
