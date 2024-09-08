function maxProfitIII_3(prices: number[]): number {

    let fb = Number.NEGATIVE_INFINITY
    let sb = Number.NEGATIVE_INFINITY
    let fs = 0
    let ss = 0

    for (let i = 0; i < prices.length; i++) {
        fb = Math.max(fb, - prices[i])
        fs = Math.max(fs, fb + prices[i])
        sb = Math.max(sb, fs - prices[i])
        ss = Math.max(ss, sb + prices[i])

        console.log(fb, fs, sb, ss)
    }
    return ss

};

console.log(maxProfitIII_3([1, 2, 4, 2, 5, 7, 2, 4, 9, 0]))
