function maxProfitVI(k: number, prices: number[]): number {

    const kBuy: number[] = new Array(k).fill(Number.NEGATIVE_INFINITY)
    const kSell: number[] = new Array(k).fill(0)
    for (let i = 0; i < prices.length; i++) {
        for (let j = 0; j < k; j++) {
            kBuy[j] = Math.max(kBuy[j], j === 0 ? -prices[i] : kSell[j - 1] - prices[i])
            kSell[j] = Math.max(kSell[j], kBuy[j] + prices[i])

        }

        console.log("Buy: " + kBuy)
        console.log("Sell: " + kSell)

    }
    return kSell[k - 1]


};

console.log(maxProfitVI(2, [2, 4, 1]))