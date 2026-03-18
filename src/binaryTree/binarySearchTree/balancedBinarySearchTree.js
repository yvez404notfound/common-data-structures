import { Queue } from "../../queue/queue.js";
import { mergeSort } from "../../utils/sort.js";

class BalancedTreeNode {
	constructor() {
		this.root;
		this.left;
		this.right;
	}

	buildTree = function (sortedArr, start, end) {
		if (start > end) return null;

		const mid = Math.ceil((start + end) / 2);
		this.root = sortedArr[mid];

		this.left = new BalancedTreeNode().buildTree(sortedArr, start, mid - 1);

		this.right = new BalancedTreeNode().buildTree(sortedArr, mid + 1, end);

		return this;
	};

	toString = function (node = this, prefix = "", isLeft = true) {
		if (node === null || node === undefined) {
			console.log(`${prefix}${isLeft ? "└── " : "┌── "}null`);
			return;
		}

		this.toString(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
		this.toString(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	};

	levelOrderForEach = function (cb) {
		const queue = new Queue();

		let refNode = this;
		queue.enq(refNode);
		while (!queue.isEmpty()) {
			refNode = queue.deq();
			cb(refNode);

			if (refNode.left !== null) queue.enq(refNode.left);
			if (refNode.right !== null) queue.enq(refNode.right);
		}
	};
}

const arr = mergeSort([
	...new Set([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
]);
console.log(arr, "\n");

const bst1 = new BalancedTreeNode();
bst1.buildTree(arr, 0, arr.length - 1);

console.log(bst1.toString());

debugger;
console.log(
	bst1.levelOrderForEach((node) => {
		console.log(node);
	}),
);

// export { BalancedTreeNode };
