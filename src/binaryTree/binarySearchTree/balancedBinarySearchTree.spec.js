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

	describe("Traversals", () => {
		test("should do level-order traversal", () => {
			const treeArr = [];
			tree1.levelOrderForEach((node) => {
				treeArr.push(node.root);
			});
			expect(treeArr).toEqual([8, 4, 67, 3, 7, 23, 6345, 1, 5, 9, 324]);
		});

		test("should do in-order traversal", () => {
			const treeArr = [];
			tree1.inOrderForEach((node) => {
				treeArr.push(node.root);
			});
			expect(treeArr).toEqual([8, 4, 3, 1, 7, 5, 67, 23, 9, 6345, 324]);
		});

		test("should do pre-order traversal", () => {
			const treeArr = [];
			tree1.preOrderForEach((node) => {
				treeArr.push(node.root);
			});
			expect(treeArr).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
		});

		test("should do post-order traversal", () => {
			const treeArr = [];
			tree1.postOrderForEach((node) => {
				treeArr.push(node.root);
			});
			expect(treeArr).toEqual([1, 3, 5, 7, 4, 9, 23, 324, 6345, 67, 8]);
		});
	});

	test("should look up for existing values in the tree", () => {
		expect(tree1.includes(4)).toBeTruthy();
	});

	test("should insert value to any node", () => {
		const node = tree1.insert(42441);

		expect(tree1.includes(42441)).toBeTruthy();
		expect(node).toBe(42441);
	});

	// test("should delete a node base on the given value", () => {
	// 	tree1.deleteItem(6345);

	// 	expect(tree1.includes(6345)).toBeFalsy();
	// });
});
