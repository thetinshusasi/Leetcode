// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

// You have the following three operations permitted on a word:

// Insert a character
// Delete a character
// Replace a character


// Example 1:

// Input: word1 = "horse", word2 = "ros"
// Output: 3
// Explanation: 
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose (remove 'r')
// rose -> ros (remove 'e')
// Example 2:

// Input: word1 = "intention", word2 = "execution"
// Output: 5
// Explanation: 
// intention -> inention (remove 't')
// inention -> enention (replace 'i' with 'e')
// enention -> exention (replace 'n' with 'x')
// exention -> exection (replace 'n' with 'c')
// exection -> execution (insert 'u')


// Constraints:

// 0 <= word1.length, word2.length <= 500
// word1 and word2 consist of lowercase English letters.


//  Youtube link : https://www.youtube.com/watch?v=HwDXH35lr0o


function minDistance(word1: string, word2: string): number {
    if (word1 === word2) return 0
    if (!word1.length || !word2.length) return Math.max(word1.length, word2.length)


    const dpArray = new Array(word2.length + 1).fill(0).map(() => new Array(word1.length + 1).fill(0))
    for (let i = 0; i < dpArray.length; i++) {
        dpArray[i][0] = i
    }
    for (let i = 0; i < dpArray[0].length; i++) {
        dpArray[0][i] = i
    }

    let i = 1
    let j = 1

    for (let i = 1; i < dpArray.length; i++) {
        for (let j = 1; j < dpArray[0].length; j++) {

            if (word1[j - 1] == word2[i - 1]) {
                dpArray[i][j] = dpArray[i - 1][j - 1]
            } else {
                dpArray[i][j] = 1 + Math.min(dpArray[i - 1][j - 1], dpArray[i - 1][j], dpArray[i][j - 1])
            }
        }
    }

    return dpArray[dpArray.length - 1][dpArray[0].length - 1]

};

console.log(minDistance("horse", "ros"))