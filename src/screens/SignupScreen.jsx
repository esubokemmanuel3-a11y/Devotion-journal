import { useState } from 'react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

export function SignupScreen({ onSignUp, onGoToLogin, error }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const canSubmit =
    username.trim() && email.trim() && password.trim() && confirmPassword.trim() && passwordsMatch;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSignUp({ username: username.trim(), email: email.trim(), password });
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
        {error && (
          <p className="text-sm" style={{ color: '#e08585', fontFamily: 'var(--font-sans)' }}>
            {error}
          </p>
        )}
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
          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border bg-transparent p-3 pr-11 text-base outline-none"
              style={{
                borderColor: 'var(--navy-line)',
                backgroundColor: 'var(--navy-panel)',
                color: 'var(--parchment)',
                fontFamily: 'var(--font-sans)',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--chrome)' }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label
            className="text-xs uppercase tracking-wide"
            style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
          >
            Confirm password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-base outline-none"
            style={{
              borderColor: confirmPassword && !passwordsMatch ? '#e08585' : 'var(--navy-line)',
              backgroundColor: 'var(--navy-panel)',
              color: 'var(--parchment)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-xs" style={{ color: '#e08585', fontFamily: 'var(--font-sans)' }}>
              Passwords don't match
            </p>
          )}
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