import { useState } from 'react';
import { UserPlus } from 'lucide-react';

export function SignupScreen({ onSignUp, onGoToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = username.trim() && email.trim() && password.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSignUp({ username: username.trim(), email: email.trim() });
  }

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-10 pt-10">
      <div className="lamp-glow relative z-10">
        <p
          className="text-xs uppercase tracking-wide"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          Daily Light Journal
        </p>
        <h1
          className="mt-3 text-2xl"
          style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}
        >
          Start your practice.
        </h1>
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}
        >
          A morning and evening reading, and a place to write what it stirs
          in you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 mt-8 flex flex-col gap-4">
        <div>
          <label
            className="text-xs uppercase tracking-wide"
            style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="emmanuel"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-base outline-none"
            style={{
              borderColor: 'var(--navy-line)',
              backgroundColor: 'var(--navy-panel)',
              color: 'var(--parchment)',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <div>
          <label
            className="text-xs uppercase tracking-wide"
            style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-base outline-none"
            style={{
              borderColor: 'var(--navy-line)',
              backgroundColor: 'var(--navy-panel)',
              color: 'var(--parchment)',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <div>
          <label
            className="text-xs uppercase tracking-wide"
            style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-base outline-none"
            style={{
              borderColor: 'var(--navy-line)',
              backgroundColor: 'var(--navy-panel)',
              color: 'var(--parchment)',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-40"
          style={{
            backgroundColor: 'var(--brass)',
            color: 'var(--navy-deep)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <UserPlus size={16} strokeWidth={2} />
          Create account
        </button>
      </form>

      <p
        className="relative z-10 mt-6 text-center text-sm"
        style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}
      >
        Already have an account?{' '}
        <button
          type="button"
          onClick={onGoToLogin}
          className="underline"
          style={{ color: 'var(--brass-bright)' }}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}