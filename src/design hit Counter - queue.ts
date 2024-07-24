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





// space complexity O(n)
class HitCounter1 {
    bucketSize = 300;
    buckets = new Map(); // Map<bucketId, hitcounter[]>

    hit(timestamp: number) {
        const bucketId = this.getBucketId(timestamp);
        const bucket = this.buckets.get(bucketId)
            ?? new Array(this.bucketSize).fill(0);
        bucket[timestamp % this.bucketSize]++;
        this.buckets.set(bucketId, bucket);
    }

    getHits(timestamp: number) {
        let hits = 0;
        const currBucketId = this.getBucketId(timestamp);
        // count current bucket
        const currBucket = this.buckets.get(currBucketId) ?? [];
        for (let sec = 0; sec < currBucket.length && sec <= timestamp % this.bucketSize; sec++) {
            hits += currBucket[sec];
        }

        // count prev bucket
        const prevBucket = this.buckets.get(currBucketId - 1) ?? [];
        for (let sec = prevBucket.length - 1; sec > timestamp % this.bucketSize; sec--) {
            hits += prevBucket[sec];
        }

        return hits;
    }

    getBucketId(timestamp: number) {
        return timestamp / this.bucketSize | 0;
    }
}


const hitCounter1 = new HitCounter1()
hitCounter1.hit(1)
hitCounter1.hit(301)
hitCounter1.hit(302)
hitCounter1.hit(303)
hitCounter1.hit(304)
hitCounter1.hit(305)
hitCounter1.hit(305)

console.log(hitCounter1.getHits(604))
console.log(hitCounter1.getHits(604))


class HitCounter2 {
    private ranges: number[];

    constructor() {
        this.ranges = [];
    }

    hit(timestamp: number): void {
        this.ranges.push(timestamp);
    }

    getHits(timestamp: number): number {
        const target = timestamp - 300;
        let low = -1;
        let high = this.ranges.length - 1;

        while (low < high) {
            const mid = Math.ceil((low + high) / 2);
            if (this.ranges[mid] <= target) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }

        return this.ranges.length - low - 1;
    }
}

// Example usage:
const hitCounter2 = new HitCounter2();
hitCounter2.hit(1);
hitCounter2.hit(2);
hitCounter2.hit(3);
console.log(hitCounter2.getHits(4)); // Output: 3
hitCounter2.hit(300);
console.log(hitCounter2.getHits(300)); // Output: 4
console.log(hitCounter2.getHits(301)); // Output: 3



class HitCounter4 {
    readonly hitCounterMap: Map<number, number>;

    constructor() {
        this.hitCounterMap = new Map()
    }

    hit(timestamp: number): void {
        if (this.hitCounterMap.has(timestamp)) {
            const currentHits: number = this.hitCounterMap.get(timestamp) || 0
            this.hitCounterMap.set(timestamp, currentHits + 1)
        } else {
            this.hitCounterMap.set(timestamp, 1)
        }
    }

    getHits(timestamp: number): number {
        const fiveMinutesAgoTimestamp: number = timestamp - 300;
        let numberOfHits: number = 0;
        for (let t = timestamp; t > fiveMinutesAgoTimestamp; t--) {
            if (this.hitCounterMap.has(t)) {
                numberOfHits += this.hitCounterMap.get(t) || 0;
            }
        }
        return numberOfHits;
    }
}


class HitCounter5 {
    private times: number[];
    private hits: number[];
    private size: number;

    constructor() {
        this.size = 300;
        this.times = new Array(this.size).fill(0);
        this.hits = new Array(this.size).fill(0);
    }

    hit(timestamp: number): void {
        const index = timestamp % this.size;
        if (this.times[index] !== timestamp) {
            // New timestamp, reset the slot
            this.times[index] = timestamp;
            this.hits[index] = 1;
        } else {
            // Existing timestamp, increment the hit count
            this.hits[index]++;
        }
    }

    getHits(timestamp: number): number {
        let totalHits = 0;
        for (let i = 0; i < this.size; i++) {
            if (timestamp - this.times[i] < this.size) {
                totalHits += this.hits[i];
            }
        }
        return totalHits;
    }
}

// Example usage:?

const hitCounter5 = new HitCounter5()
hitCounter5.hit(1)
hitCounter5.hit(301)
hitCounter5.hit(302)
hitCounter5.hit(303)
hitCounter5.hit(304)
hitCounter5.hit(305)
hitCounter5.hit(305)

console.log(hitCounter5.getHits(604))
console.log(hitCounter5.getHits(604))
