// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.



// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
// Example 2:

// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
// Example 3:

// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.


// Constraints:

// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105


// Inituition : fixed an element  and use  two sum method  to find the other two elements
function threeSum(nums: number[]): number[][] {
    if (!nums || nums.length < 3) {
        return []
    }
    nums = nums.sort();

    const resArr: number[][] = [];
    const len = nums.length - 2;
    let arrSet = new Set();

    for (let i = 0; i < len; i++) {
        const fixedElem = nums[i];
        let j = i + 1;
        let k = nums.length - 1;
        while (j < k) {

            const sum = fixedElem + nums[j] + nums[k];
            if (sum === 0) {
                const val = JSON.stringify([fixedElem, nums[j], nums[k]])
                if (!arrSet.has(val)) {
                    arrSet.add(val)
                    resArr.push([fixedElem, nums[j], nums[k]])
                }
                j++
                continue;
            }
            if (sum < 0) {
                j++;
                continue;
            }
            if (sum > 0) {
                k--;
                continue;
            }
        }

    }


    return resArr;

};