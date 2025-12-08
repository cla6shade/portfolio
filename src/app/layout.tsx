import type { Metadata } from 'next';
import { Noto_Sans, Playwrite_US_Trad, Roboto } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ReactNode } from 'react';
import Navigation from '@/components/navigation/Navigation';
import fetchFollowers from '@/utils/fetch-followers';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});
const robotoSerif = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const playWrite = Playwrite_US_Trad({
  variable: '--font-playwrite',
});

export const metadata: Metadata = {
  title: 'CLAVISHADE',
  description: '음악과 성취를 좋아하는 프론트엔드 엔지니어입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${notoSans.variable} ${playWrite.variable} ${robotoSerif.variable} antialiased`}
      >
        <Navigation followersPromise={fetchFollowers()} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
