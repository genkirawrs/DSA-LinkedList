require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const LinkedList = require('./linkedlist')

function main(){
    let linkedList = new LinkedList('SLL'); 

    linkedList.insertFirst('Apollo');
    linkedList.insertLast('Boomer');
    linkedList.insertLast('Helo');
    linkedList.insertLast('Husker');
    linkedList.insertLast('Starbuck');
    linkedList.insertLast('Tauhida');

    linkedList.remove('Husker');
    linkedList.insertBefore('Athena','Boomer');
    linkedList.insertAfter('Hotdog','Helo');
    linkedList.insertAt('Kat', 3);
    linkedList.remove('Tauhida');

    return linkedList;
}



//supplemental functions drills
function display(list){
    let listLength = list.size;
    let pos = 1;
    let currNode = list.head;
    let str = currNode.value;

    while( pos <= listLength ){
	if(currNode.next !== null){
   	    currNode = currNode.next;
	    str = str + ' -> ' + currNode.value;
	}
	pos++;
    }

    console.log(str);
}

function size(list){
    console.log(list.size);
}

function isEmpty(list){
    if(list.head === null){
	return true;
    }else{
	return false;
    }
}

function findPrevious(list, toFind){
    let listLength = list.size;
    let currNode = list.head;
    let prevNode = list.head;

    if(toFind === currNode){
	console.log('there is no node before head node');
	return;
    }

    while( currNode.next !== null ){
	prevNode = currNode;
	currNode = currNode.next;
	if(currNode.value === toFind){
		return prevNode.value;
	}
    }
}

function findLast(list){
    let currNode = list.head;

    while( currNode.next !== null ){
	currNode = currNode.next;
    }

    return currNode;
}



//Reverse a list drill
function reverseList(list){
    currHead = list.head;
    currNode = currHead.next;
//console.log(currNode);
//console.log('----');
    nextNode = currNode.next;
    prevNode = list.head;
    prevNode.next = null;

    while(nextNode !== null){
//console.log('======');
	currNode.next = prevNode;
	prevNode = currNode;
//console.log(prevNode);
	currNode = nextNode;
//console.log(currNode);
	nextNode = nextNode.next;
//console.log(nextNode);
//console.log('======');
    }
    currNode.next = prevNode;
    list.head = currNode;
    return list;
}


//Find 3rd from last Drill
function thirdFromLast(list){
        let valueList = [];
    
    let currNode = list.head;
    
    while(currNode !== null){
        valueList.push(currNode.value);
        currNode = currNode.next;
    }

    return list.find(valueList[valueList.length - 3]);
}


//Find Middle Element Drill
function findMiddle(list){
    let valueList = [];

    let currNode = list.head;

    while(currNode !== null){
	valueList.push(currNode.value);
	currNode = currNode.next;
    }

    return list.find(valueList[Math.floor(valueList.length / 2)]);
}


//is circular drill
function isCircularList(list){
    let currNode = list.head.next;//start 1 after list.head

    while(currNode !== null){
	let startNode = list.head;
	while(startNode !== currNode){
		if(startNode === currNode.next){
		    return true;
		}else{
		    startNode = startNode.next
		}
	}
	currNode = currNode.next;
    }

    return false;
}


//Sortingn list drill
function sortList(list){
    let currNode = list.head;
    let prevNode = list.head;


    while( currNode !== null ){
	if( currNode.value < prevNode.value){
	    let startNode = list.head;

	    while(startNode !== currNode){
  	        if( currNode.value < startNode.value ){
		    list.remove(currNode.value);
		    list.insertBefore(currNode.value, startNode.value);
		    break;
	        }
	    }
	}
	prevNode = currNode;
	currNode = currNode.next;
    }

    return list;
}



    let linkedList = new LinkedList('TEST');

    linkedList.insertFirst(3);
    linkedList.insertLast(2);
    linkedList.insertLast(5);
    linkedList.insertLast(7);
    linkedList.insertLast(1);


let sortListTest = sortList(linkedList);
display(sortListTest);

/*
//setting up circular linked list
    let linkedList = new LinkedList('TEST');

    linkedList.insertFirst('Apollo');
    linkedList.insertLast('Boomer');
    linkedList.insertLast('Helo');
    linkedList.insertLast('Husker');
    linkedList.insertLast('Starbuck');
    linkedList.insertLast('Tauhida');

    let test = linkedList.find('Tauhida');
        test.next = linkedList.head;

let testCircular = isCircularList(linkedList);
console.log(testCircular);

let testNonCircular = isCircularList(testList);
console.log(testNonCircular);


//console.log(testList);
display(testList);


//let findMidElement = findMiddle(testList);
//console.log(findMidElement);

//let findThirdFromLast = thirdFromLast(testList);
//console.log(findThirdFromLast);


//let reverseTest = reverseList(testList);
//display(reverseTest);

*/


/*
size(testList);
let previous = findPrevious(testList, 'Kat');
console.log(previous);

let last = findLast(testList);
console.log(last);

let testList2 = new LinkedList('TEST');
if(isEmpty(testList2)){
console.log('list is empty');
}else{
console.log('list has stuff in it');
}
*/














const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
   res.send('Hello, boilerplate!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app
