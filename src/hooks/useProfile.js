import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const DEFAULT_AVATAR_ID = 'lamp';

/**
 * Real auth via Supabase. Signup creates the auth user + a matching row in
 * `profiles`. Login/logout use Supabase sessions directly, and a listener
 * keeps `isAuthed` in sync with the actual session (including on refresh).
 */
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Failed to load profile:', error.message);
      return null;
    }
    return data;
  }, []);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        if (isMounted) {
          setProfile(p);
          setIsAuthed(true);
        }
      }
      if (isMounted) setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const p = await fetchProfile(session.user.id);
          setProfile(p);
          setIsAuthed(true);
        } else {
          setProfile(null);
          setIsAuthed(false);
        }
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = useCallback(async ({ username, email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);

    const userId = data.user?.id;
    if (!userId) {
      // Email confirmation is likely required before a session exists.
      throw new Error(
        'Check your email to confirm your account before signing in.'
      );
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      username,
      avatar_id: DEFAULT_AVATAR_ID,
    });
    if (profileError) throw new Error(profileError.message);

    const p = await fetchProfile(userId);
    setProfile(p);
    setIsAuthed(true);
  }, [fetchProfile]);

  const logIn = useCallback(async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    // onAuthStateChange picks up the resulting session and sets profile/isAuthed.
  }, []);

  const logOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const updateAvatar = useCallback(
    async (avatarId) => {
      if (!profile) return;
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_id: avatarId })
        .eq('id', profile.id);
      if (error) {
        console.error('Failed to update avatar:', error.message);
        return;
      }
      setProfile({ ...profile, avatar_id: avatarId });
    },
    [profile]
  );

  return {
    profile: profile
      ? { username: profile.username, email: profile.email, avatarId: profile.avatar_id }
      : null,
    isAuthed,
    loading,
    signUp,
    logIn,
    logOut,
    updateAvatar,
  };
}
