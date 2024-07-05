function islandsAndTreasure(grid: number[][]): number[][] {
    const rows = grid.length
    const cols = grid[0].length

    let queue = []

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            if (grid[i][j] === 0) {
                queue.push([i, j])
            }

        }
    }

    while (queue.length) {
        const newQueue: number[][] = []
        for (let i = 0; i < queue.length; i++) {
            const row = queue[i][0]
            const col = queue[i][1]
            const val = grid[row][col]

            if (row + 1 < rows && grid[row + 1][col] === 2147483647) {
                grid[row + 1][col] = val + 1
                newQueue.push([row + 1, col])

            }
            if (row - 1 >= 0 && grid[row - 1][col] === 2147483647) {
                grid[row - 1][col] = val + 1
                newQueue.push([row - 1, col])

            }
            if (col - 1 >= 0 && grid[row][col - 1] === 2147483647) {
                grid[row][col - 1] = val + 1
                newQueue.push([row, col - 1])

            }
            if (col + 1 < cols && grid[row][col + 1] === 2147483647) {
                grid[row][col + 1] = val + 1
                newQueue.push([row, col + 1])

            }


        }

        queue = JSON.parse(JSON.stringify(newQueue))

    }

    return grid


}

const grid = [[2147483647, -1, 0, 2147483647], [2147483647, 2147483647, 2147483647, -1], [2147483647, -1, 2147483647, -1], [0, -1, 2147483647, 2147483647]]

console.log(islandsAndTreasure(grid))