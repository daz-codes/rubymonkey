import assert from "assert";
import "../lib/number.js";
import "../lib/string.js";
import "../lib/array.js";

const arr = (1).upto(50);

describe("first,second,third,fourth, fifth and 42nd", function () {
  it("should return the first element", function () {
    assert.equal(arr.first, 1);
  });
  it("should return the second element", function () {
    assert.equal(arr.second, 2);
  });
  it("should return the third element", function () {
    assert.equal(arr.third, 3);
  });
  it("should return the fouth element", function () {
    assert.equal(arr.fourth, 4);
  });
  it("should return the fifth element", function () {
    assert.equal(arr.fifth, 5);
  });
  it("should return the 42nd element", function () {
    assert.equal(arr.forty_two, 42);
  });
  it("should return the third to last element", function () {
    assert.equal(arr.third_to_last, 48);
  });
  it("should return the second to last element", function () {
    assert.equal(arr.second_to_last, 49);
  });
  it("should return the last element", function () {
    assert.equal(arr.last, 50);
  });
});

describe("empty", function () {
  it("should return true if the array is empty", function () {
    assert.equal([].isEmpty, true);
  });
  it("should return false if the array is not empty", function () {
    assert.equal(arr.isEmpty, false);
  });
});

describe("clear", function () {
  it("should return an empty array", function () {
    assert.deepStrictEqual([1, 2, 3].clear, []);
  });
  it("should return an empty array, even if it starts empty", function () {
    assert.deepStrictEqual([].clear, []);
  });
});

describe("size", function () {
  it("should return the number of items in the array", function () {
    assert.equal(arr.size, 50);
  });
});

describe("max, min, sum", function () {
  it("should return the largest value in the array", function () {
    assert.equal(arr.max, 50);
  });
  it("should return the smallest value in the array", function () {
    assert.equal(arr.min, 1);
  });
  it("should return the result of summing all the values in the array", function () {
    assert.equal(arr.sum, 1275);
  });
});

describe("uniq", function () {
  it("should return the the array with any duplicated values removed", function () {
    assert.deepStrictEqual([1, 2, 2, 3, 3, 3].uniq, [1, 2, 3]);
  });
});

describe("compact", function () {
  it("should return the the array with any null or undefined values removed", function () {
    assert.deepStrictEqual(
      [1, 2, null, undefined, 3, null, undefined].compact,
      [1, 2, 3],
    );
  });
});

describe("to_sentence", function () {
  it("should return a string that joins all the values in the array with commas with and at the end", function () {
    assert.equal(["Ruby", "Dooby", "Doo"].to_sentence, "Ruby, Dooby and Doo");
  });
});

describe("to_param", function () {
  it("should return a string that joins all the values with /", function () {
    assert.equal(["Ruby", "Dooby", "Doo"].to_param, "Ruby/Dooby/Doo");
  });
});

describe("any", function () {
  it("should return true if at least one of the items returns true for the function provided", function () {
    assert.equal(
      arr.any((n) => n.isEven),
      true,
    );
  });
  it("should return false if none of the items returns true for the function provided", function () {
    assert.equal(
      arr.any((n) => n > 100),
      false,
    );
  });
  it("should return true if a function is not provided but the array has some items", function () {
    assert.equal(arr.any(), true);
  });
  it("should return false if a function is not provided but the array is empty", function () {
    assert.equal([].any(), false);
  });
});

describe("reject", function () {
  it("should return items that return false to the function provided", function () {
    assert.deepStrictEqual(
      arr.reject((n) => n > 3),
      [1, 2, 3],
    );
  });
});

describe("partition", function () {
  it("should return a nested array, the first array should contain all the values that return true to the function given and the second array should contain all the items that return false", function () {
    assert.deepStrictEqual(
      ["Ruby", "Dooby", "Doo"].partition((word) => word.starts_with("D")),
      [["Dooby", "Doo"], ["Ruby"]],
    );
  });
});

describe("count", function () {
  it("should return the number of items that return true for the function provided", function () {
    assert.equal(
      arr.count((n) => n.isEven),
      25,
    );
  });
  it("should return false if none of the items returns true for the function provided", function () {
    assert.equal(
      arr.count((n) => n > 100),
      0,
    );
  });
  it("should return the length of the array if a function is not provided but the array has some items", function () {
    assert.equal(arr.count(), 50);
  });
  it("should return zero if a function is not provided but the array is empty", function () {
    assert.equal([].count(), 0);
  });
});

