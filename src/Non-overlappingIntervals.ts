// Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.



// Example 1:

// Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
// Output: 1
// Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
// Example 2:

// Input: intervals = [[1,2],[1,2],[1,2]]
// Output: 2
// Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
// Example 3:

// Input: intervals = [[1,2],[2,3]]
// Output: 0
// Explanation: You don't need to remove any of the intervals since they're already non-overlapping.


// Constraints:

// 1 <= intervals.length <= 105
// intervals[i].length == 2
// -5 * 104 <= starti < endi <= 5 * 104


function eraseOverlapIntervals(intervals: number[][]): number {

    if (intervals.length <= 1) return 0

    intervals.sort((a, b) => a[0] - b[0])

    const updatedIntervels: number[] = intervals.map(item => item[0] + item[1])

    let i = 1

    const len = updatedIntervels.length

    const stack: number[] = []
    stack.push(updatedIntervels[0])
    let count = 0
    while (i < len) {

        const top = stack.pop()
        if (!top) break

        if (top - updatedIntervels[i] === 0) {
            count++
            stack.push(updatedIntervels[i])
            i++
            continue
        }

        if ((top - updatedIntervels[i]) % 2 === 0) {

            stack.push(updatedIntervels[i])
            i++
            continue
        }
        stack.push(top)
        count++
        i = i + 2



    }

    return count

};

console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]))
console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))
console.log(eraseOverlapIntervals([[1, 2], [2, 3]]))