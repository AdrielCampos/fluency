import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { cn } from '@/common/utils/cn';
import { Suspense } from 'react';
import { UserProvider } from '@/common/providers/user-provider';
import { Loading } from '@/common/components/loading';
import Head from 'next/head';
import '../config/styles/globals.css';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'Fluency',
  description: 'Aprenda inglês de forma rápida e eficiente.',
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
      <Head>
        <meta name="theme-color" content="#333333" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="google" content="notranslate" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@site" />
        <meta name="twitter:url" content="https://fluency-com.vercel.app/" />
        <meta name="twitter:title" content="Fluency" />
        <meta name="twitter:description" content="Aprenda inglês de forma rápida e eficiente." />
        <meta name="twitter:image" content="https://fluency-com.vercel.app//elated_lira.jpg" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fluency" />
        <meta property="og:description" content="Aprenda inglês de forma rápida e eficiente." />
        <meta property="og:site_name" content="Fluency" />
        <meta property="og:url" content="https://fluency-com.vercel.app/" />
        <meta property="og:image" content="https://fluency-com.vercel.app//elated_lira.jpg" />

        <link rel="preload" href="/manifest.json" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/css/native-like-experience.css" />
        <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>

        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon_120.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon_180.png" />
      </Head>
      <body className={cn(nunito.variable, 'antialiased flex-1 max-w-[480px] min-h-screen')} suppressHydrationWarning>
        <Suspense fallback={<Loading />}>
          <UserProvider>{children}</UserProvider>
        </Suspense>
      </body>
    </html>
  );
}
