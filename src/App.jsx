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
  const { profile, isAuthed, signUp, logIn, logOut, updateAvatar } = useProfile();
  const { textSize, setTextSize, theme, setTheme, scaleOf } = usePreferences();
  const textScale = scaleOf(textSize);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Pre-auth: 'login' | 'signup'. Post-auth: 'today' | 'timeline' | 'search' | 'profile' | 'detail'.
  const [screen, setScreen] = useState(profile ? 'login' : 'signup');
  const [activeEntryId, setActiveEntryId] = useState(null);
  const [cameFrom, setCameFrom] = useState('today');

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

  function handleSignUp(details) {
    signUp(details);
    setScreen('today');
  }

  function handleLogIn() {
    logIn();
    setScreen('today');
  }

  function handleLogOut() {
    logOut();
    setScreen('login');
  }

  const shell = (
    <div className="flex min-h-dvh flex-col overflow-x-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>
      <main className="flex flex-1 items-center justify-center">
        {!isAuthed && screen === 'login' && (
          <LoginScreen
            onLogIn={handleLogIn}
            onGoToSignup={() => setScreen('signup')}
            hasProfile={!!profile}
          />
        )}
        {!isAuthed && screen === 'signup' && (
          <SignupScreen onSignUp={handleSignUp} onGoToLogin={() => setScreen('login')} />
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