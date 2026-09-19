import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { getDevotionalFor } from '../data/devotionals';
import {
  getCurrentReadingPointer,
  resolveLookupDate,
  formatReadingLabel,
} from '../utils/dateHelpers';
import { TagPicker } from '../components/TagPicker';
import { PromptSuggestion } from '../components/PromptSuggestion';
import { ShareCardModal } from '../components/ShareCardModal';

export function TodayScreen({ entriesApi, textScale = 1 }) {
  const { getEntry, saveEntry } = entriesApi;

  const [now] = useState(() => new Date());
  const pointer = getCurrentReadingPointer(now);
  const year = now.getFullYear();
  const lookup = resolveLookupDate(pointer.month, pointer.day, year);
  const reading = getDevotionalFor(lookup.month, lookup.day)?.[pointer.slot];

  const existing = getEntry(year, pointer.month, pointer.day, pointer.slot);

  const [text, setText] = useState(existing?.text ?? '');
  const [tags, setTags] = useState(existing?.tags ?? []);
  const [justSaved, setJustSaved] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    setText(existing?.text ?? '');
    setTags(existing?.tags ?? []);
  }, [existing]);

  function handleSave() {
    if (!text.trim()) return;
    saveEntry(year, pointer.month, pointer.day, pointer.slot, { text, tags });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-10 pt-10">
      <div className="lamp-glow">
        <div className="relative z-10 flex items-start justify-between">
          <p
            className="text-xs uppercase tracking-wide"
            style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
          >
            {formatReadingLabel(pointer.month, pointer.day, pointer.slot)}
          </p>
          {reading && (
            <button
              type="button"
              onClick={() => setSharing(true)}
              aria-label="Share this reading"
              style={{ color: 'var(--chrome)' }}
            >
              <Share2 size={16} strokeWidth={1.75} />
            </button>
          )}
        </div>

        {reading ? (
          <div className="relative z-10 mt-4">
            <p
              className="italic leading-relaxed"
              style={{
                color: 'var(--parchment)',
                fontFamily: 'var(--font-serif)',
                fontSize: `${1.25 * textScale}rem`,
              }}
            >
              "{reading.verse}"
            </p>
            <p
              className="mt-2"
              style={{
                color: 'var(--brass)',
                fontFamily: 'var(--font-sans)',
                fontSize: `${0.875 * textScale}rem`,
              }}
            >
              {reading.reference}
            </p>
            <p
              className="mt-5 leading-relaxed"
              style={{
                color: 'var(--parchment)',
                fontFamily: 'var(--font-serif)',
                fontSize: `${1 * textScale}rem`,
              }}
            >
              {reading.body}
            </p>
          </div>
        ) : (
          <div className="relative z-10 mt-4">
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-serif)' }}
            >
              No reading has been sourced for this date yet — add it to
              devotionals.js to see it here.
            </p>
          </div>
        )}
      </div>

      <div className="mt-10">
        <label
          className="text-xs uppercase tracking-wide"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          Your reflection
        </label>

        {!text && (
          <div className="mt-2">
            <PromptSuggestion slot={pointer.slot} />
          </div>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What does this reading stir in you this morning?"
          rows={5}
          className="mt-2 w-full resize-none rounded-lg border bg-transparent p-3 leading-relaxed outline-none"
          style={{
            borderColor: 'var(--navy-line)',
            backgroundColor: 'var(--navy-panel)',
            color: 'var(--parchment)',
            fontFamily: 'var(--font-serif)',
            fontSize: `${1 * textScale}rem`,
          }}
        />

        <div className="mt-3">
          <TagPicker tags={tags} onChange={setTags} />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={!text.trim()}
          className="mt-5 w-full rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-40"
          style={{
            backgroundColor: 'var(--brass)',
            color: 'var(--navy-deep)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={justSaved ? 'saved' : 'save'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="inline-block"
            >
              {justSaved ? 'Saved' : existing ? 'Update reflection' : 'Save reflection'}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {sharing && reading && (
        <ShareCardModal
          dateLabel={formatReadingLabel(pointer.month, pointer.day, pointer.slot)}
          verse={reading.verse}
          reference={reading.reference}
          reflectionText={text}
          onClose={() => setSharing(false)}
        />
      )}
    </div>
  );
}