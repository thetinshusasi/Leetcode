// function removeDuplicates(nums: number[]): number {

//     if(!nums.length){
//         return 0
//     }
//     if(nums.length === 1){
//         return 1
//     }

//     let i = 0
//     let j = i + 1
//     let resArr : number[]= []
    
//     while(i < nums.length){
//         if(i === nums.length){
//             resArr.push(nums[i])
//             break
//         }
//         if(nums[i] === nums[j]){
//             j++
//             continue
//         }
//         resArr.push(nums[i])
//         i = j
//         j = j + 1

//     }
//     return resArr.length
// };


function removeDuplicates(nums: number[]): number {
let currIndex = 1
let i = 0
let j = 1
 while(j< nums.length){
    if(nums[i] === nums[j]){
        j++
        continue
    }
    nums[currIndex] = nums[j]
    i = j
    j = j + 1
    currIndex = currIndex + 1 
 }
//  console.log(nums)
 return currIndex
    
};

console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
console.log(removeDuplicates([0,0,1]))