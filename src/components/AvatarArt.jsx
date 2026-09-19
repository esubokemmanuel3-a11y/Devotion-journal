// Each scene fills a 64x64 square; Avatar.jsx clips it to a circle.
// Gradient ids are prefixed per-scene since multiple avatars render at once.

function LampScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="lamp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2440" />
          <stop offset="100%" stopColor="#0b111f" />
        </linearGradient>
        <radialGradient id="lamp-glow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#f0c27a" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#c99a53" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c99a53" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#lamp-bg)" />
      <circle cx="32" cy="26" r="26" fill="url(#lamp-glow)" />
      <rect x="30" y="30" width="4" height="18" fill="#3a3226" />
      <path d="M20 30 L44 30 L38 20 L26 20 Z" fill="#e6b768" />
      <rect x="18" y="48" width="28" height="4" rx="2" fill="#2a2318" />
    </svg>
  );
}

function MoonriseScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="moon-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e1730" />
          <stop offset="100%" stopColor="#050810" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#moon-bg)" />
      <circle cx="1" cy="1" r="0.8" fill="#efe6d3" opacity="0.7" />
      <circle cx="52" cy="10" r="1" fill="#efe6d3" opacity="0.8" />
      <circle cx="44" cy="46" r="0.8" fill="#efe6d3" opacity="0.6" />
      <circle cx="14" cy="40" r="1" fill="#efe6d3" opacity="0.7" />
      <circle cx="10" cy="14" r="0.7" fill="#efe6d3" opacity="0.5" />
      <circle cx="34" cy="26" r="13" fill="#f2e9d8" />
      <circle cx="39" cy="22" r="12" fill="#0e1730" />
    </svg>
  );
}

function CandleScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <radialGradient id="candle-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f0c27a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c99a53" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="candle-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#e6742f" />
          <stop offset="60%" stopColor="#f2b24a" />
          <stop offset="100%" stopColor="#fbe3a0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="#131b30" />
      <circle cx="34" cy="24" r="24" fill="url(#candle-glow)" />
      <path d="M16 44 L48 44 L44 52 L20 52 Z" fill="#7d9a7e" opacity="0.8" />
      <path d="M20 40 L44 40 L44 44 L20 44 Z" fill="#efe6d3" opacity="0.9" />
      <rect x="32" y="24" width="5" height="16" fill="#efe6d3" />
      <path d="M34.5 14 C31 19 31 23 34.5 25 C38 23 38 19 34.5 14 Z" fill="url(#candle-flame)" />
    </svg>
  );
}

function SunriseScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="sunrise-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2244" />
          <stop offset="55%" stopColor="#a86a3f" />
          <stop offset="100%" stopColor="#e8b768" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#sunrise-sky)" />
      <circle cx="32" cy="42" r="12" fill="#f7d999" />
      <rect y="42" width="64" height="22" fill="#151d33" />
      <rect y="42" width="64" height="2" fill="#0e1524" opacity="0.6" />
    </svg>
  );
}

function StarsScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <radialGradient id="stars-band" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#2a3660" />
          <stop offset="100%" stopColor="#080c18" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#stars-band)" />
      {[
        [8, 10, 0.9], [20, 6, 0.6], [32, 14, 1.1], [46, 8, 0.7],
        [54, 20, 0.9], [12, 26, 0.6], [26, 30, 0.8], [40, 28, 0.6],
        [50, 38, 1], [16, 44, 0.7], [30, 48, 0.9], [44, 50, 0.6],
        [8, 54, 0.8], [58, 52, 0.7], [22, 20, 0.5], [36, 42, 0.6],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#efe6d3" opacity={0.5 + (i % 3) * 0.15} />
      ))}
    </svg>
  );
}

function MountainsScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="mtn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241a3a" />
          <stop offset="100%" stopColor="#a3623f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#mtn-sky)" />
      <circle cx="44" cy="20" r="7" fill="#f2d18c" opacity="0.85" />
      <path d="M0 46 L14 26 L26 40 L36 22 L50 40 L64 30 L64 64 L0 64 Z" fill="#2a2244" />
      <path d="M0 54 L18 38 L30 50 L46 34 L64 46 L64 64 L0 64 Z" fill="#181330" />
    </svg>
  );
}

function ForestScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="forest-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#243a2c" />
          <stop offset="100%" stopColor="#0f1a14" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#forest-bg)" />
      <path d="M26 64 L38 64 L34 24 L30 24 Z" fill="#3a4a30" opacity="0.9" />
      <circle cx="10" cy="30" r="10" fill="#1e3324" />
      <rect x="8" y="30" width="4" height="20" fill="#1a1410" />
      <circle cx="54" cy="26" r="12" fill="#274a30" />
      <rect x="52" y="26" width="4" height="24" fill="#1a1410" />
      <circle cx="34" cy="18" r="8" fill="#c9974a" opacity="0.5" />
    </svg>
  );
}

function FlameScene() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="flame-core" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8a3a8f" />
          <stop offset="35%" stopColor="#e6742f" />
          <stop offset="75%" stopColor="#f2b24a" />
          <stop offset="100%" stopColor="#fbe9b8" />
        </linearGradient>
        <radialGradient id="flame-glow" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#e6742f" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e6742f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="#0e1220" />
      <circle cx="32" cy="34" r="26" fill="url(#flame-glow)" />
      <path
        d="M32 8 C22 22 20 32 26 40 C24 34 27 29 32 26 C30 33 34 36 34 42 C40 38 42 30 38 22 C40 26 39 30 37 32 C40 24 38 14 32 8 Z"
        fill="url(#flame-core)"
      />
    </svg>
  );
}

export const AVATAR_ART = {
  lamp: LampScene,
  moonrise: MoonriseScene,
  candle: CandleScene,
  sunrise: SunriseScene,
  stars: StarsScene,
  mountains: MountainsScene,
  forest: ForestScene,
  flame: FlameScene,
};