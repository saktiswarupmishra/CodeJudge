import { SeedProblem } from './types';

export const bitManipulation: SeedProblem[] = [
  {
    title: 'Single Number III',
    description: `Given an integer array \`nums\`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in **any order**.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

**Example 1:**
\`\`\`
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,0]
Output: [-1,0]
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [0,1]
Output: [0,1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Bit Manipulation'],
    constraints: `- 2 <= nums.length <= 3 * 10^4\\n- -2^31 <= nums[i] <= 2^31 - 1\\n- Each integer appears exactly twice except for two integers which appear once.`,
    testCases: [
      { input: '6\n1 2 1 3 2 5', output: '3 5', isHidden: false },
      { input: '2\n-1 0', output: '-1 0', isHidden: false },
      { input: '2\n0 1', output: '0 1', isHidden: true },
      { input: '4\n1 2 3 1', output: '2 3', isHidden: true },
    ],
  },
  {
    title: 'Maximum XOR of Two Numbers in an Array',
    description: `Given an integer array \`nums\`, return the maximum result of \`nums[i] XOR nums[j]\`, where \`0 <= i <= j < n\`.

**Example 1:**
\`\`\`
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Bit Manipulation', 'Trie'],
    constraints: `- 1 <= nums.length <= 2 * 10^5\\n- 0 <= nums[i] <= 2^31 - 1`,
    testCases: [
      { input: '6\n3 10 5 25 2 8', output: '28', isHidden: false },
      { input: '12\n14 70 53 83 49 91 36 80 92 51 66 70', output: '127', isHidden: false },
      { input: '2\n0 0', output: '0', isHidden: true },
      { input: '2\n1 2', output: '3', isHidden: true },
    ],
  },
  {
    title: 'Counting Bits',
    description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the **number of 1's** in the binary representation of \`i\`.

**Example 1:**
\`\`\`
Input: n = 2
Output: [0,1,1]
Explanation: 0 --> 0, 1 --> 1, 2 --> 10
\`\`\`

**Example 2:**
\`\`\`
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation: 0 --> 0, 1 --> 1, 2 --> 10, 3 --> 11, 4 --> 100, 5 --> 101
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming', 'Bit Manipulation'],
    constraints: `- 0 <= n <= 10^5`,
    testCases: [
      { input: '2', output: '0 1 1', isHidden: false },
      { input: '5', output: '0 1 1 2 1 2', isHidden: false },
      { input: '0', output: '0', isHidden: true },
      { input: '8', output: '0 1 1 2 1 2 2 3 1', isHidden: true },
    ],
  },
  {
    title: 'Minimum One Bit Operations to Make Integers Zero',
    description: `Given an integer \`n\`, you must transform it into \`0\` using the following operations any number of times:
- Change the rightmost (\`0\`th) bit in the binary representation of \`n\`.
- Change the \`i\`th bit in the binary representation of \`n\` if the \`(i-1)\`th bit is set to \`1\` and the \`(i-2)\`th through \`0\`th bits are set to \`0\`.

Return the minimum number of operations to transform \`n\` into \`0\`.

**Example 1:**
\`\`\`
Input: n = 6
Output: 4
Explanation: 6 (110) -> 7 (111) -> 5 (101) -> 4 (100) -> 0 (000)
\`\`\`

**Example 2:**
\`\`\`
Input: n = 9
Output: 14
\`\`\`

**Example 3:**
\`\`\`
Input: n = 0
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming', 'Bit Manipulation', 'Memoization'],
    constraints: `- 0 <= n <= 10^9`,
    testCases: [
      { input: '6', output: '4', isHidden: false },
      { input: '9', output: '14', isHidden: false },
      { input: '0', output: '0', isHidden: true },
      { input: '3', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Bitwise AND of Numbers Range',
    description: `Given two integers \`left\` and \`right\` that represent the range \`[left, right]\`, return the bitwise AND of all numbers in this range, inclusive.

**Example 1:**
\`\`\`
Input: left = 5, right = 7
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: left = 0, right = 0
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: left = 1, right = 2147483647
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Bit Manipulation'],
    constraints: `- 0 <= left <= right <= 2^31 - 1`,
    testCases: [
      { input: '5\n7', output: '4', isHidden: false },
      { input: '0\n0', output: '0', isHidden: false },
      { input: '1\n2147483647', output: '0', isHidden: true },
      { input: '6\n7', output: '6', isHidden: true },
    ],
  },
  {
    title: 'Subsets',
    description: `Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

Use bitmasking approach to generate all subsets.

**Example 1:**
\`\`\`
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0]
Output: [[],[0]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    constraints: `- 1 <= nums.length <= 10\\n- -10 <= nums[i] <= 10\\n- All the numbers of nums are unique.`,
    testCases: [
      { input: '3\n1 2 3', output: '8', isHidden: false },
      { input: '1\n0', output: '2', isHidden: false },
      { input: '4\n1 2 3 4', output: '16', isHidden: true },
    ],
  },
  {
    title: 'Gray Code',
    description: `An \`n\`-bit gray code sequence is a sequence of \`2^n\` integers where:
- Every integer is in the inclusive range \`[0, 2^n - 1]\`,
- The first integer is \`0\`,
- An integer appears **no more than once** in the sequence,
- The binary representation of every pair of **adjacent** integers differs by **exactly one bit**, and
- The binary representation of the **first** and **last** integers also differs by exactly one bit.

Given an integer \`n\`, return any valid n-bit gray code sequence.

**Example 1:**
\`\`\`
Input: n = 2
Output: [0,1,3,2]
Explanation: The binary representations are: 00, 01, 11, 10.
\`\`\`

**Example 2:**
\`\`\`
Input: n = 1
Output: [0,1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Math', 'Backtracking', 'Bit Manipulation'],
    constraints: `- 1 <= n <= 16`,
    testCases: [
      { input: '2', output: '0 1 3 2', isHidden: false },
      { input: '1', output: '0 1', isHidden: false },
      { input: '3', output: '0 1 3 2 6 7 5 4', isHidden: true },
    ],
  },
  {
    title: 'Maximum Product of Word Lengths',
    description: `Given a string array \`words\`, return the maximum value of \`length(word[i]) * length(word[j])\` where the two words do not share common letters. If no such two words exist, return \`0\`.

**Example 1:**
\`\`\`
Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: The two words can be "abcw", "xtfn".
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
\`\`\`

**Example 3:**
\`\`\`
Input: words = ["a","aa","aaa","aaaa"]
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'String', 'Bit Manipulation'],
    constraints: `- 2 <= words.length <= 1000\\n- 1 <= words[i].length <= 1000\\n- words[i] consists only of lowercase English letters.`,
    testCases: [
      { input: '6\nabcw baz foo bar xtfn abcdef', output: '16', isHidden: false },
      { input: '7\na ab abc d cd bcd abcd', output: '4', isHidden: false },
      { input: '4\na aa aaa aaaa', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Find Two Non-overlapping Sub-arrays Each With Target Sum',
    description: `Given an array of integers \`arr\` and an integer \`target\`, you need to find two **non-overlapping** sub-arrays of \`arr\` each with a sum equal \`target\`. There can be multiple answers so you have to find an answer where the sum of the lengths of the two sub-arrays is **minimum**.

Return the minimum sum of the lengths of the two required sub-arrays, or return \`-1\` if you cannot find such two sub-arrays.

**Example 1:**
\`\`\`
Input: arr = [3,2,2,4,3], target = 3
Output: 2
Explanation: Only two sub-arrays have sum = 3: [3] and [3]. Sum of lengths = 1 + 1 = 2.
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [7,3,4,7], target = 7
Output: 2
\`\`\`

**Example 3:**
\`\`\`
Input: arr = [4,3,2,6,2,3,4], target = 6
Output: -1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Binary Search', 'Dynamic Programming', 'Sliding Window'],
    constraints: `- 1 <= arr.length <= 10^5\\n- 1 <= arr[i] <= 1000\\n- 1 <= target <= 10^8`,
    testCases: [
      { input: '5\n3 2 2 4 3\n3', output: '2', isHidden: false },
      { input: '4\n7 3 4 7\n7', output: '2', isHidden: false },
      { input: '7\n4 3 2 6 2 3 4\n6', output: '-1', isHidden: true },
    ],
  },
  {
    title: 'XOR Queries of a Subarray',
    description: `You are given the array \`arr\` of positive integers and the array \`queries\` where \`queries[i] = [left_i, right_i]\`.

For each query \`i\` compute the XOR of elements from \`left_i\` to \`right_i\` (that is, \`arr[left_i] XOR arr[left_i + 1] XOR ... XOR arr[right_i]\`).

Return an array \`answer\` where \`answer[i]\` is the answer to the \`i\`th query.

**Example 1:**
\`\`\`
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8]
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,14]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Bit Manipulation', 'Prefix Sum'],
    constraints: `- 1 <= arr.length, queries.length <= 3 * 10^4\\n- 1 <= arr[i] <= 10^9\\n- queries[i].length == 2\\n- 0 <= left_i <= right_i < arr.length`,
    testCases: [
      { input: '4\n1 3 4 8\n4\n0 1\n1 2\n0 3\n3 3', output: '2 7 14 8', isHidden: false },
      { input: '4\n4 8 2 10\n4\n2 3\n1 3\n0 0\n0 3', output: '8 0 4 14', isHidden: false },
      { input: '1\n5\n1\n0 0', output: '5', isHidden: true },
    ],
  },
];
