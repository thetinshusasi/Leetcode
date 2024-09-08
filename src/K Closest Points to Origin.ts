// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].

interface PointData {
    distance: number,
    key: string,
    point: number[]
}

class MinHeapPointData {

    heap: PointData[] = []
    constructor() {

        this.heap = new Array(1)
        this.heap[0] = {
            distance: Number.NEGATIVE_INFINITY,
            key: '',
            point: []
        }

    }
    insert(value: PointData) {
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

        if (index > 0 && this.heap[parentIndex].distance > this.heap[index].distance) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
            this.bubbleUp(parentIndex)
        }

    }

    peek = (): PointData => {
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

        if (leftChildIndex !== null && this.heap[leftChildIndex].distance < this.heap[smallest].distance) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex !== null && this.heap[rightChildIndex].distance < this.heap[smallest].distance) {
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

function kClosest(points: number[][], k: number): number[][] {
    const minHeap = new MinHeapPointData()

    points.forEach((point) => {
        const distance = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2))
        minHeap.insert({
            distance: distance,
            key: `A${point[0]}-B${point[1]}`,
            point: point
        })
    })

    const result: number[][] = []

    while (k > 0 && !minHeap.isEmpty()) {
        const min = minHeap.extractMin()
        if (!min) {
            break
        }
        result.push(min.point)
        k--
    }

    return result

};

console.log(kClosest([[1, 3], [-2, 2]], 1))