// Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).

// Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive roughly at the same time.

// Implement the HitCounter class:

// HitCounter() Initializes the object of the hit counter system.
// void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may happen at the same timestamp.
// int getHits(int timestamp) Returns the number of hits in the past 5 minutes from timestamp (i.e., the past 300 seconds).


// Example 1:

// Input
// ["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
// [[], [1], [2], [3], [4], [300], [300], [301]]
// Output
// [null, null, null, null, 3, null, 4, 3]

// Explanation
// HitCounter hitCounter = new HitCounter();
// hitCounter.hit(1);       // hit at timestamp 1.
// hitCounter.hit(2);       // hit at timestamp 2.
// hitCounter.hit(3);       // hit at timestamp 3.
// hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
// hitCounter.hit(300);     // hit at timestamp 300.
// hitCounter.getHits(300); // get hits at timestamp 300, return 4.
// hitCounter.getHits(301); // get hits at timestamp 301, return 3.


// Constraints:

// 1 <= timestamp <= 2 * 109
// All the calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing).
// At most 300 calls will be made to hit and getHits.

/// Time complexity log n
class HitCounter {

    private hits: { key: number, value: number }[]
    private timerangeInSeconds: number

    constructor(timerangeInSeconds: number = 300) {
        this.timerangeInSeconds = timerangeInSeconds
        this.hits = new Array<{ key: number, value: number }>()
    }

    public hit(timestamp: number): void {
        if (this.hits.length == 0) {
            this.hits.push({ key: timestamp, value: 1 })
            return
        }

        const lastHit = this.hits[this.hits.length - 1]

        if (lastHit.key == timestamp) {
            lastHit.value++
            return
        }
        this.hits.push({ key: timestamp, value: 1 })



    }



    /// Time complexity log n
    public getHits(timestamp: number): number {
        if (this.hits.length === 0) return 0

        const targetTime = timestamp - this.timerangeInSeconds ? timestamp - this.timerangeInSeconds : 0

        let count = 0

        let left = 0
        let right = this.hits.length

        while (left < right) {
            const mid = Math.floor((left + right) / 2)



            if (this.hits[mid].key > targetTime) {
                right = mid - 1
            } else {
                left = mid + 1
            }

        }


        count = this.hits.length - left

        this.hits = this.hits.slice(left)
        return count
    }
}




//space complexity O(n)
class HitCounter2 {
    private hits: number[];
    private times: number[];
    private size: number;
    private windowSize: number;

    constructor(windowSize: number = 300) {
        // Number of slots in the circular buffer, here it's equal to the window size (e.g., 300 seconds for 5 minutes)
        this.windowSize = windowSize;
        this.size = windowSize;
        this.hits = new Array(this.size).fill(0);
        this.times = new Array(this.size).fill(0);
    }

    // Record a hit at a given timestamp
    hit(timestamp: number): void {
        const index = timestamp % this.size;

        // If the time at this index is different, it means we've wrapped around, so reset
        if (this.times[index] !== timestamp) {
            this.times[index] = timestamp;
            this.hits[index] = 1;
        } else {
            // Otherwise, increment the hit count at this index
            this.hits[index]++;
        }
    }

    // Get the number of hits in the past 'windowSize' seconds
    getHits(timestamp: number): number {
        let totalHits = 0;

        for (let i = 0; i < this.size; i++) {
            if (timestamp - this.times[i] < this.windowSize) {
                totalHits += this.hits[i];
            }
        }

        return totalHits;
    }
}






