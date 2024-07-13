// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.



// Example 1:

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.


// Constraints:

// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

// function merge(intervals: number[][]): number[][] {

//     if (intervals.length == 1) return intervals

//     const updatedIntervels = intervals.sort((a, b) => a[0] - b[0])

//     let i = 1

//     const len = updatedIntervels.length

//     const stack: number[][] = []
//     stack.push(updatedIntervels[0])
//     while (i < len) {

//         const top = stack.pop()
//         if (!top) break

//         const topStart = top[0]
//         const topEnd = top[1]

//         const start = updatedIntervels[i][0]
//         const end = updatedIntervels[i][1]

//         if (topEnd < start) {
//             stack.push(top)
//             stack.push(updatedIntervels[i])
//             i++
//             continue
//         }
//         stack.push([Math.min(topStart, start), Math.max(topEnd, end)])
//         i++

//     }

//     return stack



// };

function merge(intervals: number[][]): number[][] {
    if (!intervals.length) return []
    if (intervals.length == 1) return intervals

    intervals.sort(((a, b) => a[0] - b[0]))

    let i = 0
    let j = 1

    while (j < intervals.length) {

        const leftEnd = intervals[i][1]

        const rightStart = intervals[j][0]

        if (leftEnd >= rightStart) {

            const newInterval = [intervals[i][0], Math.max(intervals[i][1], intervals[j][1])]
            intervals.splice(i, 2, newInterval)
            continue
        }

        i++
        j++

    }
    return intervals


}

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]))