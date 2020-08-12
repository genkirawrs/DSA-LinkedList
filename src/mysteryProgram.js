function WhatDoesThisProgramDo(lst) {
    let current = lst.head;
    while (current !== null) {
        let newNode = current;
        while (newNode.next !== null) {
            if (newNode.next.value === current.value) {
                newNode.next = newNode.next.next;
            }
            else {
                newNode = newNode.next;
            }
        }
        current = current.next;
    }
}



// the function accepts a linked list and begins at the head of the list.
// while we haven't reached the end of the list, we take the current node and then loop through the remainder of the list in the nested while loop.
// this time complexity would be Polynomial?
