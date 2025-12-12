import Navigation from '@/components/navigation/Navigation';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
];

export default function BlogNavigation() {
  return <Navigation items={navigationItems} />;
}
