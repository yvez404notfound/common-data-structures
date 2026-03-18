import { mergeSort } from "../../utils/sort";
import { BalancedTreeNode } from "./balancedBinarySearchTree";

describe("Binary Search Tree test cases", () => {
	const tree1 = new BalancedTreeNode();
	const arr = mergeSort([
		...new Set([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
	]);
	tree1.buildTree(arr, 0, arr.length - 1);

	test("should build a tree from a sorted array", () => {
		expect(tree1.root).toBe(8);
	});

	test("should look up for existing values in the tree", () => {
		expect(tree1.includes(4)).toBe(true);
	});
});
