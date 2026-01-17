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

describe("even and odd aliases", function () {
  it("should return true for even numbers using even alias", function () {
    assert.equal((4).even, true);
    assert.equal((5).even, false);
  });
  it("should return true for odd numbers using odd alias", function () {
    assert.equal((3).odd, true);
    assert.equal((10).odd, false);
  });
});

describe("pred", function () {
  it("should return the predecessor of a number", function () {
    assert.equal((10).pred, 9);
    assert.equal((1).pred, 0);
    assert.equal((0).pred, -1);
  });
});

describe("integer, positive, negative, zero aliases", function () {
  it("should work with integer alias", function () {
    assert.equal((10).integer, true);
    assert.equal((10.5).integer, false);
  });
  it("should work with positive alias", function () {
    assert.equal((5).positive, true);
    assert.equal((-3).positive, false);
    assert.equal((0).positive, false);
  });
  it("should work with negative alias", function () {
    assert.equal((-10).negative, true);
    assert.equal((5).negative, false);
    assert.equal((0).negative, false);
  });
  it("should work with zero alias", function () {
    assert.equal((0).zero, true);
    assert.equal((1).zero, false);
  });
});

describe("downto", function () {
  it("should return an array of numbers from the number down to the argument", function () {
    assert.deepEqual((6).downto(3), [6, 5, 4, 3]);
  });
  it("should execute a function for each number when provided", function () {
    const results = [];
    (5).downto(3, (n) => results.push(n));
    assert.deepEqual(results, [5, 4, 3]);
  });
  it("should return an empty array if start is less than end", function () {
    assert.deepEqual((3).downto(6), []);
  });
  it("should return a single element array if start equals end", function () {
    assert.deepEqual((5).downto(5), [5]);
  });
});

describe("div", function () {
  it("should return the integer division result", function () {
    assert.equal((10).div(3), 3);
    assert.equal((7).div(2), 3);
    assert.equal((15).div(5), 3);
  });
});

describe("modulo", function () {
  it("should return the modulo of the number", function () {
    assert.equal((10).modulo(3), 1);
    assert.equal((15).modulo(5), 0);
  });
  it("should handle negative numbers correctly (always positive result)", function () {
    assert.equal((-10).modulo(3), 2);
    assert.equal((-1).modulo(3), 2);
  });
});

describe("hcf", function () {
  it("should return the highest common factor (alias for gcd)", function () {
    assert.equal((48).hcf(18), 6);
    assert.equal((12).hcf(8), 4);
    assert.equal((17).hcf(13), 1);
  });
});

describe("between alias", function () {
  it("should work as an alias for isBetween", function () {
    assert.equal((5).between(1, 10), true);
    assert.equal((15).between(1, 10), false);
    assert.equal((5).between(5, 10), true);
    assert.equal((10).between(5, 10), true);
  });
});

describe("eql", function () {
  it("should return true if numbers are strictly equal", function () {
    assert.equal((5).eql(5), true);
    assert.equal((5).eql(5.0), true);
  });
  it("should return false if numbers are not equal", function () {
    assert.equal((5).eql(3), false);
    assert.equal((5).eql("5"), false);
  });
});

describe("multiple_of and divisible_by", function () {
  it("should return true if number is a multiple of the argument", function () {
    assert.equal((10).multiple_of(5), true);
    assert.equal((10).multiple_of(2), true);
    assert.equal((10).multiple_of(3), false);
  });
  it("should work with divisible_by alias", function () {
    assert.equal((10).divisible_by(5), true);
    assert.equal((10).divisible_by(3), false);
  });
});

describe("divisor_of and factor_of", function () {
  it("should return true if number is a divisor of the argument", function () {
    assert.equal((5).divisor_of(10), true);
    assert.equal((2).divisor_of(10), true);
    assert.equal((3).divisor_of(10), false);
  });
  it("should work with factor_of alias", function () {
    assert.equal((5).factor_of(10), true);
    assert.equal((3).factor_of(10), false);
  });
});

describe("arithmetic methods", function () {
  it("add should return the sum", function () {
    assert.equal((5).add(3), 8);
    assert.equal((10).add(-3), 7);
  });
  it("subtract should return the difference", function () {
    assert.equal((10).subtract(3), 7);
    assert.equal((5).subtract(10), -5);
  });
  it("minus should work as alias for subtract", function () {
    assert.equal((10).minus(3), 7);
    assert.equal((5).minus(10), -5);
  });
  it("multiply should return the product", function () {
    assert.equal((5).multiply(3), 15);
    assert.equal((10).multiply(0), 0);
  });
  it("divide should return the quotient", function () {
    assert.equal((10).divide(2), 5);
    assert.equal((7).divide(2), 3.5);
  });
});
