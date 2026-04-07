import { SeedProblem } from './types';

export const dynamicProgramming: SeedProblem[] = [
  {
    title: 'Edit Distance',
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

**Example 1:**
\`\`\`
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: horse -> rorse -> rose -> ros
\`\`\`

**Example 2:**
\`\`\`
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: intention -> inention -> enention -> exention -> exection -> execution
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming'],
    constraints: `- 0 <= word1.length, word2.length <= 500\\n- word1 and word2 consist of lowercase English letters.`,
    testCases: [
      { input: 'horse\nros', output: '3', isHidden: false },
      { input: 'intention\nexecution', output: '5', isHidden: false },
      { input: '\nabc', output: '3', isHidden: true },
      { input: 'abc\nabc', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Distinct Subsequences',
    description: `Given two strings \`s\` and \`t\`, return the number of distinct subsequences of \`s\` which equals \`t\`.

The test cases are generated so that the answer fits on a 32-bit signed integer.

**Example 1:**
\`\`\`
Input: s = "rabbbit", t = "rabbit"
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: s = "babgbag", t = "bag"
Output: 5
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming'],
    constraints: `- 1 <= s.length, t.length <= 1000\\n- s and t consist of English letters.`,
    testCases: [
      { input: 'rabbbit\nrabbit', output: '3', isHidden: false },
      { input: 'babgbag\nbag', output: '5', isHidden: false },
      { input: 'aaa\na', output: '3', isHidden: true },
      { input: 'abc\ndef', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Burst Balloons',
    description: `You are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons.

If you burst the \`i\`th balloon, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. If \`i - 1\` or \`i + 1\` goes out of bounds, then treat it as if there is a balloon with a \`1\` painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

**Example 1:**
\`\`\`
Input: nums = [3,1,5,8]
Output: 167
Explanation: nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,5]
Output: 10
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming'],
    constraints: `- n == nums.length\\n- 1 <= n <= 300\\n- 0 <= nums[i] <= 100`,
    testCases: [
      { input: '4\n3 1 5 8', output: '167', isHidden: false },
      { input: '2\n1 5', output: '10', isHidden: false },
      { input: '1\n5', output: '5', isHidden: true },
      { input: '3\n1 1 1', output: '3', isHidden: true },
    ],
  },
  {
    title: 'Regular Expression Matching',
    description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\` where:
- \`'.'\` Matches any single character.
- \`'*'\` Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).

**Example 1:**
\`\`\`
Input: s = "aa", p = "a"
Output: false
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aa", p = "a*"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: s = "ab", p = ".*"
Output: true
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming', 'Recursion'],
    constraints: `- 1 <= s.length <= 20\\n- 1 <= p.length <= 20\\n- s contains only lowercase English letters.\\n- p contains only lowercase English letters, '.', and '*'.`,
    testCases: [
      { input: 'aa\na', output: 'false', isHidden: false },
      { input: 'aa\na*', output: 'true', isHidden: false },
      { input: 'ab\n.*', output: 'true', isHidden: true },
      { input: 'aab\nc*a*b', output: 'true', isHidden: true },
    ],
  },
  {
    title: 'Wildcard Matching',
    description: `Given an input string \`s\` and a pattern \`p\`, implement wildcard pattern matching with support for \`'?'\` and \`'*'\` where:
- \`'?'\` Matches any single character.
- \`'*'\` Matches any sequence of characters (including the empty sequence).

The matching should cover the **entire** input string (not partial).

**Example 1:**
\`\`\`
Input: s = "aa", p = "a"
Output: false
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aa", p = "*"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: s = "cb", p = "?a"
Output: false
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming', 'Greedy', 'Recursion'],
    constraints: `- 0 <= s.length, p.length <= 2000\\n- s contains only lowercase English letters.\\n- p contains only lowercase English letters, '?' or '*'.`,
    testCases: [
      { input: 'aa\na', output: 'false', isHidden: false },
      { input: 'aa\n*', output: 'true', isHidden: false },
      { input: 'cb\n?a', output: 'false', isHidden: true },
      { input: 'adceb\n*a*b', output: 'true', isHidden: true },
    ],
  },
  {
    title: 'Longest Increasing Path in a Matrix',
    description: `Given an \`m x n\` integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You **may not** move diagonally or move outside the boundary.

**Example 1:**
\`\`\`
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6].
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort', 'Memoization', 'Matrix'],
    constraints: `- m == matrix.length\\n- n == matrix[i].length\\n- 1 <= m, n <= 200\\n- 0 <= matrix[i][j] <= 2^31 - 1`,
    testCases: [
      { input: '3 3\n9 9 4\n6 6 8\n2 1 1', output: '4', isHidden: false },
      { input: '3 3\n3 4 5\n3 2 6\n2 2 1', output: '4', isHidden: false },
      { input: '1 1\n1', output: '1', isHidden: true },
      { input: '2 2\n1 2\n4 3', output: '4', isHidden: true },
    ],
  },
  {
    title: 'Dungeon Game',
    description: `The demons had captured the princess and imprisoned her in the **bottom-right corner** of a dungeon. The knight was initially positioned in the **top-left room** and must fight his way to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health drops to 0 or below, he dies immediately.

Given a 2D array \`dungeon\` of size \`m x n\`, return the knight's minimum initial health so that he can rescue the princess.

**Example 1:**
\`\`\`
Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7
Explanation: The optimal path is: Right -> Right -> Down -> Down.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Matrix'],
    constraints: `- m == dungeon.length\\n- n == dungeon[i].length\\n- 1 <= m, n <= 200\\n- -1000 <= dungeon[i][j] <= 1000`,
    testCases: [
      { input: '3 3\n-2 -3 3\n-5 -10 1\n10 30 -5', output: '7', isHidden: false },
      { input: '1 1\n0', output: '1', isHidden: false },
      { input: '1 1\n100', output: '1', isHidden: true },
      { input: '2 2\n-3 5\n-10 1', output: '4', isHidden: true },
    ],
  },
  {
    title: 'Maximum Profit in Job Scheduling',
    description: `We have \`n\` jobs, where every job is scheduled to be done from \`startTime[i]\` to \`endTime[i]\`, obtaining a profit of \`profit[i]\`.

Return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

**Example 1:**
\`\`\`
Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth: [1,3) and [3,6). Profit = 50 + 70 = 120.
\`\`\`

**Example 2:**
\`\`\`
Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Binary Search', 'Dynamic Programming', 'Sorting'],
    constraints: `- 1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4\\n- 1 <= startTime[i] < endTime[i] <= 10^9\\n- 1 <= profit[i] <= 10^4`,
    testCases: [
      { input: '4\n1 2 3 3\n3 4 5 6\n50 10 40 70', output: '120', isHidden: false },
      { input: '5\n1 2 3 4 6\n3 5 10 6 9\n20 20 100 70 60', output: '150', isHidden: false },
      { input: '1\n1\n2\n5', output: '5', isHidden: true },
      { input: '3\n1 1 1\n2 3 4\n5 6 4', output: '6', isHidden: true },
    ],
  },
  {
    title: 'Palindrome Partitioning II',
    description: `Given a string \`s\`, return the minimum cuts needed for a palindrome partitioning of \`s\`.

**Example 1:**
\`\`\`
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a"
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: s = "ab"
Output: 1
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming'],
    constraints: `- 1 <= s.length <= 2000\\n- s consists of lowercase English letters only.`,
    testCases: [
      { input: 'aab', output: '1', isHidden: false },
      { input: 'a', output: '0', isHidden: false },
      { input: 'ab', output: '1', isHidden: true },
      { input: 'aabaa', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Scramble String',
    description: `We can scramble a string \`s\` to get a string \`t\` using the following algorithm:

1. If the length of the string is 1, stop.
2. If the length is > 1, split the string into two non-empty substrings recursively.
3. Optionally swap the two substrings.

Given two strings \`s1\` and \`s2\` of the same length, return \`true\` if \`s2\` is a scrambled string of \`s1\`, or \`false\` otherwise.

**Example 1:**
\`\`\`
Input: s1 = "great", s2 = "rgeat"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s1 = "abcde", s2 = "caebd"
Output: false
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming'],
    constraints: `- s1.length == s2.length\\n- 1 <= s1.length <= 30\\n- s1 and s2 consist of lowercase English letters.`,
    testCases: [
      { input: 'great\nrgeat', output: 'true', isHidden: false },
      { input: 'abcde\ncaebd', output: 'false', isHidden: false },
      { input: 'a\na', output: 'true', isHidden: true },
      { input: 'abc\nbca', output: 'true', isHidden: true },
    ],
  },
  {
    title: 'Minimum Cost to Cut a Stick',
    description: `Given a wooden stick of length \`n\` units. The stick is labelled from \`0\` to \`n\`. Given an integer array \`cuts\` where \`cuts[i]\` denotes a position you should perform a cut at.

The cost of one cut is the length of the stick to be cut. The total cost is the sum of costs of all cuts. Return the minimum total cost of the cuts.

**Example 1:**
\`\`\`
Input: n = 7, cuts = [1,3,4,5]
Output: 16
\`\`\`

**Example 2:**
\`\`\`
Input: n = 9, cuts = [5,6,1,4,2]
Output: 22
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Sorting'],
    constraints: `- 2 <= n <= 10^6\\n- 1 <= cuts.length <= min(n - 1, 100)\\n- 1 <= cuts[i] <= n - 1\\n- All integers in cuts are distinct.`,
    testCases: [
      { input: '7\n4\n1 3 4 5', output: '16', isHidden: false },
      { input: '9\n5\n5 6 1 4 2', output: '22', isHidden: false },
      { input: '4\n1\n2', output: '4', isHidden: true },
      { input: '10\n2\n2 8', output: '18', isHidden: true },
    ],
  },
  {
    title: 'Count Different Palindromic Subsequences',
    description: `Given a string \`s\`, return the number of different non-empty palindromic subsequences in \`s\`. Since the answer may be very large, return it **modulo** \`10^9 + 7\`.

**Example 1:**
\`\`\`
Input: s = "bccb"
Output: 6
Explanation: The 6 different non-empty palindromic subsequences are 'b', 'c', 'bb', 'cc', 'bcb', 'bccb'.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"
Output: 104860361
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming'],
    constraints: `- 1 <= s.length <= 1000\\n- s[i] is either 'a', 'b', 'c', or 'd'.`,
    testCases: [
      { input: 'bccb', output: '6', isHidden: false },
      { input: 'abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba', output: '104860361', isHidden: false },
      { input: 'a', output: '1', isHidden: true },
      { input: 'aab', output: '4', isHidden: true },
    ],
  },
  {
    title: 'Cherry Pickup',
    description: `You are given an \`n x n\` grid representing a field of cherries, each cell is one of three possible integers:
- \`0\` means the cell is empty.
- \`1\` means the cell contains a cherry.
- \`-1\` means the cell is a thorn.

Return the maximum number of cherries you can collect by going from \`(0, 0)\` to \`(n - 1, n - 1)\` and back to \`(0, 0)\` by following the rules:
- From (0, 0) go to (n-1, n-1) moving only right or down.
- From (n-1, n-1) go to (0, 0) moving only left or up.
- A cherry is collected and the cell becomes empty.
- If there is no path, return 0.

**Example 1:**
\`\`\`
Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
Output: 5
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Matrix'],
    constraints: `- n == grid.length\\n- n == grid[i].length\\n- 1 <= n <= 50\\n- grid[i][j] is -1, 0, or 1.\\n- grid[0][0] != -1\\n- grid[n-1][n-1] != -1`,
    testCases: [
      { input: '3\n0 1 -1\n1 0 -1\n1 1 1', output: '5', isHidden: false },
      { input: '1\n0', output: '0', isHidden: false },
      { input: '2\n1 1\n1 1', output: '4', isHidden: true },
      { input: '3\n1 1 1\n1 -1 1\n1 1 1', output: '6', isHidden: true },
    ],
  },
  {
    title: 'Cherry Pickup II',
    description: `You are given a \`rows x cols\` matrix grid representing a field of cherries where \`grid[i][j]\` represents the number of cherries that you can collect from the \`(i, j)\` cell.

You have two robots that can collect cherries for you:
- Robot #1 is located at the top-left corner \`(0, 0)\`.
- Robot #2 is located at the top-right corner \`(0, cols - 1)\`.

Return the maximum number of cherries collection using both robots by following the rules:
- From a cell \`(i, j)\`, robots can move to \`(i + 1, j - 1)\`, \`(i + 1, j)\`, or \`(i + 1, j + 1)\`.
- When any robot passes through a cell, it picks up all cherries.
- If both robots stay in the same cell, only one takes the cherries.
- Both robots cannot move outside of the grid at any moment.
- Both robots should reach the bottom row.

**Example 1:**
\`\`\`
Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
\`\`\`

**Example 2:**
\`\`\`
Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
Output: 28
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Matrix'],
    constraints: `- rows == grid.length\\n- cols == grid[i].length\\n- 2 <= rows, cols <= 70\\n- 0 <= grid[i][j] <= 100`,
    testCases: [
      { input: '4 3\n3 1 1\n2 5 1\n1 5 5\n2 1 1', output: '24', isHidden: false },
      { input: '5 7\n1 0 0 0 0 0 1\n2 0 0 0 0 3 0\n2 0 9 0 0 0 0\n0 3 0 5 4 0 0\n1 0 2 3 0 0 6', output: '28', isHidden: false },
      { input: '2 2\n1 1\n1 1', output: '4', isHidden: true },
    ],
  },
  {
    title: 'Number of Ways to Stay in the Same Place After Some Steps',
    description: `You have a pointer at index \`0\` in an array of size \`arrLen\`. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place (The pointer should not be placed outside the array at any time).

Given two integers \`steps\` and \`arrLen\`, return the number of ways such that your pointer is still at index \`0\` after **exactly** \`steps\` steps. Since the answer may be too large, return it **modulo** \`10^9 + 7\`.

**Example 1:**
\`\`\`
Input: steps = 3, arrLen = 2
Output: 4
Explanation: There are 4 different ways to stay at index 0 after 3 steps: [R,L,S], [S,R,L], [L,R,S] is invalid (out of bounds), [S,S,S], [R,S,L].
Wait -- the valid ones are: Right Left Stay, Stay Right Left, Stay Stay Stay, Right Stay Left. That gives 4.
\`\`\`

**Example 2:**
\`\`\`
Input: steps = 2, arrLen = 4
Output: 2
\`\`\`

**Example 3:**
\`\`\`
Input: steps = 4, arrLen = 2
Output: 8
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming'],
    constraints: `- 1 <= steps <= 500\\n- 1 <= arrLen <= 10^6`,
    testCases: [
      { input: '3\n2', output: '4', isHidden: false },
      { input: '2\n4', output: '2', isHidden: false },
      { input: '4\n2', output: '8', isHidden: true },
      { input: '1\n1', output: '1', isHidden: true },
    ],
  },
];
