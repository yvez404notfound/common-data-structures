import { HashMap } from "./hashMap";

beforeAll(() => {
	const hashmap1 = new HashMap();

	hashmap1.set("apple", "red");
	hashmap1.set("banana", "yellow");
	hashmap1.set("carrot", "orange");
	hashmap1.set("dog", "brown");
	hashmap1.set("elephant", "gray");
	hashmap1.set("frog", "green");
	hashmap1.set("grape", "purple");
	hashmap1.set("hat", "black");
	hashmap1.set("ice cream", "white");
	hashmap1.set("jacket", "blue");
	hashmap1.set("kite", "pink");
	hashmap1.set("lion", "golden");

	return hashmap1;
});

describe("HashMap", () => {
	test("should detect existing entries inside its buckets", () => {
		expect(hashmap1.has("apple")).toBeTruthy();
		expect(hashmap1.has("banana")).toBeTruthy();
		expect(hashmap1.has("carrot")).toBeTruthy();
	});

	test("should be able to add entries", () => {
		expect(hashmap1.has("apple")).toBeTruthy();
		expect(hashmap1.has("banana")).toBeTruthy();
		expect(hashmap1.has("carrot")).toBeTruthy();
	});

	test("should be able to remove an entry", () => {
		hashmap1.remove("lion");

		expect(hashmap1.has("lion")).toBeFalsy();
	});

	test("should return number of entries stored", () => {
		expect(hashmap1.length()).toBe(12);
	});

	test("should be able to clear all entries stored", () => {
		hashmap1.clear();
		expect(hashmap1.length()).toBe(0);
	});

	test("should be able return all entries' keys in an array", () => {
		expect(hashmap1.keys()).toEqual([
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
		]);
	});

	test("should be able return all entries' values in an array", () => {
		expect(hashmap1.values()).toEqual([
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
		]);
	});

	test("should be able return all entries' key value pair in an array", () => {
		expect(hashmap1.entries()).toEqual([
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
		]);
	});
});
