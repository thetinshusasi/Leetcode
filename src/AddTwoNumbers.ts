// ou are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.



// Example 1:


// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]


// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

class ListNode2 {
    val: number
    next: ListNode2 | null
    constructor(val?: number, next?: ListNode2 | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


function addTwoNumbers(l1: ListNode2 | null, l2: ListNode2 | null): ListNode2 | null {

    if (!l1) return l2
    if (!l2) return l1
    let topList: ListNode2 | null = l1
    let bottomList: ListNode2 | null = l2
    let resHeadNode: ListNode2 | null = null
    let currResNode: ListNode2 | null = null
    let carryOver = 0

    let isl1Null = false
    let isL2Null = false
    let isl1NullAllow = true
    let isL2NullAllow = true
    while (topList || bottomList || carryOver) {

        if (!isL2Null && !isl1Null) {

            if (!resHeadNode) {
                if (topList && bottomList) {
                    let res = bottomList.val + topList.val + carryOver
                    carryOver = 0
                    let onePostion = res
                    if (res > 9) {
                        onePostion = res % 10
                        carryOver = 1
                    }
                    currResNode = new ListNode2(onePostion, null)
                    resHeadNode = currResNode
                    topList = topList && topList?.next || null
                    bottomList = bottomList && bottomList?.next || null
                }
                if (!topList) {
                    isl1Null = true
                }
                if (!bottomList) {
                    isL2Null = true
                }
                continue

            }
            else {

                if (topList && bottomList) {
                    let res = bottomList.val + topList.val + carryOver
                    carryOver = 0
                    let onePostion = res
                    if (res > 9) {
                        onePostion = res % 10
                        carryOver = 1
                    }
                    if (currResNode) {
                        currResNode.next = new ListNode2(onePostion, null)
                        currResNode = currResNode.next

                    }
                    topList = topList && topList?.next || null
                    bottomList = bottomList && bottomList?.next || null

                }
                if (!topList) {
                    isl1Null = true
                }
                if (!bottomList) {
                    isL2Null = true
                }
                continue

            }


        }
        if (isl1Null && isL2NullAllow && bottomList) {

            if (bottomList) {
                let res = bottomList.val + carryOver
                carryOver = 0
                let onePostion = res
                if (res > 9) {
                    onePostion = res % 10
                    carryOver = 1
                }
                if (currResNode) {
                    currResNode.next = new ListNode2(onePostion, null)
                    currResNode = currResNode.next
                }

                bottomList = bottomList && bottomList?.next || null

                if (!bottomList) {
                    isL2NullAllow = false
                }


            }
            continue
        }

        if (isL2Null && isl1NullAllow && topList) {

            if (currResNode && topList) {
                let res = topList.val + carryOver
                carryOver = 0
                let onePostion = res
                if (res > 9) {
                    onePostion = res % 10
                    carryOver = 1
                }

                if (currResNode) {
                    currResNode.next = new ListNode2(onePostion, null)
                    currResNode = currResNode.next
                }
                topList = topList && topList?.next || null
                if (!topList) {
                    isl1NullAllow = false
                }

            }
            continue

        }
        if (carryOver) {
            if (currResNode) {
                currResNode.next = new ListNode2(carryOver, null)
                currResNode = currResNode.next
            }
            carryOver = 0
        }
    }


    return resHeadNode

};

let l1 = new ListNode2(9, null)
l1.next = new ListNode2(9, null)
l1.next.next = new ListNode2(9, null)
l1.next.next.next = new ListNode2(9, null)
l1.next.next.next.next = new ListNode2(9, null)
l1.next.next.next.next.next = new ListNode2(9, null)

let l2 = new ListNode2(9, null)
l2.next = new ListNode2(9, null)
l2.next.next = new ListNode2(9, null)
l2.next.next.next = new ListNode2(9, null)

let l3 = addTwoNumbers(l1, l2)
let arr1: number[] = []

while (l3) {
    arr1.push(l3.val)

    l3 = l3.next

}
// console.log(arr)