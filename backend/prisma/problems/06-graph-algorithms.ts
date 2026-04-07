import { SeedProblem } from './types';

export const graphAlgorithms: SeedProblem[] = [
  {
    title: 'Word Ladder II',
    description: `A **transformation sequence** from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence of words \`beginWord -> s1 -> s2 -> ... -> sk\` such that:
- Every adjacent pair of words differs by a single letter.
- Every \`si\` for \`1 <= i <= k\` is in \`wordList\`. Note that \`beginWord\` does not need to be in \`wordList\`.
- \`sk == endWord\`

Given two words, \`beginWord\` and \`endWord\`, and a dictionary \`wordList\`, return all the **shortest transformation sequences** from \`beginWord\` to \`endWord\`, or an empty list if no such sequence exists.

**Example 1:**
\`\`\`
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
\`\`\`

**Example 2:**
\`\`\`
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'String', 'Backtracking', 'Breadth-First Search'],
    constraints: `- 1 <= beginWord.length <= 5\\n- endWord.length == beginWord.length\\n- 1 <= wordList.length <= 500\\n- wordList[i].length == beginWord.length\\n- All words consist of lowercase English letters.\\n- All words in wordList are unique.`,
    testCases: [
      { input: 'hit\ncog\n6\nhot dot dog lot log cog', output: '2', isHidden: false },
      { input: 'hit\ncog\n5\nhot dot dog lot log', output: '0', isHidden: false },
      { input: 'a\nc\n2\na b c', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Alien Dictionary',
    description: `There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings \`words\` from the alien language's dictionary. The strings in \`words\` are **sorted lexicographically** by the rules of this new language.

Derive the order of letters in this language. If the order is invalid, return \`""\`. If there are multiple valid orders, return **any** of them.

**Example 1:**
\`\`\`
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["z","x"]
Output: "zx"
\`\`\`

**Example 3:**
\`\`\`
Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return "".
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'String', 'Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    constraints: `- 1 <= words.length <= 100\\n- 1 <= words[i].length <= 100\\n- words[i] consists of only lowercase English letters.`,
    testCases: [
      { input: '5\nwrt wrf er ett rftt', output: 'wertf', isHidden: false },
      { input: '2\nz x', output: 'zx', isHidden: false },
      { input: '2\nz x z', output: '', isHidden: true },
    ],
  },
  {
    title: 'Course Schedule III',
    description: `There are \`n\` different online courses numbered from \`1\` to \`n\`. You are given an array \`courses\` where \`courses[i] = [duration_i, lastDay_i]\` indicate that the \`i\`th course should be taken **continuously** for \`duration_i\` days and must be finished before or on \`lastDay_i\`.

You will start on the 1st day. Return the maximum number of courses that you can take.

**Example 1:**
\`\`\`
Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: courses = [[1,2]]
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: courses = [[3,2],[4,3]]
Output: 0
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Greedy', 'Sorting', 'Heap'],
    constraints: `- 1 <= courses.length <= 10^4\\n- 1 <= duration_i, lastDay_i <= 10^4`,
    testCases: [
      { input: '4\n100 200\n200 1300\n1000 1250\n2000 3200', output: '3', isHidden: false },
      { input: '1\n1 2', output: '1', isHidden: false },
      { input: '2\n3 2\n4 3', output: '0', isHidden: true },
      { input: '3\n5 5\n4 6\n2 6', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Redundant Connection II',
    description: `In this problem, a rooted tree is a **directed** graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.

The given input is a directed graph that started as a rooted tree with \`n\` nodes (with distinct values from \`1\` to \`n\`), with one additional directed edge added. The added edge has two different vertices chosen from \`1\` to \`n\`, and was not an edge that already existed.

Return an edge that can be removed so that the resulting graph is a rooted tree of \`n\` nodes.

**Example 1:**
\`\`\`
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
\`\`\`

**Example 2:**
\`\`\`
Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
Output: [4,1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    constraints: `- n == edges.length\\n- 3 <= n <= 1000\\n- edges[i].length == 2\\n- 1 <= u_i, v_i <= n\\n- u_i != v_i`,
    testCases: [
      { input: '3\n1 2\n1 3\n2 3', output: '2 3', isHidden: false },
      { input: '5\n1 2\n2 3\n3 4\n4 1\n1 5', output: '4 1', isHidden: false },
      { input: '4\n2 1\n3 1\n4 2\n1 4', output: '1 4', isHidden: true },
    ],
  },
  {
    title: 'Critical Connections in a Network',
    description: `There are \`n\` servers numbered from \`0\` to \`n - 1\` connected by undirected server-to-server \`connections\` forming a network where \`connections[i] = [a_i, b_i]\` represents a connection between servers \`a_i\` and \`b_i\`. Any server can reach other servers directly or indirectly through the network.

A **critical connection** is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

**Example 1:**
\`\`\`
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
\`\`\`

**Example 2:**
\`\`\`
Input: n = 2, connections = [[0,1]]
Output: [[0,1]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Depth-First Search', 'Graph', 'Biconnected Component'],
    constraints: `- 2 <= n <= 10^5\\n- n - 1 <= connections.length <= 10^5\\n- 0 <= a_i, b_i <= n - 1\\n- a_i != b_i\\n- There are no repeated connections.`,
    testCases: [
      { input: '4\n4\n0 1\n1 2\n2 0\n1 3', output: '1 3', isHidden: false },
      { input: '2\n1\n0 1', output: '0 1', isHidden: false },
      { input: '5\n5\n0 1\n1 2\n2 3\n3 4\n4 2', output: '0 1\n1 2', isHidden: true },
    ],
  },
  {
    title: 'Minimum Cost to Connect All Points',
    description: `You are given an array \`points\` representing integer coordinates of some points on a 2D-plane, where \`points[i] = [x_i, y_i]\`.

The cost of connecting two points \`[x_i, y_i]\` and \`[x_j, y_j]\` is the **Manhattan distance** between them: \`|x_i - x_j| + |y_i - y_j|\`.

Return the minimum cost to make all points connected.

**Example 1:**
\`\`\`
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
\`\`\`

**Example 2:**
\`\`\`
Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Union Find', 'Graph', 'Minimum Spanning Tree'],
    constraints: `- 1 <= points.length <= 1000\\n- -10^6 <= x_i, y_i <= 10^6\\n- All pairs (x_i, y_i) are distinct.`,
    testCases: [
      { input: '5\n0 0\n2 2\n3 10\n5 2\n7 0', output: '20', isHidden: false },
      { input: '3\n3 12\n-2 5\n-4 1', output: '18', isHidden: false },
      { input: '1\n0 0', output: '0', isHidden: true },
      { input: '2\n0 0\n1 1', output: '2', isHidden: true },
    ],
  },
  {
    title: 'Network Delay Time',
    description: `You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (u_i, v_i, w_i)\`, where \`u_i\` is the source node, \`v_i\` is the target node, and \`w_i\` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node \`k\`. Return the **minimum** time it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.

**Example 1:**
\`\`\`
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Heap', 'Shortest Path'],
    constraints: `- 1 <= k <= n <= 100\\n- 1 <= times.length <= 6000\\n- times[i].length == 3\\n- 1 <= u_i, v_i <= n\\n- u_i != v_i\\n- 0 <= w_i <= 100`,
    testCases: [
      { input: '3\n2 1 1\n2 3 1\n3 4 1\n4\n2', output: '2', isHidden: false },
      { input: '1\n1 2 1\n2\n2', output: '-1', isHidden: false },
      { input: '1\n1 2 1\n2\n1', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Shortest Path Visiting All Nodes',
    description: `You have an undirected, connected graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an array \`graph\` where \`graph[i]\` is a list of all the nodes connected with node \`i\` by an edge.

Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.

**Example 1:**
\`\`\`
Input: graph = [[1,2,3],[0],[0],[0]]
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
Output: 4
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming', 'Bit Manipulation', 'Breadth-First Search', 'Graph', 'Bitmask'],
    constraints: `- n == graph.length\\n- 1 <= n <= 12\\n- 0 <= graph[i].length < n\\n- graph[i] does not contain i.\\n- The input graph is connected.`,
    testCases: [
      { input: '4\n1 2 3\n0\n0\n0', output: '4', isHidden: false },
      { input: '5\n1\n0 2 4\n1 3 4\n2\n1 2', output: '4', isHidden: false },
      { input: '1\n', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Reconstruct Itinerary',
    description: `You are given a list of airline \`tickets\` where \`tickets[i] = [from_i, to_i]\` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from \`"JFK"\`, thus, the itinerary must begin with \`"JFK"\`. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

**Example 1:**
\`\`\`
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
\`\`\`

**Example 2:**
\`\`\`
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Depth-First Search', 'Graph', 'Eulerian Circuit'],
    constraints: `- 1 <= tickets.length <= 300\\n- tickets[i].length == 2\\n- from_i.length == 3\\n- to_i.length == 3\\n- from_i and to_i consist of uppercase English letters.\\n- from_i != to_i`,
    testCases: [
      { input: '4\nMUC LHR\nJFK MUC\nSFO SJC\nLHR SFO', output: 'JFK MUC LHR SFO SJC', isHidden: false },
      { input: '5\nJFK SFO\nJFK ATL\nSFO ATL\nATL JFK\nATL SFO', output: 'JFK ATL JFK SFO ATL SFO', isHidden: false },
      { input: '1\nJFK ABC', output: 'JFK ABC', isHidden: true },
    ],
  },
  {
    title: 'Clone Graph',
    description: `Given a reference of a node in a **connected** undirected graph.

Return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.

**Example 1:**
\`\`\`
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes. Node 1's neighbors are 2 and 4. Node 2's neighbors are 1 and 3. Node 3's neighbors are 2 and 4. Node 4's neighbors are 1 and 3.
\`\`\`

**Example 2:**
\`\`\`
Input: adjList = [[]]
Output: [[]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'Depth-First Search', 'Breadth-First Search', 'Graph'],
    constraints: `- The number of nodes in the graph is in the range [0, 100].\\n- 1 <= Node.val <= 100\\n- Node.val is unique for each node.\\n- There are no self-loops or repeated edges.`,
    testCases: [
      { input: '4\n2 4\n1 3\n2 4\n1 3', output: '2 4\n1 3\n2 4\n1 3', isHidden: false },
      { input: '1\n', output: '', isHidden: false },
      { input: '2\n2\n1', output: '2\n1', isHidden: true },
    ],
  },
  {
    title: 'Find Eventual Safe States',
    description: `There is a directed graph of \`n\` nodes with each node labeled from \`0\` to \`n - 1\`. The graph is represented by a **0-indexed** 2D integer array \`graph\` where \`graph[i]\` is an integer array of nodes adjacent to node \`i\`, meaning there is an edge from node \`i\` to each node in \`graph[i]\`.

A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

**Example 1:**
\`\`\`
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
\`\`\`

**Example 2:**
\`\`\`
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    constraints: `- n == graph.length\\n- 1 <= n <= 10^4\\n- 0 <= graph[i].length <= n\\n- 0 <= graph[i][j] <= n - 1\\n- graph[i] is sorted in a strictly increasing order.`,
    testCases: [
      { input: '7\n1 2\n2 3\n5\n0\n5\n\n', output: '2 4 5 6', isHidden: false },
      { input: '5\n1 2 3 4\n1 2\n3 4\n0 4\n', output: '4', isHidden: false },
      { input: '3\n\n\n', output: '0 1 2', isHidden: true },
    ],
  },
  {
    title: 'Cheapest Flights Within K Stops',
    description: `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [from_i, to_i, price_i]\` indicates that there is a flight from city \`from_i\` to city \`to_i\` with cost \`price_i\`.

You are also given three integers \`src\`, \`dst\`, and \`k\`, return the **cheapest price** from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.

**Example 1:**
\`\`\`
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
\`\`\`

**Example 2:**
\`\`\`
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming', 'Depth-First Search', 'Breadth-First Search', 'Graph', 'Heap', 'Shortest Path'],
    constraints: `- 1 <= n <= 100\\n- 0 <= flights.length <= n * (n - 1) / 2\\n- flights[i].length == 3\\n- 0 <= from_i, to_i < n\\n- from_i != to_i\\n- 1 <= price_i <= 10^4\\n- 0 <= src, dst, k < n\\n- src != dst`,
    testCases: [
      { input: '4\n5\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200\n0\n3\n1', output: '700', isHidden: false },
      { input: '3\n3\n0 1 100\n1 2 100\n0 2 500\n0\n2\n1', output: '200', isHidden: false },
      { input: '3\n3\n0 1 100\n1 2 100\n0 2 500\n0\n2\n0', output: '500', isHidden: true },
    ],
  },
  {
    title: 'Number of Restricted Paths From First to Last Node',
    description: `There is an undirected weighted connected graph. You are given a positive integer \`n\` which denotes that the graph has \`n\` nodes labeled from \`1\` to \`n\`, and an array \`edges\` where each \`edges[i] = [u_i, v_i, weight_i]\`.

A path from node \`1\` to node \`n\` is called **restricted** if the shortest distance from node \`n\` strictly decreases with each step. Return the number of restricted paths from node \`1\` to node \`n\`. Since the answer may be large, return it modulo \`10^9 + 7\`.

**Example 1:**
\`\`\`
Input: n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,10]]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: n = 7, edges = [[1,3,1],[4,1,2],[7,3,4],[2,5,3],[5,6,1],[6,7,2],[7,5,3],[2,6,4]]
Output: 1
\`\`\``,
    difficulty: 'HARD',
    tags: ['Dynamic Programming', 'Graph', 'Topological Sort', 'Heap', 'Shortest Path'],
    constraints: `- 1 <= n <= 2 * 10^4\\n- n - 1 <= edges.length <= 4 * 10^4\\n- edges[i].length == 3\\n- 1 <= u_i, v_i <= n\\n- u_i != v_i`,
    testCases: [
      { input: '5\n7\n1 2 3\n1 3 3\n2 3 1\n1 4 2\n5 2 2\n3 5 1\n5 4 10', output: '3', isHidden: false },
      { input: '7\n8\n1 3 1\n4 1 2\n7 3 4\n2 5 3\n5 6 1\n6 7 2\n7 5 3\n2 6 4', output: '1', isHidden: false },
    ],
  },
  {
    title: 'Path with Maximum Probability',
    description: `You are given an undirected weighted graph of \`n\` nodes (0-indexed), represented by an edge list where \`edges[i] = [a, b]\` is an undirected edge connecting the nodes \`a\` and \`b\` with a probability of success of traversing that edge \`succProb[i]\`.

Given two nodes \`start\` and \`end\`, find the path with the maximum probability of success to go from \`start\` to \`end\` and return its success probability.

**Example 1:**
\`\`\`
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
\`\`\`

**Example 2:**
\`\`\`
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Graph', 'Heap', 'Shortest Path'],
    constraints: `- 2 <= n <= 10^4\\n- 0 <= start, end < n\\n- start != end\\n- 0 <= a, b < n\\n- a != b\\n- 0 <= succProb.length == edges.length <= 2 * 10^4\\n- 0 <= succProb[i] <= 1`,
    testCases: [
      { input: '3\n3\n0 1\n1 2\n0 2\n0.5 0.5 0.2\n0\n2', output: '0.25000', isHidden: false },
      { input: '3\n3\n0 1\n1 2\n0 2\n0.5 0.5 0.3\n0\n2', output: '0.30000', isHidden: false },
      { input: '3\n0\n0\n2', output: '0.00000', isHidden: true },
    ],
  },
  {
    title: 'Parallel Courses III',
    description: `You are given an integer \`n\`, which indicates that there are \`n\` courses labeled from \`1\` to \`n\`. You are also given a 2D integer array \`relations\` where \`relations[j] = [prevCourse_j, nextCourse_j]\` denotes that course \`prevCourse_j\` has to be completed before course \`nextCourse_j\` (prerequisite relationship). Furthermore, you are given a **0-indexed** integer array \`time\` where \`time[i]\` denotes how many **months** it takes to complete the \`(i+1)\`th course.

You must find the **minimum** number of months needed to complete all the courses following these rules:
- You may start taking a course at any time if the prerequisites are met.
- Any number of courses can be taken at the same time.

Return the minimum number of months needed.

**Example 1:**
\`\`\`
Input: n = 3, relations = [[1,3],[2,3]], time = [3,2,5]
Output: 8
\`\`\`

**Example 2:**
\`\`\`
Input: n = 5, relations = [[1,5],[2,5],[3,5],[3,4],[4,5]], time = [1,2,3,4,5]
Output: 12
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Dynamic Programming', 'Graph', 'Topological Sort'],
    constraints: `- 1 <= n <= 5 * 10^4\\n- 0 <= relations.length <= min(n * (n - 1) / 2, 5 * 10^4)\\n- relations[j].length == 2\\n- 1 <= prevCourse_j, nextCourse_j <= n\\n- prevCourse_j != nextCourse_j\\n- All the pairs [prevCourse_j, nextCourse_j] are unique.\\n- time.length == n\\n- 1 <= time[i] <= 10^4`,
    testCases: [
      { input: '3\n2\n1 3\n2 3\n3 2 5', output: '8', isHidden: false },
      { input: '5\n5\n1 5\n2 5\n3 5\n3 4\n4 5\n1 2 3 4 5', output: '12', isHidden: false },
      { input: '1\n0\n5', output: '5', isHidden: true },
    ],
  },
];
