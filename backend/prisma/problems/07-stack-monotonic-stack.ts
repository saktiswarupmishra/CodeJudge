import { SeedProblem } from './types';

export const stackMonotonicStack: SeedProblem[] = [
  {
    title: 'Largest Rectangle in Histogram',
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.

**Example 1:**
\`\`\`
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle has an area = 10 units (formed by heights[2] and heights[3]).
\`\`\`

**Example 2:**
\`\`\`
Input: heights = [2,4]
Output: 4
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    constraints: `- 1 <= heights.length <= 10^5\\n- 0 <= heights[i] <= 10^4`,
    testCases: [
      { input: '6\n2 1 5 6 2 3', output: '10', isHidden: false },
      { input: '2\n2 4', output: '4', isHidden: false },
      { input: '1\n5', output: '5', isHidden: true },
      { input: '3\n3 3 3', output: '9', isHidden: true },
    ],
  },
  {
    title: 'Maximal Rectangle',
    description: `Given a \`rows x cols\` binary matrix filled with \`0\`'s and \`1\`'s, find the largest rectangle containing only \`1\`'s and return its area.

**Example 1:**
\`\`\`
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [["0"]]
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Stack', 'Matrix', 'Monotonic Stack'],
    constraints: `- rows == matrix.length\\n- cols == matrix[i].length\\n- 1 <= rows, cols <= 200\\n- matrix[i][j] is '0' or '1'.`,
    testCases: [
      { input: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0', output: '6', isHidden: false },
      { input: '1 1\n0', output: '0', isHidden: false },
      { input: '1 1\n1', output: '1', isHidden: true },
      { input: '2 2\n1 1\n1 1', output: '4', isHidden: true },
    ],
  },
  {
    title: 'Basic Calculator III',
    description: `Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, \`'+'\`, \`'-'\`, \`'*'\`, \`'/'\` operators, and open \`'('\` and closing \`')'\` parentheses. The integer division should **truncate toward zero**.

You may assume that the given expression is always valid.

**Example 1:**
\`\`\`
Input: s = "1+1"
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: s = "6-4/2"
Output: 4
\`\`\`

**Example 3:**
\`\`\`
Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21
\`\`\``,
    difficulty: 'HARD',
    tags: ['Math', 'String', 'Stack', 'Recursion'],
    constraints: `- 1 <= s.length <= 10^4\\n- s consists of digits, '+', '-', '*', '/', '(', ')'.\\n- s is a valid expression.`,
    testCases: [
      { input: '1+1', output: '2', isHidden: false },
      { input: '6-4/2', output: '4', isHidden: false },
      { input: '2*(5+5*2)/3+(6/2+8)', output: '21', isHidden: true },
      { input: '(2+6*3+5-(3*14/7+2)*5)+3', output: '-12', isHidden: true },
    ],
  },
  {
    title: 'Remove K Digits',
    description: `Given string num representing a non-negative integer \`num\`, and an integer \`k\`, return the smallest possible integer after removing \`k\` digits from \`num\`.

**Example 1:**
\`\`\`
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
\`\`\`

**Example 2:**
\`\`\`
Input: num = "10200", k = 1
Output: "200"
\`\`\`

**Example 3:**
\`\`\`
Input: num = "10", k = 2
Output: "0"
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Stack', 'Greedy', 'Monotonic Stack'],
    constraints: `- 1 <= k <= num.length <= 10^5\\n- num consists of only digits.\\n- num does not have any leading zeros except for the zero itself.`,
    testCases: [
      { input: '1432219\n3', output: '1219', isHidden: false },
      { input: '10200\n1', output: '200', isHidden: false },
      { input: '10\n2', output: '0', isHidden: true },
      { input: '9\n1', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Next Greater Element II',
    description: `Given a circular integer array \`nums\` (i.e., the next element of \`nums[nums.length - 1]\` is \`nums[0]\`), return the next greater number for every element in \`nums\`.

The next greater number of a number \`x\` is the first greater number to its traversing-order next in the array. If it doesn't exist, return \`-1\` for this number.

**Example 1:**
\`\`\`
Input: nums = [1,2,1]
Output: [2,-1,2]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    constraints: `- 1 <= nums.length <= 10^4\\n- -10^9 <= nums[i] <= 10^9`,
    testCases: [
      { input: '3\n1 2 1', output: '2 -1 2', isHidden: false },
      { input: '5\n1 2 3 4 3', output: '2 3 4 -1 4', isHidden: false },
      { input: '1\n5', output: '-1', isHidden: true },
      { input: '4\n3 3 3 3', output: '-1 -1 -1 -1', isHidden: true },
    ],
  },
  {
    title: 'Daily Temperatures',
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.

**Example 1:**
\`\`\`
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
\`\`\`

**Example 2:**
\`\`\`
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
\`\`\`

**Example 3:**
\`\`\`
Input: temperatures = [30,60,90]
Output: [1,1,0]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    constraints: `- 1 <= temperatures.length <= 10^5\\n- 30 <= temperatures[i] <= 100`,
    testCases: [
      { input: '8\n73 74 75 71 69 72 76 73', output: '1 1 4 2 1 1 0 0', isHidden: false },
      { input: '4\n30 40 50 60', output: '1 1 1 0', isHidden: false },
      { input: '3\n30 60 90', output: '1 1 0', isHidden: true },
      { input: '4\n90 80 70 60', output: '0 0 0 0', isHidden: true },
    ],
  },
  {
    title: 'Sum of Subarray Minimums',
    description: `Given an array of integers \`arr\`, find the sum of \`min(b)\`, where \`b\` ranges over every (contiguous) subarray of \`arr\`. Since the answer may be large, return the answer **modulo** \`10^9 + 7\`.

**Example 1:**
\`\`\`
Input: arr = [3,1,2,4]
Output: 17
Explanation: Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1. Sum is 17.
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [11,81,94,43,3]
Output: 444
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
    constraints: `- 1 <= arr.length <= 3 * 10^4\\n- 1 <= arr[i] <= 3 * 10^4`,
    testCases: [
      { input: '4\n3 1 2 4', output: '17', isHidden: false },
      { input: '5\n11 81 94 43 3', output: '444', isHidden: false },
      { input: '1\n5', output: '5', isHidden: true },
      { input: '3\n1 1 1', output: '6', isHidden: true },
    ],
  },
  {
    title: 'Remove Duplicate Letters',
    description: `Given a string \`s\`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the **smallest in lexicographical order** among all possible results.

**Example 1:**
\`\`\`
Input: s = "bcabc"
Output: "abc"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "cbacdcbc"
Output: "acdb"
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Stack', 'Greedy', 'Monotonic Stack'],
    constraints: `- 1 <= s.length <= 10^4\\n- s consists of lowercase English letters.`,
    testCases: [
      { input: 'bcabc', output: 'abc', isHidden: false },
      { input: 'cbacdcbc', output: 'acdb', isHidden: false },
      { input: 'abacb', output: 'abc', isHidden: true },
      { input: 'a', output: 'a', isHidden: true },
    ],
  },
  {
    title: 'Decode String',
    description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly \`k\` times. Note that \`k\` is guaranteed to be a positive integer.

**Example 1:**
\`\`\`
Input: s = "3[a]2[bc]"
Output: "aaabcbc"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "3[a2[c]]"
Output: "accaccacc"
\`\`\`

**Example 3:**
\`\`\`
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Stack', 'Recursion'],
    constraints: `- 1 <= s.length <= 30\\n- s consists of lowercase English letters, digits, and square brackets '[]'.\\n- s is guaranteed to be a valid input.\\n- All integers in s are in the range [1, 300].`,
    testCases: [
      { input: '3[a]2[bc]', output: 'aaabcbc', isHidden: false },
      { input: '3[a2[c]]', output: 'accaccacc', isHidden: false },
      { input: '2[abc]3[cd]ef', output: 'abcabccdcdcdef', isHidden: true },
      { input: 'abc', output: 'abc', isHidden: true },
    ],
  },
  {
    title: 'Longest Valid Parentheses',
    description: `Given a string containing just the characters \`'('\` and \`')'\`, return the length of the longest valid (well-formed) parentheses substring.

**Example 1:**
\`\`\`
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
\`\`\`

**Example 2:**
\`\`\`
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
\`\`\`

**Example 3:**
\`\`\`
Input: s = ""
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming', 'Stack'],
    constraints: `- 0 <= s.length <= 3 * 10^4\\n- s[i] is '(' or ')'.`,
    testCases: [
      { input: '(()', output: '2', isHidden: false },
      { input: ')()())', output: '4', isHidden: false },
      { input: '', output: '0', isHidden: true },
      { input: '()()', output: '4', isHidden: true },
    ],
  },
];
