// // There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

// // You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.


// Example 1:


// Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
// Output: 700
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
// Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
// Example 2:


// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
// Output: 200
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
// Example 3:


// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
// Output: 500
// Explanation:
// The graph is shown above.
// The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.


// Constraints:

// 1 <= n <= 100
// 0 <= flights.length <= (n * (n - 1) / 2)
// flights[i].length == 3
// 0 <= fromi, toi < n
// fromi != toi
// 1 <= pricei <= 104
// There will not be any multiple flights between two cities.
// 0 <= src, dst, k < n
// src != dst

// interface Flight {
//     pathFound: boolean,
//     cost: number
// }

// interface Network1 {
//     values: number[],
//     cost: number
// }

// class MinHeap3 {

//     heap: Network1[] = []
//     constructor() {

//         this.heap = new Array(1)
//         this.heap[0] = {
//             values: [],
//             cost: Number.NEGATIVE_INFINITY
//         }

//     }
//     insert(value: Network1) {
//         this.heap.push(value)
//         this.bubbleUp(this.heap.length - 1)
//     }

//     getParentIndex = (index: number) => {
//         const parentIndex = Math.floor((index) / 2)
//         return parentIndex

//     }

//     getLeftChildIndex = (i: number): number | null => {
//         if (2 * i >= this.heap.length) {
//             return null
//         }
//         return 2 * i
//     }
//     getRightChildIndex = (i: number): number | null => {
//         if ((2 * i) + 1 >= this.heap.length) {
//             return null
//         }
//         return (2 * i) + 1
//     }




//     bubbleUp = (index: number) => {

//         const parentIndex = this.getParentIndex(index)

//         if (parentIndex === 0) {
//             return
//         }

//         if (this.heap[parentIndex].cost > this.heap[index].cost) {
//             [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
//             this.bubbleUp(parentIndex)
//         }

//     }

//     peek = (): Network1 => {
//         if (this.heap.length > 1) {
//             return this.heap[1];
//         }
//         throw new Error("Heap is empty");
//     }

//     extractMin = () => {

//         if (this.heap.length === 1) {
//             return null
//         }


//         if (this.heap.length === 2) {
//             return this.heap.pop()
//         }
//         const min = this.heap[1]


//         const lastElement = this.heap.pop()

//         if (lastElement !== undefined) {
//             this.heap[1] = lastElement
//             this.bubbleDown(1)
//         }



//         return min


//     }

//     bubbleDown(index: number) {
//         const leftChildIndex = this.getLeftChildIndex(index);
//         const rightChildIndex = this.getRightChildIndex(index);

//         let smallest = index;

//         if (leftChildIndex !== null && this.heap[leftChildIndex].cost < this.heap[smallest].cost) {
//             smallest = leftChildIndex;
//         }

//         if (rightChildIndex !== null && this.heap[rightChildIndex].cost < this.heap[smallest].cost) {
//             smallest = rightChildIndex;
//         }

//         if (smallest !== index) {
//             [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
//             this.bubbleDown(smallest);
//         }
//     }



//     isEmpty = () => {
//         return this.heap.length === 1
//     }
// }



// function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
//     const hashMap: Map<number, number[][]> = new Map()

//     flights.forEach(flight => {
//         const [from, to, price] = flight
//         if (hashMap.has(from)) {
//             hashMap.get(from)?.push(flight)
//         } else {
//             hashMap.set(from, [flight])
//         }


//     })

//     const flightObj: Flight = {
//         pathFound: false,
//         cost: Number.POSITIVE_INFINITY
//     }
//     let stop = 0

//     const visited: boolean[] = new Array(n).fill(false)
//     visited[src] = true

//     const minHeap = new MinHeap3()

//     if (!hashMap.has(src)) {
//         return -1
//     }

//     const adjList = hashMap.get(src)
//     adjList?.forEach(item => {
//         const [from, to, price] = item
//         minHeap.insert({
//             values: [from, to],
//             cost: price
//         })
//     })


//     recurr1(stop, dst, minHeap, k, hashMap, flightObj, adjList?.length || 0, visited)

//     if (flightObj.pathFound) {
//         return flightObj.cost
//     }
//     return -1




// };

// function recurr1(stop: number, dest: number, minHeap: MinHeap3, k: number, hashMap: Map<number, number[][]>, flightObj: Flight, elmAddedCount: number, visited: boolean[]) {

