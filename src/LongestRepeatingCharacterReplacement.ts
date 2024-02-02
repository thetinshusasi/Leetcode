
// 3. Longest Substring Without Repeating Characters
// Solved
// Medium
// Topics
// Companies
// Given a string s, find the length of the longest 
// substring
//  without repeating characters.



// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.


// Constraints:

// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

function characterReplacement(s: string, k: number): number {

  if (!s || !s.length) return 0

  let firstPtr = 0
  let secPtr = 0
  const strLen = s.length

  let charCountHashmap: Dict = {}
  let maxLenCount = 0
  let prevValue = null
  while (firstPtr < strLen && secPtr < strLen) {
    if (charCountHashmap[s[secPtr]] && prevValue !== secPtr) {
      charCountHashmap[s[secPtr]] = charCountHashmap[s[secPtr]] + 1
    }
    if (!charCountHashmap[s[secPtr]]) {
      charCountHashmap[s[secPtr]] = 1
    }

    const windowLen = secPtr - firstPtr + 1
    const countOfMaxRepeatedChar = Math.max(...(Object.values(charCountHashmap)))

    const isWindowValid = (windowLen - countOfMaxRepeatedChar) <= k
    prevValue = secPtr

    if (isWindowValid) {
      if (windowLen > maxLenCount) {
        maxLenCount = windowLen
      }
      secPtr++
    }
    else {
      charCountHashmap[s[firstPtr]] = charCountHashmap[s[firstPtr]] - 1
      firstPtr++


    }



  }

  return maxLenCount

};

console.log(characterReplacement("AABABBA", 1))