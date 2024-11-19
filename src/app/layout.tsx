import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { cn } from '@/common/utils/cn';
import { Suspense } from 'react';
import '../config/styles/globals.css';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'Fluency',
  description: 'Fluency is a language learning platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="flex items-center justify-center">
      <body className={cn(nunito.variable, 'antialiased flex-1 max-w-screen-sm min-h-screen')} suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
