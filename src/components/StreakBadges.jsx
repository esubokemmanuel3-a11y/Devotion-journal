import { Flame } from 'lucide-react';
import { MILESTONES, getReachedMilestone, getNextMilestone } from '../data/milestones';

export function StreakBadges({ streak }) {
  const reached = getReachedMilestone(streak);
  const next = getNextMilestone(streak);

  return (
    <div>
      {reached ? (
        <div className="flex items-center gap-2">
          <Flame size={16} color="var(--brass-bright)" strokeWidth={2} />
          <p className="text-sm" style={{ color: 'var(--brass-bright)', fontFamily: 'var(--font-sans)' }}>
            {reached.label} badge earned
          </p>
        </div>
      ) : (
        <p className="text-sm" style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}>
          Keep your streak going to earn your first badge.
        </p>
      )}

      {next && (
        <p className="mt-1 text-xs" style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}>
          {next.days - streak} more day{next.days - streak === 1 ? '' : 's'} to "{next.label}"
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {MILESTONES.map((m) => {
          const earned = streak >= m.days;
          return (
            <span
              key={m.days}
              className="rounded-full px-2.5 py-1 text-xs"
              style={{
                color: earned ? 'var(--brass-bright)' : 'var(--chrome-dim)',
                backgroundColor: earned ? 'rgba(var(--brass-rgb), 0.1)' : 'var(--navy-panel)',
                border: `1px solid ${earned ? 'var(--brass-dim)' : 'var(--navy-line)'}`,
              }}
            >
              {m.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}