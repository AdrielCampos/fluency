'use server';
import { db } from '@/config/firebase';
import { Content } from '@google/generative-ai';
import { doc, updateDoc } from 'firebase/firestore';

export async function setChat(uid: string, history: Content[], score: number): Promise<{ res: 200 } | { res: 400 }> {
  try {
    await updateDoc(doc(db, 'users', uid), { history, score });
    return { res: 200 };
  } catch (error) {
    return { res: 400 };
  }
}
