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

		this.#searchTargetNode(value, (node) => {
			if (node.root === value) {
				return (isIncluded = true);
			}
		});

		return isIncluded;
	};

	insert = function (value) {
		if (this.includes(value)) return -1;

		let lastRefNode;

		this.#searchTargetNode(value, (node) => {
			lastRefNode = node;
		});

		lastRefNode[value < lastRefNode.root ? "left" : "right"] =
			new BalancedTreeNode(value, null, null);

		return value;
	};

	deleteItem = function (value) {
		if (!this.includes(value)) return -1;

		let targetNodeParent;
		let targetNode;

		this.#searchTargetNode(value, (node) => {
			if (node.root === value) {
				targetNode = node;
				return;
			}

			if (node.left?.root === value) {
				targetNode = node.left;
				targetNodeParent = node;
				return;
			} else if (node.right?.root === value) {
				targetNode = node.right;
				targetNodeParent = node;
				return;
			}
		});

		const targetNodeChildrenCount = targetNode.#availableChildren();

		if (targetNodeChildrenCount <= 0) {
			targetNodeParent[
				targetNode.root < targetNodeParent.root ? "left" : "right"
			] = null;
		} else if (targetNodeChildrenCount === 1) {
			targetNodeParent[
				targetNode.root < targetNodeParent.root ? "left" : "right"
			] = targetNode[targetNode.left === null ? "right" : "left"];
			targetNode[targetNode.left === null ? "right" : "left"] = null;
		} else {
			let inorderSucessorNode = targetNode.right;

			targetNode.right.inOrderForEach((node) => {
				if (node.root < inorderSucessorNode.root) inorderSucessorNode = node;
			});

			this.deleteItem(inorderSucessorNode.root);
			targetNode.root = inorderSucessorNode.root;
		}

		return value;
	};

	depth = function (value) {
		if (!this.includes(value)) return -1;

		let d = -1;
		this.#searchTargetNode(value, () => {
			d++;
		});

		return d;
	};

	height = function (value = this.root) {
		if (!this.includes(value)) return -1;

		let height = 0;

		let targetNode;
		this.#searchTargetNode(value, (node) => {
			targetNode = node;
		});

		targetNode.inOrderForEach((node) => {
			if (node.#availableChildren() === 0) {
				const nodeDepth = targetNode.depth(node.root);
				height = nodeDepth > height ? nodeDepth : height;
			}
		});

		return height;
	};

	isBalanced = function () {
		let ib = true;

		this.postOrderForEach((node) => {
			const lNodeHeight = node.left?.height() ?? -1;
			const rNodeHeight = node.right?.height() ?? -1;
			const subtreesHeightDif = lNodeHeight - rNodeHeight;

			if (subtreesHeightDif < 0 || subtreesHeightDif > 1) return (ib = false);
		});

		return ib;
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
	inOrderForEach = function (cb, node = this) {
		if (node === null) return;

		if (cb(node)) return node;
		this.inOrderForEach(cb, node.left);
		this.inOrderForEach(cb, node.right);
	};

	preOrderForEach = function (cb, node = this) {
		if (node === null) return;

		this.preOrderForEach(cb, node.left);
		if (cb(node)) return node;
		this.preOrderForEach(cb, node.right);
	};

	postOrderForEach = function (cb, node = this) {
		if (node === null) return;

		this.postOrderForEach(cb, node.left);
		this.postOrderForEach(cb, node.right);
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

	#availableChildren = function () {
		if (this.left === null && this.right === null) {
			return 0;
		} else if (
			(this.left !== null && this.right === null) ||
			(this.right !== null && this.left === null)
		) {
			return 1;
		} else {
			return 2;
		}
	};

	#searchTargetNode = function (target, cb) {
		let refNode = this;

		while (refNode !== null) {
			if (cb(refNode)) return refNode;

			if (refNode.root === target) break;
			if (refNode.left === null && refNode.right === null) break;

			if (target < refNode.root) {
				refNode = refNode.left;
			} else {
				refNode = refNode.right;
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
console.log(bst1.isBalanced());

console.log(bst1.insert(555));
console.log(bst1.toString());
console.log(bst1.isBalanced());

export { BalancedTreeNode };
