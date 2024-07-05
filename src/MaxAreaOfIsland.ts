// 695. Max Area of Island
// Medium
// Topics
// Companies
// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

// The area of an island is the number of cells with a value 1 in the island.

// Return the maximum area of an island in grid. If there is no island, return 0.



// Example 1:


// Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// Output: 6
// Explanation: The answer is not 11, because the island must be connected 4-directionally.
// Example 2:

// Input: grid = [[0,0,0,0,0,0,0,0]]
// Output: 0


// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// grid[i][j] is either 0 or 1.

interface Counter {
    count: number;
    maxArea: number;
}

interface DictStringBool1 {

    [key: string]: boolean;

}

const islandTraveled2 = (grid: number[][], hashmap: DictStringBool1, rowIndex: number, colIndex: number, rowLen: number, colLen: number, counter: Counter) => {
    if (rowIndex < 0 || colIndex < 0 || rowIndex === rowLen || colIndex === colLen || grid[rowIndex][colIndex] === 0 || hashmap[`i-${rowIndex}-j-${colIndex}`]) {
        return

    }
    hashmap[`i-${rowIndex}-j-${colIndex}`] = true
    counter.count++

    islandTraveled2(grid, hashmap, rowIndex + 1, colIndex, rowLen, colLen, counter)
    islandTraveled2(grid, hashmap, rowIndex - 1, colIndex, rowLen, colLen, counter)

    islandTraveled2(grid, hashmap, rowIndex, colIndex + 1, rowLen, colLen, counter)
    islandTraveled2(grid, hashmap, rowIndex, colIndex - 1, rowLen, colLen, counter)






}

function maxAreaOfIsland(grid: number[][]): number {

    let count = 0
    let rows = grid.length
    let cols = grid[0].length
    let hashmap: DictStringBool1 = {

    }
    let counter: Counter = {
        count,
        maxArea: 0
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 0 || hashmap[`i-${i}-j-${j}`]) {
                continue
            }


            islandTraveled2(grid, hashmap, i, j, rows, cols, counter)

            if (counter.count > counter.maxArea) {
                counter.maxArea = counter.count
            }
            counter.count = 0


        }
    }
    return counter.maxArea

};