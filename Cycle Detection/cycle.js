const Node = (value, next = null) => {
	return {
		value,
		next,
	};
}

let n1 = Node(10);
let n2 = Node(8);
let n3 = Node(2);
let n4 = Node(6);
let n5 = Node(4);

n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;
n5.next = n2; // cycle here!

function findCycle(firstNode) {
    let slowerPointer = firstNode;
    let fasterPointer = firstNode;

    while (fasterPointer !== null && fasterPointer.next !== null) {
        slowerPointer = slowerPointer.next;
        fasterPointer = fasterPointer.next.next;

        if (fasterPointer === slowerPointer)
            return true;
    }

    return false;
}

let hasCycle = findCycle(n1);
console.log(hasCycle);