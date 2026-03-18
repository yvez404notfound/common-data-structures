import { mergeSort } from "../../utils/sort";
import { BalancedTreeNode } from "./balancedBinarySearchTree";

describe("Binary Search Tree test cases", () => {
	const tree1 = BalancedTreeNode();
	const arr = [
		...new Set([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
	].mergeSort();
	tree1.buildTree(arr);

	test("should build a tree from a sorted array", () => {
		expect(tree1.rootNode).toBe(8);
		expect(tree1.size).toBe(11);
		// expect(tree1.levelOrderForEach()).toBe([
		// 	[8],
		// 	[4, 67],
		// 	[3, 7, 23, 6345],
		// 	[1, 5, 9, 324],
		// ]);
	});

	test("should look up for existing values in the tree", () => {
		expect(tree1.includes(4)).toBe(true);
	});
});
