# Ruby Monkey

*Unashamedly monkey patching JavaScript to be more like Ruby.*

<img width="250" height="250" alt="ruby monkey" src="https://github.com/user-attachments/assets/cee09e69-6617-415b-ab66-7880032c3b63" />

Ruby (and Rails) has loads of really nice methods, now you can use them in JS as well!

Ruby Monkey helps to make your JavaScript code more code elegant, fun and productive!

Now you can write JS code like this:

```javascript
[1,2,3].last // 3
[1,2,3].count // 3
(21).ordinalize // "21st"
"RubyMonkey".downcase.reverse // "yeknomybur"
[1,2,3].sum.squared // 36
["A","A","C","A","B","A","B"].tally // {"A": 4, "C": 1, "B": 2}
(1).day.ago // yesterday
```

## Usage

```bash
npm install rubydoo
```

Then just add either `require "rubydoo"` or `import "rubydoo"` to the top of any JS file and suddenly coding in JS becomes a lot more fun and productive!

In general, if you know the Ruby methods you should be able to use them in almost the same way, with a few slight changes:

* Blocks change to arrow functions
* JavaScript does not support appending symbols to the end of function names, so Boolean methods can't end in a `?`, so these have `is` prepended to them.

So for example, this Ruby:

```ruby
[1,2,3].count{ |n| n.odd? }
```

Would be written in JavaScript as:

```javascript
[1,2,3].count( n => n.isOdd )
```

## Temple to Func

Ruby has this really nice syntax to make calling methods on objects easier, so instead of `[1,2,3].map { |n| n.next }` you can just write `[1,2,3].map(&:next)`

JavaScript doesn't let you use `&` and doesn't have symbol literals, but you can use `$` and it does have template literals and tag functions, so in Ruby Doo, you can do the same thing like this:

```javascript
[1,2,3].map($`next`)
```

# Number Methods

## `number.even`

Checks if the number is even.

```javascript
(4).even;  // true
(5).even;  // false
```

## `number.odd`

Checks if the number is odd.

```javascript
(3).odd;   // true
(10).odd;  // false
```

## `number.to_s`

Converts the number to a string.

```javascript
(42).to_s;  // "42"
```

## `number.next`

Returns the next integer.

```javascript
(10).next;  // 11
```

## `number.round`

Rounds the number to the nearest integer.

```javascript
(4.7).round;  // 5
(4.2).round;  // 4
```

## `number.ceil`

Returns the smallest integer greater than or equal to the number.

```javascript
(4.2).ceil;  // 5
```

## `number.floor`

Returns the largest integer less than or equal to the number.

```javascript
(4.9).floor;  // 4
```

## `number.digits`

Returns an array of the digits of the number.

```javascript
(123).digits;  // [1, 2, 3]
```

## `number.factors`

Returns an array of all factors of the number.

```javascript
(12).factors;  // [1, 2, 3, 4, 6, 12]
```

## `number.prime`

Checks if the number is prime.

```javascript
(7).prime;  // true
(9).prime;  // false
```

## `number.integer`

Checks if the number is an integer.

```javascript
(10.5).integer;  // false
(10).integer;    // true
```

## `number.positive`

Checks if the number is positive.

```javascript
(5).positive;   // true
(-3).positive;  // false
```

## `number.negative`

Checks if the number is negative.

```javascript
(-10).negative;  // true
(5).negative;    // false
```

## `number.zero`

Checks if the number is zero.

```javascript
(0).zero;  // true
(1).zero;  // false
```

## `number.squared`

Returns the square of the number.

```javascript
(4).squared;  // 16
```

## `number.cubed`

Returns the cube of the number.

```javascript
(3).cubed;  // 27
```

## `number.ordinal`

Returns the ordinal suffix of the number.

```javascript
(1).ordinal;   // "st"
(2).ordinal;   // "nd"
(3).ordinal;   // "rd"
(4).ordinal;   // "th"
(11).ordinal;  // "th"
```

