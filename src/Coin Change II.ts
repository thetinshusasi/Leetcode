// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the number of combinations that make up that amount.If that amount of money cannot be made up by any combination of the coins, return 0.

// You may assume that you have an infinite number of each kind of coin.

// The answer is guaranteed to fit into a signed 32 - bit integer.



//     Example 1:

// Input: amount = 5, coins = [1, 2, 5]
// Output: 4
// Explanation: there are four ways to make up the amount:
// 5 = 5
// 5 = 2 + 2 + 1
// 5 = 2 + 1 + 1 + 1
// 5 = 1 + 1 + 1 + 1 + 1
// Example 2:

// Input: amount = 3, coins = [2]
// Output: 0
// Explanation: the amount of 3 cannot be made up just with coins of 2.
// Example 3:

// Input: amount = 10, coins = [10]
// Output: 1

// interface CoinChange {
//     count: number
// }

// function change(amount: number, coins: number[]): number {
//     let dp: CoinChange = {
//         count: 0
//     }
//     coins.sort((a, b) => a - b)

//     Recur(amount, 0, coins, dp)
//     return dp.count
// };


// function Recur(currentAmount: number, currentIndex: number, coins: number[], dp: any) {

//     if (currentAmount < 0) {
//         return
//     }

//     if (currentAmount == 0) {
//         dp.count = dp.count + 1
//         return
//     }

//     if (currentAmount < coins[currentIndex]) {
//         return
//     }

//     for (let i = currentIndex; i < coins.length; i++) {
//         if (currentAmount < coins[i]) {
//             break
//         }
//         const newAmount = currentAmount - coins[i]

//         Recur(newAmount, i, coins, dp)
//     }

// }


//Inituition:
// Youtube : https://www.youtube.com/watch?v=DJ4a7cmjZY0&t=266s

function change(amount: number, coins: number[]): number {
    const dp = new Array(coins.length + 1).fill(0).map(() => new Array(amount + 1).fill(0))
    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = 1
    }

    for (let i = 1; i < dp[0].length; i++) {
        dp[0][i] = 0
    }


    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {

            const coinIndex = i - 1
            const currentAmount = j
            const currentCoin = coins[coinIndex]
            let noOfWaysToMakeCurrentAmountIfCurrentCoinIsUsed = 0
            const noOfWaysToMakeCurrentAmountIfCurrentCoinIsNotUsed = dp[i - 1][j]

            if (currentAmount - currentCoin >= 0) {
                noOfWaysToMakeCurrentAmountIfCurrentCoinIsUsed = dp[i][currentAmount - currentCoin]
            }

            dp[i][j] = noOfWaysToMakeCurrentAmountIfCurrentCoinIsUsed + noOfWaysToMakeCurrentAmountIfCurrentCoinIsNotUsed


        }
    }

    return dp[dp.length - 1][dp[0].length - 1]


};


console.log(change(5, [1, 2, 5]))