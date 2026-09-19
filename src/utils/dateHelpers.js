// Slot rule (from the spec):
//   6:00am – 7:59pm  -> today's MORNING entry
//   8:00pm – 11:59pm -> today's EVENING entry
//   12:00am – 5:59am -> YESTERDAY's evening entry (it "stays visible
//                        overnight until the next day's morning entry
//                        appears")

const MORNING_STARTS_AT = 6; // 6:00am
const EVENING_STARTS_AT = 20; // 8:00pm

/**
 * Given a JS Date, returns the { month, day, slot } that should be shown
 * on the Today screen right now. month is 1-indexed (Jan = 1).
 */
export function getCurrentReadingPointer(now = new Date()) {
  const hour = now.getHours();

  if (hour < MORNING_STARTS_AT) {
    // Still "night" — show yesterday's evening entry.
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return {
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate(),
      slot: 'evening',
    };
  }

  if (hour < EVENING_STARTS_AT) {
    return { month: now.getMonth() + 1, day: now.getDate(), slot: 'morning' };
  }

  return { month: now.getMonth() + 1, day: now.getDate(), slot: 'evening' };
}

/** Builds the "M-D" key used across devotionals + entries, e.g. "9-12". */
export function dateKey(month, day) {
  return `${month}-${day}`;
}

/** Splits a "M-D" key back into { month, day } numbers. */
export function parseDateKey(key) {
  const [month, day] = key.split('-').map(Number);
  return { month, day };
}

/**
 * Feb 29 exists in the Spurgeon cycle but not every calendar year. In a
 * non-leap year, treat Feb 29 readings as Feb 28's — so nobody loses a
 * day of the cycle just because the current year isn't a leap year.
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Resolves the { month, day } to actually look up, applying the Feb 29 rule. */
export function resolveLookupDate(month, day, year = new Date().getFullYear()) {
  if (month === 2 && day === 29 && !isLeapYear(year)) {
    return { month: 2, day: 28 };
  }
  return { month, day };
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Human-readable label, e.g. "September 12 · Morning". */
export function formatReadingLabel(month, day, slot) {
  const slotLabel = slot === 'morning' ? 'Morning' : 'Evening';
  return `${MONTH_NAMES[month - 1]} ${day} · ${slotLabel}`;
}

/** Short label for lists/history, e.g. "Sep 12". */
export function formatShortDate(month, day) {
  return `${MONTH_NAMES[month - 1].slice(0, 3)} ${day}`;
}
