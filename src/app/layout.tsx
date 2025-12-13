import type { Metadata } from 'next';
import { Noto_Sans, Noto_Serif_KR, Playwrite_US_Trad, Roboto } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ReactNode } from 'react';

const notoSerif = Noto_Serif_KR({
  variable: '--font-noto-serif',
  subsets: ['latin'],
});

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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${playWrite.variable} ${robotoSerif.variable} ${notoSerif.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
