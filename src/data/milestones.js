export const MILESTONES = [
  { days: 3, label: 'First steps' },
  { days: 7, label: 'One week' },
  { days: 14, label: 'Two weeks' },
  { days: 30, label: 'One month' },
  { days: 60, label: 'Two months' },
  { days: 100, label: 'Hundred days' },
  { days: 365, label: 'One year' },
];

/** Highest milestone reached by a given streak, or null if none yet. */
export function getReachedMilestone(streak) {
  const reached = MILESTONES.filter((m) => streak >= m.days);
  return reached.length > 0 ? reached[reached.length - 1] : null;
}

/** Next milestone still ahead, or null if all are reached. */
export function getNextMilestone(streak) {
  return MILESTONES.find((m) => streak < m.days) ?? null;
}