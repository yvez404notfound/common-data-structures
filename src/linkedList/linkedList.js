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

	contains = function (value) {
		let node = this.tail;

		while (node !== null) {
			if (value === node.value) return true;
			node = node.next;
		}

		return false;
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

// export { LinkedList };
