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

describe("DateRange each_quarter and each_year", function () {
  it("each_quarter iterates by quarter correctly", function () {
    const start = new Date(Date.UTC(2025, 0, 15)); // Jan 15, 2025
    const end = new Date(Date.UTC(2025, 9, 15)); // Oct 15, 2025
    const range = new DateRange(start, end);
    const months = [];
    range.each_quarter((d) => months.push(d.getUTCMonth()));
    assert.deepEqual(months, [0, 3, 6, 9]); // Jan, Apr, Jul, Oct
  });

  it("each_year iterates by year correctly", function () {
    const start = new Date(Date.UTC(2020, 5, 15));
    const end = new Date(Date.UTC(2025, 5, 15));
    const range = new DateRange(start, end);
    const years = [];
    range.each_year((d) => years.push(d.getUTCFullYear()));
    assert.deepEqual(years, [2020, 2021, 2022, 2023, 2024, 2025]);
  });
});

describe("DateRange each (generic)", function () {
  it("each iterates day by day with step", function () {
    const start = new Date(Date.UTC(2025, 0, 1));
    const end = new Date(Date.UTC(2025, 0, 10));
    const range = new DateRange(start, end);
    const days = [];
    range.each((d) => days.push(d.getUTCDate()), 3);
    assert.deepEqual(days, [1, 4, 7, 10]);
  });
});

describe("Duration ago and from_now", function () {
  it("ago returns date in the past", function () {
    const past = (3).days.ago;
    const expected = new Date(Date.current.getTime() - 3 * 24 * 3600000);
    assert.equal(past.getUTCDate(), expected.getUTCDate());
  });

  it("from_now returns date in the future", function () {
    const future = (3).days.from_now;
    const expected = new Date(Date.current.getTime() + 3 * 24 * 3600000);
    assert.equal(future.getUTCDate(), expected.getUTCDate());
  });
});

describe("Duration since, before, after, until", function () {
  const baseDate = new Date(Date.UTC(2025, 5, 15));

  it("since moves forward from a date", function () {
    const result = (10).days.since(baseDate);
    assert.equal(result.getUTCDate(), 25);
  });

  it("after is alias for since", function () {
    const result = (10).days.after(baseDate);
    assert.equal(result.getUTCDate(), 25);
  });

  it("before moves backward from a date", function () {
    const result = (10).days.before(baseDate);
    assert.equal(result.getUTCDate(), 5);
  });

  it("until moves backward from a date", function () {
    const result = (10).days.until(baseDate);
    assert.equal(result.getUTCDate(), 5);
  });
});

describe("Number duration helpers for all units", function () {
  it("seconds and second return Duration", function () {
    assert.equal((30).seconds.seconds, 30);
    assert.equal((1).second.seconds, 1);
  });

  it("minutes and minute return Duration", function () {
    assert.equal((5).minutes.minutes, 5);
    assert.equal((1).minute.minutes, 1);
  });

  it("hours and hour return Duration", function () {
    assert.equal((2).hours.hours, 2);
    assert.equal((1).hour.hours, 1);
  });

  it("weeks and week return Duration", function () {
    assert.equal((3).weeks.weeks, 3);
    assert.equal((1).week.weeks, 1);
  });

  it("months and month return Duration", function () {
    assert.equal((6).months.months, 6);
    assert.equal((1).month.months, 1);
  });

  it("years and year return Duration", function () {
    assert.equal((2).years.years, 2);
    assert.equal((1).year.years, 1);
  });
});

describe("Date.current", function () {
  it("returns current UTC date with time", function () {
    const current = Date.current;
    const now = new Date();
    assert.equal(current.getUTCFullYear(), now.getUTCFullYear());
    assert.equal(current.getUTCMonth(), now.getUTCMonth());
    assert.equal(current.getUTCDate(), now.getUTCDate());
  });
});

describe("Date prototype days_in_month", function () {
  it("days_in_month returns correct days", function () {
    const jan = new Date(Date.UTC(2025, 0, 15));
    const feb = new Date(Date.UTC(2025, 1, 15));
    const febLeap = new Date(Date.UTC(2024, 1, 15));
    assert.equal(jan.days_in_month, 31);
    assert.equal(feb.days_in_month, 28);
    assert.equal(febLeap.days_in_month, 29);
  });
});
