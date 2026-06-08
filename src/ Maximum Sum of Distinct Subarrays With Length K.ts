// You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:

// The length of the subarray is k, and
// All the elements of the subarray are distinct.
// Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.

// A subarray is a contiguous non-empty sequence of elements within an array.

 

// Example 1:

// Input: nums = [1,5,4,2,9,9,9], k = 3
// Output: 15
// Explanation: The subarrays of nums with length 3 are:
// - [1,5,4] which meets the requirements and has a sum of 10.
// - [5,4,2] which meets the requirements and has a sum of 11.
// - [4,2,9] which meets the requirements and has a sum of 15.
// - [2,9,9] which does not meet the requirements because the element 9 is repeated.
// - [9,9,9] which does not meet the requirements because the element 9 is repeated.
// We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions
// Example 2:

// Input: nums = [4,4,4], k = 3
// Output: 0
// Explanation: The subarrays of nums with length 3 are:
// - [4,4,4] which does not meet the requirements because the element 4 is repeated.
// We return 0 because no subarrays meet the conditions.
 

// Constraints:

// 1 <= k <= nums.length <= 105


function maximumSubarraySum(nums: number[], k: number): number {

    let localSum = 0                  // running sum of the current window [start, end]
    let maxSum = 0                    // best valid (size-k, all-distinct) sum seen so far
    const numSet = new Set<number>()  // values currently inside the window — for the distinct check
    let start = 0                     // left edge of the window
    let end = 0                       // right edge of the window

    while (end < nums.length) {
        const currElem = nums[end]

        // 1) Keep the window distinct: if currElem already exists in it, shrink from the
        //    left (dropping values + their sum) until the duplicate of currElem is gone.
        while (numSet.has(currElem)) {
            numSet.delete(nums[start])
            localSum -= nums[start]
            start += 1
        }

        // 2) currElem is now safe to include.
        numSet.add(currElem)
        localSum += currElem

        // 3) Once the window is exactly size k, it's a valid candidate — record it,
        //    then slide forward by evicting the leftmost element.
        if (end - start + 1 === k) {
            if (localSum > maxSum) {
                maxSum = localSum
            }
            numSet.delete(nums[start])
            localSum -= nums[start]
            start += 1
        }

        end += 1
    }

    return maxSum

};

console.log(maximumSubarraySum([1,5,4,2,9,9,9], 3))