## `number.ordinalize`

Returns the number as an ordinal string.

```javascript
(1).ordinalize;   // "1st"
(2).ordinalize;   // "2nd"
(3).ordinalize;   // "3rd"
(4).ordinalize;   // "4th"
(11).ordinalize;  // "11th"
```

## `number.upto(n, func?)`

Iterates from the current number up to n, calling func if provided.

```javascript
(3).upto(6, console.log);
// Logs: 3, 4, 5, 6

(3).upto(6);
// Returns: [3, 4, 5, 6]
```

## `number.times(func)`

Executes func the given number of times, passing the index as an optional argument.

```javascript
(3).times(_ => console.log("Ruby!"));
// Logs: Ruby!Ruby!Ruby!

(3).times(i => console.log(`Iteration: ${i}`));
// Logs: Iteration: 0, Iteration: 1, Iteration: 2
```

## `number.mod(n)`

Returns the remainder of the number divided by n.

```javascript
(10).mod(3);  // 1
```

## `number.divmod(n)`

Returns an array containing the quotient and remainder of division by n.

```javascript
(10).divmod(3);  // [3, 1]
```

## `number.gcd(n)`

Computes the greatest common divisor (GCD) of the number and n.

```javascript
(48).gcd(18);  // 6
```

## `number.lcm(n)`

Computes the least common multiple (LCM) of the number and n.

```javascript
(4).lcm(6);  // 12
```

## `number.between(a, b)`

Checks if the number is between a and b (inclusive).

```javascript
(5).between(1, 10);  // true
(15).between(1, 10); // false
```

# String Methods

## `string.reverse`

Returns the string reversed.

```javascript
"hello".reverse;  // "olleh"
```

## `string.size`
Returns the length of the string.

```javascript
"hello".size;  // 5
```

## `string.to_i`
Converts the string to an integer, returning 0 if conversion fails.

```javascript
"123".to_i;   // 123
"abc".to_i;   // 0
```

## `string.to_f`
Converts the string to a float, returning 0 if conversion fails.

```javascript
"12.34".to_f;   // 12.34
"abc".to_f;     // 0
```

## `string.downcase`
Returns the string in lowercase.

```javascript
"Hello".downcase;  // "hello"
```

## `string.upcase`
Returns the string in uppercase.

```javascript
"hello".upcase;  // "HELLO"
```

## `string.upcase_first`
Capitalizes only the first character of the string.

```javascript
"hello world".upcase_first;  // "Hello world"
```

## `string.downcase_first`

Lowercases only the first character of the string.

"Hello World".downcase_first;  // "hello World"

## `string.squish`

Removes leading, trailing, and multiple consecutive spaces.

```javascript
"  Hello    world   ".squish;  // "Hello world"
```

## `string.blank`

Checks if the string is empty or contains only whitespace.

```javascript
"   ".blank;  // true
"hello".blank;  // false
```

## `string.empty`

Checks if the string is completely empty (not even whitespace).

```javascript
"".empty;  // true
" ".empty;  // false
```

## `string.humanize`

Removes _id from the end (if present) and replaces underscores with spaces, capitalizing the first letter.

```javascript
"user_name".humanize;  // "User name"
"post_id".humanize;    // "Post"
```

## `string.titleize (Alias: titlecase)`

Capitalizes each word in the string.

```javascript
"hello world".titleize;  // "Hello World"
```

## `string.parameterize`

Converts the string into a URL-friendly format (lowercase, hyphenated).

```javascript
"Hello, World!".parameterize;  // "hello-world"
```

## `string.chars`
Returns an array of individual characters.

```javascript
"hello".chars;  // ["h", "e", "l", "l", "o"]
```

## `string.count(substring)`

Returns the number of times substring appears in the string.

```javascript
"hello world".count("l");  // 3
```

## `string.starts_with(substring)`
Checks if the string starts with the given substring.

```javascript
"hello world".starts_with("hello");  // true
```

