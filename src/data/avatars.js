// Preset avatars: a small illustrated scene, not a photo upload.
export const AVATAR_PRESETS = [
  { id: 'lamp', label: 'Lamp' },
  { id: 'moonrise', label: 'Moonrise' },
  { id: 'candle', label: 'Candle' },
  { id: 'sunrise', label: 'Sunrise' },
  { id: 'stars', label: 'Stars' },
  { id: 'mountains', label: 'Mountains' },
  { id: 'forest', label: 'Forest' },
  { id: 'flame', label: 'Flame' },
];

export function getAvatarPreset(id) {
  return AVATAR_PRESETS.find((a) => a.id === id) ?? AVATAR_PRESETS[0];
}