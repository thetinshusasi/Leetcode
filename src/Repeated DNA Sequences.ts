// The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.

// For example, "ACGAATTCCG" is a DNA sequence.
// When studying DNA, it is useful to identify repeated sequences within the DNA.

// Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.



// Example 1:

// Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
// Output: ["AAAAACCCCC","CCCCCAAAAA"]
// Example 2:

// Input: s = "AAAAAAAAAAAAA"
// Output: ["AAAAAAAAAA"]


// Constraints:

// 1 <= s.length <= 105
// s[i] is either 'A', 'C', 'G', or 'T'.

function findRepeatedDnaSequences(s: string): string[] {
    const charSet = new Set()
    const resSet: Set<string> = new Set()

    if (!s || s.length < 9) return []

    let i = 0
    let j = 10
    let len = s.length
    while (j <= len) {

        const subString = s.substring(i, j)
        i++
        j++
        if (!charSet.has(subString)) {
            charSet.add(subString)

            continue
        }

        resSet.add(subString)





    }
    return Array.from(resSet)

};


// function findRepeatedDnaSequences(s: string): string[] {
//     // Initialize a Set to store encountered sequences
//     let seen = new Set();
//     // Initialize a Set to store repeated sequences
//     let res = new Set();

//     // Iterate through the input string to find repeated sequences
//     for (let i = 0; i <= s.length - 10; i++) {
//         // Extract a 10-letter sequence from the input string
//         const seq = s.slice(i, i + 10);

//         // Check if the sequence has been seen before
//         seen.has(seq) ? res.add(seq) : seen.add(seq);
//     }

//     // Convert the Set of repeated sequences to an array and return it
//     return [...res];
// };
console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"))