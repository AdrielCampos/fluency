'use client';
import { Loading } from '@/common/components/loading';
import { useUserProvider } from '@/common/providers/user-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useUserProvider();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user || loaded) return;

    if (user === 'unlogged') {
      router.push('/');
      return;
    }

    setLoaded(true);
  }, [user, router, loaded]);

  return loaded ? children : <Loading />;
}
