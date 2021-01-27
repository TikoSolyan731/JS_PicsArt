const createStack = () => {
	let size = 0;
	let elements = [];

	return {
		getSize: function () {
			return size;
		},

		isEmpty: function () {
			return size === 0;
		},

		push: function (value) {
			size++;
			elements.push(value);
		},

		pop: function () {
			if (this.isEmpty()) return;

			size--;
			return elements.pop();
		},

		toString: function () {
			return elements.toString();
		},
	};
};

const stack1 = createStack();

stack1.push(2);
stack1.push(3);
stack1.push(6);
stack1.push(5);

console.log(String(stack1));
console.log(stack1.getSize());
stack1.pop();
console.log(String(stack1));

const createQueue = () => {
	const enqueueStack = createStack();
	const dequeueStack = createStack();

	let size = 0;
	let head = null;

	return {
		getSize: function () {
			return size;
		},

		isEmpty: function () {
			return size === 0;
		},

		enqueue: function (value) {
			size++;
			enqueueStack.push(value);
		},

		dequeue: function () {
			if (this.isEmpty()) return;

			if (!dequeueStack.isEmpty()) return dequeueStack.pop();

			while (!enqueueStack.isEmpty()) {
				dequeueStack.push(enqueueStack.pop());
			}

			return dequeueStack.pop();
		},

		toString: function () {
			const enqString = String(enqueueStack)
				.split(',')
				.reverse()
				.join(' -> ');
			const deqString = String(dequeueStack);

			if (enqueueStack.isEmpty())
				return deqString.split(',').join(' -> ');
			else if (!dequeueStack.isEmpty()) {
				return enqString
					.concat(' -> ')
					.concat(deqString.split(',').join(' -> '));
			}

			return enqString + deqString;
		},
	};
};

const queue1 = createQueue();

queue1.enqueue(1);
queue1.enqueue(3);
queue1.enqueue(2);
queue1.enqueue(4);
queue1.enqueue(5);
console.log(String(queue1));
queue1.dequeue();
queue1.dequeue();
console.log(String(queue1));
queue1.enqueue(8);
queue1.enqueue(10);
console.log(String(queue1));
