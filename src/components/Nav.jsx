import { motion } from 'framer-motion';
import { Sun, History, Search, User } from 'lucide-react';

const TABS = [
  { id: 'today', label: 'Today', Icon: Sun },
  { id: 'timeline', label: 'Timeline', Icon: History },
  { id: 'search', label: 'Search', Icon: Search },
  { id: 'profile', label: 'Profile', Icon: User },
];

export function Nav({ active, onNavigate }) {
  return (
    <nav
      className="sticky bottom-0 border-t"
      style={{
        backgroundColor: 'var(--navy-panel)',
        borderColor: 'var(--navy-line)',
      }}
    >
      <div className="mx-auto flex max-w-md">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-xs transition-colors"
              style={{
                color: isActive ? 'var(--brass-bright)' : 'var(--chrome)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} />
              {label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2"
                  style={{ backgroundColor: 'var(--brass)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}