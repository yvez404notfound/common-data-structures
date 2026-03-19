import { Queue } from "../../queue/queue.js";
import { mergeSort } from "../../utils/sort.js";

class BalancedTreeNode {
	constructor(root, left, right) {
		this.root = root;
		this.left = left;
		this.right = right;
	}

	buildTree = function (sortedArr, start, end) {
		if (start > end) return null;

		const mid = Math.ceil((start + end) / 2);
		this.root = sortedArr[mid];

		this.left = new BalancedTreeNode().buildTree(sortedArr, start, mid - 1);
		this.right = new BalancedTreeNode().buildTree(sortedArr, mid + 1, end);

		return this;
	};

	includes = function (value) {
		let isIncluded = false;

		this.searchTargetNode(value, (node) => {
			if (node.root === value) {
				return (isIncluded = true);
			}
		});

		return isIncluded;
	};

	insert = function (value) {
		if (this.includes(value)) return -1;

		let lastRefNode;

		this.searchTargetNode(value, (node) => {
			lastRefNode = node;
			console.log(`Target value: ${value}, Current node value: ${node.root}`);
		});

		lastRefNode[value < lastRefNode.root ? "left" : "right"] =
			new BalancedTreeNode(value, null, null);

		return lastRefNode;
	};

	searchTargetNode = function (target, cb) {
		// debugger;
		let refNode = this;

		while (refNode !== null) {
			if (cb(refNode)) return refNode;

			if (refNode.left === null && refNode.right === null) break;

			if (target < refNode.root) {
				refNode = refNode.left;
			} else {
				refNode = refNode.right;
			}
		}
	};

	// Breadth-first traversal
	levelOrderForEach = function (cb) {
		const queue = new Queue();

		let refNode = this;
		queue.enq(refNode);

		while (!queue.isEmpty()) {
			refNode = queue.deq();
			if (cb(refNode)) return refNode;
			if (refNode.left !== null) queue.enq(refNode.left);
			if (refNode.right !== null) queue.enq(refNode.right);
		}
	};

	toString = function () {
		const stack = [];

		// push initial frame
		stack.push({
			node: this,
			prefix: "",
			isLeft: true,
			stage: 0, // 0 = go right, 1 = print, 2 = go left
		});

		while (stack.length > 0) {
			const frame = stack.pop();
			const { node, prefix, isLeft, stage } = frame;

			if (node === null || node === undefined) {
				// console.log(`${prefix}${isLeft ? "└── " : "┌── "}null`);
				continue;
			}

			if (stage === 0) {
				// Simulate recursive order:
				// right -> print -> left

				// Push left call
				stack.push({
					node: node.left,
					prefix: `${prefix}${isLeft ? "    " : "│   "}`,
					isLeft: true,
					stage: 0,
				});

				// Push print step
				stack.push({
					node,
					prefix,
					isLeft,
					stage: 1,
				});

				// Push right call
				stack.push({
					node: node.right,
					prefix: `${prefix}${isLeft ? "│   " : "    "}`,
					isLeft: false,
					stage: 0,
				});
			} else if (stage === 1) {
				console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
			}
		}
	};
}

const arr = mergeSort([
	...new Set([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
]);

const bst1 = new BalancedTreeNode();
bst1.buildTree(arr, 0, arr.length - 1);

console.log(bst1);
console.log(bst1.toString());

// debugger;
console.log(bst1.insert(325));
console.log(bst1.insert(200));
console.log(bst1.toString());

export { BalancedTreeNode };
