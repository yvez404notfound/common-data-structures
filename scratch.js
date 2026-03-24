deleteItem = function (value) {
	if (!this.includes(value)) return -1;

	let targetNodeParent;
	let targetNode;

	this.searchTargetNode(value, (node) => {
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

	console.log("Parent node: ", targetNodeParent);
	console.log(targetNode);

	const targetNodeChildrenCount = targetNode.availableChildren();

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
		// let inorderSucessorNode;
		// targetNode.left.inOrderForEach((node) => {
		// 	if(node )
		// })
	}

	// console.log(targetNodeParent);

	return value;
};
