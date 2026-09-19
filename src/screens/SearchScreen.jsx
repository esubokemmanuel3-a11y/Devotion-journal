import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { EntryCard } from '../components/EntryCard';
import { EmptyState } from '../components/EmptyState';

export function SearchScreen({ entriesApi, onOpenEntry }) {
  const { searchEntries, allTags } = entriesApi;
  const [keyword, setKeyword] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const hasQuery = keyword.trim() !== '' || activeTag !== null;
  const results = hasQuery ? searchEntries(keyword, activeTag) : [];

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-10 pt-10">
      <h1
        className="text-lg"
        style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}
      >
        Search
      </h1>

      <div className="relative mt-4">
        <SearchIcon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--chrome)' }}
        />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search your reflections"
          className="w-full rounded-lg border bg-transparent py-3 pl-9 pr-3 text-base outline-none"
          style={{
            borderColor: 'var(--navy-line)',
            backgroundColor: 'var(--navy-panel)',
            color: 'var(--parchment)',
            fontFamily: 'var(--font-sans)',
          }}
        />
      </div>

      {allTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(isActive ? null : tag)}
                className="rounded-full border px-3 py-1 text-sm"
                style={{
                  borderColor: isActive ? 'var(--brass)' : 'var(--navy-line)',
                  color: isActive ? 'var(--brass-bright)' : 'var(--chrome)',
                  backgroundColor: isActive ? 'rgba(var(--brass-rgb), 0.08)' : 'transparent',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        {!hasQuery ? (
          <EmptyState
            title="Find a past reflection"
            message="Search by keyword, or tap a tag above, to bring up reflections you've written before."
          />
        ) : results.length === 0 ? (
          <EmptyState
            title="No matches"
            message="Nothing matches that search yet. Try a different word or tag."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((entry) => (
              <EntryCard key={entry.id} entry={entry} onClick={() => onOpenEntry(entry.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}