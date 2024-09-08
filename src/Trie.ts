class TrieNode {
    children: Map<string, TrieNode>;
    count: number;

    constructor() {
        this.children = new Map();
        this.count = 0;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
            currentNode.count++;
        }
    }

    findUniquePrefix(word: string): string {
        let currentNode = this.root;
        let prefix = "";

        for (const char of word) {
            prefix += char;
            const nextNode = currentNode.children.get(char);

            if (!nextNode) {
                return prefix;
            }

            currentNode = nextNode;

            if (currentNode.count === 1) {
                return prefix;
            }
        }

        return prefix; // In case all characters are needed to uniquely identify the word
    }
}

function findShortestUniquePrefixes(dictionary: string[]): string[] {
    const trie = new Trie();

    // Insert all words into the Trie
    dictionary.forEach(word => trie.insert(word));

    // Find the shortest unique prefix for each word
    return dictionary.map(word => trie.findUniquePrefix(word));
}

// Example usage:
const dictionary = ["dog", "cat", "car", "apple", "apricot"];
const uniquePrefixes = findShortestUniquePrefixes(dictionary);
console.log(uniquePrefixes); // Output: ["d", "cat", "car", "app", "apr"]

// class TrieNode1 {
//     children: Map<string, TrieNode1>
//     count: number
//     isEndOfWord?: boolean
//     constructor() {
//         this.children = new Map()
//         this.count = 0
//     }
// }

// class Trie1 {
//     root: TrieNode1

//     constructor() {
//         this.root = new TrieNode1()
//     }

//     insert(word: string) {

//         let currNode = this.root

//         for (let i = 0; i < word.length; i++) {
//             if (!currNode.children.has(word[i])) {
//                 currNode.children.set(word[i], new TrieNode1())
//             }

//             currNode = currNode.children.get(word[i])!
//             currNode.count++
//         }
//         currNode.isEndOfWord = true
//     }

//     findUniquePrefix(word: string): string {
//         let prefix = ""
//         let currNode = this.root

//         for (let i = 0; i < word.length; i++) {
//             const currWord = word[i]
//             prefix += currWord

//             if (!currNode.children.has(currWord)) {
//                 return prefix
//             }
//             let newNode = currNode.children.get(currWord)


//             if (newNode == undefined) {
//                 return prefix
//             }

//             if (newNode.count == 1) {
//                 return prefix
//             }


//         }

//         return prefix

//     }
//     search(word: string): boolean {
//         let currNode = this.root
//         for (let i = 0; i < word.length; i++) {
//             const currWord = word[i]
//             if (!currNode.children.has(currWord)) {
//                 return false
//             }
//             currNode = currNode.children.get(currWord)!
//         }

//         return currNode.isEndOfWord || false
//     }
//     startsWith(prefix: string): boolean {
//         let currentNode = this.root;

//         for (const char of prefix) {
//             if (!currentNode.children.has(char)) {
//                 return false;
//             }
//             currentNode = currentNode.children.get(char)!;
//         }



//         return true;
//     }

//     delete(word: string): boolean {

//         let currNode = this.root

//         for (let i = 0; i < word.length; i++) {
//             const currWord = word[i]
//             if (!currNode.children.has(currWord)) {
//                 return false
//             }
//             currNode = currNode.children.get(currWord)!
//         }
//         currNode.count--
//         if (currNode.count == 0) {
//             currNode.isEndOfWord = false
//         }
//         return true


//     }
//     startsWith1(prefix: string): boolean {

//         let currNode = this.root
//         for (let i = 0; i < prefix.length; i++) {
//             const currWord = prefix[i]
//             if (!currNode.children.has(currWord)) {
//                 return false
//             }
//             currNode = currNode.children.get(currWord)!
//         }
//         return true

//     }

//     delete1(word: string): void {
//         this.deleteHelper(this.root, word, 0);
//     }

//     private deleteHelper(currentNode: TrieNode1, word: string, index: number): boolean {
//         if (index === word.length) {
//             if (!currentNode.isEndOfWord) {
//                 return false; // Word not found
//             }

//             currentNode.isEndOfWord = false;

//             // If the current node has no other children, return true to indicate it can be deleted
//             return currentNode.children.size === 0;
//         }

//         const char = word[index];
//         const nextNode = currentNode.children.get(char);

//         if (!nextNode) {
//             return false; // Word not found
//         }

//         const shouldDeleteCurrentNode = this.deleteHelper(nextNode, word, index + 1);

//         if (shouldDeleteCurrentNode) {
//             currentNode.children.delete(char);
//             // Return true if no children left and not the end of another word
//             return currentNode.children.size === 0 && !currentNode.isEndOfWord;
//         }

//         return false;
//     }

//     deleteHelper1(word: string, currRoot: TrieNode1, index: number): boolean {
//         if (index === word.length) {

//             if (!currRoot.isEndOfWord) {
//                 console.log("word not found")
//                 return false
//             }
//             currRoot.isEndOfWord = false

//             return currRoot.children.size === 0

//         }

//         let newRoot = currRoot.children.get(word[index])

//         if (newRoot === undefined) {
//             console.log("word not found")
//             return false

//         }
//         let shouldWeDeleteThisNode = this.deleteHelper1(word, newRoot, index + 1)

//         if (shouldWeDeleteThisNode) {
//             currRoot.children.delete(word[index])

//             return currRoot.children.size === 0 && !currRoot.isEndOfWord

//         }

//         return false


//     }
// }
