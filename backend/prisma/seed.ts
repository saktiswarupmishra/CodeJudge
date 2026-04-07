/**
 * Prisma Seed Script
 * Creates demo accounts, sample problems, and 150 hard DSA questions with test cases
 */
import { PrismaClient, Role, Difficulty, Language, SubmissionResult } from '@prisma/client';
import bcrypt from 'bcrypt';
import { allProblems } from './problems';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Demo Users ───────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@codejudge.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@codejudge.com',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'john@codejudge.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@codejudge.com',
      password: userPassword,
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@codejudge.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@codejudge.com',
      password: userPassword,
      role: Role.USER,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'alice@codejudge.com' },
    update: {},
    create: {
      name: 'Alice Johnson',
      email: 'alice@codejudge.com',
      password: userPassword,
      role: Role.USER,
    },
  });

  console.log('✅ Demo users created');

  // ─── Sample Problems ──────────────────────────────────────

  // Problem 1: Two Sum
  const problem1 = await prisma.problem.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Two Sum',
      description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\``,
      difficulty: Difficulty.EASY,
      tags: JSON.stringify(['Array', 'Hash Table']),
      constraints: `- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.`,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem1.id, input: '4\n2 7 11 15\n9', output: '0 1', isHidden: false },
      { problemId: problem1.id, input: '3\n3 2 4\n6', output: '1 2', isHidden: false },
      { problemId: problem1.id, input: '2\n3 3\n6', output: '0 1', isHidden: true },
      { problemId: problem1.id, input: '5\n1 5 3 7 2\n8', output: '1 2', isHidden: true },
    ],
    skipDuplicates: true,
  });

  // Problem 2: Reverse String
  const problem2 = await prisma.problem.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Reverse String',
      description: `Write a function that reverses a string. The input string is given as an array of characters.

You must do this by modifying the input array in-place with O(1) extra memory.

**Example 1:**
\`\`\`
Input: s = "hello"
Output: "olleh"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "Hannah"
Output: "hannaH"
\`\`\``,
      difficulty: Difficulty.EASY,
      tags: JSON.stringify(['String', 'Two Pointers']),
      constraints: `- 1 <= s.length <= 10^5\n- s[i] is a printable ascii character.`,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem2.id, input: 'hello', output: 'olleh', isHidden: false },
      { problemId: problem2.id, input: 'Hannah', output: 'hannaH', isHidden: false },
      { problemId: problem2.id, input: 'abcdef', output: 'fedcba', isHidden: true },
      { problemId: problem2.id, input: 'a', output: 'a', isHidden: true },
    ],
    skipDuplicates: true,
  });

  // Problem 3: FizzBuzz
  const problem3 = await prisma.problem.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'FizzBuzz',
      description: `Given an integer \`n\`, return a string array where:

- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.

Note: \`i\` is 1-indexed.

**Example:**
\`\`\`
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
\`\`\``,
      difficulty: Difficulty.EASY,
      tags: JSON.stringify(['Math', 'String', 'Simulation']),
      constraints: `- 1 <= n <= 10^4`,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem3.id, input: '3', output: '1\n2\nFizz', isHidden: false },
      { problemId: problem3.id, input: '5', output: '1\n2\nFizz\n4\nBuzz', isHidden: false },
      { problemId: problem3.id, input: '15', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', isHidden: true },
    ],
    skipDuplicates: true,
  });

  // Problem 4: Valid Parentheses
  const problem4 = await prisma.problem.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'Valid Parentheses',
      description: `Given a string \`s\` containing just the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, and \`]\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
\`\`\`
Input: s = "()"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: s = "(]"
Output: false
\`\`\``,
      difficulty: Difficulty.EASY,
      tags: JSON.stringify(['String', 'Stack']),
      constraints: `- 1 <= s.length <= 10^4\n- s consists of parentheses only '()[]{}'.`,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem4.id, input: '()', output: 'true', isHidden: false },
      { problemId: problem4.id, input: '()[]{}', output: 'true', isHidden: false },
      { problemId: problem4.id, input: '(]', output: 'false', isHidden: false },
      { problemId: problem4.id, input: '({[]})', output: 'true', isHidden: true },
      { problemId: problem4.id, input: '((()))', output: 'true', isHidden: true },
    ],
    skipDuplicates: true,
  });

  // Problem 5: Merge Sort (Medium)
  const problem5 = await prisma.problem.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'Sort an Array',
      description: `Given an array of integers \`nums\`, sort the array in ascending order and return it.

You must solve the problem without using any built-in sort functions.

**Example 1:**
\`\`\`
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
\`\`\``,
      difficulty: Difficulty.MEDIUM,
      tags: JSON.stringify(['Array', 'Sorting', 'Divide and Conquer']),
      constraints: `- 1 <= nums.length <= 5 * 10^4\n- -5 * 10^4 <= nums[i] <= 5 * 10^4`,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem5.id, input: '4\n5 2 3 1', output: '1 2 3 5', isHidden: false },
      { problemId: problem5.id, input: '6\n5 1 1 2 0 0', output: '0 0 1 1 2 5', isHidden: false },
      { problemId: problem5.id, input: '1\n1', output: '1', isHidden: true },
      { problemId: problem5.id, input: '3\n3 2 1', output: '1 2 3', isHidden: true },
    ],
    skipDuplicates: true,
  });

  // Problem 6: Longest Substring Without Repeating Characters (Medium)
  const problem6 = await prisma.problem.upsert({
    where: { id: 6 },
    update: {},
    create: {
      title: 'Longest Substring Without Repeating Characters',
      description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

**Example 1:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "bbbbb"
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: s = "pwwkew"
Output: 3
\`\`\``,
      difficulty: Difficulty.MEDIUM,
      tags: JSON.stringify(['Hash Table', 'String', 'Sliding Window']),
      constraints: `- 0 <= s.length <= 5 * 10^4\n- s consists of English letters, digits, symbols and spaces.`,
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem6.id, input: 'abcabcbb', output: '3', isHidden: false },
      { problemId: problem6.id, input: 'bbbbb', output: '1', isHidden: false },
      { problemId: problem6.id, input: 'pwwkew', output: '3', isHidden: true },
      { problemId: problem6.id, input: '', output: '0', isHidden: true },
    ],
    skipDuplicates: true,
  });

  // Create some demo submissions
  await prisma.submission.createMany({
    data: [
      {
        userId: user1.id,
        problemId: problem1.id,
        code: 'def twoSum(nums, target):\n    lookup = {}\n    for i, n in enumerate(nums):\n        if target - n in lookup:\n            return [lookup[target-n], i]\n        lookup[n] = i',
        language: Language.PYTHON,
        result: SubmissionResult.ACCEPTED,
        executionTime: 45.2,
        memoryUsage: 14.3,
      },
      {
        userId: user1.id,
        problemId: problem2.id,
        code: 's = input()\nprint(s[::-1])',
        language: Language.PYTHON,
        result: SubmissionResult.ACCEPTED,
        executionTime: 32.1,
        memoryUsage: 12.1,
      },
      {
        userId: user2.id,
        problemId: problem1.id,
        code: 'const readline = require("readline");\n// wrong solution\nconsole.log("0 1");',
        language: Language.JAVASCRIPT,
        result: SubmissionResult.WRONG_ANSWER,
        executionTime: 55.0,
        memoryUsage: 16.2,
      },
      {
        userId: user2.id,
        problemId: problem3.id,
        code: 'n = int(input())\nfor i in range(1, n+1):\n    if i%15==0: print("FizzBuzz")\n    elif i%3==0: print("Fizz")\n    elif i%5==0: print("Buzz")\n    else: print(i)',
        language: Language.PYTHON,
        result: SubmissionResult.ACCEPTED,
        executionTime: 28.5,
        memoryUsage: 11.8,
      },
      {
        userId: user3.id,
        problemId: problem1.id,
        code: '#include<bits/stdc++.h>\nusing namespace std;\nint main(){/* TLE solution */while(1);}',
        language: Language.CPP,
        result: SubmissionResult.TIME_LIMIT_EXCEEDED,
        executionTime: 10000,
        memoryUsage: 5.2,
      },
      {
        userId: user3.id,
        problemId: problem4.id,
        code: 's = input()\nstack = []\nfor c in s:\n    if c in "([{":\n        stack.append(c)\n    elif not stack: print("false"); exit()\n    else:\n        t = stack.pop()\n        if (c==")" and t!="(") or (c=="]" and t!="[") or (c=="}" and t!="{"): print("false"); exit()\nprint("true" if not stack else "false")',
        language: Language.PYTHON,
        result: SubmissionResult.ACCEPTED,
        executionTime: 38.7,
        memoryUsage: 13.0,
      },
    ],
  });

  console.log('✅ Demo submissions created');

  // ─── 150 Hard DSA Problems ──────────────────────────────────
  console.log('');
  console.log(`📚 Seeding ${allProblems.length} hard DSA problems...`);

  for (let i = 0; i < allProblems.length; i++) {
    const p = allProblems[i];

    // Skip if problem with same title already exists
    const existing = await prisma.problem.findFirst({ where: { title: p.title } });
    if (existing) {
      if ((i + 1) % 25 === 0 || i === allProblems.length - 1) {
        console.log(`  → ${i + 1}/${allProblems.length} processed (skipped existing)`);
      }
      continue;
    }

    const problem = await prisma.problem.create({
      data: {
        title: p.title,
        description: p.description,
        difficulty: p.difficulty as Difficulty,
        tags: JSON.stringify(p.tags),
        constraints: p.constraints,
      },
    });

    if (p.testCases.length > 0) {
      await prisma.testCase.createMany({
        data: p.testCases.map((tc) => ({
          problemId: problem.id,
          input: tc.input,
          output: tc.output,
          isHidden: tc.isHidden,
        })),
      });
    }

    // Progress indicator every 25 problems
    if ((i + 1) % 25 === 0 || i === allProblems.length - 1) {
      console.log(`  → ${i + 1}/${allProblems.length} problems seeded`);
    }
  }

  console.log('✅ All hard DSA problems seeded');
  console.log('');
  console.log('📋 Demo Accounts:');
  console.log('  Admin:  admin@codejudge.com / admin123');
  console.log('  User 1: john@codejudge.com  / user123');
  console.log('  User 2: jane@codejudge.com  / user123');
  console.log('  User 3: alice@codejudge.com / user123');
  console.log('');
  console.log(`🎉 Seeding complete! Total DSA problems added: ${allProblems.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
