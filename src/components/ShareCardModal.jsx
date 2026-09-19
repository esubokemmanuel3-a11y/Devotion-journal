import { useEffect, useState } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { generateShareCard } from '../utils/shareCard';

export function ShareCardModal({ dateLabel, verse, reference, reflectionText, onClose }) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    generateShareCard({ dateLabel, verse, reference, reflectionText }).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [dateLabel, verse, reference, reflectionText]);

  async function handleShare() {
    if (!dataUrl) return;
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'daily-light-journal.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
        return;
      }
    } catch {
      // fall through to download
    }
    triggerDownload();
  }

  function triggerDownload() {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'daily-light-journal.png';
    a.click();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <div
        className="w-full max-w-sm rounded-xl border p-4"
        style={{ backgroundColor: 'var(--navy-panel)', borderColor: 'var(--navy-line)' }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: 'var(--parchment)', fontFamily: 'var(--font-sans)' }}>
            Share this reading
          </p>
          <button type="button" onClick={onClose} style={{ color: 'var(--chrome)' }}>
            <X size={18} />
          </button>
        </div>

        <div
          className="mt-3 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg"
          style={{ backgroundColor: 'var(--navy-deep)' }}
        >
          {dataUrl ? (
            <img src={dataUrl} alt="Verse and reflection share card" className="h-full w-full object-cover" />
          ) : (
            <p className="text-xs" style={{ color: 'var(--chrome)' }}>
              Preparing image…
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={handleShare}
            disabled={!dataUrl}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium disabled:opacity-40"
            style={{ backgroundColor: 'var(--brass)', color: 'var(--navy-deep)' }}
          >
            <Share2 size={16} />
            Share
          </button>
          <button
            type="button"
            onClick={triggerDownload}
            disabled={!dataUrl}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm disabled:opacity-40"
            style={{ borderColor: 'var(--navy-line)', color: 'var(--chrome)' }}
          >
            <Download size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}