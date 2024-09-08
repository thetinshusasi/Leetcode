interface TaskData {
    task: string;
    count: number;
    frequency: number;
}

class MaxHeap1 {

    heap: TaskData[] = []

    constructor() {
        // Start with an initial value of NEGATIVE_INFINITY (dummy value)
        this.heap = [{
            task: '',
            count: Number.NEGATIVE_INFINITY,
            frequency: Number.NEGATIVE_INFINITY
        }];
    }

    insert(value: TaskData) {
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

        if (this.heap[parentIndex].frequency < this.heap[index].frequency) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
            this.bubbleUp(parentIndex)
        }
    }

    peek = (): TaskData => {
        if (this.heap.length > 1) {
            return this.heap[1];
        }
        throw new Error("Heap is empty");
    }

    extractMax = (): TaskData | null => {
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

        if (leftChildIndex !== null && this.heap[leftChildIndex].frequency > this.heap[largest].frequency) {
            largest = leftChildIndex
        }

        if (rightChildIndex !== null && this.heap[rightChildIndex].frequency > this.heap[largest].frequency) {
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

class Solution {
    leastInterval(tasks: string[], n: number): number {
        const taskCount: Map<string, number> = new Map();

        // Step 1: Count frequency of each task
        for (let task of tasks) {
            taskCount.set(task, (taskCount.get(task) || 0) + 1);
        }

        // Step 2: Create a max heap based on the frequency
        const maxHeap = new MaxHeap1();
        for (let [task, count] of taskCount) {
            maxHeap.insert({
                task: task,
                count: count,
                frequency: count
            });
        }

        let time = 0;
        const queue: [TaskData, number][] = []; // Queue to track cooldown periods

        // Step 3: Process tasks
        while (!maxHeap.isEmpty() || queue.length > 0) {
            time += 1;

            if (!maxHeap.isEmpty()) {
                // Pop the most frequent task
                const taskData = maxHeap.extractMax()!;
                taskData.frequency -= 1;

                // If there are more instances of this task, add it to the cooldown queue
                if (taskData.frequency > 0) {
                    queue.push([taskData, time + n]);
                }
            }

            // Check if the first task in the queue can be reinserted into the max heap
            if (queue.length > 0 && queue[0][1] === time) {
                const taskToReinsert = queue.shift()![0];
                maxHeap.insert(taskToReinsert);
            }
        }

        return time;
    }
}