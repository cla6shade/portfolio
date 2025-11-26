import type { Metadata } from 'next';
import { Noto_Sans, Playwrite_US_Trad, Roboto } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
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
  title: 'CLA6SHADE',
  description: '',
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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
