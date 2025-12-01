import assert from "assert";
import "../lib/number.js";
import "../lib/string.js";
import "../lib/array.js";
import "../lib/date.js";
import { DateRange, Duration } from "../lib/date.js";

describe("DateRange", function () {
  const start = new Date(Date.UTC(2025, 8, 10)); // Sep 10, 2025
  const end = new Date(Date.UTC(2025, 8, 15)); // Sep 15, 2025
  const range = new DateRange(start, end);

  describe(".includes", function () {
    it("returns true for a date within the range", function () {
      const d = new Date(Date.UTC(2025, 8, 12));
      assert.equal(range.includes(d), true);
    });

    it("returns false for a date outside the range", function () {
      const d = new Date(Date.UTC(2025, 8, 16));
      assert.equal(range.includes(d), false);
    });
  });

  describe(".each_day", function () {
    it("iterates over each day in the range", function () {
      const days = [];
      range.each_day((d) => days.push(d.getUTCDate()));
      assert.deepEqual(days, [10, 11, 12, 13, 14, 15]);
    });

    it("respects step parameter", function () {
      const days = [];
      range.each_day((d) => days.push(d.getUTCDate()), 2);
      assert.deepEqual(days, [10, 12, 14]);
    });
  });

  describe(".each_week", function () {
    it("iterates by weeks correctly", function () {
      const weeks = [];
      range.each_week((d) => weeks.push(d.getUTCDate()));
      assert.deepEqual(weeks, [10]); // stops after exceeding end
    });
  });

  describe(".each_month", function () {
    it("iterates by months correctly", function () {
      const startMonth = new Date(Date.UTC(2025, 0, 31));
      const endMonth = new Date(Date.UTC(2025, 2, 2));
      const r = new DateRange(startMonth, endMonth);
      const months = [];
      r.each_month((d) => {
        months.push(d.getUTCMonth());
      });
      assert.deepEqual(months, [0, 1]);
    });
  });

  describe("[Symbol.iterator]", function () {
    it("yields each date in the range", function () {
      const dates = [...range];
      assert.equal(dates.length, 6);
      assert.equal(dates[0].getUTCDate(), 10);
      assert.equal(dates[5].getUTCDate(), 15);
    });
  });
});

describe("Duration", function () {
  const baseDate = new Date(Date.UTC(2025, 8, 15, 12, 0, 0));

  it("advances by days correctly", function () {
    const dur = new Duration({ days: 3 });
    const newDate = dur.advance_from(baseDate);
    assert.equal(newDate.getUTCDate(), 18);
  });

  it("advances by weeks correctly", function () {
    const dur = new Duration({ weeks: 2 });
    const newDate = dur.advance_from(baseDate);
    assert.equal(newDate.getUTCDate(), 29);
  });

  it("advances by months correctly", function () {
    const dur = new Duration({ months: 1 });
    const newDate = dur.advance_from(baseDate);
    assert.equal(newDate.getUTCMonth(), 9); // October
  });

  it("advances by years correctly", function () {
    const dur = new Duration({ years: 1 });
    const newDate = dur.advance_from(baseDate);
    assert.equal(newDate.getUTCFullYear(), 2026);
  });

  it("advances by complex durations", function () {
    const dur = new Duration({
      years: 1,
      months: 2,
      weeks: 1,
      days: 3,
      hours: 2,
    });
    const newDate = dur.advance_from(baseDate);
    assert.equal(newDate.getUTCFullYear(), 2026);
    assert.equal(newDate.getUTCMonth(), 10); // Nov
  });
});

describe("Number duration helpers", function () {
  it("returns a Duration object for day and days", function () {
    const d1 = (5).day;
    const d2 = (3).days;
    assert.equal(d1 instanceof Object, true);
    assert.equal(d2 instanceof Object, true);
    assert.equal(d1.days, 5);
    assert.equal(d2.days, 3);
  });
});

describe("Date static helpers", function () {
  it("returns today in UTC", function () {
    const today = Date.today;
    const now = new Date();
    assert.equal(today.getUTCFullYear(), now.getUTCFullYear());
    assert.equal(today.getUTCMonth(), now.getUTCMonth());
    assert.equal(today.getUTCDate(), now.getUTCDate());
  });

  it("returns yesterday and tomorrow in UTC", function () {
    const yesterday = Date.yesterday;
    const tomorrow = Date.tomorrow;
    const today = Date.today;
    assert.equal(yesterday.getUTCDate(), today.getUTCDate() - 1);
    assert.equal(tomorrow.getUTCDate(), today.getUTCDate() + 1);
  });
});

describe("Date prototype advance and change", function () {
  const d = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));

  it("advances date correctly using advance()", function () {
    const newDate = d.advance({ days: 1, months: 1 });
    assert.equal(newDate.getUTCFullYear(), 2025);
    assert.equal(newDate.getUTCMonth(), 1); // February
    assert.equal(newDate.getUTCDate(), 2);
  });

  it("changes date correctly using change()", function () {
    const newDate = d.change({ year: 2026, month: 5, day: 10 });
    assert.equal(newDate.getUTCFullYear(), 2026);
    assert.equal(newDate.getUTCMonth(), 5);
    assert.equal(newDate.getUTCDate(), 10);
  });
});
