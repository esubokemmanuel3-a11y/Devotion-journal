import { useCallback, useState } from 'react';

const PROFILE_KEY = 'daily-light-journal:profile';
const SESSION_KEY = 'daily-light-journal:session';
const DEFAULT_AVATAR_ID = 'lamp';

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadSession() {
  return localStorage.getItem(SESSION_KEY) === 'true';
}

/**
 * Mock auth — this is a UI-only stand-in for real authentication.
 * Signing up saves a local profile; logging in just checks a profile
 * exists (no real password check). Wire this up to a real backend later.
 */
export function useProfile() {
  const [profile, setProfile] = useState(loadProfile);
  const [isAuthed, setIsAuthed] = useState(loadSession);

  const signUp = useCallback(({ username, email }) => {
    const newProfile = { username, email, avatarId: DEFAULT_AVATAR_ID };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    localStorage.setItem(SESSION_KEY, 'true');
    setProfile(newProfile);
    setIsAuthed(true);
  }, []);

  const logIn = useCallback(() => {
    // UI-only: any submitted credentials "succeed" if a local profile exists.
    localStorage.setItem(SESSION_KEY, 'true');
    setIsAuthed(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.setItem(SESSION_KEY, 'false');
    setIsAuthed(false);
  }, []);

  const updateAvatar = useCallback(
    (avatarId) => {
      const next = { ...profile, avatarId };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      setProfile(next);
    },
    [profile]
  );

  return { profile, isAuthed, signUp, logIn, logOut, updateAvatar };
}