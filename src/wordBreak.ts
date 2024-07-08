
function wordBreak(
    s: string,
    wordDict: string[],
    cache: { [key: string]: boolean } = {},
): boolean {


    if (cache[s] !== undefined) return cache[s]
    if (!s.length) return cache[s] = true

    for (let word of wordDict) {
        const length = word.length
        const ix = s.indexOf(word)
        if (ix === 0) {
            const restOfTheString = s.slice(ix + length, s.length)
            const ans = wordBreak(
                restOfTheString,
                wordDict,
                cache
            )
            if (ans) return cache[s] = true
        }
    }
    return cache[s] = false
};