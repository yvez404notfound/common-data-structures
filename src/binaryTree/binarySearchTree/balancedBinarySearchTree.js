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
		});

		lastRefNode[value < lastRefNode.root ? "left" : "right"] =
			new BalancedTreeNode(value, null, null);

		return value;
	};

	/* 	
	deleteItem = function (value) {
			if (this.includes(value)) return -1;

			let lastParentNode;
			let lastNode;

			this.searchTargetNode(value, (node) => {
				lastParentNode = node;

				if (node.left === value) {
					lastNode = node.left;
				} else if (node.right === value) {
					lastNode = node.right;
				}

				return;
			});

			const lastNodeChildren = lastNode.availableChildren();

			if (lastNodeChildren.length >= 2) {
				lastParentNode[lastNodeChildren[0].root < lastParentNode.root ? "left" : "right"] = 
			} else {
				lastParentNode = lastNodeChildren;
			}

			return;
		};
 */

	availableChildren = function () {
		if (this.left === null && this.left === null) {
			return null;
		} else if (this.left !== null && this.right === null) {
			return this.left;
		} else if (
			lastRefTargetNode.right !== null &&
			lastRefTargetNode.left === nul
		) {
			return this.right;
		} else {
			return [this.left, this.right];
		}
	};

	searchTargetNode = function (target, cb) {
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

	// === Depth-first Traversal ===
	inOrderForEach = function (node = this, cb) {
		if (node === null) return;

		if (cb(node)) return node;
		this.inOrderForEach(node.left, cb);
		this.inOrderForEach(node.right, cb);
	};

	preOrderForEach = function (node = this, cb) {
		if (node === null) return;

		this.preOrderForEach(node.left, cb);
		if (cb(node)) return node;
		this.preOrderForEach(node.right, cb);
	};

	postOrderForEach = function (node = this, cb) {
		if (node === null) return;

		this.postOrderForEach(node.left, cb);
		this.postOrderForEach(node.right, cb);
		if (cb(node)) return node;
	};
	// === END ===

	toString = function () {
		const stack = [];

		stack.push({
			node: this,
			prefix: "",
			isLeft: true,
			stage: 0,
		});

		while (stack.length > 0) {
			const frame = stack.pop();
			const { node, prefix, isLeft, stage } = frame;

			if (node === null || node === undefined) {
				// console.log(`${prefix}${isLeft ? "└── " : "┌── "}null`);
				continue;
			}

			if (stage === 0) {
				stack.push({
					node: node.left,
					prefix: `${prefix}${isLeft ? "    " : "│   "}`,
					isLeft: true,
					stage: 0,
				});

				stack.push({
					node,
					prefix,
					isLeft,
					stage: 1,
				});

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

console.log(arr);
console.log(bst1.toString());

bst1.inOrderForEach(bst1, (node) => {
	console.log(node.root);
});

// in-order traversal (root-left-right)
// [8, 4, 3, 1, 7, 5, 67, 23, 9, 6345, 324]

// pre-order traversal (left-root-right)
// [1, 3, 4, 5, 7, 4, 8, 9, 23, 67, 324, 6345]

// post-order traversal (left-right-root)
// [1, 3, 5, 7, 4, 9, 23, 324, 6345, 67, 8]

export { BalancedTreeNode };
