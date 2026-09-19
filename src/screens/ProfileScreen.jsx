import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { AvatarPicker } from '../components/AvatarPicker';
import { TextSizeControl } from '../components/TextSizeControl';
import { ThemeToggle } from '../components/ThemeToggle';
import { StreakBadges } from '../components/StreakBadges';
import { getEntryCount, getCurrentStreak } from '../utils/statsHelpers';

export function ProfileScreen({
  profile,
  entriesApi,
  onUpdateAvatar,
  onLogOut,
  textSize,
  onSetTextSize,
  theme,
  onSetTheme,
}) {
  const [changingAvatar, setChangingAvatar] = useState(false);
  const entryCount = getEntryCount(entriesApi.entries);
  const streak = getCurrentStreak(entriesApi.entries);

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-10 pt-10">
      <div className="flex items-center gap-4">
        <Avatar avatarId={profile?.avatarId} size={56} />
        <div>
          <p
            className="text-lg"
            style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}
          >
            {profile?.username ?? 'Friend'}
          </p>
          <p
            className="text-sm"
            style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}
          >
            {profile?.email}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <div
          className="rounded-lg border p-4"
          style={{ borderColor: 'var(--navy-line)', backgroundColor: 'var(--navy-panel)' }}
        >
          <p
            className="text-2xl"
            style={{ color: 'var(--brass-bright)', fontFamily: 'var(--font-serif)' }}
          >
            {streak}
          </p>
          <p
            className="mt-1 text-xs uppercase tracking-wide"
            style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
          >
            Day streak
          </p>
        </div>
        <div
          className="rounded-lg border p-4"
          style={{ borderColor: 'var(--navy-line)', backgroundColor: 'var(--navy-panel)' }}
        >
          <p
            className="text-2xl"
            style={{ color: 'var(--brass-bright)', fontFamily: 'var(--font-serif)' }}
          >
            {entryCount}
          </p>
          <p
            className="mt-1 text-xs uppercase tracking-wide"
            style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
          >
            Reflections
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border p-4" style={{ borderColor: 'var(--navy-line)', backgroundColor: 'var(--navy-panel)' }}>
        <StreakBadges streak={streak} />
      </div>

      <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--navy-line)' }}>
        {changingAvatar ? (
          <>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
            >
              Choose an avatar
            </p>
            <div className="mt-3">
              <AvatarPicker
                selected={profile?.avatarId}
                onSelect={(id) => {
                  onUpdateAvatar(id);
                  setChangingAvatar(false);
                }}
              />
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setChangingAvatar(true)}
            className="text-sm"
            style={{ color: 'var(--brass-bright)', fontFamily: 'var(--font-sans)' }}
          >
            Change avatar
          </button>
        )}
      </div>

      <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--navy-line)' }}>
        <p
          className="text-xs uppercase tracking-wide"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          Reading text size
        </p>
        <div className="mt-3">
          <TextSizeControl value={textSize} onChange={onSetTextSize} />
        </div>
      </div>

      <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--navy-line)' }}>
        <p
          className="text-xs uppercase tracking-wide"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          Appearance
        </p>
        <div className="mt-3">
          <ThemeToggle value={theme} onChange={onSetTheme} />
        </div>
      </div>

      <button
        type="button"
        onClick={onLogOut}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-sm"
        style={{ borderColor: 'var(--navy-line)', color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
      >
        <LogOut size={16} strokeWidth={2} />
        Sign out
      </button>
    </div>
  );
}