import { auth } from '@/config/firebase';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

export const loginWithGoogle = async (): Promise<{ data: User; res: 200 } | { data: string; res: 400 }> => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    return { data: user, res: 200 };
  } catch (error) {
    return { data: JSON.stringify(error), res: 400 };
  }
};
