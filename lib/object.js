import { defineProperties } from "./define_properties.js";

defineProperties(Object.prototype, {
  // Accessors (getters)
  isEmpty: {
    get() {
      return Object.keys(this).length === 0;
    },
  },
  size: {
    get() {
      return Object.keys(this).length;
    },
  },
  values: {
    get() {
      return Object.values(this);
    },
  },
  keys: {
    get() {
      return Object.keys(this);
    },
  },
  entries: {
    get() {
      return Object.entries(this);
    },
  },
  clear: {
    get() {
      Object.keys(this).forEach((key) => delete this[key]);
      return this;
    },
  },
  compact: {
    get() {
      const obj = { ...this };
      for (let key in obj) {
        if (obj[key] == null) delete obj[key];
      }
      return obj;
    },
  },
  to_s: {
    get() {
      return (
        "{ " +
        Object.entries(this)
          .map(([k, v]) => `${k}: ${v?.to_s || v}`)
          .join(", ") +
        " }"
      );
    },
  },

  // Methods
  transform_keys: function (func) {
    const obj = Object.fromEntries(
      Object.entries(this).map(([key, value]) => [func(key), value]),
    );
    return obj;
  },
  transform_values: function (func) {
    const obj = Object.fromEntries(
      Object.entries(this).map(([key, value]) => [key, func(value)]),
    );
    return obj;
  },
  dig: function (...args) {
    return args.reduce((obj, arg) => (obj ? obj[arg] : undefined), this);
  },
  each: function (func) {
    Object.entries(this).forEach(func);
    return this;
  },
  each_key: function (func) {
    Object.keys(this).forEach(func);
    return this;
  },
  each_value: function (func) {
    Object.values(this).forEach(func);
    return this;
  },
  fetch: function (key) {
    return this[key];
  },
  fetch_values: function (...args) {
    return args.map((arg) => this[arg]);
  },
  select: function (func) {
    return Object.entries(this).filter((entry) => func(entry));
  },
  keep_if: function (func) {
    return Object.entries(this).filter((entry) => func(entry));
  },
  reject: function (func) {
    return Object.entries(this).filter((entry) => !func(entry));
  },
  delete_if: function (func) {
    return Object.entries(this).filter((entry) => !func(entry));
  },
  has_key: function (key) {
    return Object.keys(this).includes(key);
  },
  has_value: function (val) {
    return Object.values(this).includes(val);
  },
  key: function (val) {
    const entry = Object.entries(this).find(([_, v]) => v === val);
    return entry ? entry[0] : undefined;
  },
  any: function (func) {
    return func
      ? Object.entries(this).some((entry) => func(entry))
      : Object.keys(this).length > 0;
  },
  except: function (...keys) {
    return Object.fromEntries(
      Object.entries(this).filter(([k]) => !keys.includes(k)),
    );
  },
  eql: function (obj) {
    if (Object.keys(this).length !== Object.keys(obj).length) return false;
    return (
      Object.keys(this).filter((key, i) =>
        this[key].eql ? this[key].eql(obj[key]) : this[key] === obj[key],
      ).length === Object.keys(this).length
    );
  },
  each_pair: function (...args) {
    return this.each(...args);
  },
  filter: function (...args) {
    return this.select(...args);
  },
  includes: function (...args) {
    return this.has_key(...args);
  },
});
