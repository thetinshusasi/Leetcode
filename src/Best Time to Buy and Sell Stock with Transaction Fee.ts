function maxProfitV(prices: number[], fee: number): number {

    if (prices.length === 1) return 0
    let fb = Number.NEGATIVE_INFINITY
    let fs = 0

    for (let i = 0; i < prices.length; i++) {
        fb = Math.max(fb, i === 0 ? - prices[i] - fee : fs - prices[i] - fee)
        fs = Math.max(fs, fb + prices[i])

    }




    return fs


};

console.log(maxProfitV([1, 3, 2, 8, 4, 9], 2))