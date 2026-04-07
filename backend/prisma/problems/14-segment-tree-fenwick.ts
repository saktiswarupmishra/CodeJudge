import { SeedProblem } from './types';

export const segmentTreeFenwick: SeedProblem[] = [
  {
    title: 'Range Sum Query - Mutable',
    description: `Given an integer array \`nums\`, handle multiple queries of the following types:
1. **Update** the value of an element in \`nums\`.
2. Calculate the **sum** of the elements of \`nums\` between indices \`left\` and \`right\` **inclusive** where \`left <= right\`.

Implement the \`NumArray\` class:
- \`NumArray(int[] nums)\` Initializes the object with the integer array \`nums\`.
- \`void update(int index, int val)\` Updates the value of \`nums[index]\` to be \`val\`.
- \`int sumRange(int left, int right)\` Returns the sum of the elements of \`nums\` between indices \`left\` and \`right\` inclusive.

**Example 1:**
\`\`\`
Input: ["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output: [null, 9, null, 8]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Design', 'Binary Indexed Tree', 'Segment Tree'],
    constraints: `- 1 <= nums.length <= 3 * 10^4\\n- -100 <= nums[i] <= 100\\n- 0 <= index < nums.length\\n- -100 <= val <= 100\\n- 0 <= left <= right < nums.length\\n- At most 3 * 10^4 calls to update and sumRange.`,
    testCases: [
      { input: '3\n1 3 5\n4\nsumRange 0 2\nupdate 1 2\nsumRange 0 2\nsumRange 1 2', output: '9\nnull\n8\n7', isHidden: false },
      { input: '1\n1\n2\nsumRange 0 0\nupdate 0 5', output: '1\nnull', isHidden: true },
    ],
  },
  {
    title: 'Count of Smaller Numbers After Self',
    description: `Given an integer array \`nums\`, return an integer array \`counts\` where \`counts[i]\` is the number of smaller elements to the right of \`nums[i]\`.

**Example 1:**
\`\`\`
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller elements.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1]
Output: [0]
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [-1,-1]
Output: [0,0]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Segment Tree', 'Merge Sort', 'Ordered Set'],
    constraints: `- 1 <= nums.length <= 10^5\\n- -10^4 <= nums[i] <= 10^4`,
    testCases: [
      { input: '4\n5 2 6 1', output: '2 1 1 0', isHidden: false },
      { input: '1\n-1', output: '0', isHidden: false },
      { input: '2\n-1 -1', output: '0 0', isHidden: true },
      { input: '3\n3 2 1', output: '2 1 0', isHidden: true },
    ],
  },
  {
    title: 'Reverse Pairs',
    description: `Given an integer array \`nums\`, return the number of **reverse pairs** in the array.

A reverse pair is a pair \`(i, j)\` where:
- \`0 <= i < j < nums.length\` and
- \`nums[i] > 2 * nums[j]\`.

**Example 1:**
\`\`\`
Input: nums = [1,3,2,3,1]
Output: 2
Explanation: The reverse pairs are (1, 4) -> nums[1]=3, nums[4]=1, 3 > 2*1 and (3, 4) -> nums[3]=3, nums[4]=1, 3 > 2*1.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2,4,3,5,1]
Output: 3
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Segment Tree', 'Merge Sort', 'Ordered Set'],
    constraints: `- 1 <= nums.length <= 5 * 10^4\\n- -2^31 <= nums[i] <= 2^31 - 1`,
    testCases: [
      { input: '5\n1 3 2 3 1', output: '2', isHidden: false },
      { input: '5\n2 4 3 5 1', output: '3', isHidden: false },
      { input: '1\n1', output: '0', isHidden: true },
      { input: '4\n4 3 2 1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Range Minimum Query',
    description: `Given an array \`arr\` of \`n\` integers, process multiple queries of the form: given \`l\` and \`r\`, find the minimum element in the subarray \`arr[l..r]\` (inclusive).

Preprocess the array so that each query can be answered efficiently using a Segment Tree or Sparse Table.

**Example 1:**
\`\`\`
Input: arr = [1, 3, 2, 7, 9, 11], queries = [[0,2],[1,4],[3,5]]
Output: [1, 2, 7]
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [5, 2, 4, 3, 1], queries = [[0,4],[1,3]]
Output: [1, 2]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Segment Tree', 'Sparse Table'],
    constraints: `- 1 <= n <= 10^5\\n- -10^9 <= arr[i] <= 10^9\\n- 1 <= queries <= 10^5\\n- 0 <= l <= r < n`,
    testCases: [
      { input: '6\n1 3 2 7 9 11\n3\n0 2\n1 4\n3 5', output: '1\n2\n7', isHidden: false },
      { input: '5\n5 2 4 3 1\n2\n0 4\n1 3', output: '1\n2', isHidden: false },
      { input: '1\n42\n1\n0 0', output: '42', isHidden: true },
    ],
  },
  {
    title: 'Range Sum Query with Lazy Propagation',
    description: `Given an array of integers, handle multiple queries of two types:
1. **Update**: Add a value \`val\` to all elements in the range \`[l, r]\`.
2. **Query**: Find the sum of elements in the range \`[l, r]\`.

Implement a Segment Tree with Lazy Propagation for efficient range updates and queries.

**Example 1:**
\`\`\`
Input: arr = [1, 3, 5, 7, 9, 11]
Operations: query(1,3) -> 15, update(1,5,10), query(1,3) -> 45
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Segment Tree', 'Lazy Propagation'],
    constraints: `- 1 <= n <= 10^5\\n- -10^9 <= arr[i] <= 10^9\\n- 1 <= operations <= 10^5`,
    testCases: [
      { input: '6\n1 3 5 7 9 11\n3\nquery 1 3\nupdate 1 5 10\nquery 1 3', output: '15\nnull\n45', isHidden: false },
      { input: '3\n1 2 3\n2\nquery 0 2\nupdate 0 2 5', output: '6\nnull', isHidden: true },
    ],
  },
  {
    title: 'Count of Range Sum',
    description: `Given an integer array \`nums\` and two integers \`lower\` and \`upper\`, return the number of range sums that lie in \`[lower, upper]\` inclusive.

Range sum \`S(i, j)\` is defined as the sum of the elements in \`nums\` between indices \`i\` and \`j\` inclusive, where \`i <= j\`.

**Example 1:**
\`\`\`
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
Explanation: The three ranges are: [0,0], [2,2], [0,2] and their respective sums are: -2, -1, 2.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0], lower = 0, upper = 0
Output: 1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Segment Tree', 'Merge Sort', 'Ordered Set'],
    constraints: `- 1 <= nums.length <= 10^5\\n- -2^31 <= nums[i] <= 2^31 - 1\\n- -10^5 <= lower <= upper <= 10^5`,
    testCases: [
      { input: '3\n-2 5 -1\n-2\n2', output: '3', isHidden: false },
      { input: '1\n0\n0\n0', output: '1', isHidden: false },
      { input: '3\n0 0 0\n0\n0', output: '6', isHidden: true },
    ],
  },
  {
    title: 'Falling Squares',
    description: `There are several squares being dropped onto the X-axis of a 2D plane.

You are given a 2D integer array \`positions\` where \`positions[i] = [left_i, sideLength_i]\` represents the \`i\`th square with a side length of \`sideLength_i\` that is dropped with its left edge aligned with X-coordinate \`left_i\`.

Each square is dropped one at a time from a height above any landed squares. It then falls downward until it either lands on top of a previously fallen square or on the X-axis.

After each square is dropped, return the list of heights of the tallest stack.

**Example 1:**
\`\`\`
Input: positions = [[1,2],[2,3],[6,1]]
Output: [2,5,5]
\`\`\`

**Example 2:**
\`\`\`
Input: positions = [[100,100],[200,100]]
Output: [100,100]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Segment Tree', 'Ordered Set'],
    constraints: `- 1 <= positions.length <= 1000\\n- 1 <= left_i <= 10^8\\n- 1 <= sideLength_i <= 10^6`,
    testCases: [
      { input: '3\n1 2\n2 3\n6 1', output: '2 5 5', isHidden: false },
      { input: '2\n100 100\n200 100', output: '100 100', isHidden: false },
      { input: '1\n1 1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'The Skyline Problem',
    description: `A city's **skyline** is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the **skyline** formed by these buildings collectively.

The geometric information of each building is given in the array \`buildings\` where \`buildings[i] = [left_i, right_i, height_i]\`:
- \`left_i\` is the x coordinate of the left edge.
- \`right_i\` is the x coordinate of the right edge.
- \`height_i\` is the height.

The skyline should be represented as a list of "key points" sorted by their x-coordinate in the form \`[[x1,y1],[x2,y2],...]\`. Each key point is the left endpoint of some horizontal segment in the skyline except the last point which always has a y-coordinate 0.

**Example 1:**
\`\`\`
Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
\`\`\`

**Example 2:**
\`\`\`
Input: buildings = [[0,2,3],[2,5,3]]
Output: [[0,3],[5,0]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Divide and Conquer', 'Binary Indexed Tree', 'Segment Tree', 'Line Sweep', 'Heap', 'Ordered Set'],
    constraints: `- 1 <= buildings.length <= 10^4\\n- 0 <= left_i < right_i <= 2^31 - 1\\n- 1 <= height_i <= 2^31 - 1`,
    testCases: [
      { input: '5\n2 9 10\n3 7 15\n5 12 12\n15 20 10\n19 24 8', output: '2 10\n3 15\n7 12\n12 0\n15 10\n20 8\n24 0', isHidden: false },
      { input: '2\n0 2 3\n2 5 3', output: '0 3\n5 0', isHidden: false },
      { input: '1\n1 5 10', output: '1 10\n5 0', isHidden: true },
    ],
  },
  {
    title: 'Maximum Sum Queries',
    description: `You are given two **0-indexed** integer arrays \`nums1\` and \`nums2\`, each of length \`n\`, and a **1-indexed** 2D array \`queries\` where \`queries[i] = [x_i, y_i]\`.

For the \`i\`th query, find the **maximum value** of \`nums1[j] + nums2[j]\` among all indices \`j\` (\`0 <= j < n\`), where \`nums1[j] >= x_i\` and \`nums2[j] >= y_i\`, or \`-1\` if there is no \`j\` satisfying the constraints.

Return an array \`answer\` where \`answer[i]\` is the answer to the \`i\`th query.

**Example 1:**
\`\`\`
Input: nums1 = [4,3,1,2], nums2 = [2,4,9,5], queries = [[4,1],[1,3],[2,5]]
Output: [6,10,7]
\`\`\`

**Example 2:**
\`\`\`
Input: nums1 = [3,2,5], nums2 = [2,3,4], queries = [[4,4],[3,2],[1,1]]
Output: [9,9,9]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Stack', 'Binary Indexed Tree', 'Segment Tree', 'Sorting', 'Monotonic Stack'],
    constraints: `- nums1.length == nums2.length == n\\n- 1 <= n <= 10^5\\n- 1 <= nums1[i], nums2[i] <= 10^9\\n- 1 <= queries.length <= 10^5\\n- queries[i].length == 2\\n- 1 <= x_i, y_i <= 10^9`,
    testCases: [
      { input: '4\n4 3 1 2\n2 4 9 5\n3\n4 1\n1 3\n2 5', output: '6 10 7', isHidden: false },
      { input: '3\n3 2 5\n2 3 4\n3\n4 4\n3 2\n1 1', output: '9 9 9', isHidden: false },
    ],
  },
  {
    title: 'Count of Range Sum (Fenwick Tree)',
    description: `Given an integer array \`nums\` and two integers \`lower\` and \`upper\`, return the number of range sums that lie in \`[lower, upper]\` inclusive.

Implement this using a Fenwick Tree (Binary Indexed Tree) approach.

Range sum \`S(i, j)\` is defined as the sum of the elements in \`nums\` between indices \`i\` and \`j\` inclusive.

**Example 1:**
\`\`\`
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0,-3,-3,1,1,2], lower = 3, upper = 5
Output: 2
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Binary Indexed Tree', 'Merge Sort', 'Ordered Set'],
    constraints: `- 1 <= nums.length <= 10^5\\n- -2^31 <= nums[i] <= 2^31 - 1\\n- -10^5 <= lower <= upper <= 10^5`,
    testCases: [
      { input: '3\n-2 5 -1\n-2\n2', output: '3', isHidden: false },
      { input: '6\n0 -3 -3 1 1 2\n3\n5', output: '2', isHidden: false },
      { input: '1\n1\n1\n1', output: '1', isHidden: true },
    ],
  },
];
