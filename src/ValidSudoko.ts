// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

function isValidSudoku(board: string[][]): boolean {

    const rows = board.length
    const cols = board[0].length

    if (!rows || !cols || rows !== cols || rows % 3 !== 0 || cols % 3 !== 0) {
        return false
    }

    for (let i = 0; i < rows; i++) {
        let myset = new Set()

        for (let j = 0; j < cols; j++) {

            if (board[i][j] !== ".") {
                if (myset.has(board[i][j])) {
                    return false
                }
                myset.add(board[i][j])

            }



        }

    }

    for (let i = 0; i < cols; i++) {
        let myset = new Set()

        for (let j = 0; j < rows; j++) {

            if (board[j][i] !== ".") {
                if (myset.has(board[j][i])) {
                    return false
                }
                myset.add(board[j][i])

            }

        }

    }

    const totalLen = rows / 3

    for (let i = 0; i < totalLen; i++) {
        for (let j = 0; j < totalLen; j++) {
            let myset = new Set()
            for (let k = (0 + i * 3); k < (3 + i * 3); k++) {
                for (let l = (0 + j * 3); l < (3 + j * 3); l++) {
                    if (board[k][l] !== ".") {
                        if (myset.has(board[k][l])) {
                            return false
                        }
                        myset.add(board[k][l])

                    }
                }
            }

        }
    }

    return true




};
const board = [[".", ".", "4", ".", ".", ".", "6", "3", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], ["5", ".", ".", ".", ".", ".", ".", "9", "."], [".", ".", ".", "5", "6", ".", ".", ".", "."], ["4", ".", "3", ".", ".", ".", ".", ".", "1"], [".", ".", ".", "7", ".", ".", ".", ".", "."], [".", ".", ".", "5", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."]]
isValidSudoku(board)