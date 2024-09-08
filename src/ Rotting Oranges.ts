// ou are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.



// Example 1:


// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
// Example 2:

// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
// Example 3:

// Input: grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.


// it is BFS problem

function orangesRotting(grid: number[][]): number {
    const rows = grid.length
    const cols = grid[0].length

    let freshOranges = 0
    const queue: number[][] = []
    let minutes = 0

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                freshOranges++
            }

            if (grid[i][j] === 2) {
                queue.push([i, j])
            }
        }
    }

    while (queue.length && freshOranges) {

        const tempQueue: number[][] = []

        while (queue.length) {
            const queVal = queue.shift()


            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

            for (let i = 0; i < directions.length; i++) {
                const row = queVal && queVal[0] || 0
                const col = queVal && queVal[1] || 0

                if (row + directions[i][0] >= 0 && row + directions[i][0] < rows &&
                    col + directions[i][1] >= 0 && col + directions[i][1] < cols &&
                    grid[row + directions[i][0]][col + directions[i][1]] === 1
                ) {
                    grid[row + directions[i][0]][col + directions[i][1]] = 2
                    freshOranges--
                    tempQueue.push([row + directions[i][0], col + directions[i][1]])

                }
            }


        }

        minutes++
        queue.push(...tempQueue)
    }


    return freshOranges === 0 ? minutes : -1



};

// console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))
console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]))