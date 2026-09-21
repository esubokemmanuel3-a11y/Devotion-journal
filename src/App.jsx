import { useState, useEffect } from 'react';
import { useEntries } from './hooks/useEntries';
import { useProfile } from './hooks/useProfile';
import { usePreferences } from './hooks/usePreferences';
import { Nav } from './components/Nav';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { TodayScreen } from './screens/TodayScreen';
import { TimelineScreen } from './screens/TimelineScreen';
import { EntryDetailScreen } from './screens/EntryDetailScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  const entriesApi = useEntries();
  const { profile, isAuthed, loading: authLoading, signUp, logIn, logOut, updateAvatar } = useProfile();
  const { textSize, setTextSize, theme, setTheme, scaleOf } = usePreferences();
  const textScale = scaleOf(textSize);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Pre-auth: 'login' | 'signup'. Post-auth: 'today' | 'timeline' | 'search' | 'profile' | 'detail'.
  const [screen, setScreen] = useState('login');
  const [activeEntryId, setActiveEntryId] = useState(null);
  const [cameFrom, setCameFrom] = useState('today');
  const [authError, setAuthError] = useState('');

  function navigate(next) {
    setScreen(next);
  }

  function openEntry(id) {
    setCameFrom(screen);
    setActiveEntryId(id);
    setScreen('detail');
  }

  function closeEntry() {
    setScreen(cameFrom);
    setActiveEntryId(null);
  }

  async function handleSignUp(details) {
    setAuthError('');
    try {
      await signUp(details);
      setScreen('today');
    } catch (err) {
      setAuthError(err.message);
    }
  }

  async function handleLogIn(details) {
    setAuthError('');
    try {
      await logIn(details);
      setScreen('today');
    } catch (err) {
      setAuthError(err.message);
    }
  }

  function handleLogOut() {
    logOut();
    setScreen('login');
  }

  const shell = (
    <div className="flex min-h-dvh flex-col overflow-x-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>
      <main className="flex flex-1 items-center justify-center">
        {authLoading && (
          <p style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}>Loading…</p>
        )}
        {!authLoading && !isAuthed && screen === 'login' && (
          <LoginScreen
            onLogIn={handleLogIn}
            onGoToSignup={() => setScreen('signup')}
            hasProfile={!!profile}
            error={authError}
          />
        )}
        {!authLoading && !isAuthed && screen === 'signup' && (
          <SignupScreen onSignUp={handleSignUp} onGoToLogin={() => setScreen('login')} error={authError} />
        )}

        {isAuthed && screen === 'today' && <TodayScreen entriesApi={entriesApi} textScale={textScale} />}
        {isAuthed && screen === 'timeline' && (
          <TimelineScreen entriesApi={entriesApi} onOpenEntry={openEntry} onNavigate={navigate} />
        )}
        {isAuthed && screen === 'search' && (
          <SearchScreen entriesApi={entriesApi} onOpenEntry={openEntry} />
        )}
        {isAuthed && screen === 'profile' && (
          <ProfileScreen
            profile={profile}
            entriesApi={entriesApi}
            onUpdateAvatar={updateAvatar}
            onLogOut={handleLogOut}
            textSize={textSize}
            onSetTextSize={setTextSize}
            theme={theme}
            onSetTheme={setTheme}
          />
        )}
        {isAuthed && screen === 'detail' && (
          <EntryDetailScreen
            entryId={activeEntryId}
            entriesApi={entriesApi}
            onBack={closeEntry}
            textScale={textScale}
          />
        )}
      </main>

      {isAuthed && screen !== 'detail' && <Nav active={screen} onNavigate={navigate} />}
    </div>
  );

  return shell;
}