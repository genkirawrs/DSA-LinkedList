class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(name) {
        this.head = null;
	this.name = name;
	this.size = 0;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
	this.size = this.size + 1;
    }

    insertBefore(toInsert,toFind){
	if (this.head === null || this.head.value === toFind) {
            this.insertFirst(toInsert);
        }else{
            // Start at the head
            let currNode = this.head;
	    // Keep track of previous
            let previousNode = this.head;

            while ((currNode.value !== toFind)) {
		if(currNode === null){
		    console.log('item not found');
		}else{
                    // Save the previous node
                    previousNode = currNode;
                    currNode = currNode.next;
		}
            }
	    
            previousNode.next = new _Node(toInsert, previousNode.next);
	    this.size = this.size + 1;
	}
    }

    insertAfter(toInsert,toFind){
        if (this.head === null ) {
            this.insertFirst(toInsert);
        }else{ 
            // Start at the head
            let currNode = this.head;
            // Keep track of previous
            let nextNode = this.head;
            
            while ( nextNode.value !== toFind ) {
                if(nextNode.next === null){
                    console.log('item not found');
		    return;
                }else{ 
                    // Save the previous node
                    nextNode = nextNode.next;
                    currNode = nextNode;
                }
            }

            if(currNode.next === null){
		this.insertLast(toInsert);
	    } 

            currNode.next = new _Node(toInsert, currNode.next);
	    this.size = this.size + 1;
        }
    }

    insertAt(toInsert, pos){
	if (this.head === null || pos === 1) {
            this.insertFirst(toInsert);
        }else{
	    let posCounter = 1;
	    let currNode = this.head;

	    while(posCounter < pos){
		if(currNode === null){
		    this.insertLast(toInsert);
		}else{
		    currNode = currNode.next;
		}
		posCounter++;
	    }

	    this.insertBefore(toInsert,currNode.value);
	}
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
	    this.size = this.size + 1;
        }
    }

    find(item) { 
        // Start at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // Check for the item 
        while (currNode.value !== item) {
            /* Return null if it's the end of the list 
               and the item is not on the list */
            if (currNode.next === null) {
                return null;
            }
            else {
                // Otherwise, keep looking 
                currNode = currNode.next;
            }
        }
        // Found it
        return currNode;
    }

    remove(item){ 
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // If the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // Start at the head
        let currNode = this.head;
        // Keep track of previous
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            // Save the previous node 
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
	this.size = this.size - 1;
    }

}

module.exports = LinkedList;

