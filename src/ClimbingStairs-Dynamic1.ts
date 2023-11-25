// You are climbing a staircase. It takes n steps to reach the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?



// Example 1:

// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:

// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

interface Dict {
    [key: string]: number;
}

function climbStairs(n: number): number {
    const hashMap: Dict = {}
    return countStairs(n, hashMap)

};


/// the intuition in Dynamic prog is that try to divide the problem into sub problem
/// through recursion and try to memoize the the parts of the recursion
const countStairs = (currStairNo: number, dict: Dict): number => {
    if (currStairNo === 2) {
        return 2
    }

    if (currStairNo === 1) {
        return 1
    }


    if (dict[currStairNo]) {
        return dict[currStairNo]
    }

    const val = countStairs(currStairNo - 1, dict) + countStairs(currStairNo - 2, dict)
    dict[currStairNo] = val
    return val


}

console.log(climbStairs(7))