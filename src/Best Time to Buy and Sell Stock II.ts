function maxProfitII(prices: number[]): number {

    if (prices.length === 1) return 0

    let i = 0
    let j = i + 1
    let currentProfit = 0
    let maxProfit = 0

    while (j < prices.length) {


        let tempProfit = prices[j] - prices[i]
        if (tempProfit > currentProfit) {
            currentProfit = tempProfit
            j++
            continue
        } else {
            maxProfit += currentProfit
            i = j
            j = j + 1
            currentProfit = 0
            continue
        }


    }

    if (currentProfit > 0) {
        maxProfit += currentProfit
    }


    return maxProfit

};

console.log(maxProfitII([7, 6, 4, 3, 1]))