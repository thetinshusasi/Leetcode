// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example 1:


// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
// Example 2:


// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
// Example 3:


// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false


// Constraints:

// m == board.length
// n = board[i].length
// 1 <= m, n <= 6
// 1 <= word.length <= 15
// board and word consists of only lowercase and uppercase English letters.


function exist(board: string[][], word: string): boolean {
    const rows = board.length
    const cols = board[0].length
    const breakRecurrsion = {
        break: false

    }
    const dp = new Array(board.length).fill(0).map(item => new Array(board[0].length).fill(false))


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === word[0]) {

                if (recurrWordSearch(board, rows, cols, 0, word, dp, i, j, breakRecurrsion)) {
                    return true
                }
            }
        }
    }
    return false



};

function recurrWordSearch(board: string[][], rows: number,
    cols: number,
    currWordIndex: number,
    word: string,
    visitedDP: boolean[][],
    i: number,
    j: number,
    breakRecurrsion: { break: boolean }): boolean {
    if (breakRecurrsion.break) {
        return true
    }

    if (currWordIndex === word.length) {
        breakRecurrsion.break = true
        return true
    }



    if (i < 0 || i >= rows || j < 0 || j >= cols) {
        return false
    }

    if (board[i][j] !== word[currWordIndex]) {
        return false
    }

    if (visitedDP[i][j]) {
        return false
    }

    visitedDP[i][j] = true
    const res = recurrWordSearch(board, rows, cols, currWordIndex + 1, word, visitedDP, i + 1, j, breakRecurrsion) ||
        recurrWordSearch(board, rows, cols, currWordIndex + 1, word, visitedDP, i - 1, j, breakRecurrsion) ||
        recurrWordSearch(board, rows, cols, currWordIndex + 1, word, visitedDP, i, j + 1, breakRecurrsion) ||
        recurrWordSearch(board, rows, cols, currWordIndex + 1, word, visitedDP, i, j - 1, breakRecurrsion)
    visitedDP[i][j] = false
    return res



}

console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"))