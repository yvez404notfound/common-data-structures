import { LinkedList } from "../linkedList/linkedList.js";

class HashMap {
	buckets = [];

	constructor(capacity = 16, loadFactor = 0.75) {
		if (capacity < 1) throw new RangeError("Capacity must be greater than 0");
		if (loadFactor < 0)
			throw new RangeError("Load factor must be greater than 0");

		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.maxEntriesAllowed = this.loadFactor * this.capacity;
	}

	hash = function (key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i <= key.length - 1; i++)
			hashCode += primeNumber + key.charCodeAt(i);

		return hashCode % this.capacity;
	};

	isBucketEmpty = function (hashCode) {
		return typeof this.buckets[hashCode] === "undefined" ? true : false;
	};

	isBucketsAtMaxLoad = function () {
		return this.length() >= this.maxEntriesAllowed ? true : false;
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
		//

		this.buckets[hashCode].prepend([key, value], null);

		if (this.isBucketsAtMaxLoad()) this.grow();
	};

	grow = function () {
		this.capacity *= 2;
		this.maxEntriesAllowed = this.loadFactor * this.capacity;
		const entries = this.entries();
		this.clear();
		entries.forEach((entry) => this.set(entry[0], entry[1]));
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
		let l = 0;
		this.buckets.forEach((num) => (l += num.size ?? 0));
		return l;
	};

	clear = function () {
		this.buckets.length = 0;
	};

	toString = function () {
		this.buckets.forEach((num, i) => {
			console.log(`Bucket [${i}]: ${num.toString()}`);
		});
	};

	keys = function () {
		let k = [];

		this.buckets.forEach((_, i) => {
			let node = this.buckets[i].tail;
			for (let j = 0; j < this.buckets[i].size && node !== null; j++) {
				k.push(node.value[0]);
				node = node.next;
			}
		});

		return k;
	};

	values = function () {
		let v = [];

		this.buckets.forEach((_, i) => {
			let node = this.buckets[i].tail;
			for (let j = 0; j < this.buckets[i].size && node !== null; j++) {
				v.push(node.value[1]);
				node = node.next;
			}
		});

		return v;
	};

	entries = function () {
		let e = [];

		this.buckets.forEach((_, i) => {
			let node = this.buckets[i].tail;
			for (let j = 0; j < this.buckets[i].size && node !== null; j++) {
				e.push(node.value);
				node = node.next;
			}
		});

		return e;
	};
}

export { HashMap };
