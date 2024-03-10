// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.



// Example 1:

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].


// Constraints:

// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 105
// intervals is sorted by starti in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 105


// Intuiton : put the new intervel at the correct location (sorted by start value of item) ==> this is important
// first Elem in the stack  and start from the second element in array 

// if topElem[end]  value < currELem[start] then push the currElem
// else update the topElem with [Math.min(topStart, start), Math.max(topEnd, end)] and push it DisposableStack

// return stack


function insert(intervals: number[][], newInterval: number[]): number[][] {



    const updatedIntervels: number[][] = []
    let isintervelInserted = false
    const newIntervalStart = newInterval[0]
    const newIntervalEnd = newInterval[1]


    if (intervals.length) {
        intervals.forEach(item => {
            const currItemStart = item[0]
            const currItemEnd = item[1]


            if (!isintervelInserted && currItemStart > newIntervalStart) {
                updatedIntervels.push(newInterval)
                isintervelInserted = true

            }
            updatedIntervels.push(item)


        })

        if (!isintervelInserted) {
            updatedIntervels.push(newInterval)
            isintervelInserted = true
        }

    }
    else {
        updatedIntervels.push(newInterval)
        return updatedIntervels
    }




    let i = 1

    const len = updatedIntervels.length

    const stack: number[][] = []
    stack.push(updatedIntervels[0])
    while (i < len) {

        const top = stack.pop()
        if (!top) break

        const topStart = top[0]
        const topEnd = top[1]

        const start = updatedIntervels[i][0]
        const end = updatedIntervels[i][1]

        if (topEnd < start) {
            stack.push(top)
            stack.push(updatedIntervels[i])
            i++
            continue
        }
        stack.push([Math.min(topStart, start), Math.max(topEnd, end)])
        i++

    }

    return stack



};

console.log(insert([[1, 5]], [2, 7]))

// console.log(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]))