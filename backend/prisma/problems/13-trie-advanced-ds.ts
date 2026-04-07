import { SeedProblem } from './types';

export const trieAdvancedDS: SeedProblem[] = [
  {
    title: 'Implement Trie (Prefix Tree)',
    description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie, and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string that has the prefix \`prefix\`, and \`false\` otherwise.

**Example 1:**
\`\`\`
Input: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output: [null, null, true, false, true, null, true]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'String', 'Design', 'Trie'],
    constraints: `- 1 <= word.length, prefix.length <= 2000\\n- word and prefix consist only of lowercase English letters.\\n- At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.`,
    testCases: [
      { input: '7\nTrie\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app\nsearch app', output: 'null\nnull\ntrue\nfalse\ntrue\nnull\ntrue', isHidden: false },
    ],
  },
  {
    title: 'Word Search II (Trie + DFS)',
    description: `Given an \`m x n\` board of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells using Trie + DFS approach.

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
    ],
  },
  {
    title: 'Replace Words',
    description: `In English, we have a concept called **root**, which can be followed by some other word to form another longer word — let's call this word **derivative**. For example, when the root \`"help"\` is followed by \`"ful"\`, we can form a derivative \`"helpful"\`.

Given a \`dictionary\` consisting of many roots and a \`sentence\` consisting of words separated by spaces, replace all the derivatives in the sentence with the root forming it. If a derivative can be replaced by more than one root, replace it with the root that has the **shortest length**.

Return the \`sentence\` after the replacement.

**Example 1:**
\`\`\`
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
\`\`\`

**Example 2:**
\`\`\`
Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfabd"
Output: "a]{'format'}  Please output the shortest matching root instead: "a a b c"
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'String', 'Trie'],
    constraints: `- 1 <= dictionary.length <= 1000\\n- 1 <= dictionary[i].length <= 100\\n- dictionary[i] consists of only lowercase letters.\\n- 1 <= sentence.length <= 10^6\\n- sentence consists of only lowercase letters and spaces.`,
    testCases: [
      { input: '3\ncat bat rat\nthe cattle was rattled by the battery', output: 'the cat was rat by the bat', isHidden: false },
      { input: '3\na b c\naadsfasf absbs bbab cadsfabd', output: 'a a b c', isHidden: false },
      { input: '1\nxyz\nabc def', output: 'abc def', isHidden: true },
    ],
  },
  {
    title: 'Maximum XOR of Two Numbers in Array (Trie)',
    description: `Given an integer array \`nums\`, return the maximum result of \`nums[i] XOR nums[j]\`, where \`0 <= i <= j < n\`.

Use a Trie-based approach for optimal performance.

**Example 1:**
\`\`\`
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'Bit Manipulation', 'Trie'],
    constraints: `- 1 <= nums.length <= 2 * 10^5\\n- 0 <= nums[i] <= 2^31 - 1`,
    testCases: [
      { input: '6\n3 10 5 25 2 8', output: '28', isHidden: false },
      { input: '12\n14 70 53 83 49 91 36 80 92 51 66 70', output: '127', isHidden: false },
      { input: '2\n1 2', output: '3', isHidden: true },
    ],
  },
  {
    title: 'Design Add and Search Words Data Structure',
    description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
- \`WordDictionary()\` Initializes the object.
- \`void addWord(word)\` Adds \`word\` to the data structure.
- \`bool search(word)\` Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.

**Example:**
\`\`\`
Input: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output: [null,null,null,null,false,true,true,true]
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Depth-First Search', 'Design', 'Trie'],
    constraints: `- 1 <= word.length <= 25\\n- word in addWord consists of lowercase English letters.\\n- word in search consist of '.' or lowercase English letters.\\n- There will be at most 3 dots in word for search queries.\\n- At most 10^4 calls to addWord and search.`,
    testCases: [
      { input: '8\nWordDictionary\naddWord bad\naddWord dad\naddWord mad\nsearch pad\nsearch bad\nsearch .ad\nsearch b..', output: 'null\nnull\nnull\nnull\nfalse\ntrue\ntrue\ntrue', isHidden: false },
    ],
  },
  {
    title: 'Longest Word in Dictionary',
    description: `Given an array of strings \`words\` representing an English Dictionary, return the longest word in \`words\` that can be built one character at a time by other words in \`words\`.

If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.

**Example 1:**
\`\`\`
Input: words = ["w","wo","wor","worl","world"]
Output: "world"
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["a","banana","app","appl","ap","apply","apple"]
Output: "apple"
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'String', 'Trie', 'Sorting'],
    constraints: `- 1 <= words.length <= 1000\\n- 1 <= words[i].length <= 30\\n- words[i] consists of lowercase English letters.`,
    testCases: [
      { input: '5\nw wo wor worl world', output: 'world', isHidden: false },
      { input: '7\na banana app appl ap apply apple', output: 'apple', isHidden: false },
      { input: '1\nab', output: '', isHidden: true },
    ],
  },
  {
    title: 'Map Sum Pairs',
    description: `Design a map that allows you to do the following:
- Maps a string key to a given value.
- Returns the sum of the values that have a key with a prefix equal to a given string.

Implement the \`MapSum\` class:
- \`MapSum()\` Initializes the \`MapSum\` object.
- \`void insert(String key, int val)\` Inserts the \`key-val\` pair into the map. If the \`key\` already existed, the original \`key-value\` pair will be overridden to the new one.
- \`int sum(String prefix)\` Returns the sum of all the pairs' value whose \`key\` starts with the \`prefix\`.

**Example 1:**
\`\`\`
Input: ["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output: [null, null, 3, null, 5]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'String', 'Design', 'Trie'],
    constraints: `- 1 <= key.length, prefix.length <= 50\\n- key and prefix consist of only lowercase English letters.\\n- 1 <= val <= 1000\\n- At most 50 calls to insert and sum.`,
    testCases: [
      { input: '5\nMapSum\ninsert apple 3\nsum ap\ninsert app 2\nsum ap', output: 'null\nnull\n3\nnull\n5', isHidden: false },
      { input: '3\nMapSum\ninsert a 1\nsum a', output: 'null\nnull\n1', isHidden: true },
    ],
  },
  {
    title: 'Design Search Autocomplete System',
    description: `Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character \`'#'\`).

You are given a string array \`sentences\` and an integer array \`times\` both of length \`n\` where \`sentences[i]\` is a previously typed sentence and \`times[i]\` is the corresponding number of times the sentence was typed. For each input character except \`'#'\`, return the **top 3** historical hot sentences that have the same prefix as the part of the sentence already typed.

**Example:**
\`\`\`
Input: sentences = ["i love you", "island", "iroman", "i love leetcode"], times = [5, 3, 2, 2]
Input stream: ['i', ' ', 'a', '#']
Output: [["i love you","island","i love leetcode"],["i love you","i love leetcode"],[],[]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Design', 'Trie', 'Data Stream', 'Sorting', 'Heap'],
    constraints: `- n == sentences.length\\n- n == times.length\\n- 1 <= n <= 100\\n- 1 <= sentences[i].length <= 100\\n- 1 <= times[i] <= 50\\n- Each input character is lowercase English letter, space, or '#'.`,
    testCases: [
      { input: '4\ni love you\nisland\niroman\ni love leetcode\n5 3 2 2\n4\ni   a #', output: 'i love you,island,i love leetcode\ni love you,i love leetcode\n\n', isHidden: false },
    ],
  },
  {
    title: 'Word Squares',
    description: `Given an array of **unique** strings \`words\`, return all the **word squares** you can build from \`words\`. A sequence of strings forms a valid **word square** if the \`k\`th row and column read the exact same string, where \`0 <= k < max(numRows, numColumns)\`.

**Example 1:**
\`\`\`
Input: words = ["area","lead","wall","lady","ball"]
Output: [["wall","area","lead","lady"],["ball","area","lead","lady"]]
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["abat","baba","atan","atal"]
Output: [["baba","abat","baba","atan"],["baba","abat","baba","atal"]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'String', 'Backtracking', 'Trie'],
    constraints: `- 1 <= words.length <= 1000\\n- 1 <= words[i].length <= 4\\n- All words[i] have the same length.\\n- words[i] consists of only lowercase English letters.\\n- All words[i] are unique.`,
    testCases: [
      { input: '5\narea lead wall lady ball', output: '2', isHidden: false },
      { input: '4\nabat baba atan atal', output: '2', isHidden: false },
    ],
  },
  {
    title: 'Concatenated Words',
    description: `Given an array of strings \`words\` (**without duplicates**), return all the **concatenated words** in the given list of \`words\`.

A **concatenated word** is defined as a string that is comprised entirely of at least two shorter words (not necessarily distinct) in the given array.

**Example 1:**
\`\`\`
Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["cat","dog","catdog"]
Output: ["catdog"]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'String', 'Dynamic Programming', 'Depth-First Search', 'Trie'],
    constraints: `- 1 <= words.length <= 10^4\\n- 1 <= words[i].length <= 30\\n- words[i] consists of only lowercase English letters.\\n- All the strings of words are unique.\\n- 1 <= sum(words[i].length) <= 10^5`,
    testCases: [
      { input: '8\ncat cats catsdogcats dog dogcatsdog hippopotamuses rat ratcatdogcat', output: 'catsdogcats dogcatsdog ratcatdogcat', isHidden: false },
      { input: '3\ncat dog catdog', output: 'catdog', isHidden: false },
      { input: '2\na b', output: '', isHidden: true },
    ],
  },
];
