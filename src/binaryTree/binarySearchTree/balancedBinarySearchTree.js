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

	prettyPrint = function (node = this, prefix = "", isLeft = true) {
		if (node === null || node === undefined) {
			return;
		}

		this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
		this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	};
}

const arr = mergeSort([
	...new Set([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
]);
console.log(arr, "\n");

const bst1 = new BalancedTreeNode();
bst1.buildTree(arr, 0, arr.length - 1);

console.log(bst1.prettyPrint());

// export { BalancedTreeNode };
