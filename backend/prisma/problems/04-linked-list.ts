import { SeedProblem } from './types';

export const linkedList: SeedProblem[] = [
  {
    title: 'Reverse Nodes in k-Group',
    description: `Given the \`head\` of a linked list, reverse the nodes of the list \`k\` at a time, and return the modified list.

\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

**Example 1:**
\`\`\`
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List', 'Recursion'],
    constraints: `- The number of nodes in the list is n.\\n- 1 <= k <= n <= 5000\\n- 0 <= Node.val <= 1000`,
    testCases: [
      { input: '5\n1 2 3 4 5\n2', output: '2 1 4 3 5', isHidden: false },
      { input: '5\n1 2 3 4 5\n3', output: '3 2 1 4 5', isHidden: false },
      { input: '3\n1 2 3\n1', output: '1 2 3', isHidden: true },
      { input: '4\n1 2 3 4\n4', output: '4 3 2 1', isHidden: true },
    ],
  },
  {
    title: 'Merge k Sorted Lists',
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Example 1:**
\`\`\`
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
\`\`\`

**Example 2:**
\`\`\`
Input: lists = []
Output: []
\`\`\`

**Example 3:**
\`\`\`
Input: lists = [[]]
Output: []
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List', 'Divide and Conquer', 'Heap', 'Merge Sort'],
    constraints: `- k == lists.length\\n- 0 <= k <= 10^4\\n- 0 <= lists[i].length <= 500\\n- -10^4 <= lists[i][j] <= 10^4\\n- lists[i] is sorted in ascending order.\\n- The sum of lists[i].length will not exceed 10^4.`,
    testCases: [
      { input: '3\n3\n1 4 5\n3\n1 3 4\n2\n2 6', output: '1 1 2 3 4 4 5 6', isHidden: false },
      { input: '0', output: '', isHidden: false },
      { input: '1\n0', output: '', isHidden: true },
      { input: '2\n1\n1\n1\n2', output: '1 2', isHidden: true },
    ],
  },
  {
    title: 'Copy List with Random Pointer',
    description: `A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or \`null\`.

Construct a **deep copy** of the list. Return the head of the copied linked list.

Each node is represented as a pair of \`[val, random_index]\` where:
- \`val\`: an integer representing \`Node.val\`
- \`random_index\`: the index of the node (range from 0 to n-1) the random pointer points to, or \`null\` if it does not point to any node.

**Example 1:**
\`\`\`
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'Linked List'],
    constraints: `- 0 <= n <= 1000\\n- -10^4 <= Node.val <= 10^4\\n- Node.random is null or points to some node in the linked list.`,
    testCases: [
      { input: '5\n7 null\n13 0\n11 4\n10 2\n1 0', output: '7 null\n13 0\n11 4\n10 2\n1 0', isHidden: false },
      { input: '2\n1 1\n2 1', output: '1 1\n2 1', isHidden: false },
      { input: '0', output: '', isHidden: true },
    ],
  },
  {
    title: 'Linked List Cycle II',
    description: `Given the \`head\` of a linked list, return the node where the cycle begins. If there is no cycle, return \`null\`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer.

Do not modify the linked list.

**Example 1:**
\`\`\`
Input: head = [3,2,0,-4], pos = 1
Output: Node at index 1
Explanation: There is a cycle, where the tail connects to the 1st node (0-indexed).
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1,2], pos = 0
Output: Node at index 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    constraints: `- The number of nodes is in the range [0, 10^4].\\n- -10^5 <= Node.val <= 10^5\\n- pos is -1 or a valid index in the linked list.`,
    testCases: [
      { input: '4\n3 2 0 -4\n1', output: '1', isHidden: false },
      { input: '2\n1 2\n0', output: '0', isHidden: false },
      { input: '1\n1\n-1', output: '-1', isHidden: true },
      { input: '3\n1 2 3\n-1', output: '-1', isHidden: true },
    ],
  },
  {
    title: 'Sort List',
    description: `Given the \`head\` of a linked list, return the list after sorting it in **ascending order**.

Can you sort the linked list in \`O(n log n)\` time and \`O(1)\` memory (i.e. constant space)?

**Example 1:**
\`\`\`
Input: head = [4,2,1,3]
Output: [1,2,3,4]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List', 'Two Pointers', 'Divide and Conquer', 'Sorting', 'Merge Sort'],
    constraints: `- The number of nodes in the list is in the range [0, 5 * 10^4].\\n- -10^5 <= Node.val <= 10^5`,
    testCases: [
      { input: '4\n4 2 1 3', output: '1 2 3 4', isHidden: false },
      { input: '5\n-1 5 3 4 0', output: '-1 0 3 4 5', isHidden: false },
      { input: '0', output: '', isHidden: true },
      { input: '1\n1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Flatten a Multilevel Doubly Linked List',
    description: `You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional **child pointer**. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure.

**Flatten** the list so that all the nodes appear in a single-level, doubly linked list. You are given the \`head\` of the first level of the list.

**Example 1:**
\`\`\`
Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1,2,null,3]
Output: [1,3,2]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List', 'Depth-First Search', 'Doubly-Linked List'],
    constraints: `- The number of nodes will not exceed 1000.\\n- 1 <= Node.val <= 10^5`,
    testCases: [
      { input: '1 2 3 4 5 6 null null null 7 8 9 10 null null 11 12', output: '1 2 3 7 8 11 12 9 10 4 5 6', isHidden: false },
      { input: '1 2 null 3', output: '1 3 2', isHidden: false },
      { input: '1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Rotate List',
    description: `Given the \`head\` of a linked list, rotate the list to the right by \`k\` places.

**Example 1:**
\`\`\`
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [0,1,2], k = 4
Output: [2,0,1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List', 'Two Pointers'],
    constraints: `- The number of nodes in the list is in the range [0, 500].\\n- -100 <= Node.val <= 100\\n- 0 <= k <= 2 * 10^9`,
    testCases: [
      { input: '5\n1 2 3 4 5\n2', output: '4 5 1 2 3', isHidden: false },
      { input: '3\n0 1 2\n4', output: '2 0 1', isHidden: false },
      { input: '1\n1\n0', output: '1', isHidden: true },
      { input: '2\n1 2\n2', output: '1 2', isHidden: true },
    ],
  },
  {
    title: 'Reverse Linked List II',
    description: `Given the \`head\` of a singly linked list and two integers \`left\` and \`right\` where \`left <= right\`, reverse the nodes of the list from position \`left\` to position \`right\`, and return the reversed list.

**Example 1:**
\`\`\`
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [5], left = 1, right = 1
Output: [5]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List'],
    constraints: `- The number of nodes in the list is n.\\n- 1 <= n <= 500\\n- -500 <= Node.val <= 500\\n- 1 <= left <= right <= n`,
    testCases: [
      { input: '5\n1 2 3 4 5\n2\n4', output: '1 4 3 2 5', isHidden: false },
      { input: '1\n5\n1\n1', output: '5', isHidden: false },
      { input: '3\n1 2 3\n1\n3', output: '3 2 1', isHidden: true },
    ],
  },
  {
    title: 'Intersection of Two Linked Lists',
    description: `Given the heads of two singly linked-lists \`headA\` and \`headB\`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return \`null\`.

The linked lists must retain their original structure after the function returns.

**Example 1:**
\`\`\`
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Node with value 8
\`\`\`

**Example 2:**
\`\`\`
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: null (No intersection)
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    constraints: `- The number of nodes of listA is m.\\n- The number of nodes of listB is n.\\n- 1 <= m, n <= 3 * 10^4\\n- 1 <= Node.val <= 10^5`,
    testCases: [
      { input: '8\n5\n4 1 8 4 5\n6\n5 6 1 8 4 5\n2\n3', output: '8', isHidden: false },
      { input: '0\n3\n2 6 4\n2\n1 5\n3\n2', output: 'null', isHidden: false },
      { input: '2\n3\n1 9 1 2 4\n1\n3 2 4\n3\n1', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Remove Nth Node From End of List',
    description: `Given the \`head\` of a linked list, remove the \`n\`th node from the end of the list and return its head.

**Example 1:**
\`\`\`
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1], n = 1
Output: []
\`\`\`

**Example 3:**
\`\`\`
Input: head = [1,2], n = 1
Output: [1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Linked List', 'Two Pointers'],
    constraints: `- The number of nodes in the list is sz.\\n- 1 <= sz <= 30\\n- 0 <= Node.val <= 100\\n- 1 <= n <= sz`,
    testCases: [
      { input: '5\n1 2 3 4 5\n2', output: '1 2 3 5', isHidden: false },
      { input: '1\n1\n1', output: '', isHidden: false },
      { input: '2\n1 2\n1', output: '1', isHidden: true },
      { input: '2\n1 2\n2', output: '2', isHidden: true },
    ],
  },
];
