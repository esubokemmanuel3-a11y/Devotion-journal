import { useState } from 'react';
import { X } from 'lucide-react';

/**
 * A small tag chip list with an inline "add tag" input.
 * Controlled: `tags` is the current list, `onChange` receives the next list.
 */
export function TagPicker({ tags, onChange }) {
  const [draft, setDraft] = useState('');

  function addTag() {
    const clean = draft.trim().toLowerCase();
    if (!clean || tags.includes(clean)) {
      setDraft('');
      return;
    }
    onChange([...tags, clean]);
    setDraft('');
  }

  function removeTag(tag) {
    onChange(tags.filter((t) => t !== tag));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => removeTag(tag)}
          className="group flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors"
          style={{
            borderColor: 'var(--brass-dim)',
            color: 'var(--brass-bright)',
            backgroundColor: 'rgba(var(--brass-rgb), 0.08)',
          }}
        >
          {tag}
          <X size={12} className="opacity-60 group-hover:opacity-100" />p
        </button>
      ))}

      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder="Add a tag"
        className="w-28 border-b bg-transparent px-1 py-1 text-sm outline-none"
        style={{
          borderColor: 'var(--navy-line)',
          color: 'var(--parchment)',
          fontFamily: 'var(--font-sans)',
        }}
      />
    </div>
  );
}