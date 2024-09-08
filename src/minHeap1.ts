class MinHeap1 {

    heap: number[] = []
    constructor(size: number) {

        this.heap = new Array(1)
        this.heap[0] = Number.NEGATIVE_INFINITY

    }
    insert(value: number) {
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

        if (this.heap[parentIndex] > this.heap[index]) {
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

        if (leftChildIndex !== null && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex !== null && this.heap[rightChildIndex] < this.heap[smallest]) {
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