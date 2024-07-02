// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

// In other words, return true if one of s1's permutations is the substring of s2.



// Example 1:

// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").
// Example 2:

// Input: s1 = "ab", s2 = "eidboaoo"
// Output: false


// Constraints:

// 1 <= s1.length, s2.length <= 104
// s1 and s2 consist of lowercase English letters

function checkInclusion(s1: string, s2: string): boolean {

    if (s1.length > s2.length) {
        return false
    }

    const s1Map: { [key: string]: number } = {}


    for (let i = 0; i < s1.length; i++) {
        if (s1Map[s1[i]]) {
            s1Map[s1[i]] += 1
        } else {
            s1Map[s1[i]] = 1
        }

    }

    let windowLen = s1.length - 1
    let windownEnd = s2.length
    let windowStart = 0

    const s2Map: { [key: string]: number } = {}



    while ((windowStart + windowLen) < windownEnd) {


        const s1TempMap = JSON.parse(JSON.stringify(s1Map))
        const s2SubString = s2.substring(windowStart, windowStart + windowLen + 1)
        let isBreak = false

        for (let val of s2SubString.split('')) {
            if (!s1TempMap[val]) {
                windowStart++
                isBreak = true
                break

            }

            if (s1TempMap[val] === 1) {
                delete s1TempMap[val]
                continue
            }

            if (s1TempMap[val] > 1) {
                s1TempMap[val] = s1TempMap[val] - 1
                continue
            }
        }
        if (isBreak) {
            continue
        }
        if (!Object.keys(s1TempMap).length) {
            return true

        }


        windowStart++


    }


    return false
}

const s1 = "ab"
const s2 = "eidbaooo"

console.log(checkInclusion(s1, s2))