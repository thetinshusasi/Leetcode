// // Given an m x n board of characters and a list of strings words, return all words on the board.

// // Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.




// Example 1:


// Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]
// Example 2:


// Input: board = [["a","b"],["c","d"]], words = ["abcb"]
// Output: []


// Constraints:

// m == board.length
// n == board[i].length
// 1 <= m, n <= 12
// board[i][j] is a lowercase English letter.
// 1 <= words.length <= 3 * 104
// 1 <= words[i].length <= 10
// words[i] consists of lowercase English letters.
// All the strings of words are unique.

class TrieNode1 {
    children: Map<string, TrieNode1>
    count: number
    isEndOfWord?: boolean
    constructor() {
        this.children = new Map()
        this.count = 0
    }
}

class Trie1 {
    root: TrieNode1

    constructor() {
        this.root = new TrieNode1()
    }

    insert(word: string) {

        let currNode = this.root

        for (let i = 0; i < word.length; i++) {
            if (!currNode.children.has(word[i])) {
                currNode.children.set(word[i], new TrieNode1())
            }

            currNode = currNode.children.get(word[i])!
            currNode.count++
        }
        currNode.isEndOfWord = true
    }

    findUniquePrefix(word: string): string {
        let prefix = ""
        let currNode = this.root

        for (let i = 0; i < word.length; i++) {
            const currWord = word[i]
            prefix += currWord

            if (!currNode.children.has(currWord)) {
                return prefix
            }
            let newNode = currNode.children.get(currWord)


            if (newNode == undefined) {
                return prefix
            }

            if (newNode.count == 1) {
                return prefix
            }


        }

        return prefix

    }
    search(word: string): boolean {
        let currNode = this.root
        for (let i = 0; i < word.length; i++) {
            const currWord = word[i]
            if (!currNode.children.has(currWord)) {
                return false
            }
            currNode = currNode.children.get(currWord)!
        }

        return currNode.isEndOfWord || false
    }
    startsWith(prefix: string): boolean {
        let currentNode = this.root;

        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char)!;
        }



        return true;
    }

    delete(word: string): boolean {

        let currNode = this.root

        for (let i = 0; i < word.length; i++) {
            const currWord = word[i]
            if (!currNode.children.has(currWord)) {
                return false
            }
            currNode = currNode.children.get(currWord)!
        }
        currNode.count--
        if (currNode.count == 0) {
            currNode.isEndOfWord = false
        }
        return true


    }
    startsWith1(prefix: string): boolean {

        let currNode = this.root
        for (let i = 0; i < prefix.length; i++) {
            const currWord = prefix[i]
            if (!currNode.children.has(currWord)) {
                return false
            }
            currNode = currNode.children.get(currWord)!
        }
        return true

    }

    delete1(word: string): void {
        this.deleteHelper(this.root, word, 0);
    }

    private deleteHelper(currentNode: TrieNode1, word: string, index: number): boolean {
        if (index === word.length) {
            if (!currentNode.isEndOfWord) {
                return false; // Word not found
            }

            currentNode.isEndOfWord = false;

            // If the current node has no other children, return true to indicate it can be deleted
            return currentNode.children.size === 0;
        }

        const char = word[index];
        const nextNode = currentNode.children.get(char);

        if (!nextNode) {
            return false; // Word not found
        }

        const shouldDeleteCurrentNode = this.deleteHelper(nextNode, word, index + 1);

        if (shouldDeleteCurrentNode) {
            currentNode.children.delete(char);
            // Return true if no children left and not the end of another word
            return currentNode.children.size === 0 && !currentNode.isEndOfWord;
        }

        return false;
    }

    deleteHelper1(word: string, currRoot: TrieNode1, index: number): boolean {
        if (index === word.length) {

            if (!currRoot.isEndOfWord) {
                console.log("word not found")
                return false
            }
            currRoot.isEndOfWord = false

            return currRoot.children.size === 0

        }

        let newRoot = currRoot.children.get(word[index])

        if (newRoot === undefined) {
            console.log("word not found")
            return false

        }
        let shouldWeDeleteThisNode = this.deleteHelper1(word, newRoot, index + 1)

        if (shouldWeDeleteThisNode) {
            currRoot.children.delete(word[index])

            return currRoot.children.size === 0 && !currRoot.isEndOfWord

        }

        return false


    }
}

function findWords(board: string[][], words: string[]): string[] {

    const trie = new Trie1()
    words.forEach(word => trie.insert(word))
    const rows = board.length
    const cols = board[0].length
    const res: string[] = []
    const visitedDP = new Array(rows).fill(0).map(item => new Array(cols).fill(false))
    const wordsSet = new Set<string>()

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            recurrWordSearchII(board, res, i, j, rows, cols, visitedDP, trie, "", wordsSet)
        }
    }

    return Array.from(new Set(res))





};

function recurrWordSearchII(board: string[][], res: string[], i: number, j: number, rows: number, cols: number, visitedDP: boolean[][], trie: Trie1, word: string, wordsSet: Set<string>) {


    if (i < 0 || j < 0 || i >= rows || j >= cols) {
        return
    }

    if (visitedDP[i][j]) return

    const newWord = word + board[i][j]

    if (wordsSet.has(newWord)) {
        return
    }

    if (!trie.startsWith(newWord)) {
        wordsSet.add(newWord)
        trie.delete(newWord)
        return
    }

    if (trie.search(newWord)) {
        res.push(newWord)
    }
    visitedDP[i][j] = true

    recurrWordSearchII(board, res, i + 1, j, rows, cols, visitedDP, trie, newWord, wordsSet)
    recurrWordSearchII(board, res, i - 1, j, rows, cols, visitedDP, trie, newWord, wordsSet)
    recurrWordSearchII(board, res, i, j + 1, rows, cols, visitedDP, trie, newWord, wordsSet)
    recurrWordSearchII(board, res, i, j - 1, rows, cols, visitedDP, trie, newWord, wordsSet)

    visitedDP[i][j] = false


}




console.log(findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]))