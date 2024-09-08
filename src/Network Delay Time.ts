// You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

// We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.



// Example 1:


// Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
// Output: 2
// Example 2:

// Input: times = [[1,2,1]], n = 2, k = 1
// Output: 1
// Example 3:

// Input: times = [[1,2,1]], n = 2, k = 2
// Output: -1
interface Network {
    values: number[],
    weight: number
}

class MinHeap2 {

    heap: Network[] = []
    constructor(size: number) {

        this.heap = new Array(1)
        this.heap[0] = {
            values: [],
            weight: Number.NEGATIVE_INFINITY
        }

    }
    insert(value: Network) {
        this.heap.push(value)
        this.bubbleUp(this.heap.length - 1)
    }

    getParentIndex = (index: number) => {
        const parentIndex = Math.floor((index) / 2)
        return parentIndex

    }

    getLeftChildIndex = (i: number): number | null => {
        if (2 * i >= this.heap.length) {
            return null
        }
        return 2 * i
    }
    getRightChildIndex = (i: number): number | null => {
        if ((2 * i) + 1 >= this.heap.length) {
            return null
        }
        return (2 * i) + 1
    }




    bubbleUp = (index: number) => {

        const parentIndex = this.getParentIndex(index)

        if (parentIndex === 0) {
            return
        }

        if (this.heap[parentIndex].weight > this.heap[index].weight) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
            this.bubbleUp(parentIndex)
        }

    }

    peek = (): Network => {
        if (this.heap.length > 1) {
            return this.heap[1];
        }
        throw new Error("Heap is empty");
    }

    extractMin = () => {

        if (this.heap.length === 1) {
            return null
        }


        if (this.heap.length === 2) {
            return this.heap.pop()
        }
        const min = this.heap[1]


        const lastElement = this.heap.pop()

        if (lastElement !== undefined) {
            this.heap[1] = lastElement
            this.bubbleDown(1)
        }



        return min


    }

    bubbleDown(index: number) {
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);

        let smallest = index;

        if (leftChildIndex !== null && this.heap[leftChildIndex].weight < this.heap[smallest].weight) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex !== null && this.heap[rightChildIndex].weight < this.heap[smallest].weight) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            this.bubbleDown(smallest);
        }
    }



    isEmpty = () => {
        return this.heap.length === 1
    }
}

function networkDelayTime(times: number[][], n: number, k: number): number {

    const hashMap: Map<number, number[][]> = new Map()

    times.forEach(item => {
        const [s, v, w] = item

        if (!hashMap.has(s)) {
            hashMap.set(s, [item])
        }
        else {
            hashMap.set(s, [...hashMap.get(s) || [], item])
        }
    })

    const minHeap2 = new MinHeap2(n)

    const firsNode = k

    const adjList = hashMap.get(firsNode)

    if (adjList === undefined) {
        return -1
    }
    let cost = 0

    const visited = new Array(n + 1).fill(false)
    visited[k] = true
    let visitedCount = 1
    let finalCost = 0



    adjList.forEach(item => {
        const [s, v, w] = item
        minHeap2.insert({
            values: [s, v],
            weight: w
        })
    })

    while (!minHeap2.isEmpty() && visitedCount < n) {

        const data = minHeap2.extractMin()
        if (data) {

            const values = data.values
            const weight = data.weight
            const [s, v] = values
            finalCost = weight
            if (visited[v]) {
                continue
            }

            visited[v] = true
            visitedCount++

            if (!hashMap.has(v)) {
                continue
            }

            const adjList = hashMap.get(v)
            adjList?.forEach(item => {
                const [s, v, w] = item
                minHeap2.insert({
                    values: [s, v],
                    weight: w + weight
                })
            })




        }

        // if (data) {
        //     const values = data.values
        //     const weight = data.weight
        //     const [s, v] = values
        //     if (visited[v]) {
        //         continue
        //     }
        //     visited[v] = true
        //     visitedCount++
        //     const adjList = hashMap.get(v)

        //     if (adjList === undefined) {
        //         continue
        //     }

        //     adjList.forEach(item => {
        //         const [s, v, w] = item
        //         minHeap2.insert({
        //             values: [s, v],
        //             weight: w + weight
        //         })
        //     })






        // }


    }

    if (visitedCount < n) {
        return -1
    }
    return finalCost









};

console.log(networkDelayTime([[1, 2, 1]], 2, 1))



