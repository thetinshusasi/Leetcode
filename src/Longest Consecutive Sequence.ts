function longestConsecutive(nums: number[]): number {

    if (nums.length === 0) return 0

    const hashmap: Map<number, boolean> = new Map()

    let max = 0

    for (let i = 0; i < nums.length; i++) {
        hashmap.set(nums[i], false)
    }

    for (let i = 0; i < nums.length; i++) {

        if (hashmap.get(nums[i])) continue

        let localmax = 1
        hashmap.set(nums[i], true)

        let plus1 = nums[i] + 1

        while (hashmap.has(plus1)) {
            localmax++
            hashmap.set(plus1, true)
            plus1++
        }
        let minus1 = nums[i] - 1
        while (hashmap.has(minus1)) {
            localmax++
            hashmap.set(minus1, true)
            minus1--
        }

        max = Math.max(max, localmax)


    }

    return max




};


// function checkInclusion(s1: string, s2: string): boolean {

//     if (s1.length > s2.length) {
//         return false
//     }

//     const globalMap: Map<string, number> = new Map()
//     const windowLen = s1.length

//     for (let i = 0; i < s1.length; i++) {
//         if (globalMap.has(s1[i])) {
//             globalMap.set(s1[i], globalMap.get(s1[i])! + 1)
//         } else {
//             globalMap.set(s1[i], 1)
//         }
//     }

//     let i = 0

//     while (i + windowLen <= s2.length) {
//         const localMap: Map<string, number> = new Map({ ...globalMap })
//         let j = i + windowLen
//         let k = i

//         while (k < j) {
//             if (localMap.has(s2[k])) {
//                 let count = localMap.get(s2[k])!
//                 if (count === 1) {
//                     localMap.delete(s2[k])
//                 } else {
//                     localMap.set(s2[k], localMap.get(s2[k])! - 1)
//                 }
//                 k++
//             }
//             else {
//                 break
//             }

//         }

//         if (k === j) {
//             return true
//         } else {
//             i++
//         }


//     }
//     return false


// }

