import { defineProperties } from "./define_properties.js";

defineProperties(String.prototype, {
  // Accessors (getters)
  reverse: {
    get() {
      return this.split("").reverse().join("");
    },
  },
  size: {
    get() {
      return this.length;
    },
  },
  to_i: {
    get() {
      const n = parseInt(this);
      return isNaN(n) ? 0 : n;
    },
  },
  to_f: {
    get() {
      const n = parseFloat(this);
      return isNaN(n) ? 0 : n;
    },
  },
  to_s: {
    get() {
      return this;
    },
  },
  downcase: {
    get() {
      return this.toLowerCase();
    },
  },
  upcase: {
    get() {
      return this.toUpperCase();
    },
  },
  upcase_first: {
    get() {
      return this === "" ? "" : this[0].toUpperCase() + this.slice(1);
    },
  },
  downcase_first: {
    get() {
      return this === "" ? "" : this[0].toLowerCase() + this.slice(1);
    },
  },
  squish: {
    get() {
      return this.replace(/\s+/g, " ").trim();
    },
  },
  isBlank: {
    get() {
      return this.trim() === "";
    },
  },
  blank: {
    get() {
      return this.trim() === "";
    },
  },
  isEmpty: {
    get() {
      return this === "";
    },
  },
  empty: {
    get() {
      return this === "";
    },
  },
  humanize: {
    get() {
      const str = this.slice(-3) === "_id" ? this.slice(0, -3) : this;
      return str.replace(/_/g, " ").upcase_first;
    },
  },
  titleize: {
    get() {
      return this.humanize
        .split(" ")
        .map((word) => word.upcase_first)
        .join(" ");
    },
  },
  titlecase: {
    get() {
      return this.titleize;
    },
  },
  parameterize: {
    get() {
      return this.trim()
        .replace(/[.,\/#!$@%\^&\*;:{}=\-_`~()]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");
    },
  },
  chars: {
    get() {
      return this.split("");
    },
  },
  first: {
    get() {
      return this[0];
    },
  },
  last: {
    get() {
      return this[this.length - 1];
    },
  },

  // Methods
  count: function (str) {
    return this.split(str).length - 1;
  },
  eql: function (str) {
    return this === str;
  },
  starts_with: function (str) {
    return this.slice(0, str.length) === str;
  },
  ends_with: function (str) {
    return this.slice(-str.length) === str;
  },
  first_: function (n = 1) {
    return n < 1 ? "" : this.slice(0, n);
  },
  last_: function (n = 1) {
    return n < 1 ? "" : this.slice(-n);
  },
});
