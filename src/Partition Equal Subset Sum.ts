// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.



// Example 1:

// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].
// Example 2:

// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.


// Constraints:

// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100

function canPartition(nums: number[]): boolean {

    let sum = 0
    nums.forEach(item => {
        sum = sum + item
    })
    const newTarget = Math.ceil(sum / 2)
    if (sum % 2 !== 0) {
        return false
    }

    const dp = new Array(nums.length + 1).fill(0).map(() => new Array(newTarget + 1).fill(false))

    for (let i = 0; i < nums.length + 1; i++) {

        dp[i][0] = true
    }


    for (let i = 1; i < newTarget + 1; i++) {

        dp[0][i] = false
    }

    for (let i = 1; i < nums.length + 1; i++) {

        for (let j = 1; j < newTarget + 1; j++) {

            const currIndex = i - 1
            const currSum = nums[currIndex]

            if (j - currSum >= 0) {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - currSum]
            }
            else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    return dp[nums.length][newTarget]


};

console.log(canPartition([1, 2, 5]))