//     let adjCount = elmAddedCount

//     while (!minHeap.isEmpty()) {
//         let newStopCount = stop + 1

//         const data = minHeap.extractMin()
//         adjCount = adjCount - 1
//         if (data) {
//             const values = data.values
//             const cost = data.cost

//             if (cost > flightObj.cost) {
//                 continue
//             }

//             const [s, d] = values
//             if (visited[d]) {
//                 if (adjCount === 0) {
//                     return
//                 }
//                 continue

//             }
//             visited[d] = true

//             if (d === dest) {

//                 flightObj.pathFound = true
//                 if (cost < flightObj.cost) {
//                     flightObj.cost = cost
//                 }
//                 visited[d] = false
//                 return
//             }



//             const newMinHeap = new MinHeap3()
//             let len = 0
//             if (newStopCount < k + 1) {
//                 const adjList = hashMap.get(d)
//                 adjList?.forEach(item => {
//                     const [from, to, price] = item
//                     newMinHeap.insert({
//                         values: [from, to],
//                         cost: price + cost
//                     })
//                 })
//                 len = adjList?.length || 0



//             } else {
//                 visited[d] = false
//                 if (adjCount === 0) {
//                     return
//                 }

//                 continue
//             }

//             recurr1(stop + 1, dest, newMinHeap, k, hashMap, flightObj, len, visited)



//         }
//     }

// }

// interface Fare {
//     minCost: number
// }
// function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
//     const fare = {
//         minCost: Number.POSITIVE_INFINITY

//     }

//     const hashMap: Map<number, number[][]> = new Map()

//     flights.forEach(flight => {
//         const [from, to, price] = flight
//         if (hashMap.has(from)) {
//             hashMap.get(from)?.push(flight)
//         } else {
//             hashMap.set(from, [flight])
//         }


//     })
//     const visited = new Array(n).fill(false)
//     visited[src] = true

//     recurr2(fare, src, dst, 0, k, 0, hashMap, visited)

//     if (fare.minCost === Number.POSITIVE_INFINITY) {
//         return -1
//     }
//     return fare.minCost



// }

// function recurr2(fare: Fare, currNode: number, dest: number, currStop: number, k: number, currCost: number, hashMap: Map<number, number[][]>, visited: boolean[]) {

//     if (fare.minCost < currCost) {
//         return
//     }

//     if (currNode === dest) {
//         fare.minCost = currCost
//         return
//     }


//     if (currStop >= k + 1) {
//         return
//     }



//     const adjList = hashMap.get(currNode) || []

//     visited[currNode] = true
//     for (let i = 0; i < adjList.length; i++) {

//         const [from, to, price] = adjList[i]
//         recurr2(fare, to, dest, currStop + 1, k, currCost + price, hashMap, visited)
//     }
//     visited[currNode] = false
// }


function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    // Initialize prices array to store the cheapest prices from src to each city
    let prices = new Array(n).fill(Infinity);
    prices[src] = 0; // Set the price of the source city to 0

    let changed = true; // Flag to track if any updates were made in the current iteration

    // Iterate through the number of stops from src to dst, and stop early if no updates are made
    for (let stopI = 0; stopI <= k && changed; stopI++) {
        // Create a copy of the prices array to store the current iteration's cheapest prices
        const currPrices = Array.from(prices);
        changed = false; // Reset the flag at the beginning of each iteration

        // Iterate through each flight and update the cheapest prices for each destination city
        for (const [flightFrom, flightTo, flightPrice] of flights) {
            const newPrice = prices[flightFrom] + flightPrice; // Calculate the new price
            if (newPrice < currPrices[flightTo]) {
                currPrices[flightTo] = newPrice; // Update the cheapest price if a better one is found
                changed = true; // Update the flag if an update is made
            }
        }

        prices = currPrices; // Update prices array with the prices from the current iteration
    }

    // If there is no route from src to dst within k stops, return -1; otherwise, return the cheapest price
    return (prices[dst] === Infinity) ? -1 : prices[dst];
}



console.log(findCheapestPrice(5, [[0, 1, 5], [0, 3, 2], [1, 2, 5], [1, 4, 1], [3, 1, 2], [4, 2, 1]], 0, 2, 2))
