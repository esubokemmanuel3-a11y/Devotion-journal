/** Total number of saved reflections. */
export function getEntryCount(entries) {
  return entries.length;
}

/**
 * Current streak in days: consecutive calendar days (counting back from
 * today) that have at least one reflection. A day with only a morning OR
 * only an evening entry still counts as a journaled day.
 */
export function getCurrentStreak(entries) {
  if (entries.length === 0) return 0;

  const daysWithEntries = new Set(
    entries.map((e) => `${e.year}-${e.month}-${e.day}`)
  );

  let streak = 0;
  const cursor = new Date();

  // Today not having an entry yet shouldn't zero out an otherwise real
  // streak — start counting from today, but don't require today specifically.
  if (!daysWithEntries.has(`${cursor.getFullYear()}-${cursor.getMonth() + 1}-${cursor.getDate()}`)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (
    daysWithEntries.has(`${cursor.getFullYear()}-${cursor.getMonth() + 1}-${cursor.getDate()}`)
  ) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}