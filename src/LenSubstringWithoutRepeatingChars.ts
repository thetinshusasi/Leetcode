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

function lengthOfLongestSubstring(s: string): number {
    if (!s) return 0
    if (s.length == 1) return 1


    const strSet = new Set()
    const strLen = s.length
    let i = 0
    let j = 1
    let len = 1
    let maxLen = 1
    strSet.add(s[i])
    while (j < strLen) {
        /// Grow the sliding window containing non duplicates 
        if (!strSet.has(s[j])) {
            strSet.add(s[j])
            j++
            len++
            if (len > maxLen) {
                maxLen = len
            }
            continue

        }

        /// only consider the sliding window and pop from the left hand side till , you pop the repeated char
        /// the idea is that  : sliding window should not have any repeated char . before  moving to the main loop 
        for (let k = i; k <= j; k++) {
            i++
            if (s[k] === s[j]) {
                strSet.delete(s[k])
                break;
            }
            strSet.delete(s[k])



        }
        strSet.add(s[j])
        len = j - i + 1
        j++


    }
    return maxLen


};

console.log(lengthOfLongestSubstring("au"))