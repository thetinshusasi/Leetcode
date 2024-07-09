// Given two strings s and t of lengths m and n respectively, return the minimum window 
// substring
//  of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

// The testcases will be generated such that the answer is unique.



// Example 1:

// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
// Example 2:

// Input: s = "a", t = "a"
// Output: "a"
// Explanation: The entire string s is the minimum window.
// Example 3:

// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.


// Constraints:

// m == s.length
// n == t.length
// 1 <= m, n <= 105
// s and t consist of uppercase and lowercase English letters.


const checkIsWindowValid = (validationFreqMap: { [key: string]: number },
    /// this is constant operation as size pf number chars is 26
    currWindowFreqMap: { [key: string]: number }): boolean => {

    let isValid = true;
    for (let key in validationFreqMap) {
        if (!currWindowFreqMap[key] || currWindowFreqMap[key] < validationFreqMap[key]) {
            isValid = false
            break
        }

    }
    return isValid;
}

const removeOrDecrementCharVal = (currWindowFreqMap: { [key: string]: number }, charVal: string): { [key: string]: number } => {

    if (currWindowFreqMap[charVal] > 1) {
        currWindowFreqMap[charVal] = currWindowFreqMap[charVal] - 1
    } else {
        delete currWindowFreqMap[charVal]
    }

    return {
        ...currWindowFreqMap,

    }
}

// Inittuition: create two frequency maps one for validation and other for current window
// Approach: Add and remove elements to currenTWindowFreqMap and check  if it is valid or not to validationFreqMap
// If it is invalid then  increment the right pointer 
// if it is valid then calculate the window size and update the minWindow, then increment the left pointer and 
// decrement/ remove(if currenTWindowFreqMap[i] < 2) the left or i_th element from currenTWindowFreqMap, but don't add 
// anything new to current window as you are not traversing to new character
// do this till right pointer reaches the end of string

// Many operatopns are constant time operations 


function minWindow(s: string, t: string): string {

    const validationFreqMap: { [key: string]: number } = {}
    let currWindowFreqMap: { [key: string]: number } = {}

    for (let charVal of t) {

        if (!validationFreqMap[charVal]) {
            validationFreqMap[charVal] = 1
            continue
        }
        validationFreqMap[charVal] = validationFreqMap[charVal] + 1
    }

    let i = 0
    let j = 0
    let minWindow = Number.MAX_SAFE_INTEGER
    let substringVal = ""

    let isLeftIncremented = false
    while (j < s.length) {

        if (!isLeftIncremented) {
            const charVal = s[j]

            if (!currWindowFreqMap[charVal]) {
                currWindowFreqMap[charVal] = 1
            }
            else {
                currWindowFreqMap[charVal] = currWindowFreqMap[charVal] + 1
            }
        }



        const isWindowValid = checkIsWindowValid(validationFreqMap, currWindowFreqMap) // constant operation

        if (!isWindowValid) {

            isLeftIncremented = false
            j++
            continue
        }
        else {
            const newMinWindow = j - i + 1
            if (newMinWindow < minWindow) {
                minWindow = newMinWindow
                substringVal = s.substring(i, j + 1) // constant operation

            }


            currWindowFreqMap = removeOrDecrementCharVal(currWindowFreqMap, s[i]) // constant operation
            i++
            isLeftIncremented = true
        }



    }

    return substringVal

};

console.log(minWindow("ADOBECODEBANC", "ABC"))