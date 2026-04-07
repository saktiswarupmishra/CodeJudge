import { SeedProblem } from './types';

export const strings: SeedProblem[] = [
  {
    title: 'Longest Palindromic Substring',
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

**Example 1:**
\`\`\`
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "cbbd"
Output: "bb"
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming'],
    constraints: `- 1 <= s.length <= 1000\\n- s consist of only digits and English letters.`,
    testCases: [
      { input: 'babad', output: 'bab', isHidden: false },
      { input: 'cbbd', output: 'bb', isHidden: false },
      { input: 'a', output: 'a', isHidden: true },
      { input: 'racecar', output: 'racecar', isHidden: true },
    ],
  },
  {
    title: 'Longest Duplicate Substring',
    description: `Given a string \`s\`, consider all duplicated substrings: (contiguous) substrings of \`s\` that occur 2 or more times. The occurrences may overlap.

Return **any** duplicated substring that has the longest possible length. If \`s\` does not have a duplicated substring, return \`""\`.

**Example 1:**
\`\`\`
Input: s = "banana"
Output: "ana"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "abcd"
Output: ""
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Binary Search', 'Sliding Window', 'Rolling Hash', 'Suffix Array', 'Hash Function'],
    constraints: `- 2 <= s.length <= 3 * 10^4\\n- s consists of lowercase English letters.`,
    testCases: [
      { input: 'banana', output: 'ana', isHidden: false },
      { input: 'abcd', output: '', isHidden: false },
      { input: 'aa', output: 'a', isHidden: true },
    ],
  },
  {
    title: 'Minimum Window Substring (Strings)',
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window.

**Example 1:**
\`\`\`
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a", t = "a"
Output: "a"
\`\`\``,
    difficulty: 'HARD',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    constraints: `- m == s.length\\n- n == t.length\\n- 1 <= m, n <= 10^5\\n- s and t consist of uppercase and lowercase English letters.`,
    testCases: [
      { input: 'ADOBECODEBANC\nABC', output: 'BANC', isHidden: false },
      { input: 'a\na', output: 'a', isHidden: false },
      { input: 'a\naa', output: '', isHidden: true },
    ],
  },
  {
    title: 'Text Justification',
    description: `Given an array of strings \`words\` and a width \`maxWidth\`, format the text such that each line has exactly \`maxWidth\` characters and is fully (left and right) justified.

You should pack as many words as you can in each line. Pad extra spaces \`' '\` when necessary so that each line has exactly \`maxWidth\` characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

**Example 1:**
\`\`\`
Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'String', 'Simulation'],
    constraints: `- 1 <= words.length <= 300\\n- 1 <= words[i].length <= 20\\n- words[i] consists of only English letters and symbols.\\n- 1 <= maxWidth <= 100\\n- words[i].length <= maxWidth`,
    testCases: [
      { input: '7\nThis is an example of text justification.\n16', output: 'This    is    an\nexample  of text\njustification.  ', isHidden: false },
      { input: '6\nWhat must be acknowledgment shall be\n16', output: 'What   must   be\nacknowledgment  \nshall be        ', isHidden: false },
      { input: '1\na\n1', output: 'a', isHidden: true },
    ],
  },
  {
    title: 'Group Anagrams',
    description: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

**Example 2:**
\`\`\`
Input: strs = [""]
Output: [[""]]
\`\`\`

**Example 3:**
\`\`\`
Input: strs = ["a"]
Output: [["a"]]
\`\`\``,
    difficulty: 'HARD',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    constraints: `- 1 <= strs.length <= 10^4\\n- 0 <= strs[i].length <= 100\\n- strs[i] consists of lowercase English letters.`,
    testCases: [
      { input: '6\neat tea tan ate nat bat', output: '3', isHidden: false },
      { input: '1\n', output: '1', isHidden: false },
      { input: '1\na', output: '1', isHidden: true },
    ],
  },
  {
    title: 'Rabin-Karp Pattern Matching',
    description: `Implement the Rabin-Karp algorithm for string pattern matching.

Given a text string \`text\` and a pattern string \`pattern\`, return the starting indices of all occurrences of \`pattern\` in \`text\`.

**Example 1:**
\`\`\`
Input: text = "AABAACAADAABAABA", pattern = "AABA"
Output: [0, 9, 12]
\`\`\`

**Example 2:**
\`\`\`
Input: text = "abcdef", pattern = "xyz"
Output: []
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Hash Function', 'Rolling Hash'],
    constraints: `- 1 <= text.length <= 10^5\\n- 1 <= pattern.length <= text.length\\n- Both strings consist of printable ASCII characters.`,
    testCases: [
      { input: 'AABAACAADAABAABA\nAABA', output: '0 9 12', isHidden: false },
      { input: 'abcdef\nxyz', output: '-1', isHidden: false },
      { input: 'aaa\na', output: '0 1 2', isHidden: true },
    ],
  },
  {
    title: 'KMP Pattern Matching',
    description: `Implement the Knuth-Morris-Pratt (KMP) algorithm for string pattern matching.

Given a text string \`text\` and a pattern string \`pattern\`, return the starting index of the first occurrence of \`pattern\` in \`text\`, or \`-1\` if \`pattern\` is not part of \`text\`.

**Example 1:**
\`\`\`
Input: text = "ABABDABACDABABCABAB", pattern = "ABABCABAB"
Output: 10
\`\`\`

**Example 2:**
\`\`\`
Input: text = "hello", pattern = "world"
Output: -1
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'String Matching'],
    constraints: `- 1 <= text.length <= 10^5\\n- 1 <= pattern.length <= text.length`,
    testCases: [
      { input: 'ABABDABACDABABCABAB\nABABCABAB', output: '9', isHidden: false },
      { input: 'hello\nworld', output: '-1', isHidden: false },
      { input: 'aaaaaa\naaa', output: '0', isHidden: true },
    ],
  },
  {
    title: 'Z Algorithm',
    description: `Implement the Z Algorithm for string matching.

The Z-array for a string \`s\` of length \`n\` is an array of length \`n\` where \`z[i]\` is the length of the longest substring starting from \`s[i]\` that is also a prefix of \`s\`. \`z[0]\` is defined as \`0\`.

Given a string \`s\`, compute the Z-array.

**Example 1:**
\`\`\`
Input: s = "aabxaab"
Output: [0, 1, 0, 0, 3, 1, 0]
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aaaa"
Output: [0, 3, 2, 1]
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'String Matching'],
    constraints: `- 1 <= s.length <= 10^5\\n- s consists of lowercase English letters.`,
    testCases: [
      { input: 'aabxaab', output: '0 1 0 0 3 1 0', isHidden: false },
      { input: 'aaaa', output: '0 3 2 1', isHidden: false },
      { input: 'abcdef', output: '0 0 0 0 0 0', isHidden: true },
    ],
  },
  {
    title: 'String Compression II',
    description: `Run-length encoding is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string \`"aabccc"\` we replace \`"aa"\` by \`"a2"\` and replace \`"ccc"\` by \`"c3"\`. Thus the compressed string becomes \`"a2bc3"\`.

Given a string \`s\` and an integer \`k\`. You need to delete **at most** \`k\` characters from \`s\` such that the run-length encoded version of \`s\` has minimum length.

Find the minimum length of the run-length encoded version of \`s\` after deleting at most \`k\` characters.

**Example 1:**
\`\`\`
Input: s = "aaabcccd", k = 2
Output: 4
Explanation: Compressing s without deleting anything gives us "a3bc3d" of length 6. Deleting 'b' and 'd' gives us "aaaccc" compressed to "a3c3" of length 4.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aabbaa", k = 2
Output: 2
Explanation: Delete the two 'b's to get "aaaa" -> "a4" of length 2.
\`\`\`

**Example 3:**
\`\`\`
Input: s = "aaaaaaaaaaa", k = 0
Output: 3
Explanation: s compressed is "a11" of length 3.
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Dynamic Programming'],
    constraints: `- 1 <= s.length <= 100\\n- 0 <= k <= s.length\\n- s contains only lowercase English letters.`,
    testCases: [
      { input: 'aaabcccd\n2', output: '4', isHidden: false },
      { input: 'aabbaa\n2', output: '2', isHidden: false },
      { input: 'aaaaaaaaaaa\n0', output: '3', isHidden: true },
      { input: 'abc\n0', output: '3', isHidden: true },
    ],
  },
  {
    title: 'Shortest Palindrome',
    description: `You are given a string \`s\`. You can convert \`s\` to a palindrome by adding characters in front of it.

Return the shortest palindrome you can find by performing this transformation.

**Example 1:**
\`\`\`
Input: s = "aacecaaa"
Output: "aaacecaaa"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "abcd"
Output: "dcbabcd"
\`\`\``,
    difficulty: 'HARD',
    tags: ['String', 'Rolling Hash', 'String Matching', 'Hash Function'],
    constraints: `- 0 <= s.length <= 5 * 10^4\\n- s consists of lowercase English letters only.`,
    testCases: [
      { input: 'aacecaaa', output: 'aaacecaaa', isHidden: false },
      { input: 'abcd', output: 'dcbabcd', isHidden: false },
      { input: 'a', output: 'a', isHidden: true },
      { input: '', output: '', isHidden: true },
    ],
  },
];
