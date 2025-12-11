import { Suspense } from 'react';
import Navigation from '@/components/navigation/Navigation';
import GithubButton from '@/components/navigation/GithubButton';
import FollowerCount from '@/components/navigation/FollowerCount';

interface LandingNavigationProps {
  followersPromise: Promise<number>;
}

const navigationItems = [
  { href: '#basic-info', label: 'Basic Info' },
  { href: '#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

export default function LandingNavigation({ followersPromise }: LandingNavigationProps) {
  const followers = (
    <Suspense fallback={<>33</>}>
      <FollowerCount followersPromise={followersPromise} />
    </Suspense>
  );

  return (
    <Navigation
      items={navigationItems}
      navChild={<GithubButton>{followers}</GithubButton>}
      sheetChild={<GithubButton variant="sheet">{followers}</GithubButton>}
    />
  );
}
