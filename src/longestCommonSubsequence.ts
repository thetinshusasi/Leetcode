
// function longestCommonSubsequence(text1: string, text2: string): number {

//     if (!text1.length || !text2.length) return 0

//     const dp = new Array(text1.length + 1).fill(0).map(() => new Array(text2.length + 1).fill(0))

//     let i = 1
//     let j = 1

//     for (let i = 1; i <= text1.length; i++) {
//         for (let j = 1; j <= text2.length; j++) {
//             if (text1[i - 1] == text2[j - 1]) {
//                 dp[i][j] = (dp[i - 1][j - 1]) + 1
//                 continue
//             }

//             dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
//         }
//     }

//     return dp[text1.length][text2.length]



// };

function longestCommonSubsequence(text1: string, text2: string): number {

    if (!text1.length || !text2.length) return 0

    const dp = new Array(text1.length).fill(0).map(() => new Array(text2.length).fill(null))

    return LCS(text1, text2, 0, 0, dp)
    // return dp[text1.length][text2.length]



};

function LCS(text1: string, text2: string, i: number, j: number, dp: number[][]): number {

    if (i >= text1.length || j >= text2.length) return 0

    if (dp[i][j] !== null) return dp[i][j]

    if (text1[i] == text2[j]) {
        dp[i][j] = 1 + LCS(text1, text2, i + 1, j + 1, dp)
        return dp[i][j]
    }
    dp[i][j] = Math.max(LCS(text1, text2, i + 1, j, dp), LCS(text1, text2, i, j + 1, dp))
    return dp[i][j]
}

console.log(longestCommonSubsequence("pmjghexybyrgzczy", "hafcdqbgncrcbihkd"))