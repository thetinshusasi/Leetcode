// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// You must write an algorithm with O(log n) runtime complexity.



// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Example 2:

// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:

// Input: nums = [], target = 0
// Output: [-1,-1]


// Constraints:

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums is a non-decreasing array.
// -10^9 <= target <= 10^9



///Notes: when u here sorted then there is a possiblity of using a binary search at least in terms of array
// learn the binary search array  algo properly 

interface RefObj {
    start: number,
    end: number
}

function searchRange(nums: number[], target: number): number[] {
    if (!nums || !nums.length) return [-1, -1]

    const refObj: RefObj = {
        start: Number.POSITIVE_INFINITY,
        end: Number.NEGATIVE_INFINITY
    }
    BS(nums, 0, nums.length - 1, target, refObj)

    return refObj.start !== Number.prototype && refObj.end !== Number.NEGATIVE_INFINITY ? [refObj.start, refObj.end] : [-1, -1]


};

function BS(nums: number[], start: number, end: number, target: number, refObj: RefObj): RefObj {
    if (start > end) return refObj;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2)
        if (

            nums[mid] < target) {
            start = mid + 1
            continue
        }
        if (
            nums[mid] > target

        ) {
            end = mid - 1
            continue
        }

        if (refObj.start >= mid) {
            refObj.start = mid

        }


        if (refObj.end <= mid) {
            refObj.end = mid
        }




        BS(nums, start, mid - 1, target, refObj)
        BS(nums, mid + 1, end, target, refObj)
        break;


    }
    return refObj

}


console.log(searchRange([1], 1))