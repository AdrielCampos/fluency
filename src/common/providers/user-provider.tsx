'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { createDatabaseUser, getDatabaseUser } from '@/server/firebase/user';
import { User } from '../types/database-user';
import { usePathname, useRouter } from 'next/navigation';

type UserProviderProps = {
  children: React.ReactNode;
};

type UserContextProps = {
  user: User | 'unlogged' | undefined;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
} & Omit<UserProviderProps, 'children'>;

const UserContext = createContext<UserContextProps>(undefined!);

export const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState<User | 'unlogged'>();

  const getDatabaseUserClient = async (user: FirebaseUser) => {
    try {
      const databaseUser = await getDatabaseUser(user.uid);
      if (databaseUser.res === 400) {
        throw new Error('Failed to get user');
      }
      return databaseUser.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createDatabaseUserClient = async (user: FirebaseUser) => {
    try {
      const databaseUser = await createDatabaseUser(user.uid);
      if (databaseUser.res === 400) {
        throw new Error('Failed to create user');
      }
      return databaseUser.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) throw new Error();
        let databaseUser = await getDatabaseUserClient(user);
        if (!databaseUser) {
          databaseUser = await createDatabaseUserClient(user);
        }
        if (!databaseUser) throw new Error('Failed to create user');
        setUser({ ...databaseUser, ...user });
        if (path === '/') router.push('/dashboard');
      } catch (error) {
        setUser('unlogged');
      }
    });
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
    setUser('unlogged');
    router.push('/');
  }, []);

  const refresh = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user');
      const databaseUser = await getDatabaseUserClient(user);
      if (!databaseUser) throw new Error('Failed to get user');
      setUser({ ...databaseUser, ...user });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const values = useMemo(() => ({ user, logout, refresh }), [user, logout, refresh]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserProvider = () => {
  const context = useContext(UserContext);
  return context;
};
