// Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

// The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).


const recur = (nodes: number[], start: number, end: number, result: number[][], graph: number[][]): void => {
    if (start === end) {
        result.push([...nodes])
        return

    }

    for (let i = 0; i < graph[start].length; i++) {

        nodes.push(graph[start][i])
        recur(nodes, graph[start][i], end, result, graph)
        nodes.pop()

    }


}
// function allPathsSourceTarget(graph: number[][]): number[][] {

//     const result: number[][] = []


//     recur([0], 0, graph.length - 1, result, graph)
//     return result


// };
function allPathsSourceTarget(graph: number[][]): number[][] {

    const hashmap: Map<number, number[]> = new Map()
    const result: number[][] = []
    graph.forEach((item, index) => {
        hashmap.set(index, item)
    })
    const nodeArr: number[] = []

    allPathRecur(0, graph.length - 1, nodeArr, result, hashmap)

    return result



};

function allPathRecur(currNode: number, dest: number, nodeArr: number[], result: number[][], hashmap: Map<number, number[]>): void {

    if (currNode === dest) {

        result.push([...nodeArr, dest])
        return
    }
    const adjList = hashmap.get(currNode) || []
    adjList.forEach(item => {
        nodeArr.push(currNode)

        allPathRecur(item, dest, nodeArr, result, hashmap)
        nodeArr.pop()

    })
}

console.log(allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []]))