describe("pluck", function () {
  it("should return an array of just the values of the key provided", function () {
    assert.deepStrictEqual(
      [
        { id: 1, name: "Ruby" },
        { id: 2, name: "Dooby" },
        { id: 3, name: "Doo" },
      ].pluck("id"),
      [1, 2, 3],
    );
  });
});

describe("from", function () {
  it("should return an array starting from the index provided", function () {
    assert.deepStrictEqual(arr.from(45), [46, 47, 48, 49, 50]);
  });
  it("should return an empty array if the array is empty", function () {
    assert.deepStrictEqual([].from(45), []);
  });
});

// Test for `combination`
describe("Array.prototype.combination", () => {
  it("should return all combinations of length n", () => {
    const arr = [1, 2, 3, 4];
    assert.deepStrictEqual(arr.combination(2), [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ]);
    assert.deepStrictEqual(arr.combination(3), [
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
    ]);
    assert.deepStrictEqual(arr.combination(5), []);
  });

  it("should return an empty array for invalid n", () => {
    const arr = [1, 2, 3];
    assert.deepStrictEqual(arr.combination(0), []);
    assert.deepStrictEqual(arr.combination(4), []);
  });
});

// Test for `product`
describe("Array.prototype.product", () => {
  it("should return all products of two arrays", () => {
    const arr = [1, 2, 3];
    assert.deepStrictEqual(arr.product([4, 5]), [
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
    ]);
  });

  it("should return an empty array when an empty array is provided", () => {
    const arr = [1, 2, 3];
    assert.deepStrictEqual(arr.product([]), []);
  });

  it("should split an array into separate single element arrays if no argument is provided", () => {
    const arr = [1, 2, 3];
    assert.deepStrictEqual(arr.product(), [[1], [2], [3]]);
  });
});

// Test for `each_cons`
describe("Array.prototype.each_cons", () => {
  it("should return an array of consecutive subarrays of length n", () => {
    const arr = [1, 2, 3, 4];
    assert.deepStrictEqual(arr.each_cons(2), [
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
    assert.deepStrictEqual(arr.each_cons(3), [
      [1, 2, 3],
      [2, 3, 4],
    ]);
    assert.deepStrictEqual(arr.each_cons(5), []);
  });

  it("should return an empty array if the length is greater than the array length", () => {
    const arr = [1, 2];
    assert.deepStrictEqual(arr.each_cons(3), []);
  });
});

// Test for `rotate`
describe("Array.prototype.rotate", () => {
  it("should rotate the array by n positions", () => {
    const arr = [1, 2, 3, 4, 5];
    assert.deepStrictEqual(arr.rotate(2), [3, 4, 5, 1, 2]);
    assert.deepStrictEqual(arr.rotate(0), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(arr.rotate(-1), [5, 1, 2, 3, 4]);
  });

  it("should handle rotations greater than array length", () => {
    const arr = [1, 2, 3];
    assert.deepStrictEqual(arr.rotate(4), [2, 3, 1]);
  });

  it("should handle empty arrays", () => {
    const arr = [];
    assert.deepStrictEqual(arr.rotate(4), []);
  });
});

// Test for `zip`
describe("Array.prototype.zip", () => {
  it("should zip two arrays together", () => {
    const arr1 = [1, 2, 3];
    const arr2 = ["a", "b", "c"];
    assert.deepStrictEqual(arr1.zip(arr2), [
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  it("should handle arrays of different lengths", () => {
    const arr1 = [1, 2, 3];
    const arr2 = ["a", "b"];
    assert.deepStrictEqual(arr1.zip(arr2), [
      [1, "a"],
      [2, "b"],
    ]);
  });

  it("should return null for missing elements in the second array", () => {
    const arr1 = [1, 2, 3];
    const arr2 = ["a", "b"];
    assert.deepStrictEqual(arr1.zip(arr2), [
      [1, "a"],
      [2, "b"],
    ]);
  });
});

// Test for `union`
describe("Array.prototype.union", () => {
  it("should return a union of all arrays, removing duplicates", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    assert.deepStrictEqual(arr1.union(arr2), [1, 2, 3, 4, 5]);
  });

  it("should handle multiple arrays", () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [2, 4];
    assert.deepStrictEqual(arr1.union(arr2, arr3), [1, 2, 3, 4]);
  });
});

// Test for `intersection`
describe("Array.prototype.intersection", () => {
  it("should return the intersection of arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    assert.deepStrictEqual(arr1.intersection(arr2), [2, 3]);
  });

  it("should return an empty array if there is no intersection", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    assert.deepStrictEqual(arr1.intersection(arr2), []);
  });
});

// Test for `difference`
describe("Array.prototype.difference", () => {
  it("should return the difference between arrays", () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [3, 4, 5, 6];
    assert.deepStrictEqual(arr1.difference(arr2), [1, 2]);
  });

  it("should return the correct difference for multiple arrays", () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [3, 4, 5];
    const arr3 = [2, 3, 4];
    assert.deepStrictEqual(arr1.difference(arr2, arr3), [1]);
  });
  it("should return the unique values in an array if no arguments are provided", () => {
    const arr1 = [1, 2, 3];
    assert.deepStrictEqual(arr1.difference(), [1, 2, 3]);
  });
});

// Test for `delete_at`
describe("Array.prototype.delete_at", () => {
  it("should delete the element at a given index", () => {
    const arr = [1, 2, 3, 4];
    assert.strictEqual(arr.delete_at(2), 3);
    assert.deepStrictEqual(arr, [1, 2, 4]);
  });

  it("should return undefined for out-of-range indices", () => {
    const arr = [1, 2, 3];
    assert.strictEqual(arr.delete_at(5), undefined);
    assert.strictEqual(arr.delete_at(-4), undefined);
  });
});

// Test for `dig`
describe("Array.prototype.dig", () => {
  it("should dig through nested arrays using the given indices", () => {
    const arr = [
      [1, 2],
      [3, 4],
    ];
    assert.strictEqual(arr.dig(0, 1), 2);
    assert.strictEqual(arr.dig(1, 0), 3);
    assert.strictEqual(arr.dig(1, 1), 4);
    assert.strictEqual(arr.dig(2), undefined);
  });

  it("should return undefined for invalid indices", () => {
    const arr = [1, [2, 3]];
    assert.strictEqual(arr.dig(1, 2), undefined);
  });
});

// Test for `shuffle`
describe("Array.prototype.shuffle", () => {
  it("should return a shuffled version of the array", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = arr.shuffle;
    assert.notDeepStrictEqual(shuffled, arr); // Array should be shuffled
    assert(shuffled.sort.every((value, index) => value === arr.sort[index])); // All elements should be the same, just in different order
  });

  it("should return the same array if there is only one element", () => {
    const arr = [1];
    assert.deepStrictEqual(arr.shuffle, [1]);
  });

  it("should return an empty array when the array is empty", () => {
    const arr = [];
    assert.deepStrictEqual(arr.shuffle, []);
  });

  it("should not modify the original array", () => {
    const arr = [1, 2, 3];
    const original = [...arr];
    arr.shuffle;
    assert.deepStrictEqual(arr, original); // The original array should remain the same
  });
});

