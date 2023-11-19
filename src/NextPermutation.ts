
// A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

// For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
// The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

// For example, the next permutation of arr = [1,2,3] is [1,3,2].
// Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
// While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
// Given an array of integers nums, find the next permutation of nums.

// The replacement must be in place and use only constant extra memory.



// Example 1:

// Input: nums = [1,2,3]
// Output: [1,3,2]
// Example 2:

// Input: nums = [3,2,1]
// Output: [1,2,3]
// Example 3:

// Input: nums = [1,1,5]
// Output: [1,5,1]


function NextPermutation(nums: number[]): void {
    if (!nums || !nums.length) {
        return
    }

    if (nums.length === 1) {
        console.log(nums);
    }

    let j = nums.length - 1;
    let i = j - 1;
    while (i >= 0) { /// /find the last peak (highest value from the end of the array)
        if (nums[i] < nums[j]) {

            break;
        }
        j--;
        i--;
    }
    if (i < 0) { // reverse the array if the already in descending order or is in final state of permutation
        nums = inPlaceSort(nums, 0, nums.length - 1)
        console.log(nums);
        return
    }

    let index = i + 1;
    let iVal = nums[i];
    let maxVal = Number.POSITIVE_INFINITY;

    for (let k = i + 1; k < nums.length; k++) { // find index of the element is "smallest largest element from the immediate left of the peak value" and swap them
        if (iVal < nums[k] && nums[k] < maxVal) {

            maxVal = nums[k];
            index = k;
        }
    }

    let temp = nums[i];
    nums[i] = nums[index]
    nums[index] = temp;

    nums = inPlaceSort(nums, i + 1, nums.length - 1); // do in inplace sorting between peak and last element in the array
    console.log(nums)



};

function inPlaceSort(arr: number[], start: number, end: number): number[] {
    if (start < 0 || end >= arr.length || start >= end) {
        return arr
    }

    const subarray = arr.slice(start, end + 1); // Extract the subarray
    subarray.sort((a, b) => a - b); // Sort the subarray
    arr.splice(start, subarray.length, ...subarray); // Replace the original portion with the sorted subarray
    return arr
}

const res = NextPermutation([
    11, 12, 0, 27, 3, 11, 21, 9, 0, 15, 26,
    27, 17, 24, 0, 16, 4, 17, 14, 8, 15, 8,
    2, 16, 10, 6, 6, 24, 16, 2, 18, 19, 6,
    10, 17, 10, 21, 0, 11, 13, 7, 7, 2, 16,
    24, 25, 2, 20, 12, 19, 20, 9
])

let a = [
    11,
    12,
    0,
    27,
    3,
    11,
    21,
    9,
    0,
    15,
    26,
    27,
    17,
    24,
    0,
    16,
    4,
    17,
    14,
    8,
    15,
    8,
    2,
    16,
    10,
    6,
    6,
    24,
    16,
    2,
    18,
    19,
    6,
    10,
    17,
    10,
    21,
    0,
    11,
    13,
    7,
    7,
    2,
    16,
    24,
    25,
    2,
    20,
    12,
    20,
    19,
    9,
]


// "program": "${workspaceFolder}/${file}.ts",
// "outFiles": ["${workspaceFolder}/lib/**/*.js"],
// "runtimeExecutable": "/usr/local/bin/node"
