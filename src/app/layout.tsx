import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { cn } from '@/common/utils/cn';
import { Suspense } from 'react';
import '../config/styles/globals.css';
import { UserProvider } from '@/common/providers/user-provider';
import { Loading } from '@/common/components/loading';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'Fluency',
  description: 'Fluency is a language learning platform.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="flex items-center justify-center">
      <body className={cn(nunito.variable, 'antialiased flex-1 max-w-[480px] min-h-screen')} suppressHydrationWarning>
        <Suspense fallback={<Loading />}>
          <UserProvider>{children}</UserProvider>
        </Suspense>
      </body>
    </html>
  );
}
