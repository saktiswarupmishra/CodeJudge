import { SeedProblem } from './types';

export const arraysTwoPointers: SeedProblem[] = [
  {
    title: 'Trapping Rain Water',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

**Example 1:**
\`\`\`
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.
\`\`\`

**Example 2:**
\`\`\`
Input: height = [4,2,0,3,2,5]
Output: 9
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
    constraints: `- n == height.length\\n- 1 <= n <= 2 * 10^4\\n- 0 <= height[i] <= 10^5`,
    testCases: [
      { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', output: '6', isHidden: false },
      { input: '6\n4 2 0 3 2 5', output: '9', isHidden: false },
      { input: '3\n1 0 1', output: '1', isHidden: true },
      { input: '5\n5 4 3 2 1', output: '0', isHidden: true },
    ],
  },
  {
    title: 'First Missing Positive',
    description: `Given an unsorted integer array \`nums\`, return the smallest missing positive integer.

You must implement an algorithm that runs in \`O(n)\` time and uses \`O(1)\` auxiliary space.

**Example 1:**
\`\`\`
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [7,8,9,11,12]
Output: 1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table'],
    constraints: `- 1 <= nums.length <= 10^5\\n- -2^31 <= nums[i] <= 2^31 - 1`,
    testCases: [
      { input: '3\n1 2 0', output: '3', isHidden: false },
      { input: '4\n3 4 -1 1', output: '2', isHidden: false },
      { input: '5\n7 8 9 11 12', output: '1', isHidden: true },
      { input: '1\n1', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Maximum Gap',
    description: `Given an integer array \`nums\`, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return \`0\`.

You must write an algorithm that runs in linear time and uses linear extra space.

**Example 1:**
\`\`\`
Input: nums = [3,6,9,1]
Output: 3
Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [10]
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Sorting', 'Bucket Sort', 'Radix Sort'],
    constraints: `- 1 <= nums.length <= 10^5\\n- 0 <= nums[i] <= 10^9`,
    testCases: [
      { input: '4\n3 6 9 1', output: '3', isHidden: false },
      { input: '1\n10', output: '0', isHidden: false },
      { input: '5\n1 10 5 3 2', output: '5', isHidden: true },
      { input: '2\n1 1000000', output: '999999', isHidden: true },
    ],
  },
  {
    title: 'Sliding Window Maximum',
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

**Example 1:**
\`\`\`
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1], k = 1
Output: [1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Queue', 'Sliding Window', 'Heap', 'Monotonic Queue'],
    constraints: `- 1 <= nums.length <= 10^5\\n- -10^4 <= nums[i] <= 10^4\\n- 1 <= k <= nums.length`,
    testCases: [
      { input: '8\n1 3 -1 -3 5 3 6 7\n3', output: '3 3 5 5 6 7', isHidden: false },
      { input: '1\n1\n1', output: '1', isHidden: false },
      { input: '4\n9 11 8 7\n2', output: '11 11 8', isHidden: true },
      { input: '5\n1 2 3 4 5\n3', output: '3 4 5', isHidden: true },
    ],
  },
  {
    title: 'Minimum Window Substring',
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.

**Example 1:**
\`\`\`
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a", t = "a"
Output: "a"
\`\`\`

**Example 3:**
\`\`\`
Input: s = "a", t = "aa"
Output: ""
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    constraints: `- m == s.length\\n- n == t.length\\n- 1 <= m, n <= 10^5\\n- s and t consist of uppercase and lowercase English letters.`,
    testCases: [
      { input: 'ADOBECODEBANC\nABC', output: 'BANC', isHidden: false },
      { input: 'a\na', output: 'a', isHidden: false },
      { input: 'a\naa', output: '', isHidden: true },
      { input: 'ab\nb', output: 'b', isHidden: true },
    ],
  },
  {
    title: 'Subarrays with K Different Integers',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the number of good subarrays of \`nums\`.

A good array is an array where the number of different integers in that array is exactly \`k\`.

**Example 1:**
\`\`\`
Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Sliding Window', 'Counting'],
    constraints: `- 1 <= nums.length <= 2 * 10^4\\n- 1 <= nums[i], k <= nums.length`,
    testCases: [
      { input: '5\n1 2 1 2 3\n2', output: '7', isHidden: false },
      { input: '5\n1 2 1 3 4\n3', output: '3', isHidden: false },
      { input: '3\n1 1 1\n1', output: '6', isHidden: true },
      { input: '4\n1 2 3 4\n4', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Longest Substring with At Most K Distinct Characters',
    description: `Given a string \`s\` and an integer \`k\`, return the length of the longest substring of \`s\` that contains at most \`k\` distinct characters.

**Example 1:**
\`\`\`
Input: s = "eceba", k = 2
Output: 3
Explanation: The substring is "ece" with length 3.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aa", k = 1
Output: 2
Explanation: The substring is "aa" with length 2.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    constraints: `- 1 <= s.length <= 5 * 10^4\\n- 0 <= k <= 50`,
    testCases: [
      { input: 'eceba\n2', output: '3', isHidden: false },
      { input: 'aa\n1', output: '2', isHidden: false },
      { input: 'aabbcc\n3', output: '6', isHidden: true },
      { input: 'abcdef\n1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Maximum Sum of 3 Non-Overlapping Subarrays',
    description: `Given an integer array \`nums\` and an integer \`k\`, find three non-overlapping subarrays of length \`k\` with maximum sum and return them.

Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

**Example 1:**
\`\`\`
Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5]. We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
Output: [0,2,4]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming'],
    constraints: `- 1 <= nums.length <= 2 * 10^4\\n- 1 <= nums[i] <= 2^16\\n- 1 <= k <= floor(nums.length / 3)`,
    testCases: [
      { input: '8\n1 2 1 2 6 7 5 1\n2', output: '0 3 5', isHidden: false },
      { input: '9\n1 2 1 2 1 2 1 2 1\n2', output: '0 2 4', isHidden: false },
      { input: '6\n7 13 20 19 15 10\n1', output: '0 2 3', isHidden: true },
      { input: '9\n4 5 10 6 11 17 4 8 1\n1', output: '4 5 7', isHidden: true },
    ],
  },
  {
    title: 'Split Array Largest Sum',
    description: `Given an integer array \`nums\` and an integer \`k\`, split \`nums\` into \`k\` non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

**Example 1:**
\`\`\`
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays. The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,3,4,5], k = 2
Output: 9
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Dynamic Programming', 'Greedy'],
    constraints: `- 1 <= nums.length <= 1000\\n- 0 <= nums[i] <= 10^6\\n- 1 <= k <= min(50, nums.length)`,
    testCases: [
      { input: '5\n7 2 5 10 8\n2', output: '18', isHidden: false },
      { input: '5\n1 2 3 4 5\n2', output: '9', isHidden: false },
      { input: '4\n1 4 4 1\n3', output: '4', isHidden: true },
      { input: '3\n10 10 10\n3', output: '10', isHidden: true },
    ],
  },
  {
    title: 'Shortest Subarray with Sum at Least K',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the length of the shortest non-empty subarray of \`nums\` with a sum of at least \`k\`. If there is no such subarray, return \`-1\`.

**Example 1:**
\`\`\`
Input: nums = [1], k = 1
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2], k = 4
Output: -1
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [2,-1,2], k = 3
Output: 3
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Queue', 'Sliding Window', 'Prefix Sum', 'Monotonic Queue'],
    constraints: `- 1 <= nums.length <= 10^5\\n- -10^5 <= nums[i] <= 10^5\\n- 1 <= k <= 10^9`,
    testCases: [
      { input: '1\n1\n1', output: '1', isHidden: false },
      { input: '2\n1 2\n4', output: '-1', isHidden: false },
      { input: '3\n2 -1 2\n3', output: '3', isHidden: true },
      { input: '5\n84 -37 32 40 95\n167', output: '3', isHidden: true },
    ],
  },
];
