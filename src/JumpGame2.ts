// You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

// Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].



// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [2,3,0,1,4]
// Output: 2


// Constraints:

// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000
// It's guaranteed that you can reach nums[n - 1].

const returnMaxValIndex = (arr: number[], start: number, end: number): number => {


    if (end >= arr.length) {
        return end

    }
    let maxVal = Number.NEGATIVE_INFINITY
    let maxValIndex = start

    for (let i = start; i <= end; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i]
            maxValIndex = i
        }
    }

    return maxValIndex


}


function jump(nums: number[]): number {
    if (nums.length === 1) return 0
    let i = 0
    let jumps = 1





    while (i < nums.length) {
        let end = i + nums[i]
        jumps++
        if (end >= nums.length - 1) return jumps

        i = returnMaxValIndex(nums, i + 1, nums[i] - 1)



    }

    return jumps



};

console.log(jump([1, 2, 3]))
// console.log(jump([2, 3, 0, 1, 4]))
// console.log(jump([2, 3, 1]))