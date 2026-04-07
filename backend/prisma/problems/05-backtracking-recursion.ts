import { SeedProblem } from './types';

export const backtrackingRecursion: SeedProblem[] = [
  {
    title: 'N-Queens',
    description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return all distinct solutions to the n-queens puzzle. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` both indicate a queen and an empty space, respectively.

**Example 1:**
\`\`\`
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
\`\`\`

**Example 2:**
\`\`\`
Input: n = 1
Output: [["Q"]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Backtracking'],
    constraints: `- 1 <= n <= 9`,
    testCases: [
      { input: '4', output: '2', isHidden: false },
      { input: '1', output: '1', isHidden: false },
      { input: '8', output: '92', isHidden: true },
      { input: '5', output: '10', isHidden: true },
    ],
  },
  {
    title: 'N-Queens II',
    description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return the number of distinct solutions to the n-queens puzzle.

**Example 1:**
\`\`\`
Input: n = 4
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: n = 1
Output: 1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Backtracking'],
    constraints: `- 1 <= n <= 9`,
    testCases: [
      { input: '4', output: '2', isHidden: false },
      { input: '1', output: '1', isHidden: false },
      { input: '9', output: '352', isHidden: true },
      { input: '6', output: '4', isHidden: true },
    ],
  },
  {
    title: 'Sudoku Solver',
    description: `Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:
1. Each of the digits \`1-9\` must occur exactly once in each row.
2. Each of the digits \`1-9\` must occur exactly once in each column.
3. Each of the digits \`1-9\` must occur exactly once in each of the 9 \`3x3\` sub-boxes of the grid.

The \`'.'\` character indicates empty cells.

**Example:**
\`\`\`
Input: board = [
["5","3",".",".","7",".",".",".","."],
["6",".",".","1","9","5",".",".","."],
[".","9","8",".",".",".",".","6","."],
["8",".",".",".","6",".",".",".","3"],
["4",".",".","8",".","3",".",".","1"],
["7",".",".",".","2",".",".",".","6"],
[".","6",".",".",".",".","2","8","."],
[".",".",".","4","1","9",".",".","5"],
[".",".",".",".","8",".",".","7","9"]]
Output: [
["5","3","4","6","7","8","9","1","2"],
["6","7","2","1","9","5","3","4","8"],
["1","9","8","3","4","2","5","6","7"],
["8","5","9","7","6","1","4","2","3"],
["4","2","6","8","5","3","7","9","1"],
["7","1","3","9","2","4","8","5","6"],
["9","6","1","5","3","7","2","8","4"],
["2","8","7","4","1","9","6","3","5"],
["3","4","5","2","8","6","1","7","9"]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Backtracking', 'Matrix'],
    constraints: `- board.length == 9\\n- board[i].length == 9\\n- board[i][j] is a digit or '.'.\\n- It is guaranteed that the input board has only one solution.`,
    testCases: [
      { input: '5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9', output: '5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9', isHidden: false },
    ],
  },
  {
    title: 'Expression Add Operators',
    description: `Given a string \`num\` that contains only digits and an integer \`target\`, return all possibilities to insert the binary operators \`'+'\`, \`'-'\`, and/or \`'*'\` between the digits of \`num\` so that the resultant expression evaluates to the \`target\` value.

Note that operands in the returned expressions **should not** contain leading zeros.

**Example 1:**
\`\`\`
Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]
\`\`\`

**Example 2:**
\`\`\`
Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]
\`\`\`

**Example 3:**
\`\`\`
Input: num = "3456237490", target = 9191
Output: []
\`\`\``,
    difficulty: 'HARD',
    tags: ['Math', 'String', 'Backtracking'],
    constraints: `- 1 <= num.length <= 10\\n- num consists of only digits.\\n- -2^31 <= target <= 2^31 - 1`,
    testCases: [
      { input: '123\n6', output: '1*2*3\n1+2+3', isHidden: false },
      { input: '232\n8', output: '2*3+2\n2+3*2', isHidden: false },
      { input: '105\n5', output: '1*0+5\n10-5', isHidden: true },
      { input: '00\n0', output: '0*0\n0+0\n0-0', isHidden: true },
    ],
  },
  {
    title: 'Word Search II',
    description: `Given an \`m x n\` board of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

**Example 1:**
\`\`\`
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
\`\`\`

**Example 2:**
\`\`\`
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'String', 'Backtracking', 'Trie', 'Matrix'],
    constraints: `- m == board.length\\n- n == board[i].length\\n- 1 <= m, n <= 12\\n- board[i][j] is a lowercase English letter.\\n- 1 <= words.length <= 3 * 10^4\\n- 1 <= words[i].length <= 10`,
    testCases: [
      { input: '4 4\no a a n\ne t a e\ni h k r\ni f l v\n4\noath pea eat rain', output: 'eat oath', isHidden: false },
      { input: '2 2\na b\nc d\n1\nabcb', output: '', isHidden: false },
      { input: '1 1\na\n1\na', output: 'a', isHidden: true },
    ],
  },
  {
    title: 'Palindrome Partitioning',
    description: `Given a string \`s\`, partition \`s\` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of \`s\`.

**Example 1:**
\`\`\`
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a"
Output: [["a"]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming', 'Backtracking'],
    constraints: `- 1 <= s.length <= 16\\n- s contains only lowercase English letters.`,
    testCases: [
      { input: 'aab', output: 'a a b\naa b', isHidden: false },
      { input: 'a', output: 'a', isHidden: false },
      { input: 'aba', output: 'a b a\naba', isHidden: true },
      { input: 'aabb', output: 'a a b b\na a bb\naa b b\naa bb', isHidden: true },
    ],
  },
  {
    title: 'Restore IP Addresses',
    description: `A valid IP address consists of exactly four integers separated by single dots. Each integer is between \`0\` and \`255\` (inclusive) and cannot have leading zeros.

Given a string \`s\` containing only digits, return all possible valid IP addresses that can be formed by inserting dots into \`s\`. You are not allowed to reorder or remove any digits in \`s\`.

**Example 1:**
\`\`\`
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
\`\`\`

**Example 2:**
\`\`\`
Input: s = "0000"
Output: ["0.0.0.0"]
\`\`\`

**Example 3:**
\`\`\`
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Backtracking'],
    constraints: `- 1 <= s.length <= 20\\n- s consists of digits only.`,
    testCases: [
      { input: '25525511135', output: '255.255.11.135\n255.255.111.35', isHidden: false },
      { input: '0000', output: '0.0.0.0', isHidden: false },
      { input: '101023', output: '1.0.10.23\n1.0.102.3\n10.1.0.23\n10.10.2.3\n101.0.2.3', isHidden: true },
      { input: '1111', output: '1.1.1.1', isHidden: true },
    ],
  },
  {
    title: 'Permutations II',
    description: `Given a collection of numbers, \`nums\`, that might contain duplicates, return all possible unique permutations **in any order**.

**Example 1:**
\`\`\`
Input: nums = [1,1,2]
Output: [[1,1,2],[1,2,1],[2,1,1]]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Backtracking'],
    constraints: `- 1 <= nums.length <= 8\\n- -10 <= nums[i] <= 10`,
    testCases: [
      { input: '3\n1 1 2', output: '3', isHidden: false },
      { input: '3\n1 2 3', output: '6', isHidden: false },
      { input: '4\n1 1 1 2', output: '4', isHidden: true },
      { input: '1\n0', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Combination Sum II',
    description: `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used **once** in the combination.

**Note:** The solution set must not contain duplicate combinations.

**Example 1:**
\`\`\`
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
\`\`\`

**Example 2:**
\`\`\`
Input: candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],[5]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Backtracking'],
    constraints: `- 1 <= candidates.length <= 100\\n- 1 <= candidates[i] <= 50\\n- 1 <= target <= 30`,
    testCases: [
      { input: '7\n10 1 2 7 6 1 5\n8', output: '1 1 6\n1 2 5\n1 7\n2 6', isHidden: false },
      { input: '5\n2 5 2 1 2\n5', output: '1 2 2\n5', isHidden: false },
      { input: '3\n1 1 1\n2', output: '1 1', isHidden: true },
    ],
  },
  {
    title: 'Letter Case Permutation',
    description: `Given a string \`s\`, you can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. Return the output in **any order**.

**Example 1:**
\`\`\`
Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
\`\`\`

**Example 2:**
\`\`\`
Input: s = "3z4"
Output: ["3z4","3Z4"]
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Backtracking', 'Bit Manipulation'],
    constraints: `- 1 <= s.length <= 12\\n- s consists of lowercase English letters, uppercase English letters, and digits.`,
    testCases: [
      { input: 'a1b2', output: '4', isHidden: false },
      { input: '3z4', output: '2', isHidden: false },
      { input: 'abc', output: '8', isHidden: true },
      { input: '12345', output: '1', isHidden: true },
    ],
  },
];
