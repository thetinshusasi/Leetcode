// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

// Return true if you can reach the last index, or false otherwise.



// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.


// Constraints:

// 1 <= nums.length <= 104
// 0 <= nums[i] <= 105


// Intuition : if we try to solve it in a graph or DP way the time complexity would be n^2 at best using memoization else it would be n^n 
// so we have to use greedy approach . In greedy approach , we start from the end and check , how many steps it take to reach the last element
// from the previous index . 
// so at minimum we require atleast one step ( jumpsRequiredToReach = 1) to reach the current index . So if we are not able to reach the current index from previous index, 
// that means we need jumpsRequiredToReach + 1 step to reach the current index . 

// so we compare how many jumps are required to reach the current index  from previous step, if we are not able to reach it then we increment the
// no of jumps required by 1 (jumpsRequiredToReach + 1) . If we are able to reach the current index then we reset the jumpsRequiredToReach to 1 .
// this goes on till we reach index zero (index === 0). So if at index 1, we are able to reach from index 0 , because it contains enough jumps 
// then we are  able to reach the end. Else it means we are unable to reach the end 

// Edge case  : if array has only one element(return true) or array is empty(return false)

function canJump(nums: number[]): boolean {

    if (nums.length === 1) return true
    let jumpsRequiredToReach = 1
    let reachFirstIndex = false
    for (let i = nums.length - 2; i >= 0; i--) {

        const currElem = nums[i]
        if (currElem >= jumpsRequiredToReach) {
            jumpsRequiredToReach = 1
            if (i === 0) {
                reachFirstIndex = true
            }
            continue
        }

        jumpsRequiredToReach++
    }

    return reachFirstIndex

};




console.log(canJump([2, 3, 1, 1, 4]))



