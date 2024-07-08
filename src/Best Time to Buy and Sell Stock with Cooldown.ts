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
function maxProfit1(prices: number[]): number {
    const buy = new Array(prices.length + 2).fill(0);
    const sell = new Array(prices.length + 2).fill(0);

    for (let i = prices.length - 1; i >= 0; i--) {
        const profitFromNotBuyingToday = buy[i + 1];
        const profitFromBuyingToday = sell[i + 1] - prices[i];
        buy[i] = Math.max(profitFromNotBuyingToday, profitFromBuyingToday);

        const profitFromNotSellingToday = sell[i + 1];
        const profitFromSellingToday = buy[i + 2] + prices[i];
        sell[i] = Math.max(profitFromNotSellingToday, profitFromSellingToday);
    }

    return buy[0];
};

console.log(maxProfit1([1, 2, 3, 0, 2]));