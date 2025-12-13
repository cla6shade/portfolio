import Navigation from '@/components/navigation/Navigation';
import ThemeToggle from '@/features/blog/ThemeToggle';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
];

export default function BlogNavigation() {
  return (
    <Navigation
      items={navigationItems}
      navChild={<ThemeToggle />}
      sheetChild={<ThemeToggle />}
    />
  );
}
