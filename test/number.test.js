import assert from "assert";
import "../lib/number.js";

const n = 29;
const decimal = 29.5;

describe("odd and even", function () {
  it("should return if a number is even", function () {
    assert.equal(n.isEven, false);
  });
  it("should return if a number is odd", function () {
    assert.equal(n.isOdd, true);
  });
});

describe("to _s", function () {
  it("should return the number as a string", function () {
    assert.equal(n.to_s, "29");
  });
});

describe("next", function () {
  it("should return the next integer", function () {
    assert.equal(n.next, 30);
  });
});

describe("rounding", function () {
  it("should return the integer part of the number", function () {
    assert.equal(decimal.floor, 29);
  });
  it("should return the number if it is an integer or the next integer if it has a decimal part", function () {
    assert.equal(decimal.ceil, 30);
  });
  it("should return the number rounded up or down depending on the decimal part", function () {
    assert.equal(decimal.round, 30);
  });
});

describe("information about the number", function () {
  it("should return true if the number is positive", function () {
    assert.equal(n.isPositive, true);
  });
  it("should return true if the number is negative", function () {
    assert.equal(n.isNegative, false);
  });
  it("should return true if the number is zero", function () {
    assert.equal(n.isZero, false);
  });
  it("should return true if the number is non-zero", function () {
    assert.equal(n.isNonzero, true);
  });
  it("should return the number if the number is non-zero", function () {
    assert.equal(n.nonzero, n);
  });
  it("should return the undefined if the number is zero", function () {
    assert.equal((0).nonzero, undefined);
  });
  it("should return true if the number is prime", function () {
    assert.equal(n.isPrime, true);
  });
  it("should return true if the number is an integer", function () {
    assert.equal(n.isInteger, true);
  });
});

describe("factors", function () {
  it("should return an array of factors of the number", function () {
    assert.deepEqual(n.factors, [1, 29]);
  });
});

describe("digits", function () {
  it("should return an array of the digits of the number", function () {
    assert.deepEqual(n.digits, [2, 9]);
  });
});

describe("ordinalize", function () {
  it("should return the string th if the number ends in anything except 1,2 or 3", function () {
    assert.equal(n.ordinal, "th");
  });
  it("should return st if the number ends in a 1", function () {
    assert.equal((121).ordinal, "st");
  });
  it("should return nd on if the number ends in a 2", function () {
    assert.equal((42).ordinal, "nd");
  });
  it("should return rd if the number ends in a 3", function () {
    assert.equal((3).ordinal, "rd");
  });
});

describe("ordinalize", function () {
  it("should return a string with th on the end of the number if it ends in anything except 1,2 or 3", function () {
    assert.equal(n.ordinalize, "29th");
  });
  it("should return a next a string with st on the end if the number ends in a 1", function () {
    assert.equal((121).ordinalize, "121st");
  });
  it("should return the a string with nd on the end if the number ends in a 2", function () {
    assert.equal((42).ordinalize, "42nd");
  });
  it("should return the a string with rd on the end if the number ends in a 3", function () {
    assert.equal((3).ordinalize, "3rd");
  });
});

describe("upto", function () {
  it("should return an array of the numbers from the number up to and including the number provided as an argument", function () {
    assert.deepEqual(n.upto(35), [29, 30, 31, 32, 33, 34, 35]);
  });
});

describe("times", function () {
  it("should perform a funtion the given number of times", function () {
    let count = 0;
    n.times(() => count++);
    assert.equal(count, n);
  });

  it("should perform a funtion the given number of times and pass the iterator step value each time", function () {
    let count = 0;
    n.times((i) => (count += i));
    assert.equal(count, 406);
  });
});

describe("mod and divmod", function () {
  it("should return the number remainder when the number is divided by the argument provided", function () {
    assert.equal(n.mod(5), 4);
  });
  it("should return an array containing the integer part of the result of dividing by the argument provided and the remainder", function () {
    assert.deepEqual(n.divmod(5), [5, 4]);
  });
});

describe("isBetween", function () {
  it("should return true if the number is between the two numbers provided as arguments", function () {
    assert.equal(n.isBetween(20, 30), true);
  });
  it("should return false if the number is not between the two numbers provided as arguments", function () {
    assert.equal(n.isBetween(30, 40), false);
  });
});

describe("square and cubed", function () {
  it("should return the number squared", function () {
    assert.equal(n.squared, 841);
  });
  it("should return the number cubed", function () {
    assert.equal(n.cubed, 24389);
  });
});

describe("gcd and lcm", function () {
  it("should return the greatest common divisor", function () {
    assert.equal((12).gcd(8), 4);
    assert.equal((17).gcd(13), 1);
  });
  it("should return the least common multiple", function () {
    assert.equal((12).lcm(8), 24);
    assert.equal((5).lcm(7), 35);
  });
});

describe("factors edge cases", function () {
  it("should return factors of 1", function () {
    assert.deepEqual((1).factors, [1]);
  });
  it("should return factors of a negative number", function () {
    assert.deepEqual((-12).factors, [1, 2, 3, 4, 6, 12]);
  });
});

describe("digits edge cases", function () {
  it("should return [0] for 0", function () {
    assert.deepEqual((0).digits, [0]);
  });
  it("should return digits for a negative number", function () {
    assert.deepEqual((-123).digits, [1, 2, 3]);
  });
});

describe("isPrime edge cases", function () {
  it("should return false for numbers less than 2", function () {
    assert.equal((0).isPrime, false);
    assert.equal((1).isPrime, false);
  });
  it("should return true for 2", function () {
    assert.equal((2).isPrime, true);
  });
  it("should return false for composite numbers", function () {
    assert.equal((9).isPrime, false);
  });
});

describe("upto edge cases", function () {
  it("should return empty array if start is greater than end", function () {
    assert.deepEqual((5).upto(2), []);
  });
  it("should return an array with a single number if start equals end", function () {
    assert.deepEqual((3).upto(3), [3]);
  });
});

describe("times edge cases", function () {
  it("should not call the function if number is 0", function () {
    let count = 0;
    (0).times(() => count++);
    assert.equal(count, 0);
  });
  it("should pass 0-based index each time", function () {
    const seen = [];
    (3).times((i) => seen.push(i));
    assert.deepEqual(seen, [0, 1, 2]);
  });
});

describe("isBetween edge cases", function () {
  it("should return true if number equals the lower bound", function () {
    assert.equal((5).isBetween(5, 10), true);
  });
  it("should return true if number equals the upper bound", function () {
    assert.equal((10).isBetween(5, 10), true);
  });
  it("should return false if number is outside range", function () {
    assert.equal((11).isBetween(5, 10), false);
  });
});

describe("rounding edge cases", function () {
  it("should handle negative decimals correctly", function () {
    assert.equal((-2.7).ceil, -2);
    assert.equal((-2.7).floor, -3);
    assert.equal((-2.5).round, -3);
  });
});

describe("abs returns the absolute value of positive and negative numbers", function () {
  it("should keep positive integers and decimals unchanged", function () {
    assert.equal((2).abs, 2);
    assert.equal((2.7).abs, 2.7);
  });
  it("should make negative integers and decimals positive", function () {
    assert.equal((-2).abs, 2);
    assert.equal((-2.7).abs, 2.7);
  });
});
