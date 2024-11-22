'use client';
import Image from 'next/image';
import GoogleImage from '/public/google.png';
import { useState } from 'react';
import { Loading } from '../loading';
import { loginWithGoogle } from '@/server/firebase/auth';
import { useRouter } from 'next/navigation';

export const GoogleLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const user = await loginWithGoogle();
      if (user.res !== 400) {
        router.push('/dashboard');
        return;
      }

      throw new Error(user.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="flex items-center justify-center rounded-lg gap-3 p-3 border border-primary-dark w-full font-medium"
    >
      <Image alt="Google" src={GoogleImage} width={18} height={18} />
      Entrar com Google
      {loading && <Loading />}
    </button>
  );
};
