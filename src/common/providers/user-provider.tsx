'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';

type UserProviderProps = {
  children: React.ReactNode;
};

type UserContextProps = {
  user: User | 'unlogged' | undefined;
  logout: () => Promise<void>;
} & Omit<UserProviderProps, 'children'>;

const UserContext = createContext<UserContextProps>(undefined!);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | 'unlogged'>();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) throw new Error();
        setUser(user);
      } catch (error) {
        setUser('unlogged');
      }
    });
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
    setUser('unlogged');
  }, []);

  const values = useMemo(() => ({ user, logout }), [user, logout]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserProvider = () => {
  const context = useContext(UserContext);
  return context;
};
