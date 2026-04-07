import { SeedProblem } from './types';

export const binarySearch: SeedProblem[] = [
  {
    title: 'Median of Two Sorted Arrays',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the **median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.

**Example 1:**
\`\`\`
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
\`\`\`

**Example 2:**
\`\`\`
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    constraints: `- nums1.length == m\\n- nums2.length == n\\n- 0 <= m <= 1000\\n- 0 <= n <= 1000\\n- 1 <= m + n <= 2000\\n- -10^6 <= nums1[i], nums2[i] <= 10^6`,
    testCases: [
      { input: '2\n1 3\n1\n2', output: '2.00000', isHidden: false },
      { input: '2\n1 2\n2\n3 4', output: '2.50000', isHidden: false },
      { input: '0\n\n1\n1', output: '1.00000', isHidden: true },
      { input: '1\n2\n0', output: '2.00000', isHidden: true },
    ],
  },
  {
    title: 'Find Minimum in Rotated Sorted Array II',
    description: `Suppose an array of length \`n\` sorted in ascending order is **rotated** between \`1\` and \`n\` times. Given the sorted rotated array \`nums\` that may contain **duplicates**, return the minimum element of this array.

You must decrease the overall operation steps as much as possible.

**Example 1:**
\`\`\`
Input: nums = [1,3,5]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2,2,2,0,1]
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search'],
    constraints: `- n == nums.length\\n- 1 <= n <= 5000\\n- -5000 <= nums[i] <= 5000\\n- nums is sorted and rotated between 1 and n times.`,
    testCases: [
      { input: '3\n1 3 5', output: '1', isHidden: false },
      { input: '5\n2 2 2 0 1', output: '0', isHidden: false },
      { input: '3\n3 1 3', output: '1', isHidden: true },
      { input: '1\n1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Search in Rotated Sorted Array II',
    description: `There is an integer array \`nums\` sorted in non-decreasing order (not necessarily with distinct values).

Before being passed to your function, \`nums\` is rotated at an unknown pivot index \`k\`. Given the array \`nums\` after the rotation and an integer \`target\`, return \`true\` if \`target\` is in \`nums\`, or \`false\` if it is not.

You must decrease the overall operation steps as much as possible.

**Example 1:**
\`\`\`
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search'],
    constraints: `- 1 <= nums.length <= 5000\\n- -10^4 <= nums[i] <= 10^4\\n- nums is guaranteed to be rotated at some pivot.\\n- -10^4 <= target <= 10^4`,
    testCases: [
      { input: '7\n2 5 6 0 0 1 2\n0', output: 'true', isHidden: false },
      { input: '7\n2 5 6 0 0 1 2\n3', output: 'false', isHidden: false },
      { input: '5\n1 0 1 1 1\n0', output: 'true', isHidden: true },
      { input: '1\n1\n1', output: 'true', isHidden: true },
    ],
  },
  {
    title: 'Kth Smallest Element in a Sorted Matrix',
    description: `Given an \`n x n\` matrix where each of the rows and columns is sorted in ascending order, return the \`k\`th smallest element in the matrix.

Note that it is the \`k\`th smallest element **in the sorted order**, not the \`k\`th **distinct** element.

You must find a solution with memory complexity better than \`O(n^2)\`.

**Example 1:**
\`\`\`
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in order are [1,5,9,10,11,12,13,13,15], and the 8th smallest is 13.
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [[-5]], k = 1
Output: -5
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Sorting', 'Heap', 'Matrix'],
    constraints: `- n == matrix.length == matrix[i].length\\n- 1 <= n <= 300\\n- -10^9 <= matrix[i][j] <= 10^9\\n- 1 <= k <= n^2`,
    testCases: [
      { input: '3\n1 5 9\n10 11 13\n12 13 15\n8', output: '13', isHidden: false },
      { input: '1\n-5\n1', output: '-5', isHidden: false },
      { input: '2\n1 2\n3 4\n3', output: '3', isHidden: true },
    ],
  },
  {
    title: 'Split Array Largest Sum (Binary Search)',
    description: `Given an integer array \`nums\` and an integer \`k\`, split \`nums\` into \`k\` non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split. Use binary search approach.

**Example 1:**
\`\`\`
Input: nums = [7,2,5,10,8], k = 2
Output: 18
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
      { input: '3\n1 1 1\n3', output: '1', isHidden: true },
      { input: '4\n10 5 13 4\n1', output: '32', isHidden: true },
    ],
  },
  {
    title: 'Capacity To Ship Packages Within D Days',
    description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days.

The \`i\`th package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt (in the order given by \`weights\`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.

**Example 1:**
\`\`\`
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
\`\`\`

**Example 2:**
\`\`\`
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
\`\`\`

**Example 3:**
\`\`\`
Input: weights = [1,2,3,1,1], days = 4
Output: 3
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Greedy'],
    constraints: `- 1 <= days <= weights.length <= 5 * 10^4\\n- 1 <= weights[i] <= 500`,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 10\n5', output: '15', isHidden: false },
      { input: '6\n3 2 2 4 1 4\n3', output: '6', isHidden: false },
      { input: '5\n1 2 3 1 1\n4', output: '3', isHidden: true },
    ],
  },
  {
    title: 'Find a Peak Element II',
    description: `A **peak element** in a 2D grid is an element that is **strictly greater** than all of its adjacent neighbors to the left, right, top, and bottom.

Given a **0-indexed** \`m x n\` matrix \`mat\` where no two adjacent cells are equal, find **any** peak element \`mat[i][j]\` and return the length 2 array \`[i, j]\`.

**Example 1:**
\`\`\`
Input: mat = [[1,4],[3,2]]
Output: [0,1] or [1,0]
Explanation: Both 3 and 4 are peak elements.
\`\`\`

**Example 2:**
\`\`\`
Input: mat = [[10,20,15],[21,30,14],[7,16,32]]
Output: [1,1]
Explanation: 30 is a peak element.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Matrix'],
    constraints: `- m == mat.length\\n- n == mat[i].length\\n- 1 <= m, n <= 500\\n- 1 <= mat[i][j] <= 10^5\\n- No two adjacent cells are equal.`,
    testCases: [
      { input: '2 2\n1 4\n3 2', output: '0 1', isHidden: false },
      { input: '3 3\n10 20 15\n21 30 14\n7 16 32', output: '1 1', isHidden: false },
      { input: '1 1\n1', output: '0 0', isHidden: true },
    ],
  },
  {
    title: 'Minimum Limit of Balls in a Bag',
    description: `You are given an integer array \`nums\` where the \`i\`th bag contains \`nums[i]\` balls. You are also given an integer \`maxOperations\`.

You can perform the following operation at most \`maxOperations\` times:
- Take any bag of balls and divide it into two new bags with a positive number of balls.

Your penalty is the **maximum** number of balls in a bag. You want to **minimize** your penalty after the operations.

Return the minimum possible penalty after performing the operations.

**Example 1:**
\`\`\`
Input: nums = [9], maxOperations = 2
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2,4,8,2], maxOperations = 4
Output: 2
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search'],
    constraints: `- 1 <= nums.length <= 10^5\\n- 1 <= maxOperations, nums[i] <= 10^9`,
    testCases: [
      { input: '1\n9\n2', output: '3', isHidden: false },
      { input: '4\n2 4 8 2\n4', output: '2', isHidden: false },
      { input: '1\n1\n1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Maximum Value at a Given Index in a Bounded Array',
    description: `You are given three positive integers: \`n\`, \`index\`, and \`maxSum\`. You want to construct an array \`nums\` (0-indexed) that satisfies the following conditions:
- \`nums.length == n\`
- \`nums[i]\` is a **positive** integer where \`0 <= i < n\`.
- \`abs(nums[i] - nums[i+1]) <= 1\` where \`0 <= i < n-1\`.
- The sum of all the elements of \`nums\` does not exceed \`maxSum\`.
- \`nums[index]\` is **maximized**.

Return \`nums[index]\` of the constructed array.

**Example 1:**
\`\`\`
Input: n = 4, index = 2, maxSum = 6
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: n = 6, index = 1, maxSum = 10
Output: 3
\`\`\``,
    difficulty: 'HARD',
    tags: ['Binary Search', 'Greedy'],
    constraints: `- 1 <= n <= maxSum <= 10^9\\n- 0 <= index < n`,
    testCases: [
      { input: '4\n2\n6', output: '2', isHidden: false },
      { input: '6\n1\n10', output: '3', isHidden: false },
      { input: '1\n0\n1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Find the Smallest Divisor Given a Threshold',
    description: `Given an array of integers \`nums\` and an integer \`threshold\`, we will choose a positive integer \`divisor\`, divide all the array by it, and sum the division's result. Find the **smallest** such divisor such that the result is less than or equal to \`threshold\`.

Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: \`7/3 = 3\` and \`10/2 = 5\`).

The test cases are generated so that there will be an answer.

**Example 1:**
\`\`\`
Input: nums = [1,2,5,9], threshold = 6
Output: 5
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search'],
    constraints: `- 1 <= nums.length <= 5 * 10^4\\n- 1 <= nums[i] <= 10^6\\n- nums.length <= threshold <= 10^6`,
    testCases: [
      { input: '4\n1 2 5 9\n6', output: '5', isHidden: false },
      { input: '5\n44 22 33 11 1\n5', output: '44', isHidden: false },
      { input: '3\n2 3 5\n10', output: '1', isHidden: true },
    ],
  },
];
