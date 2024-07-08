const updateGen = (board1: number[][], newGrid: number[][], rows: number, cols: number) => {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const boardVal = board1[i][j];
            const row = i;
            const col = j;
            let count = 0;

            if (boardVal === 0) {
                if (row - 1 >= 0 && col - 1 >= 0 && board1[row - 1][col - 1] === 1) count++;
                if (row - 1 >= 0 && col >= 0 && board1[row - 1][col] === 1) count++;
                if (row - 1 >= 0 && col + 1 < cols && board1[row - 1][col + 1] === 1) count++;
                if (row >= 0 && col - 1 >= 0 && board1[row][col - 1] === 1) count++;
                if (row >= 0 && col + 1 < cols && board1[row][col + 1] === 1) count++;
                if (row + 1 < rows && col - 1 >= 0 && board1[row + 1][col - 1] === 1) count++;
                if (row + 1 < rows && col >= 0 && board1[row + 1][col] === 1) count++;
                if (row + 1 < rows && col + 1 < cols && board1[row + 1][col + 1] === 1) count++;

                if (count === 3) {
                    newGrid[row][col] = 1;
                } else {
                    newGrid[row][col] = 0;
                }
            } else {
                if (row - 1 >= 0 && col - 1 >= 0 && board1[row - 1][col - 1] === 1) count++;
                if (row - 1 >= 0 && col >= 0 && board1[row - 1][col] === 1) count++;
                if (row - 1 >= 0 && col + 1 < cols && board1[row - 1][col + 1] === 1) count++;
                if (row >= 0 && col - 1 >= 0 && board1[row][col - 1] === 1) count++;
                if (row >= 0 && col + 1 < cols && board1[row][col + 1] === 1) count++;
                if (row + 1 < rows && col - 1 >= 0 && board1[row + 1][col - 1] === 1) count++;
                if (row + 1 < rows && col >= 0 && board1[row + 1][col] === 1) count++;
                if (row + 1 < rows && col + 1 < cols && board1[row + 1][col + 1] === 1) count++;

                if (count === 2 || count === 3) {
                    newGrid[row][col] = 1;
                } else {
                    newGrid[row][col] = 0;
                }
            }
        }
    }
    return newGrid;
};

function simulateGameOfLife(board1: number[][], generations: number): number[][] {
    const rows = board1.length;
    const cols = board1[0].length;
    let tempGrid = board1;

    for (let i = 0; i < generations; i++) {
        let newGrid = Array(rows).fill(0).map(() => Array(cols).fill(0));
        newGrid = updateGen(tempGrid, newGrid, rows, cols);
        console.log(newGrid);
        tempGrid = newGrid;
    }


    return tempGrid;
}

// Test the function
let board1: number[][] = [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
];
const generations = 2;
simulateGameOfLife(board1, generations);

function arraysEqual(a: any[][], b: any[][]) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i].length !== b[i].length) return false;
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) return false;
        }
    }
    return true;
}

function runTest(board1: number[][], generations: number, expected: number[][]) {
    console.log("Initial board1:");
    console.table(board1);
    simulateGameOfLife(board1, generations);
    console.log("Expected result after " + generations + " generations:");
    console.table(expected);
}

let testCases = [
    {
        board1: [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        generations: 1,
        expected: [
            [0, 1, 1, 0],
            [1, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    },
    {
        board1: [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 0]
        ],
        generations: 1,
        expected: [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 0]
        ]
    },
    {
        board1: [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        generations: 1,
        expected: [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ]
    },
    {
        board1: [
            [1, 1],
            [1, 1]
        ],
        generations: 2,
        expected: [
            [1, 1],
            [1, 1]
        ]
    }
];

testCases.forEach(({ board1, generations, expected }, index) => {
    console.log("Running test case #" + (index + 1));
    const res = simulateGameOfLife(board1, generations);
    console.log("Result after " + generations + " generations:");
    console.table(board1);
    console.log("generations:");
    console.table(res);

    console.log(arraysEqual(board1, expected) ? "Test passed!" : "Test failed!");
});
