import { LinkedList } from "../linkedList/linkedList.js";

class HashMap {
	buckets = [];

	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadFactor;
	}

	hash = function (key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i <= key.length - 1; i++)
			hashCode += primeNumber + key.charCodeAt(i);

		return (hashCode % this.capacity) - 1;
	};

	isBucketEmpty = function (hashCode) {
		return typeof this.buckets[hashCode] === "undefined" ? true : false;
	};

	set = function (key, value = key) {
		const hashCode = this.hash(key);

		if (this.isBucketEmpty(hashCode)) this.buckets[hashCode] = new LinkedList();

		// Overwrite if key exists
		let node = this.buckets[hashCode].tail;
		for (let i = 0; i < this.buckets[hashCode].size && node !== null; i++) {
			if (key === node.value[0]) return (node.value[1] = value);
			node = node.next;
		}

		this.buckets[hashCode].prepend([key, value], null);
	};

	get = function (key) {
		const hashCode = this.hash(key);

		if (this.isBucketEmpty(hashCode)) return null;

		let node = this.buckets[hashCode].tail;
		for (let i = 0; i < this.buckets[hashCode].size && node !== null; i++) {
			if (key === node.value[0]) return node.value[1];
			node = node.next;
		}

		return null;
	};

	has = function (key) {
		const hashCode = this.hash(key);

		if (this.isBucketEmpty(hashCode)) return false;

		let node = this.buckets[hashCode].tail;
		for (let i = 0; i < this.buckets[hashCode].size && node !== null; i++) {
			if (key === node.value[0]) return true;
			node = node.next;
		}

		return false;
	};

	remove = function (key) {
		const hashCode = this.hash(key);

		if (this.isBucketEmpty(hashCode)) return false;

		let node = this.buckets[hashCode].tail;
		for (let i = 0; i < this.buckets[hashCode].size && node !== null; i++) {
			if (key === node.value[0]) {
				this.buckets[hashCode].removeAt(i);
				return true;
			}
			node = node.next;
		}
	};

	length = function () {
		let len = 0;

		this.buckets.forEach((num) => (len += num.size ?? 0));

		return len;
	};

	clear = function () {
		this.buckets.length = 0;
	};
}

const test1 = new HashMap(16, 0.75);

console.log(test1.set("apple", "red"));
console.log(test1.set("apple", "bordsawe"));
console.log(test1.set("apple", "brocacho"));
console.log(test1.set("leapp", "marinduque"));
console.log(test1.set("banna", "yellow"));
console.log(test1.buckets[12]);

console.log(test1.get("apple"));
console.log(test1.has("weawa"));

console.log(test1.remove("leapp"));
console.log(test1.buckets[12]);

console.log("\n==========\n");
console.log(test1.length());

// console.log(test1.clear());
// console.log(test1.buckets);

export { HashMap };
