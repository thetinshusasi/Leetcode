// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.



// Example 1:

// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1
// Example 2:

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

interface DictStringBool {
    [key: string]: boolean;
}

const noOfIslands = (grid: string[][],
    currRow: number,
    currCol: number,
    maxRow: number,
    maxCol: number,
    hashmap: DictStringBool) => {

    if (currRow === maxRow || currCol === maxCol || currRow < 0 || currCol < 0) return

    if (grid[currRow][currCol] === "0" || hashmap[`i-${currRow}-j-${currCol}`]) {
        return
    }
    hashmap[`i-${currRow}-j-${currCol}`] = true

    noOfIslands(grid, currRow, currCol - 1, maxRow, maxCol, hashmap)
    noOfIslands(grid, currRow - 1, currCol, maxRow, maxCol, hashmap)
    noOfIslands(grid, currRow, currCol + 1, maxRow, maxCol, hashmap)
    noOfIslands(grid, currRow + 1, currCol, maxRow, maxCol, hashmap)


}

function numIslands(grid: string[][]): number {

    let count = 0
    let rows = grid.length
    let cols = grid[0].length
    let hashmap: DictStringBool = {}

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === "0" || hashmap[`i-${i}-j-${j}`]) {
                continue
            }
            count++
            // hashmap[`i-${i}-j-${j}`] = true

            noOfIslands(grid, i, j, rows, cols, hashmap)


        }

    }
    return count

};

let grid1 = [
    ["1", "1", "1"],
    ["0", "1", "0"],
    ["1", "1", "1"]]


console.log(numIslands(grid1))