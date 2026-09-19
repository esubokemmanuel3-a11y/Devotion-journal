import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { getRandomPrompt } from '../data/prompts';

export function PromptSuggestion({ slot }) {
  const [prompt, setPrompt] = useState(() => getRandomPrompt(slot));

  return (
    <div
      className="flex items-start justify-between gap-3 rounded-lg border p-3"
      style={{ borderColor: 'var(--navy-line)', backgroundColor: 'rgba(var(--brass-rgb), 0.05)' }}
    >
      <p
        className="min-w-0 flex-1 text-sm italic leading-relaxed"
        style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-serif)' }}
      >
        {prompt}
      </p>
      <button
        type="button"
        onClick={() => setPrompt((p) => getRandomPrompt(slot, p))}
        className="shrink-0"
        aria-label="Try a different prompt"
        style={{ color: 'var(--chrome)' }}
      >
        <Shuffle size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}