## `string.ends_with(substring)`
Checks if the string ends with the given substring.

```javascript
"hello world".ends_with("world");  // true
```

## `string.first(n)`
Returns the first n characters of the string. If n is omitted, returns the first character.

```javascript
"hello".first(2);  // "he"
"hello".first();   // "h"
```

## `string.last(n)`
Returns the last n characters of the string. If n is omitted, returns the last character.

```javascript
"hello".last(2);  // "lo"
"hello".last();   // "o"
```

# Array Methods

## Property Methods

### `array.first`

Returns the first element of the array.

```javascript
[1, 2, 3].first; // 1
[].first; // undefined
```

### `array.second`, `array.third`, `array.fourth`, `array.fifth`

Returns the second, third, fourth, or fifth element of the array.

```javascript
[10, 20, 30].second; // 20
[10].third; // undefined
```

### `array.forty_two`

Returns the 42nd element (index 41) of the array.

```javascript
Array(50).fill(0).map((_, i) => i + 1).forty_two; // 42
```

### `array.third_to_last`, `array.second_to_last`, `array.last`

Returns the third-to-last, second-to-last, or last element of the array.

```javascript
[1, 2, 3, 4].second_to_last; // 3
[].last; // undefined
```

### `array.empty`

Returns true if the array is empty, false otherwise.

```javascript
[].empty; // true
[1].empty; // false
```

### `array.clear`

Clears all elements from the array.

```javascript
let arr = [1, 2, 3];
arr.clear;
console.log(arr); // []
```

### `array.size`

Returns the length of the array.

```javascript
[1, 2, 3].size; // 3
```

### `array.min`, `array.max`

Returns the smallest or largest number in the array.

```javascript
[5, 3, 9].min; // 3
[5, 3, 9].max; // 9
[].min; // undefined
```

### `array.uniq`

Returns a new array with duplicate elements removed.

```javascript
[1, 2, 2, 3].uniq; // [1, 2, 3]
```

### `array.to_sentence`

Converts the array into a human-readable sentence.

```javascript
["a", "b", "c"].to_sentence; // "a, b and c"
```

### `array.compact`

Returns a new array with null and undefined values removed.

```javascript
[1, null, 2, undefined, 3].compact; // [1, 2, 3]
```

### `array.to_param`

Converts the array into a string joined by /.

```javascript
["users", 42, "edit"].to_param; // "users/42/edit"
```

## Functional Methods

### `array.any(func?)`

Returns true if at least one element satisfies func, or if the array is not empty.

```javascript
[1, 2, 3].any(x => x > 2); // true
[].any(); // false
```

### `array.one(func?)`

Returns true if exactly one element satisfies func.

```javascript
[1, 2, 3].one(x => x > 2); // true
[1, 2, 3, 4].one(x => x > 2); // false
```

### `array.sum`

Returns the sum of all elements, or applies func before summing.

```javascript
[1, 2, 3].sum; // 6
```

### `array.reject(func)`

Returns a new array without elements matching func.

[1, 2, 3, 4].reject(x => x % 2 === 0); // [1, 3]

### `array.partition(func)`

Splits the array into two: one matching func, one not.

```javascript
[1, 2, 3, 4].partition(x => x % 2 === 0); // [[2, 4], [1, 3]]
```

### `array.count(func?)`

Returns the number of elements satisfying func, or the total length.

```javascript
[1, 2, 3, 4].count(x => x % 2 === 0); // 2
[1, 2, 3].count(); // 3
```

### `array.pluck(prop)`

Extracts values of the given property from an array of objects.

```javascript
[{id: 1}, {id: 2}].pluck("id"); // [1, 2]
```

### `array.from(n)`

Returns a new array starting from index n.

