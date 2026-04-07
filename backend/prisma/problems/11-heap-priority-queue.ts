import { SeedProblem } from './types';

export const heapPriorityQueue: SeedProblem[] = [
  {
    title: 'Find Median from Data Stream',
    description: `The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class:
- \`MedianFinder()\` initializes the MedianFinder object.
- \`void addNum(int num)\` adds the integer \`num\` from the data stream to the data structure.
- \`double findMedian()\` returns the median of all elements so far.

**Example 1:**
\`\`\`
Input: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output: [null, null, null, 1.5, null, 2.0]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Two Pointers', 'Design', 'Sorting', 'Heap', 'Data Stream'],
    constraints: `- -10^5 <= num <= 10^5\\n- There will be at least one element before calling findMedian.\\n- At most 5 * 10^4 calls will be made to addNum and findMedian.`,
    testCases: [
      { input: '6\nMedianFinder\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian', output: 'null\nnull\nnull\n1.50000\nnull\n2.00000', isHidden: false },
      { input: '4\nMedianFinder\naddNum 5\naddNum 3\nfindMedian', output: 'null\nnull\nnull\n4.00000', isHidden: true },
    ],
  },
  {
    title: 'Sliding Window Median',
    description: `The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.

You are given an integer array \`nums\` and an integer \`k\`. There is a sliding window of size \`k\` which is moving from the very left of the array to the very right. Return the median array for each window in the original array.

**Example 1:**
\`\`\`
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Sliding Window', 'Heap'],
    constraints: `- 1 <= k <= nums.length <= 10^5\\n- -2^31 <= nums[i] <= 2^31 - 1`,
    testCases: [
      { input: '8\n1 3 -1 -3 5 3 6 7\n3', output: '1.00000 -1.00000 -1.00000 3.00000 5.00000 6.00000', isHidden: false },
      { input: '9\n1 2 3 4 2 3 1 4 2\n3', output: '2.00000 3.00000 3.00000 3.00000 2.00000 3.00000 2.00000', isHidden: false },
      { input: '1\n5\n1', output: '5.00000', isHidden: true },
    ],
  },
  {
    title: 'Merge k Sorted Lists (Heap)',
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it. Use a min-heap (priority queue) approach.

**Example 1:**
\`\`\`
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
\`\`\`

**Example 2:**
\`\`\`
Input: lists = []
Output: []
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List', 'Divide and Conquer', 'Heap', 'Merge Sort'],
    constraints: `- k == lists.length\\n- 0 <= k <= 10^4\\n- 0 <= lists[i].length <= 500\\n- -10^4 <= lists[i][j] <= 10^4\\n- The sum of lists[i].length will not exceed 10^4.`,
    testCases: [
      { input: '3\n3\n1 4 5\n3\n1 3 4\n2\n2 6', output: '1 1 2 3 4 4 5 6', isHidden: false },
      { input: '0', output: '', isHidden: false },
      { input: '2\n2\n1 3\n2\n2 4', output: '1 2 3 4', isHidden: true },
    ],
  },
  {
    title: 'Top K Frequent Elements',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in **any order**.

Your algorithm's time complexity must be better than \`O(n log n)\`, where \`n\` is the array's size.

**Example 1:**
\`\`\`
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1], k = 1
Output: [1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Heap', 'Bucket Sort', 'Counting', 'Quickselect'],
    constraints: `- 1 <= nums.length <= 10^5\\n- -10^4 <= nums[i] <= 10^4\\n- k is in the range [1, the number of unique elements in the array].\\n- It is guaranteed that the answer is unique.`,
    testCases: [
      { input: '6\n1 1 1 2 2 3\n2', output: '1 2', isHidden: false },
      { input: '1\n1\n1', output: '1', isHidden: false },
      { input: '4\n4 4 4 4\n1', output: '4', isHidden: true },
    ],
  },
  {
    title: 'Reorganize String',
    description: `Given a string \`s\`, rearrange the characters of \`s\` so that any two adjacent characters are not the same.

Return any possible rearrangement of \`s\` or return \`""\` if not possible.

**Example 1:**
\`\`\`
Input: s = "aab"
Output: "aba"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aaab"
Output: ""
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'String', 'Greedy', 'Sorting', 'Heap', 'Counting'],
    constraints: `- 1 <= s.length <= 500\\n- s consists of lowercase English letters.`,
    testCases: [
      { input: 'aab', output: 'aba', isHidden: false },
      { input: 'aaab', output: '', isHidden: false },
      { input: 'a', output: 'a', isHidden: true },
      { input: 'aabb', output: 'abab', isHidden: true },
    ],
  },
  {
    title: 'Kth Largest Element in a Stream',
    description: `Design a class to find the \`k\`th largest element in a stream. Note that it is the \`k\`th largest element in the sorted order, not the \`k\`th distinct element.

Implement \`KthLargest\` class:
- \`KthLargest(int k, int[] nums)\` Initializes the object with the integer \`k\` and the stream of integers \`nums\`.
- \`int add(int val)\` Appends the integer \`val\` to the stream and returns the element representing the \`k\`th largest element in the stream.

**Example 1:**
\`\`\`
Input: ["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Tree', 'Design', 'Binary Search Tree', 'Heap', 'Binary Tree', 'Data Stream'],
    constraints: `- 1 <= k <= 10^4\\n- 0 <= nums.length <= 10^4\\n- -10^4 <= nums[i] <= 10^4\\n- -10^4 <= val <= 10^4\\n- At most 10^4 calls will be made to add.`,
    testCases: [
      { input: '3\n4\n4 5 8 2\n5\n3 5 10 9 4', output: '4\n5\n5\n8\n8', isHidden: false },
      { input: '1\n0\n\n1\n-1', output: '-1', isHidden: true },
    ],
  },
  {
    title: 'IPO',
    description: `Suppose LeetCode will start its **IPO** soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most \`k\` distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most \`k\` distinct projects.

You are given \`n\` projects where the \`i\`th project has a pure profit \`profits[i]\` and a minimum capital of \`capital[i]\` is needed to start it.

Initially, you have \`w\` capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of **at most** \`k\` distinct projects from given projects to **maximize your final capital**, and return the final maximized capital.

**Example 1:**
\`\`\`
Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting', 'Heap'],
    constraints: `- 1 <= k <= 10^5\\n- 0 <= w <= 10^9\\n- n == profits.length\\n- n == capital.length\\n- 1 <= n <= 10^5\\n- 0 <= profits[i] <= 10^4\\n- 0 <= capital[i] <= 10^9`,
    testCases: [
      { input: '2\n0\n3\n1 2 3\n0 1 1', output: '4', isHidden: false },
      { input: '3\n0\n3\n1 2 3\n0 1 2', output: '6', isHidden: false },
      { input: '1\n0\n1\n1\n0', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Task Scheduler',
    description: `Given a characters array \`tasks\`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer \`n\` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least \`n\` units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

**Example 1:**
\`\`\`
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B
\`\`\`

**Example 2:**
\`\`\`
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
\`\`\`

**Example 3:**
\`\`\`
Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Greedy', 'Sorting', 'Heap', 'Counting'],
    constraints: `- 1 <= tasks.length <= 10^4\\n- tasks[i] is an uppercase English letter.\\n- The integer n is in the range [0, 100].`,
    testCases: [
      { input: '6\nA A A B B B\n2', output: '8', isHidden: false },
      { input: '6\nA A A B B B\n0', output: '6', isHidden: false },
      { input: '12\nA A A A A A B C D E F G\n2', output: '16', isHidden: true },
    ],
  },
  {
    title: 'Smallest Range Covering Elements from K Lists',
    description: `You have \`k\` lists of sorted integers in **non-decreasing order**. Find the **smallest** range that includes at least one number from each of the \`k\` lists.

We define the range \`[a, b]\` is smaller than range \`[c, d]\` if \`b - a < d - c\` or \`a < c\` if \`b - a == d - c\`.

**Example 1:**
\`\`\`
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Greedy', 'Sliding Window', 'Sorting', 'Heap'],
    constraints: `- nums.length == k\\n- 1 <= k <= 3500\\n- 1 <= nums[i].length <= 50\\n- -10^5 <= nums[i][j] <= 10^5\\n- nums[i] is sorted in non-decreasing order.`,
    testCases: [
      { input: '3\n5\n4 10 15 24 26\n3\n0 9 12 20\n3\n5 18 22 30', output: '20 24', isHidden: false },
      { input: '3\n3\n1 2 3\n3\n1 2 3\n3\n1 2 3', output: '1 1', isHidden: false },
      { input: '2\n1\n1\n1\n2', output: '1 2', isHidden: true },
    ],
  },
  {
    title: 'Minimum Cost to Hire K Workers',
    description: `There are \`n\` workers. You are given two integer arrays \`quality\` and \`wage\` where \`quality[i]\` is the quality of the \`i\`th worker and \`wage[i]\` is the minimum wage expectation for the \`i\`th worker.

We want to hire exactly \`k\` workers to form a paid group. When hiring a group of \`k\` workers, we must pay them according to these rules:
1. Every worker in the paid group should be paid in the **ratio** of their quality compared to other workers in the paid group.
2. Every worker in the paid group must be paid at least their minimum wage expectation.

Given the integer \`k\`, return the least amount of money needed to form a paid group satisfying the above conditions.

**Example 1:**
\`\`\`
Input: quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00000
Explanation: We pay 70 to worker 0 and 35 to worker 2.
\`\`\`

**Example 2:**
\`\`\`
Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
Output: 30.66667
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting', 'Heap'],
    constraints: `- n == quality.length == wage.length\\n- 1 <= k <= n <= 10^4\\n- 1 <= quality[i], wage[i] <= 10^4`,
    testCases: [
      { input: '3\n10 20 5\n70 50 30\n2', output: '105.00000', isHidden: false },
      { input: '5\n3 1 10 10 1\n4 8 2 2 7\n3', output: '30.66667', isHidden: false },
      { input: '1\n1\n1\n1', output: '1.00000', isHidden: true },
    ],
  },
];
