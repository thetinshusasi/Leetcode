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


function lengthOfLongestSubstring1(s: string): number {
    if (!s) {
        return 0
    }

    const strSet = new Set()
    const len = s.length

    let i = 0
    let j = 0

    let maxLen = 0
    let currLen = 0
    while (j < len) {

        if (!strSet.has(s[j])) {
            currLen++

            if (currLen > maxLen) {
                maxLen = currLen
            }
            strSet.add(s[j])
            j++

            continue

        }

        // only consider the sliding window and pop from the left hand side till , you pop the repeated char
        while (i < j) {

            if (s[i] === s[j]) {
                strSet.delete(s[i])

                i++
                break
            }
            strSet.delete(s[i])
            i++
        }

        strSet.add(s[j])
        // If  the repeated chars are next to each other the above while loop make i === j , we have set the currLen to 1 as
        // as we have added the repeated char to the set.
        if (i === j) {
            currLen = 1 // set it to 1 coz we already added s[j] to the set . Edge case "pwwkew" answer is wke  is 3
        }
        else {
            /// there are character between repeated chars then  we have calculate the len between new start point and
            /// the repeated char
            currLen = j - i + 1 /// edge case  "dvdf"  answer is 3
        }


        j++




    }

    return maxLen


};
console.log(lengthOfLongestSubstring1("pwwkew"))

console.log(lengthOfLongestSubstring1("dvdf"))
console.log(lengthOfLongestSubstring1("abcabcbb"))