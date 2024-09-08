class MaxHeap {

    heap: number[] = []

    constructor(size: number) {
        // Start with an initial value of POSITIVE_INFINITY
        this.heap = new Array(1)
        this.heap[0] = Number.POSITIVE_INFINITY
    }

    insert(value: number) {
        this.heap.push(value)
        this.bubbleUp(this.heap.length - 1)
    }

    getParentIndex = (index: number): number => {
        return Math.floor((index) / 2)
    }

    getLeftChildIndex = (index: number): number | null => {
        const leftIndex = 2 * index
        return leftIndex < this.heap.length ? leftIndex : null
    }

    getRightChildIndex = (index: number): number | null => {
        const rightIndex = (2 * index) + 1
        return rightIndex < this.heap.length ? rightIndex : null
    }

    bubbleUp = (index: number) => {
        const parentIndex = this.getParentIndex(index)

        if (parentIndex === 0) {
            return
        }

        if (this.heap[parentIndex] < this.heap[index]) { // Change comparator to <
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
            this.bubbleUp(parentIndex)
        }
    }

    peek = (): number => {
        if (this.heap.length > 1) {
            return this.heap[1];
        }
        throw new Error("Heap is empty");
    }

    extractMax = (): number | null => { // Rename from extractMin to extractMax
        if (this.heap.length === 1) {
            return null
        }

        if (this.heap.length === 2) {
            return this.heap.pop() || null
        }

        const max = this.heap[1]
        const lastElement = this.heap.pop()

        if (lastElement !== undefined) {
            this.heap[1] = lastElement
            this.bubbleDown(1)
        }

        return max
    }

    bubbleDown(index: number) {
        const leftChildIndex = this.getLeftChildIndex(index)
        const rightChildIndex = this.getRightChildIndex(index)

        let largest = index

        if (leftChildIndex !== null && this.heap[leftChildIndex] > this.heap[largest]) { // Change comparator to >
            largest = leftChildIndex
        }

        if (rightChildIndex !== null && this.heap[rightChildIndex] > this.heap[largest]) { // Change comparator to >
            largest = rightChildIndex
        }

        if (largest !== index) {
            [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]]
            this.bubbleDown(largest)
        }
    }

    isEmpty = (): boolean => {
        return this.heap.length === 1
    }
}
