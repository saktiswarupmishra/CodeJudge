/**
 * Central index — re-exports all DSA + SQL problems as a single array.
 */
import { SeedProblem } from './types';
import { arraysTwoPointers } from './01-arrays-two-pointers';
import { binaryTreesBST } from './02-binary-trees-bst';
import { dynamicProgramming } from './03-dynamic-programming';
import { linkedList } from './04-linked-list';
import { backtrackingRecursion } from './05-backtracking-recursion';
import { graphAlgorithms } from './06-graph-algorithms';
import { stackMonotonicStack } from './07-stack-monotonic-stack';
import { binarySearch } from './08-binary-search';
import { bitManipulation } from './09-bit-manipulation';
import { strings } from './10-strings';
import { heapPriorityQueue } from './11-heap-priority-queue';
import { greedy } from './12-greedy';
import { trieAdvancedDS } from './13-trie-advanced-ds';
import { segmentTreeFenwick } from './14-segment-tree-fenwick';
import { sqlProblems } from './15-sql-problems';

export const allProblems: SeedProblem[] = [
  ...arraysTwoPointers,
  ...binaryTreesBST,
  ...dynamicProgramming,
  ...linkedList,
  ...backtrackingRecursion,
  ...graphAlgorithms,
  ...stackMonotonicStack,
  ...binarySearch,
  ...bitManipulation,
  ...strings,
  ...heapPriorityQueue,
  ...greedy,
  ...trieAdvancedDS,
  ...segmentTreeFenwick,
  ...sqlProblems,
];

export type { SeedProblem };