// Test for `transpose`
describe("Array.prototype.transpose", () => {
  it("should transpose a 2D array", () => {
    const arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    assert.deepStrictEqual(arr.transpose, [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });

  it("should return an empty array if the original array is empty", () => {
    const arr = [];
    assert.deepStrictEqual(arr.transpose, []);
  });

  it("should return the same result when transposing twice", () => {
    const arr = [
      [1, 2],
      [3, 4],
    ];
    assert.deepStrictEqual(arr.transpose.transpose, arr);
  });
});

// Test for `tally`
describe("Array.prototype.tally", () => {
  it("should return an object with the correct counts", () => {
    const arr = ["a", "b", "a", "c", "b", "a"];
    assert.deepStrictEqual(arr.tally, { a: 3, b: 2, c: 1 });
  });

  it("should return an empty object for an empty array", () => {
    const arr = [];
    assert.deepStrictEqual(arr.tally, {});
  });

  it("should count unique values correctly", () => {
    const arr = [1, 2, 3, 1, 2, 1];
    assert.deepStrictEqual(arr.tally, { 1: 3, 2: 2, 3: 1 });
  });

  it("should handle arrays with only one unique value", () => {
    const arr = [5, 5, 5, 5];
    assert.deepStrictEqual(arr.tally, { 5: 4 });
  });

  it("should handle arrays with no repeated values", () => {
    const arr = [1, 2, 3];
    assert.deepStrictEqual(arr.tally, { 1: 1, 2: 1, 3: 1 });
  });
});

describe("to_s", () => {
  it("should return a string representation of the array", () => {
    assert.equal([1, 2, 3].to_s, "[1, 2, 3]");
  });
  it("should handle an empty array", () => {
    assert.equal([].to_s, "[]");
  });
  it("should call to_s on nested arrays", () => {
    assert.equal([[1, 2], 3].to_s, "[[1, 2], 3]");
  });
});

describe("sort", () => {
  it("should return a sorted copy of the array", () => {
    const arr = [3, 1, 2];
    assert.deepStrictEqual(arr.sort, [1, 2, 3]);
  });
  it("should not modify the original array", () => {
    const arr = [3, 1, 2];
    arr.sort;
    assert.deepStrictEqual(arr, [3, 1, 2]);
  });
});

describe("sample", () => {
  it("should return a single random element by default", () => {
    const arr = [1, 2, 3];
    assert(arr.includes(arr.sample()));
  });
  it("should return an array of n random elements", () => {
    const arr = [1, 2, 3, 4];
    const s = arr.sample(2);
    assert.equal(s.length, 2);
    s.forEach((x) => assert(arr.includes(x)));
  });
  it("should return all items if n > array length", () => {
    const arr = [1, 2];
    const s = arr.sample(5);
    assert.deepStrictEqual(s.sort, arr);
  });
  it("should not modify the original array", () => {
    const arr = [1, 2, 3];
    arr.sample(2);
    assert.deepStrictEqual(arr, [1, 2, 3]);
  });
});

describe("one", () => {
  it("should return true if exactly one element matches", () => {
    assert.equal(
      [1, 2, 3].one((n) => n === 2),
      true,
    );
  });
  it("should return false if none or more than one match", () => {
    assert.equal(
      [1, 2, 3].one((n) => n > 5),
      false,
    );
    assert.equal(
      [1, 2, 2].one((n) => n === 2),
      false,
    );
  });
  it("should work without predicate", () => {
    assert.equal([1].one(), true);
    assert.equal([1, 2].one(), false);
  });
});

describe("aliases", () => {
  it("collect should behave like map", () => {
    assert.deepStrictEqual(
      [1, 2, 3].collect((x) => x * 2),
      [2, 4, 6],
    );
  });
  it("all should behave like every", () => {
    assert.equal(
      [2, 4, 6].all((x) => x % 2 === 0),
      true,
    );
  });
  it("select should behave like filter", () => {
    assert.deepStrictEqual(
      [1, 2, 3, 4].select((x) => x % 2 === 0),
      [2, 4],
    );
  });
  it("each should behave like forEach", () => {
    const results = [];
    [1, 2, 3].each((x) => results.push(x * 2));
    assert.deepStrictEqual(results, [2, 4, 6]);
  });
  it("detect should behave like find", () => {
    assert.equal(
      [1, 2, 3, 4].detect((x) => x > 2),
      3,
    );
  });
  it("inject should behave like reduce", () => {
    assert.equal(
      [1, 2, 3, 4].inject((acc, x) => acc + x, 0),
      10,
    );
  });
  it("flat_map should behave like flatMap", () => {
    assert.deepStrictEqual(
      [1, 2, 3].flat_map((x) => [x, x * 2]),
      [1, 2, 2, 4, 3, 6],
    );
  });
  it("drop should behave like slice", () => {
    assert.deepStrictEqual([1, 2, 3, 4, 5].drop(2), [3, 4, 5]);
  });
});

describe("sort_by", () => {
  it("should sort strings by length ascending", () => {
    assert.deepStrictEqual(
      ["apple", "fig", "banana"].sort_by((s) => s.length),
      ["fig", "apple", "banana"],
    );
  });

  it("should sort strings by length descending", () => {
    assert.deepStrictEqual(
      ["apple", "fig", "banana"].sort_by((s) => s.length, "desc"),
      ["banana", "apple", "fig"],
    );
  });

  it("should sort strings by last character", () => {
    assert.deepStrictEqual(
      ["apple", "banana", "cherry"].sort_by((s) => s.last),
      ["banana", "apple", "cherry"],
    );
  });

  it("should sort objects by property", () => {
    const users = [
      { name: "Charlie", age: 35 },
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ];
    const sorted = users.sort_by((u) => u.age);
    assert.deepStrictEqual(sorted.pluck("name"), ["Bob", "Alice", "Charlie"]);
  });

  it("should sort objects by property descending", () => {
    const users = [
      { name: "Charlie", score: 78 },
      { name: "Alice", score: 85 },
      { name: "Bob", score: 92 },
    ];
    const sorted = users.sort_by((u) => u.score, "desc");
    assert.deepStrictEqual(sorted.pluck("name"), ["Bob", "Alice", "Charlie"]);
  });

  it("should sort by computed values", () => {
    const products = [
      { name: "Widget", price: 25, quantity: 10 },
      { name: "Gadget", price: 50, quantity: 3 },
      { name: "Gizmo", price: 15, quantity: 20 },
    ];
    const sorted = products.sort_by((p) => p.price * p.quantity, "desc");
    assert.deepStrictEqual(sorted.pluck("name"), ["Gizmo", "Widget", "Gadget"]);
  });

  it("should handle case-insensitive desc", () => {
    assert.deepStrictEqual(
      [1, 3, 2].sort_by((n) => n, "DESC"),
      [3, 2, 1],
    );
    assert.deepStrictEqual(
      [1, 3, 2].sort_by((n) => n, "Desc"),
      [3, 2, 1],
    );
  });

  it("should not modify the original array", () => {
    const arr = [3, 1, 2];
    arr.sort_by((n) => n);
    assert.deepStrictEqual(arr, [3, 1, 2]);
  });
});

describe("empty alias", () => {
  it("should return true for empty array", () => {
    assert.equal([].empty, true);
  });
  it("should return false for non-empty array", () => {
    assert.equal([1].empty, false);
  });
});

describe("minmax", () => {
  it("should return [min, max] tuple", () => {
    assert.deepStrictEqual([5, 1, 9, 3].minmax, [1, 9]);
  });
  it("should return undefined for empty array", () => {
    assert.equal([].minmax, undefined);
  });
  it("should handle single element array", () => {
    assert.deepStrictEqual([5].minmax, [5, 5]);
  });
});

describe("multiply", () => {
  it("should return the product of all elements", () => {
    assert.equal([1, 2, 3, 4].multiply, 24);
  });
  it("should return 0 for array starting with 0", () => {
    assert.equal([0, 1, 2, 3].multiply, 0);
  });
  it("should handle negative numbers", () => {
    assert.equal([2, -3, 4].multiply, -24);
  });
});

describe("flatten", () => {
  it("should flatten nested arrays by one level", () => {
    assert.deepStrictEqual([[1, 2], [3, 4]].flatten, [1, 2, 3, 4]);
  });
  it("should only flatten one level deep", () => {
    assert.deepStrictEqual([[1, [2, 3]], [4]].flatten, [1, [2, 3], 4]);
  });
  it("should handle empty arrays", () => {
    assert.deepStrictEqual([].flatten, []);
  });
});

describe("eql", () => {
  it("should return true for equal arrays", () => {
    assert.equal([1, 2, 3].eql([1, 2, 3]), true);
  });
  it("should return false for arrays of different lengths", () => {
    assert.equal([1, 2, 3].eql([1, 2]), false);
  });
  it("should return false for arrays with different elements", () => {
    assert.equal([1, 2, 3].eql([1, 2, "3"]), false);
  });
  it("should handle nested arrays", () => {
    assert.equal([[1, 2], [3]].eql([[1, 2], [3]]), true);
  });
});

describe("filter_map", () => {
  it("should map and filter out null/undefined values", () => {
    assert.deepStrictEqual(
      [1, 2, 3, 4].filter_map((n) => (n % 2 === 0 ? n * 2 : null)),
      [4, 8],
    );
  });
  it("should handle all values being filtered", () => {
    assert.deepStrictEqual(
      [1, 2, 3].filter_map(() => null),
      [],
    );
  });
});

describe("each_with_object", () => {
  it("should iterate with an accumulator object", () => {
    const acc = [];
    [1, 2, 3].each_with_object(acc, (n, arr) => arr.push(n * 2));
    assert.deepStrictEqual(acc, [2, 4, 6]);
  });
  it("should work with object accumulators", () => {
    const acc = {};
    ["a", "b", "c"].each_with_object(acc, (char, obj) => {
      obj[char] = char.toUpperCase();
    });
    assert.deepStrictEqual(acc, { a: "A", b: "B", c: "C" });
  });
});

describe("first_ and last_", () => {
  it("first_ should return first n elements", () => {
    assert.deepStrictEqual([1, 2, 3, 4, 5].first_(3), [1, 2, 3]);
  });
  it("first_ should return empty array for n < 1", () => {
    assert.deepStrictEqual([1, 2, 3].first_(0), []);
    assert.deepStrictEqual([1, 2, 3].first_(-1), []);
  });
  it("last_ should return last n elements", () => {
    assert.deepStrictEqual([1, 2, 3, 4, 5].last_(3), [3, 4, 5]);
  });
  it("last_ should return empty array for n < 1", () => {
    assert.deepStrictEqual([1, 2, 3].last_(0), []);
    assert.deepStrictEqual([1, 2, 3].last_(-1), []);
  });
  it("should return full array if n > length", () => {
    assert.deepStrictEqual([1, 2].first_(5), [1, 2]);
    assert.deepStrictEqual([1, 2].last_(5), [1, 2]);
  });
});
