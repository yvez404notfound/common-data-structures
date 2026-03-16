import { HashMap } from "./hashMap";

describe("HashMap", () => {
	const hashTable1 = new HashMap();

	hashTable1.set("apple", "red");
	hashTable1.set("banana", "yellow");
	hashTable1.set("carrot", "orange");
	hashTable1.set("dog", "brown");
	hashTable1.set("elephant", "gray");
	hashTable1.set("frog", "green");
	hashTable1.set("grape", "purple");
	hashTable1.set("hat", "black");
	hashTable1.set("ice cream", "white");
	hashTable1.set("jacket", "blue");
	hashTable1.set("kite", "pink");
	hashTable1.set("lion", "golden");

	test("should detect existing entries inside its buckets", () => {
		expect(hashTable1.has("apple")).toBeTruthy();
		expect(hashTable1.has("banana")).toBeTruthy();
		expect(hashTable1.has("carrot")).toBeTruthy();
	});

	test("should be able to add entries", () => {
		expect(hashTable1.has("apple")).toBeTruthy();
		expect(hashTable1.has("banana")).toBeTruthy();
		expect(hashTable1.has("carrot")).toBeTruthy();
	});

	test("should be able to remove an entry", () => {
		hashTable1.set("omsim", "barabida");
		hashTable1.remove("omsim");

		expect(hashTable1.has("omsim")).toBeFalsy();
	});

	test("should return number of entries stored", () => {
		expect(hashTable1.length()).toBe(12);
	});

	test("should be able return all entries' keys in an array", () => {
		expect(hashTable1.keys().sort()).toEqual(
			[
				"apple",
				"banana",
				"carrot",
				"dog",
				"elephant",
				"frog",
				"grape",
				"hat",
				"ice cream",
				"jacket",
				"kite",
				"lion",
			].sort(),
		);
	});

	test("should be able return all entries' values in an array", () => {
		expect(hashTable1.values().sort()).toEqual(
			[
				"red",
				"yellow",
				"orange",
				"brown",
				"gray",
				"green",
				"purple",
				"black",
				"white",
				"blue",
				"pink",
				"golden",
			].sort(),
		);
	});

	test("should be able return all entries' key value pair in an array", () => {
		expect(hashTable1.entries().sort()).toEqual(
			[
				["apple", "red"],
				["banana", "yellow"],
				["carrot", "orange"],
				["dog", "brown"],
				["elephant", "gray"],
				["frog", "green"],
				["grape", "purple"],
				["hat", "black"],
				["ice cream", "white"],
				["jacket", "blue"],
				["kite", "pink"],
				["lion", "golden"],
			].sort(),
		);
	});

	test("should be able to clear all entries stored", () => {
		hashTable1.clear();
		expect(hashTable1.length()).toBe(0);
	});
});
