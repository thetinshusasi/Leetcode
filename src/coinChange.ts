
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.



// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1
// Example 3:

// Input: coins = [1], amount = 0
// Output: 0


// Constraints:

// 1 <= coins.length <= 12
// 1 <= coins[i] <= 231 - 1
// 0 <= amount <= 104



// Note : watch this youtube video : https://www.youtube.com/watch?v=NNcN5X1wsaw


// 1d dynamic programming problem : we try to calculate the min coins required to make up the amount

function coinChange(coins: number[], amount: number): number {

    if (amount < 1) return 0

    const minCoinArrDP = new Array(amount + 1).fill(amount + 1)
    minCoinArrDP[0] = 0

    const reverseCoins = coins.sort((a, b) => b - a)

    for (let i = 1; i < minCoinArrDP.length; i++) {
        let curMin = minCoinArrDP[i]

        for (let coin of reverseCoins) {
            if (coin > i) {
                continue
            }

            minCoinArrDP[i] = Math.min(curMin, 1 + minCoinArrDP[i - coin])
            curMin = minCoinArrDP[i]
        }
    }
    return minCoinArrDP[amount] === amount + 1 ? -1 : minCoinArrDP[amount]

}
// console.log(coinChange([186, 419, 83, 408], 6249))
console.log(coinChange([1, 2, 5], 11))