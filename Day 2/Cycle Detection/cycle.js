const Node = (value, next = null) => {
  return {
    value,
    next,
  };
};

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

function findCycleBeginNode(firstNode) {
  let slowerPointer = firstNode;
  let fasterPointer = firstNode;

  while (fasterPointer !== null && fasterPointer.next !== null) {
    slowerPointer = slowerPointer.next;
    fasterPointer = fasterPointer.next.next;

    if (fasterPointer === slowerPointer) {
      fasterPointer = firstNode;

      while (fasterPointer !== slowerPointer) {
        fasterPointer = fasterPointer.next;
        slowerPointer = slowerPointer.next;
      }

      return fasterPointer;
    }
  }

  return null;
}

const cycleNode = findCycleBeginNode(n1);
if (cycleNode !== null) console.log(cycleNode.value);
else console.log('no cycles!');
