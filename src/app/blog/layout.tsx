import { type ReactNode } from 'react';
import BlogNavigation from '@/features/blog/BlogNavigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange attribute="class">
      <BlogNavigation />
      <main className="min-h-screen pt-20 bg-background text-foreground font-noto-serif">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
