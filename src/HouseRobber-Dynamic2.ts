// You are a professional robber planning to rob houses along a street.Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.



//     Example 1:

// Input: nums = [1, 2, 3, 1]
// Output: 4
// Explanation: Rob house 1(money = 1) and then rob house 3(money = 3).
// Total amount you can rob = 1 + 3 = 4.
// Example 2:

// Input: nums = [2, 7, 9, 3, 1]
// Output: 12
// Explanation: Rob house 1(money = 2), rob house 3(money = 9) and rob house 5(money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.


// Constraints:

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 400


interface Dict1 {
    [key: string]: number;
}

/// Here the intuition is to find a way to decompose the problem into sub problems (very important) and memoize them
/// I still need to understand what was the intuition behind the sub problem formulation structure

function rob(nums: number[]): number {

    let nMinus1 = 0
    let nMinus2 = 0

    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            nMinus1 = nums[i]
            continue

        }
        if (i === 1) {
            nMinus2 = nMinus1
            if (nums[i] > nums[i - 1]) {

                nMinus1 = nums[i]
            }
            else {

                nMinus1 = nums[i - 1]
            }

            continue
        }
        let temp = 0
        if ((nums[i] + nMinus2) > nMinus1) {
            temp = nMinus1
            nMinus1 = nums[i] + nMinus2
            nMinus2 = temp
        }
        else {
            nMinus2 = nMinus1
        }

        // hashMap[i] = Math.max(nums[i] + hashMap[i - 2], hashMap[i - 1])
    }
    return nMinus1
    // return hashMap[nums.length - 1]

};

console.log(rob([2, 7, 9, 3, 1]))


// interface Dict1 {
//     [key: string]: number;
// }
// function rob(nums: number[]): number {

//     const hashMap: Dict1 = {}

//     for (let i = 0; i < nums.length; i++) {
//         if (i === 0) {
//             hashMap[i] = nums[i]
//             continue

//         }
//         if (i === 1) {
//             hashMap[i] = Math.max(nums[i], nums[i - 1])
//             continue
//         }

//         hashMap[i] = Math.max(nums[i] + hashMap[i - 2], hashMap[i - 1])
//     }

//     return hashMap[nums.length - 1]

// };