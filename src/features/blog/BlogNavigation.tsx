import Navigation from '@/components/navigation/Navigation';
import BlogButtonCollection from '@/features/blog/BlogButtonCollection';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
];

export default function BlogNavigation() {
  return (
    <Navigation
      items={navigationItems}
      navChild={<BlogButtonCollection />}
      sheetChild={<BlogButtonCollection variant="sheet" />}
    />
  );
}
