const generateRandomValuesArray = function (min, max, arrayLength) {
	const arr = Array.from({ length: arrayLength }, () => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	});

	return arr;
};

export { generateRandomValuesArray };
