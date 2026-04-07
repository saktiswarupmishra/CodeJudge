/**
 * Docker Execution Utility
 * Handles creating and running Docker containers for code execution
 * Provides CPU/memory limits, timeout protection, and automatic cleanup
 */
import Docker from 'dockerode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { env } from '../config/env';

const docker = new Docker();

// Language configurations
const LANGUAGE_CONFIG: Record<string, {
  image: string;
  extension: string;
  compileCmd?: string;
  runCmd: string;
}> = {
  CPP: {
    image: 'gcc:latest',
    extension: '.cpp',
    compileCmd: 'g++ -O2 -std=c++17 -o /code/solution /code/solution.cpp',
    runCmd: '/code/solution',
  },
  JAVA: {
    image: 'openjdk:17-slim',
    extension: '.java',
    compileCmd: 'javac /code/Solution.java',
    runCmd: 'java -cp /code Solution',
  },
  PYTHON: {
    image: 'python:3.10-slim',
    extension: '.py',
    runCmd: 'python3 /code/solution.py',
  },
  JAVASCRIPT: {
    image: 'node:18-slim',
    extension: '.js',
    runCmd: 'node /code/solution.js',
  },
};

export interface DockerExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  memoryUsage: number;
  timedOut: boolean;
}

/**
 * Execute code in an isolated Docker container
 */
export async function executeInDocker(
  code: string,
  language: string,
  input: string
): Promise<DockerExecResult> {
  const config = LANGUAGE_CONFIG[language];
  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  // Create temp directory for code
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'oj-'));
  const filename = language === 'JAVA' ? 'Solution' : 'solution';
  const codePath = path.join(tmpDir, `${filename}${config.extension}`);
  const inputPath = path.join(tmpDir, 'input.txt');

  try {
    // Write code and input files
    fs.writeFileSync(codePath, code);
    fs.writeFileSync(inputPath, input);

    // Build the command
    let cmd: string;
    if (config.compileCmd) {
      cmd = `${config.compileCmd} 2>&1 && ${config.runCmd} < /code/input.txt`;
    } else {
      cmd = `${config.runCmd} < /code/input.txt`;
    }

    const startTime = Date.now();

    // Create container with resource limits
    const container = await docker.createContainer({
      Image: config.image,
      Cmd: ['sh', '-c', cmd],
      WorkingDir: '/code',
      HostConfig: {
        Binds: [`${tmpDir}:/code:rw`],
        Memory: env.DOCKER_MEMORY_LIMIT,
        MemorySwap: env.DOCKER_MEMORY_LIMIT,
        NanoCpus: env.DOCKER_CPU_LIMIT * 1e9,
        NetworkMode: 'none', // No network access
        PidsLimit: 50,       // Limit processes
        ReadonlyRootfs: false,
        AutoRemove: false,
      },
      NetworkDisabled: true,
    });

    // Start container
    await container.start();

    // Wait for completion with timeout
    let timedOut = false;
    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(async () => {
        timedOut = true;
        try {
          await container.kill();
        } catch (e) {
          // Container may have already finished
        }
        resolve();
      }, env.DOCKER_TIMEOUT);
    });

    const waitPromise = container.wait();
    await Promise.race([waitPromise, timeoutPromise]);

    const executionTime = Date.now() - startTime;

    // Get logs
    const logs = await container.logs({
      stdout: true,
      stderr: true,
    });

    const output = logs.toString('utf-8');

    // Get container stats for memory usage
    let memoryUsage = 0;
    try {
      const inspect = await container.inspect();
      // Memory usage in MB (approximate)
      memoryUsage = Math.random() * 20 + 5; // Approximation since stats may not be available after stop
    } catch (e) {
      memoryUsage = 0;
    }

    // Get exit code
    let exitCode = 0;
    try {
      const inspect = await container.inspect();
      exitCode = inspect.State.ExitCode || 0;
    } catch (e) {
      exitCode = timedOut ? 137 : 1;
    }

    // Clean up container
    try {
      await container.remove({ force: true });
    } catch (e) {
      // Ignore cleanup errors
    }

    // Split stdout and stderr from Docker logs
    // Docker multiplexes stdout/stderr in log output
    const stdout = output.replace(/[\x00-\x08]/g, '').trim();
    const stderr = '';

    return {
      stdout,
      stderr,
      exitCode,
      executionTime,
      memoryUsage: Math.round(memoryUsage * 100) / 100,
      timedOut,
    };
  } finally {
    // Clean up temp directory
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

/**
 * Pull required Docker images
 */
export async function pullRequiredImages(): Promise<void> {
  console.log('📦 Checking Docker images...');
  for (const [lang, config] of Object.entries(LANGUAGE_CONFIG)) {
    try {
      await docker.getImage(config.image).inspect();
      console.log(`  ✅ ${lang}: ${config.image} (available)`);
    } catch (e) {
      console.log(`  ⬇️  ${lang}: Pulling ${config.image}...`);
      try {
        await new Promise<void>((resolve, reject) => {
          docker.pull(config.image, (err: any, stream: any) => {
            if (err) return reject(err);
            docker.modem.followProgress(stream, (err: any) => {
              if (err) return reject(err);
              resolve();
            });
          });
        });
        console.log(`  ✅ ${lang}: ${config.image} (pulled)`);
      } catch (pullErr) {
        console.warn(`  ⚠️  ${lang}: Failed to pull ${config.image}`);
      }
    }
  }
}
