// There are n cars going to the same destination along a one-lane road. The destination is target miles away.

// You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).

// A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

// A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

// If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

// Return the number of car fleets that will arrive at the destination.



// Example 1:

// Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
// Output: 3
// Explanation:
// The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12.
// The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
// The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.
// Note that no other cars meet these fleets before the destination, so the answer is 3.
// Example 2:

// Input: target = 10, position = [3], speed = [3]
// Output: 1
// Explanation: There is only one car, hence there is only one fleet.
// Example 3:

// Input: target = 100, position = [0,2,4], speed = [4,2,1]
// Output: 1
// Explanation:
// The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The fleet moves at speed 2.
// Then, the fleet (speed 2) and the car starting at 4 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.


// Constraints:

// n == position.length == speed.length
// 1 <= n <= 105
// 0 < target <= 106
// 0 <= position[i] < target
// All the values of position are unique.
// 0 < speed[i] <= 106

// intuition : create list of position and time (time taken to reach the end individually) and sort them by position
// Now you have list of time for each car to reach the end individually . 
// Important  : So now we have iterate from the back of the  list  because  cars in front can cause cars in behind to slow and this effect can casacade to multiple 
// cars behind (example : carFleet(10, [0, 4, 2], [2, 1, 3])) 

// This problem is not related to any genric problem . This is just the problem that needs some data arangement to reach a correct solution


interface FleetObj {
    distanceFromTarget: number,
    time: number
}

function carFleet(target: number, position: number[], speed: number[]): number {

    let leastToMaxDistanceFromTarget: FleetObj[] = []

    for (let index = 0; index < position.length; index++) {
        const curr: FleetObj = {
            distanceFromTarget: target - position[index],
            time: (target - position[index]) / speed[index]
        }
        leastToMaxDistanceFromTarget.push(curr)

    }
    leastToMaxDistanceFromTarget = leastToMaxDistanceFromTarget.sort((a, b) => a.distanceFromTarget - b.distanceFromTarget)
    let fleet = 1

    let i = 0, j = 1, len = leastToMaxDistanceFromTarget.length






    while (i < len - 1) {

        if (leastToMaxDistanceFromTarget[i].time < leastToMaxDistanceFromTarget[i + 1].time) {
            fleet++
        }

        if (leastToMaxDistanceFromTarget[i].time > leastToMaxDistanceFromTarget[i + 1].time) {
            leastToMaxDistanceFromTarget[i + 1].time = leastToMaxDistanceFromTarget[i].time



        }
        i++
        j++

    }


    return fleet


};


interface Cars {
    positionFromTarget: number,
    speed: number,
    distanceAwayFromTarget: number
    timeAwayFromTarget: number
}

function carFleet1(target: number, position: number[], speed: number[]): number {

    let carArr: Cars[] = []

    for (let i = 0; i < position.length; i++) {
        const currCar: Cars = {
            positionFromTarget: position[i],
            speed: speed[i],
            distanceAwayFromTarget: target - position[i],
            timeAwayFromTarget: (target - position[i]) / speed[i]
        }
        carArr.push(currCar)

    }

    const sortedCarArr = carArr.sort((a, b) => b.distanceAwayFromTarget - a.distanceAwayFromTarget)
    const timeArr = sortedCarArr.map(car => car.timeAwayFromTarget)
    console.log(timeArr)
    let fleet = 1


    let i = timeArr.length - 1
    let j = i - 1

    while (i >= 0 && j >= 0) {

        if (sortedCarArr[i].timeAwayFromTarget >= sortedCarArr[j].timeAwayFromTarget) {
            sortedCarArr[j].timeAwayFromTarget = sortedCarArr[i].timeAwayFromTarget
            i--
            j--
            continue
        }

        if (sortedCarArr[i].timeAwayFromTarget < sortedCarArr[j].timeAwayFromTarget) {
            fleet++

        }

        i--
        j--

    }
    return fleet


};


// function carFleet(target: number, position: number[], speed: number[]): number {
//     let fleetCount = 0;
//     let lastArrivalTime = 0;

//     // Combine position and speed into a single array and sort by position in descending order
//     const cars = position.map((pos, index) => [pos, speed[index]]);
//     cars.sort((a, b) => b[0] - a[0]);

//     // Iterate over each car's position and speed
//     for (let [pos, spd] of cars) {
//         const arrivalTime = (target - pos) / spd;
//         // Check if the current car forms a new fleet
//         if (arrivalTime > lastArrivalTime) {
//             fleetCount++;
//             lastArrivalTime = arrivalTime;
//         }
//     }
//     return fleetCount;
// }


// console.log(carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))
// console.log(carFleet1(10, [0, 4, 2], [2, 1, 3]))
console.log(carFleet1(10, [6, 8], [3, 2]))