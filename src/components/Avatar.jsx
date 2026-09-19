import { getAvatarPreset } from '../data/avatars';
import { AVATAR_ART } from './AvatarArt';

/** A single avatar — an illustrated scene clipped to a circle. `size` in px. */
export function Avatar({ avatarId, size = 40 }) {
  const preset = getAvatarPreset(avatarId);
  const Scene = AVATAR_ART[preset.id];

  return (
    <div
      className="shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size, border: '1px solid var(--navy-line)' }}
    >
      <Scene />
    </div>
  );
}