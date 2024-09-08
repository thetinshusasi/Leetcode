// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

// After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).



// Example 1:

// Input: prices = [1,2,3,0,2]
// Output: 3
// Explanation: transactions = [buy, sell, cooldown, buy, sell]
// Example 2:

// Input: prices = [1]
// Output: 0
// function maxProfit1(prices: number[]): number {
//     const buy = new Array(prices.length + 2).fill(0);
//     const sell = new Array(prices.length + 2).fill(0);

//     for (let i = prices.length - 1; i >= 0; i--) {
//         const profitFromNotBuyingToday = buy[i + 1];
//         const profitFromBuyingToday = sell[i + 1] - prices[i];
//         buy[i] = Math.max(profitFromNotBuyingToday, profitFromBuyingToday);

//         const profitFromNotSellingToday = sell[i + 1];
//         const profitFromSellingToday = buy[i + 2] + prices[i];
//         sell[i] = Math.max(profitFromNotSellingToday, profitFromSellingToday);
//     }

//     return buy[0];
// };

// https://www.youtube.com/watch?v=w6xk5Po-DX0&t=359s
function maxProfit1(prices: number[]): number {
    if (prices.length <= 1) return 0

    if (prices.length === 2) return Math.max(0, prices[1] - prices[0])
    const dp = new Array(prices.length).fill(0).map(() => new Array(2).fill(0))
    //  0 => no stock
    //  1 => has stock

    dp[0][0] = 0 // I don't have stock on day 0
    dp[0][1] = -prices[0] // I brought stock on day 0
    dp[1][0] = Math.max(dp[0][1] + prices[1], dp[0][0]) // I don't have stock on day 1, I either sold stock on day 1 or I didn't have stock on day 0
    dp[1][1] = Math.max(dp[0][0] - prices[1], dp[0][1]) // I have stock on day 1, I either bought stock on day 1 or I had stock on day 0

    for (let i = 2; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][0])
        dp[i][1] = Math.max(dp[i - 2][0] - prices[i], dp[i - 1][1])

    }

    return dp[prices.length - 1][0]


};


console.log(maxProfit1([1, 2, 3, 0, 2]));