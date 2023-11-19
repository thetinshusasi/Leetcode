function search(nums: number[], target: number): number {
    if (nums.length === 1) {
        return (nums[0] === target) ? 0 : -1
    }
    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {

        let mid = Math.floor((start + end) / 2)
        if (nums[start] <= nums[mid]) {
            if ((nums[start] <= target && target <= nums[mid])) {
                return binarySearch(nums, start, end, target)
            }

            start = mid + 1;
            continue

        }

        if (nums[mid] <= nums[end]) {
            if ((nums[mid] <= target && target <= nums[end])) {
                return binarySearch(nums, start, end, target)
            }

            end = mid - 1
            continue


        }


    }
    return -1;

};

const binarySearch = (nums: number[], start: number, end: number, target: number): number => {
    if (start > end) return -1;
    if (start === end) {
        return (nums[start] === target) ? start : -1
    }

    while (start <= end) {
        let mid = Math.floor((start + end) / 2)

        if (nums[mid] === target) {
            return mid
        }

        if (nums[mid] < target) {
            start = mid + 1;
            continue
        }
        end = mid - 1

    }
    return -1
}



search([1, 3], 3)