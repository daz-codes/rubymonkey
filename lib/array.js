import { defineProperties } from "./define_properties.js";

defineProperties(Array.prototype, {
  // Accessors (getters)
  first: {
    get() {
      return this[0];
    },
  },
  second: {
    get() {
      return this[1];
    },
  },
  third: {
    get() {
      return this[2];
    },
  },
  fourth: {
    get() {
      return this[3];
    },
  },
  fifth: {
    get() {
      return this[4];
    },
  },
  forty_two: {
    get() {
      return this[41];
    },
  },
  third_to_last: {
    get() {
      return this[this.length - 3];
    },
  },
  second_to_last: {
    get() {
      return this[this.length - 2];
    },
  },
  last: {
    get() {
      return this[this.length - 1];
    },
  },
  isEmpty: {
    get() {
      return this.length === 0;
    },
  },
  empty: {
    get() {
      return this.length === 0;
    },
  },
  size: {
    get() {
      return this.length;
    },
  },
  min: {
    get() {
      return this.length ? Math.min(...this) : undefined;
    },
  },
  max: {
    get() {
      return this.length ? Math.max(...this) : undefined;
    },
  },
  minmax: {
    get() {
      return this.length ? [Math.min(...this), Math.max(...this)] : undefined;
    },
  },
  uniq: {
    get() {
      return Array.from(new Set(this));
    },
  },
  sum: {
    get() {
      return this.reduce((sum, x) => sum + x, 0);
    },
  },
  flatten: {
    get() {
      return this.flat();
    },
  },
  compact: {
    get() {
      return this.filter((x) => x != null);
    },
  },
  to_param: {
    get() {
      return this.join("/");
    },
  },
  to_s: {
    get() {
      return "[" + this.map((v) => `${v?.to_s || v}`).join(", ") + "]";
    },
  },
  to_sentence: {
    get() {
      if (this.length === 0) return "";
      if (this.length === 1) return String(this[0]);
      return this.slice(0, -1).join(", ") + " and " + this.last;
    },
  },
  tally: {
    get() {
      return this.reduce((totals, x) => {
        totals[x] = (totals[x] || 0) + 1;
        return totals;
      }, {});
    },
  },
  clear: {
    get() {
      this.length = 0;
      return this;
    },
  },

  shuffle: {
    get() {
      const arr = [...this];
      for (let i = arr.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[r]] = [arr[r], arr[i]];
      }
      return arr;
    },
  },
  transpose: {
    get() {
      return this.length === 0
        ? []
        : this[0].map((_, i) => this.map((row) => row[i]));
    },
  },
  sort: {
    get() {
      return this.toSorted((a, b) => a - b);
    },
  },

  // Methods
  sample: function (n = 1) {
    const arr = [...this];
    const sample = [];
    for (let i = 0; i < n; i++) {
      if (!arr.length) break;
      const index = Math.floor(Math.random() * arr.length);
      sample.push(arr.splice(index, 1)[0]);
    }
    return n === 1 ? sample[0] : sample;
  },
  any: function (func) {
    return func ? this.some(func) : this.length > 0;
  },
  one: function (func) {
    return func ? this.filter(func).length === 1 : this.length === 1;
  },
  reject: function (func) {
    return func ? this.filter((x) => !func(x)) : this;
  },
  partition: function (func) {
    return [this.filter(func), this.filter((x) => !func(x))];
  },
  count: function (func) {
    return func ? this.filter(func).length : this.length;
  },
  pluck: function (prop) {
    return this.map((obj) => obj[prop]);
  },
  from: function (n) {
    return this.slice(n) || [];
  },
  combination: function (n) {
    if (n <= 0 || n > this.length) return [];
    const result = [];
    const comb = (arr, temp = []) => {
      if (temp.length === n) {
        result.push(temp);
        return;
      }
      for (let i = 0; i < arr.length; i++)
        comb(arr.slice(i + 1), temp.concat(arr[i]));
    };
    comb(this);
    return result;
  },
  product: function (arr) {
    if (!arr) return this.map((x) => [x]);
    if (arr.length === 0) return [];
    return this.flatMap((x) => arr.map((y) => [x, y]));
  },
  each_cons: function (n, func) {
    const cons = this.map((_, i) => this.slice(i, i + n)).slice(0, -(n - 1));
    return this.length < n ? [] : func ? cons.map(func) : cons;
  },
  rotate: function (n = 1) {
    return [...this.slice(n % this.length), ...this.slice(0, n % this.length)];
  },
  zip: function (arr) {
    return this.map((n, i) => (arr[i] ? [n, arr[i]] : null)).filter(Boolean);
  },
  union: function (...arrs) {
    return [...new Set([...this, ...arrs.flat()])];
  },
  intersection: function (...arrs) {
    return [...new Set(this.filter((v) => arrs.every((a) => a.includes(v))))];
  },
  difference: function (...arrs) {
    return [...new Set(this.filter((v) => arrs.every((a) => !a.includes(v))))];
  },
  delete_at: function (n) {
    if (n < -this.length || n >= this.length) return undefined;
    return this.splice(n < 0 ? this.length + n : n, 1)[0];
  },
  dig: function (...indices) {
    return indices.reduce((current, index) => current?.[index], this);
  },
  eql: function (arr) {
    if (this.length !== arr.length) return false;
    return (
      this.filter((el, i) => (el.eql ? el.eql(arr[i]) : el === arr[i]))
        .length === this.length
    );
  },
  filter_map: function (func) {
    return this.map(func).compact;
  },
  each_with_object: function (obj, func) {
    return this.forEach((x) => func(x, obj));
  },
  first_: function (n = 1) {
    return n < 1 ? [] : this.slice(0, n);
  },
  last_: function (n = 1) {
    return n < 1 ? [] : this.slice(-n);
  },

  // Aliases
  collect: Array.prototype.map,
  all: Array.prototype.every,
  select: Array.prototype.filter,
  each: Array.prototype.forEach,
  detect: Array.prototype.find,
  inject: Array.prototype.reduce,
  delete_if: Array.prototype.reject,
  drop: Array.prototype.slice,
});
