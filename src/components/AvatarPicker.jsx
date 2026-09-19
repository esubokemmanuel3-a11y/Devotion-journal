import { AVATAR_PRESETS } from '../data/avatars';
import { Avatar } from './Avatar';

/** Controlled grid of preset avatars. `selected` is an avatar id. */
export function AvatarPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {AVATAR_PRESETS.map((preset) => {
        const isActive = selected === preset.id;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset.id)}
            className="flex items-center justify-center rounded-full p-1 transition-transform"
            style={{
              outline: isActive ? `2px solid var(--brass)` : 'none',
              outlineOffset: 2,
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <Avatar avatarId={preset.id} size={48} />
          </button>
        );
      })}
    </div>
  );
}