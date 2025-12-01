import { defineProperties } from "./define_properties.js";

class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  _cloneUTC(date) {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ),
    );
  }

  includes(date) {
    return date >= this.start && date <= this.end;
  }

  each(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCDate(d.getUTCDate() + step);
    }
    return this;
  }

  each_day(callback, step = 1) {
    return this.each(callback, step);
  }

  each_week(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCDate(d.getUTCDate() + step * 7);
    }
    return this;
  }

  each_month(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    const origDay = d.getUTCDate();

    while (d <= this.end) {
      callback(this._cloneUTC(d));

      let newMonth = d.getUTCMonth() + step;
      let newYear = d.getUTCFullYear();

      newYear += Math.floor(newMonth / 12);
      newMonth = ((newMonth % 12) + 12) % 12;

      const lastDay = new Date(Date.UTC(newYear, newMonth + 1, 0)).getUTCDate();

      d = new Date(Date.UTC(newYear, newMonth, Math.min(origDay, lastDay)));
    }

    return this;
  }

  each_quarter(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCMonth(d.getUTCMonth() + step * 3);
    }
    return this;
  }

  each_year(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCFullYear(d.getUTCFullYear() + step);
    }
    return this;
  }

  *[Symbol.iterator]() {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      yield this._cloneUTC(d);
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }
}

class Duration {
  constructor({
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = {}) {
    Object.assign(this, {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
    });
  }

  get ago() {
    return this.until(Date.current);
  }

  since(date) {
    return this.advance_from(date);
  }

  before(date) {
    return this.until(date);
  }

  after(date) {
    return this.since(date);
  }

  until(date) {
    const negated = new Duration(
      Object.fromEntries(Object.entries(this).map(([k, v]) => [k, -v])),
    );
    return negated.advance_from(date);
  }

  get from_now() {
    return this.since(Date.current);
  }

  advance_from(date) {
    const d = new Date(date);
    d.setSeconds(d.getSeconds() + this.seconds);
    d.setMinutes(d.getMinutes() + this.minutes);
    d.setHours(d.getHours() + this.hours);
    d.setDate(d.getDate() + this.days + this.weeks * 7);
    d.setMonth(d.getMonth() + this.months + this.years * 12);
    return d;
  }
}

// Number durations
for (const unit of [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "year",
]) {
  const plural = unit + "s";
  defineProperties(Number.prototype, {
    [plural]: {
      get() {
        return new Duration({ [plural]: this });
      },
    },
    [unit]: {
      get() {
        return this[plural];
      },
    },
  });
}

// Date range helpers
for (const unit of ["day", "week", "month", "quarter", "year"]) {
  defineProperties(Date.prototype, {
    [`all_${unit}`]: {
      get() {
        return new DateRange(
          this[`beginning_of_${unit}`],
          this[`end_of_${unit}`],
        );
      },
    },
    [`at_beginning_of_${unit}`]: {
      get() {
        return this[`beginning_of_${unit}`];
      },
    },
    [`at_end_of_${unit}`]: {
      get() {
        return this[`end_of_${unit}`];
      },
    },
  });
}

// Named days
for (const day of ["Yesterday", "Today", "Tomorrow"]) {
  defineProperties(Date.prototype, {
    [`is${day}`]: {
      get() {
        return this.all_day.includes(Date[day.toLowerCase()]);
      },
    },
  });
}

// Static Date helpers
defineProperties(Date, {
  current: {
    get() {
      const d = new Date();
      return new Date(
        Date.UTC(
          d.getUTCFullYear(),
          d.getUTCMonth(),
          d.getUTCDate(),
          d.getUTCHours(),
          d.getUTCMinutes(),
          d.getUTCSeconds(),
          d.getUTCMilliseconds(),
        ),
      );
    },
  },
  today: {
    get() {
      const d = new Date();
      return new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
      );
    },
  },
  yesterday: {
    get() {
      return new Date(Date.today.getTime() - 24 * 3600000);
    },
  },
  tomorrow: {
    get() {
      return new Date(Date.today.getTime() + 24 * 3600000);
    },
  },
});

// Prototype methods for Date
defineProperties(Date.prototype, {
  yesterday: {
    get() {
      return this.advance({ days: -1 }).beginning_of_day;
    },
  },
  tomorrow: {
    get() {
      return this.advance({ days: 1 }).beginning_of_day;
    },
  },
  days_in_month: {
    get() {
      return new Date(
        Date.UTC(this.getFullYear(), this.getMonth() + 1, 0),
      ).getUTCDate();
    },
  },
  advance: {
    value: function (duration) {
      return new Duration(duration).advance_from(this);
    },
  },
  change: {
    value: function ({ year, month, day, hour, minute, second, ms } = {}) {
      return new Date(
        Date.UTC(
          year ?? this.getUTCFullYear(),
          month ?? this.getUTCMonth(),
          day ?? this.getUTCDate(),
          hour ?? this.getUTCHours(),
          minute ?? this.getUTCMinutes(),
          second ?? this.getUTCSeconds(),
          ms ?? this.getUTCMilliseconds(),
        ),
      );
    },
  },
});

export { DateRange, Duration };
