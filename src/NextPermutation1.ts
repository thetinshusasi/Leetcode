
function nextPermutation(nums: number[]): void {
    if (nums.length == 1) {
        return
    }

    let n = nums.length

    let i = 1
    let lastInc = -1

    while (i < n) {   //find the last peak (highest value from the end of the array)
        if (nums[i] > nums[i - 1]) {
            lastInc = i
        }
        i += 1
    }

    if (lastInc === -1) { //if the array is desc
        for (i = 0; i < n / 2; i++) {
            [nums[i], nums[n - i - 1]] = [nums[n - i - 1], nums[i]]
        }
        return
    }

    //find elements in range (nums[lastInc - 1] to nums[lastInc]) to the right

    let mn = nums[lastInc]
    let index = lastInc

    for (i = lastInc; i < n; i++) {
        if (nums[i] > nums[lastInc - 1] && nums[i] < nums[index])
            index = i
    }

    [nums[lastInc - 1], nums[index]] = [nums[index], nums[lastInc - 1]]

    for (i = lastInc + 1; i < n; i++) {
        for (var j = lastInc; j < i; j++) {
            if (nums[i] < nums[j]) {
                [nums[i], nums[j]] = [nums[j], nums[i]]
            }
        }
    }
}


nextPermutation([
    11, 12, 0, 27, 3, 11, 21, 9, 0, 15, 26,
    27, 17, 24, 0, 16, 4, 17, 14, 8, 15, 8,
    2, 16, 10, 6, 6, 24, 16, 2, 18, 19, 6,
    10, 17, 10, 21, 0, 11, 13, 7, 7, 2, 16,
    24, 25, 2, 20, 12, 19, 20, 9
])