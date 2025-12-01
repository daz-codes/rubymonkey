import assert from "assert";
import "../lib/object.js";
import "../lib/string.js";

describe("Monkey patched Object methods", function () {
  const obj = { a: 1, b: 2, c: 3 };
  const emptyObj = {};

  describe(".isEmpty", function () {
    it("should return true for an empty object", function () {
      assert.equal(emptyObj.isEmpty, true);
    });

    it("should return false for a non-empty object", function () {
      assert.equal(obj.isEmpty, false);
    });
  });

  describe(".size", function () {
    it("should return 0 for an empty object", function () {
      assert.equal(emptyObj.size, 0);
    });

    it("should return the correct size for a non-empty object", function () {
      assert.equal(obj.size, 3);
    });
  });

  describe(".values", function () {
    it("should return the correct values for a non-empty object", function () {
      assert.deepEqual(obj.values, [1, 2, 3]);
    });
  });

  describe(".keys", function () {
    it("should return the correct keys for a non-empty object", function () {
      assert.deepEqual(obj.keys, ["a", "b", "c"]);
    });
  });

  describe(".entries", function () {
    it("should return the correct entries for a non-empty object", function () {
      assert.deepEqual(obj.entries, [
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ]);
    });
  });

  describe(".clear", function () {
    it("should clear all properties from an object", function () {
      const objCopy = { ...obj };
      objCopy.clear;
      assert.equal(objCopy.isEmpty, true);
    });
  });

  describe(".compact", function () {
    it("should remove null or undefined values", function () {
      const objWithNulls = { a: 1, b: null, c: undefined, d: 4 };
      assert.deepEqual(objWithNulls.compact, { a: 1, d: 4 });
    });
  });

  describe(".select", function () {
    it("should select entries based on the given function", function () {
      const result = obj.select(([k, v]) => v > 1);
      assert.deepEqual(result, [
        ["b", 2],
        ["c", 3],
      ]);
    });
  });

  describe(".reject", function () {
    it("should reject entries based on the given function", function () {
      const result = obj.reject(([k, v]) => v > 1);
      assert.deepEqual(result, [["a", 1]]);
    });
  });

  describe(".any", function () {
    it("should return true if any entry matches the condition", function () {
      assert.equal(
        obj.any(([k, v]) => v > 2),
        true,
      );
    });

    it("should return false if no entry matches the condition", function () {
      assert.equal(
        obj.any(([k, v]) => v > 3),
        false,
      );
    });

    it("should return true if the object has any entries", function () {
      assert.equal(obj.any(), true);
    });

    it("should return false if the object is empty", function () {
      assert.equal(emptyObj.any(), false);
    });
  });
  describe(".to_s", function () {
    it("should return a string representation of the object", function () {
      assert.equal(obj.to_s, "{ a: 1, b: 2, c: 3 }");
    });
  });

  describe(".transform_keys", function () {
    it("should transform keys using the given function", function () {
      const result = obj.transform_keys((k) => k.toUpperCase());
      assert.deepEqual(result, { A: 1, B: 2, C: 3 });
    });
  });

  describe(".transform_values", function () {
    it("should transform values using the given function", function () {
      const result = obj.transform_values((v) => v * 10);
      assert.deepEqual(result, { a: 10, b: 20, c: 30 });
    });
  });

  describe(".dig", function () {
    it("should return a nested value when path exists", function () {
      const nested = { a: { b: { c: 42 } } };
      assert.equal(nested.dig("a", "b", "c"), 42);
    });

    it("should return undefined when path does not exist", function () {
      const nested = { a: {} };
      assert.equal(nested.dig("a", "x"), undefined);
    });
  });

  describe(".each", function () {
    it("should call the function for each key-value pair", function () {
      const keys = [];
      obj.each(([k]) => keys.push(k));
      assert.deepEqual(keys, ["a", "b", "c"]);
    });
  });

  describe(".each_key", function () {
    it("should call the function for each key", function () {
      const keys = [];
      obj.each_key((k) => keys.push(k));
      assert.deepEqual(keys, ["a", "b", "c"]);
    });
  });

  describe(".each_value", function () {
    it("should call the function for each value", function () {
      const values = [];
      obj.each_value((v) => values.push(v));
      assert.deepEqual(values, [1, 2, 3]);
    });
  });

  describe(".fetch", function () {
    it("should fetch the value for a given key", function () {
      assert.equal(obj.fetch("a"), 1);
    });
  });

  describe(".fetch_values", function () {
    it("should fetch values for multiple keys", function () {
      assert.deepEqual(obj.fetch_values("a", "c"), [1, 3]);
    });
  });

  describe(".keep_if", function () {
    it("should keep only entries that match the condition", function () {
      const result = obj.keep_if(([_, v]) => v > 1);
      assert.deepEqual(result, [
        ["b", 2],
        ["c", 3],
      ]);
    });
  });

  describe(".delete_if", function () {
    it("should delete entries that match the condition", function () {
      const result = obj.delete_if(([_, v]) => v > 1);
      assert.deepEqual(result, [["a", 1]]);
    });
  });

  describe(".has_key", function () {
    it("should return true if object has the key", function () {
      assert.equal(obj.has_key("a"), true);
    });

    it("should return false if object does not have the key", function () {
      assert.equal(obj.has_key("z"), false);
    });
  });

  describe(".has_value", function () {
    it("should return true if object has the value", function () {
      assert.equal(obj.has_value(2), true);
    });

    it("should return false if object does not have the value", function () {
      assert.equal(obj.has_value(99), false);
    });
  });

  describe(".key", function () {
    it("should return the key for a given value", function () {
      assert.equal(obj.key(2), "b");
    });

    it("should return undefined if the value is not found", function () {
      assert.equal(obj.key(99), undefined);
    });
  });

  describe(".except", function () {
    it("should return a new object excluding the given keys", function () {
      assert.deepEqual(obj.except("a", "c"), { b: 2 });
    });
  });

  describe("aliases", function () {
    it(".each_pair should behave like .each", function () {
      const keys = [];
      obj.each_pair(([k]) => keys.push(k));
      assert.deepEqual(keys, ["a", "b", "c"]);
    });

    it(".filter should behave like .select", function () {
      const result = obj.filter(([_, v]) => v > 1);
      assert.deepEqual(result, [
        ["b", 2],
        ["c", 3],
      ]);
    });

    it(".includes should behave like .has_key", function () {
      assert.equal(obj.includes("a"), true);
      assert.equal(obj.includes("z"), false);
    });
  });
});
