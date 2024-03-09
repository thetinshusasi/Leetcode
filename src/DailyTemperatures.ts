// Given an array of integers temperatures represents the daily temperatures,

// return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Example 1:

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]
// Example 2:

// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]
// Example 3:

// Input: temperatures = [30,60,90]
// Output: [1,1,0]

// Constraints:

// 1 <= temperatures.length <= 105
// 30 <= temperatures[i] <= 100

// function dailyTemperatures(temperatures: number[]): number[] {
//     let i = 0;
//     let j = 1;
//     const len = temperatures.length;
//     const answer = [];

//     while (i < len) {
//         let count = 1;
//         if (temperatures[i] < temperatures[j]) {
//             answer.push(count);
//         } else {
//             while (j < len) {
//                 if (temperatures[i] < temperatures[j]) {
//                     answer.push(count);
//                     break;
//                 } else {
//                     j++;
//                     count++;
//                     continue;
//                 }
//             }
//             if (j == len) {
//                 count = 0;
//                 answer.push(count);
//             }
//         }
//         i++;
//         j = i + 1;
//     }

//     return answer;
// }



// Intuitions :  find the next greater array element from the current element

// we are  keeping track of the  values  that are larger than the current one 
// so if we encounter that the current element is larger than the top value in the stack , we pop the value from stack

// we will contiue popping element till  we find a larger element or the stack is empty (0 in that case) , 
// once we find a larger element or stack is empty , we will push the current element to the stack

// we don't need any elements smaller that current element in the stack as we are not going to use it

// Youtube : https://www.youtube.com/watch?v=ekFs9Nb2RNQ

interface Temp {
    index: number,
    ele: number
}
function dailyTemperatures(temperatures: number[]): number[] {

    const stack: Temp[] = []
    const len = temperatures.length
    const res = new Array<number>(len)

    for (let index = len - 1; index >= 0; index--) {

        const currObj: Temp = {
            index,
            ele: temperatures[index]
        }

        while (stack.length) {

            const topObj: Temp = stack[0]
            if (!topObj) break

            if (currObj.ele < topObj.ele) {
                res[index] = topObj.index - currObj.index
                stack.unshift(currObj)
                break
            }

            stack.shift()



        }
        if (!stack.length) {
            res[index] = 0
            stack.unshift(currObj)

        }

    }
    return res
};

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
