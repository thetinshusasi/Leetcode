// A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

// Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

// For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

// Return the head of the copied linked list.

// The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

// val: an integer representing Node1.val
// random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
// Your code will only be given the head of the original linked list.



// Example 1:


// Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Example 2:


// Input: head = [[1,1],[2,1]]
// Output: [[1,1],[2,1]]
// Example 3:



// Input: head = [[3,null],[3,0],[3,null]]
// Output: [[3,null],[3,0],[3,null]]


// Constraints:

// 0 <= n <= 1000
// -104 <= Node1.val <= 104
// Node1.random is null or is pointing to some node in the linked list.

class Node1 {
    val: number
    next: Node1 | null
    random: Node1 | null
    constructor(val?: number, next?: Node1, random?: Node1) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.random = (random === undefined ? null : random)
    }
}


// youtube : https://www.youtube.com/watch?v=4apaOcK586U&t=331s

/// Time Complexity O(n) and Space Complexity O(1)  but requires original list modification

// function copyRandomList(head: Node1 | null): Node1 | null {


//     let newHead: Node1 | null = null

//     let currNode = head
//     let newCurrNode: Node1 | null = null
//     while (currNode) {

//         newCurrNode = new Node1(currNode.val)
//         let temp = currNode.next
//         currNode.next = newCurrNode
//         newCurrNode.next = temp
//         currNode = newCurrNode.next

//     }
//     currNode = head
//     newHead = head?.next || null

//     while (currNode) {
//         let currNoderandom = currNode.random

//         let newCurrNode: Node1 | null = currNode.next

//         if (newCurrNode) {
//             newCurrNode.random = currNoderandom?.next || null
//             newCurrNode.next = newCurrNode?.next?.next || null

//         }
//         currNode = currNode.next?.next || null

//     }


//     return newHead

// }

/// Time Complexity O(n) and Space Complexity O(n)  but no modification to original list


function copyRandomList(head: Node1 | null): Node1 | null {

    if (!head) return null

    const hashMap = new Map()
    let currNode: Node1 | null = head
    while (currNode) {

        hashMap.set(currNode, new Node1(currNode.val,))
        currNode = currNode.next
    }
    currNode = head
    while (currNode) {
        let newNode = hashMap.get(currNode)
        newNode.next = hashMap.get(currNode.next) || null
        newNode.random = hashMap.get(currNode.random) || null
        currNode = currNode.next

    }
    return hashMap.get(head)


}






