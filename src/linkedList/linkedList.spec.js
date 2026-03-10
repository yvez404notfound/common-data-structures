import { LinkedList } from "./linkedList";

describe("Linked List Test", () => {
	test("should add a new node to start", () => {
		const ll = new LinkedList();
		const value = 24;

		ll.prepend(value);

		expect(ll.head.value).toBe(value);
	});

	test("should add a new node at end", () => {
		const ll = new LinkedList();
		const value = 24;

		ll.append(value);

		expect(ll.tail.value).toBe(value);
	});

	test("at() should return the value of node at given index", () => {
		const ll = new LinkedList();
		const value = 24;

		ll.append(21);
		ll.append(value);
		ll.append(23);

		expect(ll.at(1)).toBe(value);
	});

	test("pop() should remove the head node and return the value of head node", () => {
		const ll = new LinkedList();
		const value = 24;

		ll.prepend(21);
		ll.prepend(23);
		ll.prepend(value);

		expect(ll.pop()).toBe(value);
		expect(ll.toString()).toBe("( 21 ) -> ( 23 ) -> null");
	});

	test("contains() should detect existing value in the list", () => {
		const ll = new LinkedList();
		const value = 24;

		ll.append(21);
		ll.append(23);
		ll.append(value);

		expect(ll.contains(value)).toBeTruthy();
	});

	test("findIndex() should return index of given value", () => {
		const ll = new LinkedList();
		const value = 24;

		ll.prepend(21);
		ll.prepend(23);
		ll.prepend(value);

		expect(ll.findIndex(value)).toBe(2);
	});

	test("toString() should give string representation of your string", () => {
		const ll = new LinkedList();
		const value = 24;

		ll.prepend(21);
		ll.prepend(23);
		ll.prepend(value);

		expect(ll.toString()).toBe("( 21 ) -> ( 23 ) -> ( 24 ) -> null");
	});
});
