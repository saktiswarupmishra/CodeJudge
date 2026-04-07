import { SeedProblem } from './types';

export const binaryTreesBST: SeedProblem[] = [
  {
    title: 'Binary Tree Maximum Path Sum',
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the maximum path sum of any **non-empty** path.

**Example 1:**
\`\`\`
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
\`\`\`

**Example 2:**
\`\`\`
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Tree', 'Depth-First Search', 'Dynamic Programming', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [1, 3 * 10^4].\\n- -1000 <= Node.val <= 1000`,
    testCases: [
      { input: '1 2 3', output: '6', isHidden: false },
      { input: '-10 9 20 null null 15 7', output: '42', isHidden: false },
      { input: '-3', output: '-3', isHidden: true },
      { input: '2 -1 -2', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Serialize and Deserialize Binary Tree',
    description: `Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

**Example 1:**
\`\`\`
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
\`\`\`

**Example 2:**
\`\`\`
Input: root = []
Output: []
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Tree', 'Depth-First Search', 'Breadth-First Search', 'Design', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [0, 10^4].\\n- -1000 <= Node.val <= 1000`,
    testCases: [
      { input: '1 2 3 null null 4 5', output: '1 2 3 null null 4 5', isHidden: false },
      { input: '', output: '', isHidden: false },
      { input: '1', output: '1', isHidden: true },
      { input: '1 2 null 3', output: '1 2 null 3', isHidden: true },
    ],
  },
  {
    title: 'Recover Binary Search Tree',
    description: `You are given the \`root\` of a binary search tree (BST), where the values of **exactly** two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

**Example 1:**
\`\`\`
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
\`\`\`

**Example 2:**
\`\`\`
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3. Swapping 2 and 3 makes the BST valid.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [2, 1000].\\n- -2^31 <= Node.val <= 2^31 - 1`,
    testCases: [
      { input: '1 3 null null 2', output: '3 1 null null 2', isHidden: false },
      { input: '3 1 4 null null 2', output: '2 1 4 null null 3', isHidden: false },
      { input: '2 3 1', output: '2 1 3', isHidden: true },
    ],
  },
  {
    title: 'Lowest Common Ancestor of a Binary Tree',
    description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA: "The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself)."

**Example 1:**
\`\`\`
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
\`\`\`

**Example 2:**
\`\`\`
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [2, 10^5].\\n- -10^9 <= Node.val <= 10^9\\n- All Node.val are unique.\\n- p != q\\n- p and q will exist in the tree.`,
    testCases: [
      { input: '3 5 1 6 2 0 8 null null 7 4\n5\n1', output: '3', isHidden: false },
      { input: '3 5 1 6 2 0 8 null null 7 4\n5\n4', output: '5', isHidden: false },
      { input: '1 2\n1\n2', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Vertical Order Traversal of a Binary Tree',
    description: `Given the \`root\` of a binary tree, calculate the vertical order traversal of the binary tree.

For each node at position \`(row, col)\`, its left and right children will be at positions \`(row + 1, col - 1)\` and \`(row + 1, col + 1)\` respectively. The root of the tree is at \`(0, 0)\`.

The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

**Example 1:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
\`\`\`

**Example 2:**
\`\`\`
Input: root = [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'Tree', 'Depth-First Search', 'Breadth-First Search', 'Sorting', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [1, 1000].\\n- 0 <= Node.val <= 1000`,
    testCases: [
      { input: '3 9 20 null null 15 7', output: '9\n3 15\n20\n7', isHidden: false },
      { input: '1 2 3 4 5 6 7', output: '4\n2\n1 5 6\n3\n7', isHidden: false },
      { input: '1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Binary Tree Cameras',
    description: `You are given the \`root\` of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children.

Return the minimum number of cameras needed to monitor all nodes of the tree.

**Example 1:**
\`\`\`
Input: root = [0,0,null,0,0]
Output: 1
Explanation: One camera is enough to monitor all nodes if placed on the middle node.
\`\`\`

**Example 2:**
\`\`\`
Input: root = [0,0,null,0,null,0,null,null,0]
Output: 2
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming', 'Tree', 'Depth-First Search', 'Greedy', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [1, 1000].\\n- Node.val == 0`,
    testCases: [
      { input: '0 0 null 0 0', output: '1', isHidden: false },
      { input: '0 0 null 0 null 0 null null 0', output: '2', isHidden: false },
      { input: '0', output: '1', isHidden: true },
      { input: '0 0 0', output: '1', isHidden: true },
    ],
  },
  {
    title: 'House Robber III',
    description: `The thief has found himself a new place for his thievery again. There is only one entrance to this area, called \`root\`.

Besides the \`root\`, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.

Given the \`root\` of the binary tree, return the maximum amount of money the thief can rob **without alerting the police**.

**Example 1:**
\`\`\`
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money = 3 + 3 + 1 = 7.
\`\`\`

**Example 2:**
\`\`\`
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money = 4 + 5 = 9.
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming', 'Tree', 'Depth-First Search', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [1, 10^4].\\n- 0 <= Node.val <= 10^4`,
    testCases: [
      { input: '3 2 3 null 3 null 1', output: '7', isHidden: false },
      { input: '3 4 5 1 3 null 1', output: '9', isHidden: false },
      { input: '4 1 null 2 null 3', output: '7', isHidden: true },
    ],
  },
  {
    title: 'Construct Binary Tree from Preorder and Postorder Traversal',
    description: `Given two integer arrays, \`preorder\` and \`postorder\` where \`preorder\` is the preorder traversal of a binary tree of **distinct** values and \`postorder\` is the postorder traversal of the same tree, reconstruct and return the binary tree.

If there exist multiple answers, you can return **any** of them.

**Example 1:**
\`\`\`
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
\`\`\`

**Example 2:**
\`\`\`
Input: preorder = [1], postorder = [1]
Output: [1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Tree', 'Binary Tree'],
    constraints: `- 1 <= preorder.length <= 30\\n- 1 <= preorder[i] <= preorder.length\\n- All values of preorder are unique.\\n- postorder.length == preorder.length\\n- All values of postorder are unique.`,
    testCases: [
      { input: '7\n1 2 4 5 3 6 7\n4 5 2 6 7 3 1', output: '1 2 3 4 5 6 7', isHidden: false },
      { input: '1\n1\n1', output: '1', isHidden: false },
      { input: '3\n1 2 3\n3 2 1', output: '1 2 null 3', isHidden: true },
    ],
  },
  {
    title: 'Maximum Width of Binary Tree',
    description: `Given the \`root\` of a binary tree, return the **maximum width** of the given tree.

The **maximum width** of a tree is the maximum **width** among all levels.

The **width** of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

**Example 1:**
\`\`\`
Input: root = [1,3,2,5,3,null,9]
Output: 4
Explanation: The maximum width exists in the third level with length 4 (5,3,null,9).
\`\`\`

**Example 2:**
\`\`\`
Input: root = [1,3,2,5,null,null,9,6,null,7]
Output: 7
\`\`\``,
    difficulty: 'HARD',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    constraints: `- The number of nodes in the tree is in the range [1, 3000].\\n- -100 <= Node.val <= 100`,
    testCases: [
      { input: '1 3 2 5 3 null 9', output: '4', isHidden: false },
      { input: '1 3 2 5 null null 9 6 null 7', output: '7', isHidden: false },
      { input: '1', output: '1', isHidden: true },
      { input: '1 2 3', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Path Sum III',
    description: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return the number of paths where the sum of the values along the path equals \`targetSum\`.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

**Example 1:**
\`\`\`
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown: 5->3, 5->2->1, -3->11
\`\`\`

**Example 2:**
\`\`\`
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3
\`\`\``,
    difficulty: 'HARD',
    tags: ['Tree', 'Depth-First Search', 'Binary Tree', 'Prefix Sum'],
    constraints: `- The number of nodes in the tree is in the range [0, 1000].\\n- -10^9 <= Node.val <= 10^9\\n- -1000 <= targetSum <= 1000`,
    testCases: [
      { input: '10 5 -3 3 2 null 11 3 -2 null 1\n8', output: '3', isHidden: false },
      { input: '5 4 8 11 null 13 4 7 2 null null 5 1\n22', output: '3', isHidden: false },
      { input: '1\n1', output: '1', isHidden: true },
      { input: '1 null 2 null 3\n3', output: '2', isHidden: true },
    ],
  },
];
