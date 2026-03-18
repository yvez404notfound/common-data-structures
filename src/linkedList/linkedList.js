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
		for (let i = 0; i < index && node !== null; i++) node = node.next;

		return node.value;
	};

	pop = function () {
		if (this.size === 0) return undefined;

		const removedNodeValue = this.head.value;
		let node = this.tail;

		while (node.next !== this.head) node = node.next;

		this.head = node;
		this.head.next = null;
		this.size--;

		return removedNodeValue;
	};

	shift = function () {
		if (this.size === 0) return undefined;

		const removedNodeValue = this.tail.value;

		this.tail = this.tail.next;
		this.size--;

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

		for (let i = 0; i <= this.size - 1 && node !== null; i++) {
			console.log(node.value);
			if (node.value === value) return i;
			node = node.next;
		}

		return -1;
	};

	toString = function () {
		let str = "";
		let node = this.tail;

		if (this.size === 1) return `( ${node.value} ) -> null`;

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
			size++;
		});

		node.next = tempNode;
	};

	removeAt = function (index) {
		if (index > this.size - 1) return undefined;

		let node = this.tail;
		for (let i = 0; i <= index - 1 && node !== null; i++) {
			if (i === index - 1) return this.pop();
			node = node.next;
		}

		node.next = node.next.next;
		this.size--;

		return node;
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

export { LinkedList };
