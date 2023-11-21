function sortString(str: string): string {
    return [...str].sort((a, b) =>
        a.localeCompare(b)).join("");
}
function groupAnagrams(strs: string[]): string[][] {
    if (!strs || !strs.length) {
        return []
    }

    const anagramObj: { [key: string]: string[] } = {}
    strs.forEach(item => {
        const sortedItem = sortString(item)
        if (anagramObj[sortedItem]) {
            anagramObj[sortedItem].push(item)

            return
        }
        anagramObj[sortedItem] = [item]


    })
    return Object.values(anagramObj).map(item => item)
};


console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]
))