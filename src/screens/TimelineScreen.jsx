import { useState } from 'react';
import { List, Calendar } from 'lucide-react';
import { EntryCard } from '../components/EntryCard';
import { EmptyState } from '../components/EmptyState';
import { CalendarView } from '../components/CalendarView';

export function TimelineScreen({ entriesApi, onOpenEntry, onNavigate }) {
  const { timeline, entries } = entriesApi;
  const [view, setView] = useState('list');

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-10 pt-10">
      <div className="flex items-center justify-between">
        <h1
          className="text-lg"
          style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}
        >
          Timeline
        </h1>
        <div className="flex gap-1 rounded-lg border p-0.5" style={{ borderColor: 'var(--navy-line)' }}>
          {[
            { id: 'list', Icon: List },
            { id: 'calendar', Icon: Calendar },
          ].map(({ id, Icon }) => {
            const isActive = view === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className="rounded-md p-1.5"
                style={{
                  color: isActive ? 'var(--brass-bright)' : 'var(--chrome)',
                  backgroundColor: isActive ? 'rgba(var(--brass-rgb), 0.1)' : 'transparent',
                }}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>

      {timeline.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          message="Your reflections will collect here as you write them, newest first."
          action={{ label: 'Write today\u2019s reflection', onClick: () => onNavigate('today') }}
        />
      ) : view === 'list' ? (
        <div className="mt-6 flex flex-col gap-3">
          {timeline.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onClick={() => onOpenEntry(entry.id)} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <CalendarView entries={entries} onOpenEntry={onOpenEntry} />
        </div>
      )}
    </div>
  );
}