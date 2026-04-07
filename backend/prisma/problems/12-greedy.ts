import { SeedProblem } from './types';

export const greedy: SeedProblem[] = [
  {
    title: 'Jump Game II',
    description: `You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`.

Return the minimum number of jumps to reach \`nums[n - 1]\`.

**Example 1:**
\`\`\`
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2,3,0,1,4]
Output: 2
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    constraints: `- 1 <= nums.length <= 10^4\\n- 0 <= nums[i] <= 1000\\n- It's guaranteed that you can reach nums[n - 1].`,
    testCases: [
      { input: '5\n2 3 1 1 4', output: '2', isHidden: false },
      { input: '5\n2 3 0 1 4', output: '2', isHidden: false },
      { input: '1\n0', output: '0', isHidden: true },
      { input: '3\n1 1 1', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Gas Station',
    description: `There are \`n\` gas stations along a circular route, where the amount of gas at the \`i\`th station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`i\`th station to its next \`(i + 1)\`th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is guaranteed to be unique.

**Example 1:**
\`\`\`
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy'],
    constraints: `- n == gas.length == cost.length\\n- 1 <= n <= 10^5\\n- 0 <= gas[i], cost[i] <= 10^4`,
    testCases: [
      { input: '5\n1 2 3 4 5\n3 4 5 1 2', output: '3', isHidden: false },
      { input: '3\n2 3 4\n3 4 3', output: '-1', isHidden: false },
      { input: '1\n5\n3', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Candy',
    description: `There are \`n\` children standing in a line. Each child is assigned a rating value given in the integer array \`ratings\`.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

**Example 1:**
\`\`\`
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate 2, 1, 2 candies respectively.
\`\`\`

**Example 2:**
\`\`\`
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate 1, 2, 1 candies respectively.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy'],
    constraints: `- n == ratings.length\\n- 1 <= n <= 2 * 10^4\\n- 0 <= ratings[i] <= 2 * 10^4`,
    testCases: [
      { input: '3\n1 0 2', output: '5', isHidden: false },
      { input: '3\n1 2 2', output: '4', isHidden: false },
      { input: '1\n5', output: '1', isHidden: true },
      { input: '5\n1 2 3 4 5', output: '15', isHidden: true },
    ],
  },
  {
    title: 'Queue Reconstruction by Height',
    description: `You are given an array of people, \`people\`, which are the attributes of some people in a queue (not necessarily in order). Each \`people[i] = [h_i, k_i]\` represents the \`i\`th person of height \`h_i\` with **exactly** \`k_i\` other people in front who have a height greater than or equal to \`h_i\`.

Reconstruct and return the queue that is represented by the input array \`people\`. The returned queue should be formatted as an array \`queue\`, where \`queue[j] = [h_j, k_j]\` is the attributes of the \`j\`th person in the queue.

**Example 1:**
\`\`\`
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
\`\`\`

**Example 2:**
\`\`\`
Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting', 'Binary Indexed Tree', 'Segment Tree'],
    constraints: `- 1 <= people.length <= 2000\\n- 0 <= h_i <= 10^6\\n- 0 <= k_i < people.length`,
    testCases: [
      { input: '6\n7 0\n4 4\n7 1\n5 0\n6 1\n5 2', output: '5 0\n7 0\n5 2\n6 1\n4 4\n7 1', isHidden: false },
      { input: '6\n6 0\n5 0\n4 0\n3 2\n2 2\n1 4', output: '4 0\n5 0\n2 2\n3 2\n1 4\n6 0', isHidden: false },
    ],
  },
  {
    title: 'Minimum Number of Arrows to Burst Balloons',
    description: `There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array \`points\` where \`points[i] = [x_start, x_end]\` denotes a balloon whose **horizontal diameter** stretches between \`x_start\` and \`x_end\`. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with \`x_start\` and \`x_end\` is burst by an arrow shot at \`x\` if \`x_start <= x <= x_end\`.

Find the **minimum** number of arrows that must be shot to burst all balloons.

**Example 1:**
\`\`\`
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
\`\`\`

**Example 3:**
\`\`\`
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting'],
    constraints: `- 1 <= points.length <= 10^5\\n- points[i].length == 2\\n- -2^31 <= x_start < x_end <= 2^31 - 1`,
    testCases: [
      { input: '4\n10 16\n2 8\n1 6\n7 12', output: '2', isHidden: false },
      { input: '4\n1 2\n3 4\n5 6\n7 8', output: '4', isHidden: false },
      { input: '4\n1 2\n2 3\n3 4\n4 5', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Partition Labels',
    description: `You are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be \`s\`.

Return a list of integers representing the size of these parts.

**Example 1:**
\`\`\`
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation: The partition is "ababcbaca", "defegde", "hijhklij".
\`\`\`

**Example 2:**
\`\`\`
Input: s = "eccbbbbdec"
Output: [10]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'Two Pointers', 'String', 'Greedy'],
    constraints: `- 1 <= s.length <= 500\\n- s consists of lowercase English letters.`,
    testCases: [
      { input: 'ababcbacadefegdehijhklij', output: '9 7 8', isHidden: false },
      { input: 'eccbbbbdec', output: '10', isHidden: false },
      { input: 'a', output: '1', isHidden: true },
      { input: 'abcdef', output: '1 1 1 1 1 1', isHidden: true },
    ],
  },
  {
    title: 'Remove Covered Intervals',
    description: `Given an array \`intervals\` where \`intervals[i] = [l_i, r_i]\` represent the interval \`[l_i, r_i)\`, remove all intervals that are covered by another interval in the list.

The interval \`[a, b)\` is covered by interval \`[c, d)\` if and only if \`c <= a\` and \`b <= d\`.

After doing so, return the number of remaining intervals.

**Example 1:**
\`\`\`
Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[1,4],[2,3]]
Output: 1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Sorting'],
    constraints: `- 1 <= intervals.length <= 1000\\n- intervals[i].length == 2\\n- 0 <= l_i < r_i <= 10^5\\n- All the given intervals are unique.`,
    testCases: [
      { input: '3\n1 4\n3 6\n2 8', output: '2', isHidden: false },
      { input: '2\n1 4\n2 3', output: '1', isHidden: false },
      { input: '2\n1 2\n1 4', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Minimum Number of Platforms Required',
    description: `Given arrival and departure times of all trains that reach a railway station, find the minimum number of platforms required for the railway station so that no train has to wait.

Consider that all the trains arrive on the same day and leave on the same day. Arrival and departure times can never be the same for a train, but we can have an arrival time of one train equal to the departure time of another.

**Example 1:**
\`\`\`
Input: arrivals = [900, 940, 950, 1100, 1500, 1800], departures = [910, 1200, 1120, 1130, 1900, 2000]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: arrivals = [900, 1100, 1235], departures = [1000, 1200, 1240]
Output: 1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting'],
    constraints: `- 1 <= n <= 10^4\\n- 0 <= arrivals[i] <= departures[i] <= 2359`,
    testCases: [
      { input: '6\n900 940 950 1100 1500 1800\n910 1200 1120 1130 1900 2000', output: '3', isHidden: false },
      { input: '3\n900 1100 1235\n1000 1200 1240', output: '1', isHidden: false },
      { input: '1\n100\n200', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Activity Selection Problem',
    description: `You are given \`n\` activities with their start and finish times. Select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.

Activities are sorted by their finish time.

**Example 1:**
\`\`\`
Input: start = [1, 3, 0, 5, 8, 5], finish = [2, 4, 6, 7, 9, 9]
Output: 4
Explanation: Selected activities: (1,2), (3,4), (5,7), (8,9)
\`\`\`

**Example 2:**
\`\`\`
Input: start = [10, 12, 20], finish = [20, 25, 30]
Output: 2
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting'],
    constraints: `- 1 <= n <= 10^5\\n- 0 <= start[i] < finish[i] <= 10^9`,
    testCases: [
      { input: '6\n1 3 0 5 8 5\n2 4 6 7 9 9', output: '4', isHidden: false },
      { input: '3\n10 12 20\n20 25 30', output: '2', isHidden: false },
      { input: '1\n0\n1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Job Sequencing with Deadlines',
    description: `Given a set of \`n\` jobs where each job \`i\` has a deadline \`d_i\` and profit \`p_i\`. Each job takes 1 unit of time. Only one job can be scheduled at a time. We earn the profit if and only if the job is completed by its deadline.

Find the maximum profit and the number of jobs done.

**Example 1:**
\`\`\`
Input: jobs = [{id: 'a', deadline: 4, profit: 20}, {id: 'b', deadline: 1, profit: 10}, {id: 'c', deadline: 1, profit: 40}, {id: 'd', deadline: 1, profit: 30}]
Output: 2 jobs, 60 profit
Explanation: Jobs 'c' and 'a' are completed.
\`\`\`

**Example 2:**
\`\`\`
Input: jobs = [{id: 'a', deadline: 2, profit: 100}, {id: 'b', deadline: 1, profit: 19}, {id: 'c', deadline: 2, profit: 27}, {id: 'd', deadline: 1, profit: 25}, {id: 'e', deadline: 3, profit: 15}]
Output: 3 jobs, 142 profit
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting'],
    constraints: `- 1 <= n <= 10^5\\n- 1 <= deadline <= n\\n- 1 <= profit <= 500`,
    testCases: [
      { input: '4\n4 20\n1 10\n1 40\n1 30', output: '2 60', isHidden: false },
      { input: '5\n2 100\n1 19\n2 27\n1 25\n3 15', output: '3 142', isHidden: false },
      { input: '1\n1 50', output: '1 50', isHidden: true },
    ],
  },
];
