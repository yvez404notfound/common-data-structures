class LinkedList {
	constructor() {
		this.head;
		this.tail;
		this.size = 0;
	}

	prepend = function (value) {
		const newNode = new LinkedList.Node(value, null);

		this.initList(newNode);

		this.head.next = newNode;
		this.head = this.head.next;

		this.size++;
	};

	append = function (value) {
		const newNode = new LinkedList.Node(value, null);

		this.initList(newNode);

		newNode.next = this.tail;
		this.tail = newNode;

		this.size++;
	};

	at = function (index) {
		if (index > this.size - 1) return undefined;

		let node = this.tail;
		for (let i = 0; i <= index && node !== null; i++) node = node.next;

		return node.value;
	};

	pop = function () {
		if (this.size === 0) return undefined;

		const removedNodeValue = this.head.value;
		let node = this.tail;

		while (node.next !== this.head) node = node.next;

		this.head = node;
		this.head.next = null;

		return removedNodeValue;
	};

	contains = function (value) {
		let node = this.tail;

		while (node !== null) {
			if (value === node.value) return true;
			node = node.next;
		}

		return false;
	};

	findIndex = function (value) {
		let node = this.tail;

		let i = 0;
		while (node !== null) {
			if (value === node.value) return i;
			node = node.next;
			i++;
		}

		return -1;
	};

	toString = function () {
		let str = "";
		let node = this.tail;

		while (node !== null) {
			str += `( ${node.value} ) -> `;
			node = node.next;
		}

		return `${str}null`;
	};

	insertAt = function (start, ...values) {
		let node = this.tail;

		while (start !== node.value && node.next !== null) node = node.next;

		const tempNode = node.next;

		values.forEach((val) => {
			node.next = new LinkedList.Node(val, null);
			node = node.next;
		});

		node.next = tempNode;
	};

	removeAt = function (index) {
		if (index > this.size - 1) return undefined;

		let node = this.tail;
		for (let i = 0; i <= index && node !== null; i++) node = node.next;
	};

	initList = function (newNode) {
		if (this.size === 0) {
			this.tail = newNode;
			this.head = newNode;
		}
	};

	static Node = class {
		constructor(value, next) {
			this.value = value;
			this.next = next;
		}
	};
}

const linkedList1 = new LinkedList();

// debugger;
linkedList1.prepend(22);
linkedList1.prepend(23);
linkedList1.prepend(24);
linkedList1.prepend(25);
linkedList1.append(21);
linkedList1.prepend(26);

console.log(linkedList1);
console.log(linkedList1.tail);
console.log(linkedList1.size);
console.log(linkedList1.at(2));
console.log(linkedList1.contains(21));

console.log(linkedList1.pop());
console.log(linkedList1);

console.log(linkedList1.findIndex(25));

console.log(linkedList1.toString());

console.log(linkedList1.insertAt(22, 21, 23, 123, 41));
console.log(linkedList1);

// export { LinkedList };
