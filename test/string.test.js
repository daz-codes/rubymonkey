import assert from "assert";
import "../lib/string.js";

const str = "Ruby Dooby Doo!";
const hello = "hello";
const spaced = "      hello     world     ";
const n = "29";
const decimal = "29.5";

describe("first and last", function () {
  it("returns the first character of the string", function () {
    assert.equal(str.first, "R");
  });
  it("returns the last character of the string", function () {
    assert.equal(str.last, "!");
  });
});

describe("first_ and last_", function () {
  it("returns the first character of the string", function () {
    assert.equal(str.first_(), "R");
  });
  it("returns the first 4 characters of the string", function () {
    assert.equal(str.first_(4), "Ruby");
  });
  it("returns the last character of the string", function () {
    assert.equal(str.last_(), "!");
  });
  it("returns the last 4 character of the string", function () {
    assert.equal(str.last_(4), "Doo!");
  });
});

describe("starts_with and ends_with", function () {
  it("returns true if the string starts in the string provided as an argument", function () {
    assert.equal(str.starts_with("Ruby"), true);
  });
  it("returns false if the string does not start in the string provided as an argument", function () {
    assert.equal(str.starts_with("Doo!"), false);
  });
  it("returns true if the string ends in the string provided as an argument", function () {
    assert.equal(str.ends_with("Doo!"), true);
  });
  it("returns false if the string does not end in the string provided as an argument", function () {
    assert.equal(str.ends_with("Ruby"), false);
  });
});

describe("reverse function", function () {
  it("returns the string written backwards", function () {
    assert.equal(str.reverse, "!ooD ybooD ybuR");
  });
});

describe("to_i and to_f", function () {
  it("returns a numerical string as an iteger", function () {
    assert.equal(n.to_i, 29);
  });
  it("returns 0 if there is no number at the start of the string", function () {
    assert.equal(str.to_i, 0);
  });
  it("returns a decimal string as an decimal", function () {
    assert.equal(decimal.to_f, 29.5);
  });
  it("returns 0 if there is no number at the start of the string", function () {
    assert.equal(str.to_f, 0);
  });
});

describe("size", function () {
  it("returns how many characters in the string", function () {
    assert.equal(str.size, 15);
  });
});

describe("upcase and downcase", function () {
  it("returns the string all in uppercase", function () {
    assert.equal(str.upcase, "RUBY DOOBY DOO!");
  });
  it("returns the string all in lowercase", function () {
    assert.equal(str.downcase, "ruby dooby doo!");
  });
  it("returns the string with the first character upper case", function () {
    assert.equal(hello.upcase_first, "Hello");
  });
  it("returns the string with the first character lower case", function () {
    assert.equal(str.downcase_first, "ruby Dooby Doo!");
  });
});

describe("squish", function () {
  it("removes any excess spaces", function () {
    assert.equal(spaced.squish, "hello world");
  });
});

describe("isBlank", function () {
  it("returns true if the string is empty", function () {
    assert.equal("".isBlank, true);
  });
  it("returns true if the string is just empty space", function () {
    assert.equal("         ".isBlank, true);
  });
  it("returns false if the string is not empty", function () {
    assert.equal(str.isBlank, false);
  });
});

describe("isEmpty", function () {
  it("returns true if the string is empty", function () {
    assert.equal("".isEmpty, true);
  });
  it("returns false if the string is just empty space", function () {
    assert.equal("         ".isEmpty, false);
  });
  it("returns false if the string is not empty", function () {
    assert.equal(str.isEmpty, false);
  });
});

describe("humanize, titleize and parameterize", function () {
  it("returns the string with each word capitalized", function () {
    assert.equal("ruby_dooby_doo".humanize, "Ruby dooby doo");
  });
  it("returns the string with id removed from the end and capitalized", function () {
    assert.equal("person_id".humanize, "Person");
  });
  it("returns the string with each word capitalized", function () {
    assert.equal("ruby_dooby_doo".titleize, "Ruby Dooby Doo");
  });
  it("returns the string joined by hyphens and all lower case", function () {
    assert.equal(str.parameterize, "ruby-dooby-doo");
  });
});

describe("count", function () {
  it("counts the number of characters that return true for the function provided", function () {
    assert.equal(str.count("o"), 4);
  });
});

describe("chars", function () {
  it("returns an array of each char in the string", function () {
    assert.deepEqual(str.chars, [
      "R",
      "u",
      "b",
      "y",
      " ",
      "D",
      "o",
      "o",
      "b",
      "y",
      " ",
      "D",
      "o",
      "o",
      "!",
    ]);
  });
});

describe("to_s", function () {
  it("returns the string itself", function () {
    assert.equal(str.to_s, str);
  });
});

describe("upcase_first edge cases", function () {
  it("keeps already capitalized string the same", function () {
    assert.equal("Hello".upcase_first, "Hello");
  });
  it("returns empty string unchanged", function () {
    assert.equal("".upcase_first, "");
  });
});

describe("downcase_first edge cases", function () {
  it("keeps already lowercase string the same", function () {
    assert.equal("ruby".downcase_first, "ruby");
  });
  it("returns empty string unchanged", function () {
    assert.equal("".downcase_first, "");
  });
});

describe("humanize extra cases", function () {
  it("capitalizes a plain word with no underscores", function () {
    assert.equal("person".humanize, "Person");
  });
});

describe("titlecase", function () {
  it("is the same as titleize", function () {
    assert.equal("ruby_dooby_doo".titlecase, "Ruby Dooby Doo");
  });
});

describe("parameterize edge cases", function () {
  it("returns empty string unchanged", function () {
    assert.equal("".parameterize, "");
  });
  it("removes punctuation and trims spaces", function () {
    assert.equal(" Ruby   Dooby  ".parameterize, "ruby-dooby");
  });
  it("returns empty string if only punctuation", function () {
    assert.equal("!@#".parameterize, "");
  });
});

describe("count edge cases", function () {
  it("returns 0 if the character is not found", function () {
    assert.equal(str.count("x"), 0);
  });
});

describe("first_ and last_ edge cases", function () {
  it("returns empty string when 0 is given", function () {
    assert.equal(str.first_(0), "");
    assert.equal(str.last_(0), "");
  });
  it("returns the whole string if n is larger than length", function () {
    assert.equal(str.first_(100), str);
    assert.equal(str.last_(100), str);
  });
  it("returns undefined for empty string with no argument", function () {
    assert.equal("".first_(), "");
    assert.equal("".last_(), "");
  });
});
