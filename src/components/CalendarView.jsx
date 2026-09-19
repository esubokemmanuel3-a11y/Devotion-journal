import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EntryCard } from './EntryCard';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarView({ entries, onOpenEntry }) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth() + 1); // 1-indexed
  const [selectedDay, setSelectedDay] = useState(null);

  const daysWithEntries = new Set(
    entries
      .filter((e) => e.year === viewYear && e.month === viewMonth)
      .map((e) => e.day)
  );

  const firstOfMonth = new Date(viewYear, viewMonth - 1, 1);
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();

  function changeMonth(delta) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    setViewMonth(m);
    setViewYear(y);
    setSelectedDay(null);
  }

  const selectedEntries = selectedDay
    ? entries.filter((e) => e.year === viewYear && e.month === viewMonth && e.day === selectedDay)
    : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => changeMonth(-1)} style={{ color: 'var(--chrome)' }}>
          <ChevronLeft size={18} />
        </button>
        <p style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}>
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </p>
        <button type="button" onClick={() => changeMonth(1)} style={{ color: 'var(--chrome)' }}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="text-xs" style={{ color: 'var(--chrome-dim)', fontFamily: 'var(--font-sans)' }}>
            {d}
          </span>
        ))}

        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const hasEntry = daysWithEntries.has(day);
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className="flex flex-col items-center gap-0.5 rounded-lg py-1.5 text-sm"
              style={{
                color: isSelected ? 'var(--brass-bright)' : 'var(--parchment)',
                backgroundColor: isSelected ? 'rgba(var(--brass-rgb), 0.12)' : 'transparent',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {day}
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  backgroundColor: hasEntry ? 'var(--brass)' : 'transparent',
                }}
              />
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mt-6 flex flex-col gap-3">
          {selectedEntries.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}>
              No reflection saved for this day.
            </p>
          ) : (
            selectedEntries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} onClick={() => onOpenEntry(entry.id)} />
            ))
          )}
        </div>
      )}
    </div>
  );
}