```javascript
[10, 20, 30, 40].from(2); // [30, 40]

### `array.product(arr)`

Returns all possible combinations of elements from both arrays.

```javascript
[1, 2, 3].product([4,5]); // [[1,4], [1,5], [2,4],[2,5], [3,4], [3,5]]
```

### `array.combination(n)`

Returns all possible combinations of n elements.

```javascript
[1, 2, 3].combination(2); // [[1,2], [1,3], [2,3]]
```

### `array.tally()`

Counts occurrences of each unique element.

```javascript
["a", "b", "a"].tally(); // { a: 2, b: 1 }
```

### `array.each_cons(n)`

Returns overlapping subarrays of size n.

```javascript
[1, 2, 3, 4].each_cons(2); // [[1,2], [2,3], [3,4]]
```

### `array.rotate(n = 1)`

Returns a rotated array by n places.

```javascript
[1, 2, 3].rotate(); // [2, 3, 1]
```

### `array.sample(n = 1)`

Returns n random elements.

```javascript
[1, 2, 3, 4].sample(2); // Random subset
```

### `array.zip(arr)`

Zips two arrays together.

```javascript
[1, 2, 3].zip(["a", "b", "c"]); // [[1, "a"], [2, "b"], [3, "c"]]
```

### `array.union(...arrs)`

Returns a merged array without duplicates.

```javascript
[1, 2].union([2, 3], [3, 4]); // [1, 2, 3, 4]
```

## Aliases

`collect → map`

`all → every`

`select → filter`

`each → forEach`

`detect → find`

`inject → reduce`

`delete_if → reject`

# Object Methods

## `object.empty`

Checks if an object has no keys.

```javascript
({}).empty;  // true
({ a: 1 }).empty;  // false
```

## `object.size`

Returns the number of keys in the object.

```javascript
({ a: 1, b: 2 }).size;  // 2
```
`
## `object.values`

Returns an array of the object's values.

```javascript
({ a: 1, b: 2 }).values;  // [1, 2]
```

## `object.keys`

Returns an array of the object's keys.

```javascript
({ a: 1, b: 2 }).keys;  // ["a", "b"]
```

## `object.entries`

Returns an array of [key, value] pairs.

```javascript
({ a: 1, b: 2 }).entries;  // [["a", 1], ["b", 2]]
```

## `object.clear`

Removes all properties from an object (mutates it).

const obj = { a: 1, b: 2 };
obj.clear
console.log(obj);  // {}

## `object.compact`

Returns a new object with null and undefined values removed.

```javascript
({ a: 1, b: null, c: undefined }).compact;  // { a: 1 }
```

## Methods

## `object.select(func)`

Returns a new object with key-value pairs where func(key, value) is true.

```javascript
({ a: 1, b: 2 }).select(([k, v]) => v > 1);  // { b: 2 }
```

## `object.keep_if(func)`

Alias for select.

## `object.reject(func)`

Returns a new object with key-value pairs where func(key, value) is false.

```javascript
({ a: 1, b: 2 }).reject(([k, v]) => v > 1);  // { a: 1 }
```

## `object.delete_if(func)`

Alias for reject.

## `object.has_key(key)`

Checks if an object has a given key.

```javascript
({ a: 1 }).has_key("a");  // true
({ a: 1 }).has_key("b");  // false
```

## `object.has_value(value)`

Checks if an object contains a given value.

```javascript
({ a: 1, b: 2 }).has_value(2);  // true
({ a: 1 }).has_value(3);  // false
```

## `object.key(value)`

Returns the first key where the value matches, or undefined if not found.

```javascript
({ a: 1, b: 2 }).key(2);  // "b"
({ a: 1 }).key(3);  // undefined
```

## `object.any([func])`

If func is provided, checks if any key-value pair matches func(key, value).
If func is omitted, returns true if the object is not empty.

```javascript
({ a: 1, b: 2 }).any();  // true
({}).any();  // false
({ a: 1, b: 2 }).any(([k, v]) => v > 1);  // true
```

## `object.except(...keys)`

Returns a new object excluding specified keys.

```javascript
({ a: 1, b: 2, c: 3 }).except("b", "c");  // { a: 1 }
```
