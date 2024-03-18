

// Example 1:


// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
// Example 2:

// Input: head = [1], n = 1
// Output: []
// Example 3:

// Input: head = [1,2], n = 1
// Output: [1]


// Constraints:

// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz


class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

    let count = - n
    let prevNode: ListNode | null = null
    let selectedNode: ListNode | null = null
    let nextNode: ListNode | null = null
    let currNode = head
    while (currNode) {
        count++
        if (count < 0) {
            currNode = currNode.next
            continue
        }

        if (count === 0) {
            selectedNode = head
            nextNode = selectedNode?.next || null

            currNode = currNode.next

            continue
        }


        prevNode = selectedNode
        selectedNode = selectedNode?.next || null
        nextNode = selectedNode?.next || null
        currNode = currNode.next

    }

    if (prevNode) {
        prevNode.next = nextNode

    }


    if (!prevNode && !nextNode && selectedNode) {
        head = null
    }

    return head

};