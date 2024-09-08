// You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

// The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

// Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.


interface myTree {
    cost: number
    vertices: number[][]
}

class DisjointSet {

    parents: number[] = []
    ranks: number[] = []
    hashIndexToPoint: Map<number, number[]>
    hashmapPointToIndex: Map<number[], number>
    sum: number = 0
    sortedPointsAsc: number[][]


    constructor(len: number, sortedPointsAsc: number[][]) {
        this.sortedPointsAsc = sortedPointsAsc
        this.hashIndexToPoint = new Map()
        this.hashmapPointToIndex = new Map()
        sortedPointsAsc.forEach((item, index) => {
            this.hashmapPointToIndex.set(item, index)
            this.hashIndexToPoint.set(index, item)

        })
        this.parents = new Array(len).fill(0).map((_m, ind) => ind)
        this.ranks = new Array(len).fill(0)
    }

    find = (point: number[]): number => {
        const index = this.hashmapPointToIndex.get(point)

        if (index === undefined) {
            throw new Error('invalid point')
        }
        const parent = this.parents[index]
        if (parent === index) {
            return parent
        }
        const newPoint = this.hashIndexToPoint.get(parent)
        if (newPoint === undefined) {
            throw new Error('invalid point')
        }
        return this.find(newPoint)


    }

    findParent = (point: number[]) => {
        return this.find(point)
    }

    union = (pointA: number[], pointB: number[], weight: number) => {
        const pointAParent = this.find(pointA)
        const pointBParent = this.find(pointB)

        if (pointAParent === pointBParent) {
            return
        }
        const rankA = this.ranks[pointAParent]
        const rankB = this.ranks[pointBParent]
        this.sum += weight
        if (rankA === rankB) {
            this.ranks[pointAParent] = rankA + 1
            this.parents[pointBParent] = pointAParent

            return
        }

        if (rankA > rankB) {

            this.parents[pointBParent] = pointAParent
            return

        }

        this.parents[pointAParent] = pointBParent




    }
}

function minCostConnectPoints(points: number[][]): number {

    let treeArr: myTree[] = []

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            treeArr.push({
                cost: Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]),
                vertices: [points[i], points[j]]
            })
        }
    }

    treeArr.sort((a, b) => a.cost - b.cost)

    let sum = 0

    const disjointSet = new DisjointSet(points.length, points)


    for (let i = 0; i < treeArr.length; i++) {
        const [pointA, pointB] = treeArr[i].vertices
        const weight = treeArr[i].cost
        disjointSet.union(pointA, pointB, weight)

    }





    return disjointSet.sum





};

console.log(minCostConnectPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]))




// class DSU {
//     root: number[];
//     rank: number[];

//     constructor(size: number) {
//         this.root = Array.from({ length: size }, (_, i) => i);
//         this.rank = new Array(size).fill(1);
//     }

//     union = (x: number, y: number): void => {
//         const rootX = this.find(x);
//         const rootY = this.find(y);

//         if (rootX === rootY) {
//             return;
//         }

//         if (this.rank[rootX] > this.rank[rootY]) {
//             this.root[rootY] = rootX;
//         } else if (this.rank[rootX] < this.rank[rootY]) {
//             this.root[rootX] = rootY;
//         } else {
//             this.root[rootX] = rootY;
//             this.rank[rootY] += 1;
//         }
//     }

//     find = (x: number): number => {
//         if (x === this.root[x]) {
//             return x;
//         }
//         this.root[x] = this.find(this.root[x]);
//         return this.root[x];
//     }

//     connected = (x: number, y: number): boolean => {
//         return this.find(x) === this.find(y);
//     }
// }

// function minCostConnectPoints(points: number[][]): number {
//     const n: number = points.length;

//     // Step 1. Ascending Sort all edges by their weight
//     // TC: O(N^2)
//     const allEdges: [number, number, number][] = [];
//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             // Manhattan distance
//             const weight: number = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
//             allEdges.push([weight, i, j]);
//         }
//     }
//     // TC: O(N^2*log(N^2))
//     allEdges.sort((x, y) => x[0] - y[0]);

//     // Step 2. Add edges in that order into the MST. Skip the edges that would produce cycles in the MST
//     const dsu = new DSU(n);
//     let MSTCost: number = 0;
//     let edgesUsed: number = 0;

//     for (const [weight, node1, node2] of allEdges) {
//         if (dsu.connected(node1, node2)) {
//             continue;
//         }
//         dsu.union(node1, node2);
//         MSTCost += weight;
//         edgesUsed += 1;

//         if (edgesUsed == (n - 1)) {
//             break;
//         }
//     }

//     return MSTCost;
// }

// console.log(minCostConnectPoints([[2,-3],[-17,-8],[13,8],[-17,-15]]
// ))