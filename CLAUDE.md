# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ruby Monkey is a library that monkey-patches JavaScript built-in prototypes (Number, String, Array, Object, Date) to add Ruby-like methods. Users import the package and immediately gain access to Ruby-style methods on native types.

## Commands

- **Run all tests:** `npm test`
- **Run a single test file:** `npx mocha test/number.test.js`

## Architecture

### Entry Point
`index.js` imports all prototype extensions as side effects and exports `$` (a symbol-to-proc helper).

### Core Utility
`lib/define_properties.js` exports `defineProperties(proto, props)` - the central function for adding methods to prototypes:
- If `props[key]` has a `get` function → defines a getter
- Otherwise → defines a regular method

All type modules use this pattern:
```javascript
import { defineProperties } from "./define_properties.js";
defineProperties(Number.prototype, { methodName: { get() { ... } } });  // getter
defineProperties(Number.prototype, { methodName: function(arg) { ... } });  // method
```

### Type Modules (lib/)
- `number.js` - Number prototype extensions (even, odd, times, upto, etc.)
- `string.js` - String prototype extensions (reverse, upcase, squish, etc.)
- `array.js` - Array prototype extensions (first, last, pluck, partition, etc.)
- `object.js` - Object prototype extensions (dig, transform_keys, compact, etc.)
- `date.js` - Date extensions plus `DateRange` and `Duration` classes

### Tests (test/)
Uses Mocha with Node's built-in `assert` module. Each type has a corresponding `*.test.js` file that imports the relevant lib modules.

## Conventions

- Getters for zero-argument methods (e.g., `(5).even` not `(5).even()`)
- Methods take arguments as regular functions
- Boolean methods have two forms: `isEven` and `even` (Ruby uses `even?` but JS can't)
- Ruby method names use snake_case (e.g., `to_s`, `each_cons`, `transform_keys`)
