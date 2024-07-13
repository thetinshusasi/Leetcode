// Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

// Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.



// Example 1:

// Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
// Output: true
// Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
// Example 2:

// Input: hand = [1,2,3,4,5], groupSize = 4
// Output: false
// Explanation: Alice's hand can not be rearranged into groups of 4.



// Constraints:

// 1 <= hand.length <= 104
// 0 <= hand[i] <= 109
// 1 <= groupSize <= hand.length

// function isNStraightHand(hand: number[], groupSize: number): boolean {

//     if (groupSize === 0 || !hand.length || hand.length % groupSize !== 0) return false

//     let sortedArr = hand.sort((a, b) => a - b)

//     let i = 0
//     let stack: number[] = []
//     while (sortedArr.length && i < sortedArr.length) {

//         if (stack.length === groupSize) {

//             i = 0
//             stack = []
//             continue
//         }

//         if (stack.length === 0) {
//             stack.push(sortedArr[i])
//             sortedArr.splice(i, 1)

//             continue
//         }

//         const top = stack[0]
//         const currVal = sortedArr[i]

//         if (currVal === top) {
//             i++
//             continue
//         }
//         if (currVal === top + 1) {
//             stack.unshift(currVal)
//             sortedArr.splice(i, 1)
//             continue
//         }
//         return false




//     }

//     if (stack.length % groupSize !== 0 || sortedArr.length) return false

//     return true


// };

function isNStraightHand(hand: number[], groupSize: number): boolean {
}

console.log(isNStraightHand([2, 1, 2, 4, 1, 3, 3, 3], 2))