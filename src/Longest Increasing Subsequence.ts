// Given an integer array nums, return the length of the longest strictly increasing 
// subsequence
// .



// Example 1:

// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
// Example 2:

// Input: nums = [0,1,0,3,2,3]
// Output: 4
// Example 3:

// Input: nums = [7,7,7,7,7,7,7]
// Output: 1


// Constraints:

// 1 <= nums.length <= 2500
// -104 <= nums[i] <= 104



// Use Patient sort algorithm


function lengthOfLIS(nums: number[]): number {

    if (nums.length == 1) return 1

    const dp = new Array(nums.length).fill(1)

    const len = nums.length

    let currMax = 1

    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {

            if (nums[j] < nums[i] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1

                if (dp[i] > currMax) {
                    currMax = dp[i]
                }

            }
        }
    }

    return currMax
};