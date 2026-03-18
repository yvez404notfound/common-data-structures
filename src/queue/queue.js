import { LinkedList } from "../linkedList/linkedList.js";

class Queue {
	constructor() {
		this.list = new LinkedList();
	}

	enq = function (value) {
		this.list.prepend(value);
	};

	deq = function () {
		const node = this.list.shift();
		return node;
	};

	isEmpty = function () {
		return this.list.size <= 0 ? true : false;
	};
}

export { Queue };
