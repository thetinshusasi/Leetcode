// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the 
// frequency
//  of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.



// Example 1:

// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.
// Example 2:

// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]
// Example 3:

// Input: candidates = [2], target = 1
// Output: []


const updateCombinations = (
    candidates: number[],
    currIndex: number,
    currVal: number,
    currCombArr: number[],
    globalCombinations: number[][]
) => {

    if (currVal === 0) {
        globalCombinations.push([...currCombArr])

        return
    }
    if (currVal < 0) {

        return
    }


    const currIndexNum = candidates[currIndex]

    for (let i = 0; i < candidates.length; i++) {

        const currIndexNum = candidates[i]
        currCombArr.push(currIndexNum)

        updateCombinations(candidates, i, currVal - currIndexNum, currCombArr, globalCombinations)
        currCombArr.pop()


    }



}

function combinationSum(candidates: number[], target: number): number[][] {

    const globalCombinations: number[][] = []

    for (let i = 0; i < candidates.length; i++) {
        let currCombArr: number[] = []
        const currIndexNum = candidates[i]

        currCombArr.push(currIndexNum)

        updateCombinations(candidates, i, target - currIndexNum, currCombArr, globalCombinations)
        currCombArr.pop()


    }

    while (candidates.length) {
        let currCombArr: number[] = []
        const currIndex = 0
        updateCombinations(candidates, currIndex, target, currCombArr, globalCombinations)

        candidates.shift()

    }
    return globalCombinations
};

let candidates = [2, 3, 6, 7], target = 7

console.log(combinationSum(candidates, target).toString())
