// You are given the head of a singly linked-list. The list can be represented as:

// L0 → L1 → … → Ln - 1 → Ln
// Reorder the list to be on the following form:

// L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// You may not modify the values in the list's nodes. Only nodes themselves may be changed.



// Example 1:


// Input: head = [1,2,3,4]
// Output: [1,4,2,3]
// Example 2:


// Input: head = [1,2,3,4,5]
// Output: [1,5,2,4,3]


// Constraints:

// The number of nodes in the list is in the range [1, 5 * 104].
// 1 <= Node.val <= 1000




class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


/**
 Do not return anything, modify head in-place instead.
 */


//  Inituition : Break the problem into parts
// 1. find the mid  point 
// 2. reverse the second half of the link List . so practise the algo of reversing the linkedlist
// 3. Loop the any one of the link list , however there are two edge cases 
//     3.1 when first link list + 1 longer the second linked list 
//     3.2 when both list  are of the same size  

const reverseList = (head: ListNode | null): ListNode | null => {
    let prev = null
    let curr = head

    while (curr) {
        let nextnode = curr.next
        curr.next = prev
        prev = curr

        if (!nextnode) {
            break
        }
        curr = nextnode


    }
    return curr


}
function reorderList(head: ListNode | null): void {

    if (!head || !head.next) return

    let slow: ListNode | null = head
    let fast: ListNode | null = head.next || null

    if (!fast || !fast.next) return

    let mid: ListNode | null = null

    while (fast.next) {

        if (fast.next.next) {
            //even no of nodes
            slow = slow && slow.next
            fast = fast.next.next

        } else {
            // break when we have odd no of  linked list
            slow = slow?.next || null
            fast = fast?.next
        }
    }

    mid = slow
    let mid_plus_one = slow?.next || null

    if (mid) {
        mid.next = null

    }



    let lastnode = reverseList(mid_plus_one)
    let firstnode: ListNode | null = head




    while (firstnode && lastnode) {
        let temp: ListNode | null = firstnode && firstnode.next
        firstnode.next = lastnode
        let tempLast: ListNode | null = lastnode && lastnode?.next
        if (lastnode) {
            lastnode.next = temp

        }
        firstnode = temp
        lastnode = tempLast

        if (!firstnode) {
            // when both list are of same size and we moved from the last item in the list
            break
        }

        if (!lastnode) {
            // when first list (n/2 +1 longer) and we moved from the second list's   last item  to null
            firstnode.next = null
            break
        }



    }


};

