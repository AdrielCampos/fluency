'use server';
import { User } from '@/common/types/database-user';
import { db } from '@/config/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';

export async function createDatabaseUser(
  uid: FirebaseUser['uid'],
): Promise<{ data: Omit<User, keyof FirebaseUser>; res: 200 } | { data: string; res: 400 }> {
  try {
    const uidSchema = z.object({
      uid: z.string(),
    });
    const data = uidSchema.parse({ uid });

    const defaultUser = {
      score: 0,
      history: [],
    } as Omit<User, keyof FirebaseUser>;

    await setDoc(doc(db, 'users', data.uid), defaultUser);

    return { data: defaultUser, res: 200 };
  } catch (error) {
    return { data: 'Failed to create user', res: 400 };
  }
}

export async function getDatabaseUser(
  uid: FirebaseUser['uid'],
): Promise<{ data: Omit<User, keyof FirebaseUser>; res: 200 } | { data: string; res: 400 }> {
  try {
    const uidSchema = z.object({
      uid: z.string(),
    });
    const data = uidSchema.parse({ uid });

    const snapshot = await getDoc(doc(db, 'users', data.uid));

    if (!snapshot.exists()) {
      return { data: 'User not found', res: 400 };
    }

    const user = snapshot.data() as Omit<User, keyof FirebaseUser>;

    return { data: user, res: 200 };
  } catch (error) {
    return { data: 'Failed to get user', res: 400 };
  }
}

export async function setDatabaseUser(
  uid: FirebaseUser['uid'],
  user: Omit<User, keyof FirebaseUser>,
): Promise<{ data: Omit<User, keyof FirebaseUser>; res: 200 } | { data: string; res: 400 }> {
  try {
    const uidSchema = z.object({
      uid: z.string(),
    });
    const data = uidSchema.parse({ uid });

    await updateDoc(doc(db, 'users', data.uid), user);

    return { data: user, res: 200 };
  } catch (error) {
    return { data: 'Failed to set user', res: 400 };
  }
}
