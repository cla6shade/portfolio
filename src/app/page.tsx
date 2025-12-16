import { type Metadata } from 'next';
import HeroSection from '@/features/landing/hero/HeroSection';
import BasicInfoSection from '@/features/landing/basic-info/BasicInfoSection';
import ProjectsSection from '@/features/landing/projects/ProjectsSection';
import Footer from '@/components/Footer';
import LandingPage from '@/features/landing/LandingPage';
import fetchFollowers from '@/features/landing/utils/fetch-followers';
import LandingNavigation from '@/features/landing/LandingNavigation';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'CLAVISHADE - Frontend Engineer',
  description:
    '음악과 성취를 좋아하는 프론트엔드 엔지니어 CLAVISHADE입니다. TypeScript, React, Next.js를 사용하여 웹 애플리케이션을 개발합니다.',
  keywords: [
    'Frontend Engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Web Development',
    'Portfolio',
    '프론트엔드',
    '개발자',
    '포트폴리오',
  ],
  authors: [{ name: 'CLAVISHADE' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://cla6sha.de',
    siteName: 'CLAVISHADE',
    title: 'CLAVISHADE - Frontend Engineer',
    description:
      '음악과 성취를 좋아하는 프론트엔드 엔지니어 CLAVISHADE입니다. TypeScript, React, Next.js를 사용하여 웹 애플리케이션을 개발합니다.',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/111969754',
        width: 1200,
        height: 630,
        alt: 'CLAVISHADE Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLAVISHADE - Frontend Engineer Portfolio',
    description: '음악과 성취를 좋아하는 프론트엔드 엔지니어 CLAVISHADE입니다.',
    images: ['https://avatars.githubusercontent.com/u/111969754'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function Home() {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <main>
        <LandingNavigation followersPromise={fetchFollowers()} />
        <LandingPage>
          <HeroSection />
          <BasicInfoSection />
          <ProjectsSection />
          <Footer />
        </LandingPage>
      </main>
    </ThemeProvider>
  );
}
