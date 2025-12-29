import { type Metadata } from 'next';
import DefaultPad from '@/components/container/DefaultPad';
import { getAllBlogPosts } from '@/features/blog/utils/post';
import RecentPostsSection from '@/features/blog/sections/RecentPostsSection';
import AllPostsSection from '@/features/blog/sections/AllPostsSection';
import ProfileInfoSection from '@/features/blog/sections/ProfileInfoSection';
import fetchUserInfo from '@/features/landing/utils/fetch-user-info';
import BlogClientLayout from '@/features/blog/BlogClientLayout';

export const metadata: Metadata = {
  title: 'CLAVIS.LOG - 개발 기록과 자아성찰',
  description: '개발 기록과 자아 성찰을 담는 블로그',
  keywords: [
    'Blog',
    'Developer Blog',
    'Frontend',
    'TypeScript',
    'React',
    'Next.js',
    'Web Development',
    '개발 블로그',
    '프론트엔드',
    '기술 블로그',
  ],
  authors: [{ name: 'CLAVISHADE' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://cla6sha.de/blog',
    siteName: 'CLAVIS.LOG',
    title: 'CLAVIS.LOG - 개발 기록과 자아성찰',
    description: '개발 기록과 자아 성찰을 담는 블로그',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/111969754',
        width: 1200,
        height: 630,
        alt: 'CLAVIS.LOG Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLAVIS.LOG - 개발 기록과 자아성찰',
    description: '개발 기록과 자아 성찰을 담는 블로그',
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
  alternates: {
    canonical: 'https://cla6sha.de/blog',
  },
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();
  const postsMetadata = blogPosts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata,
  }));

  return (
    <DefaultPad className="py-16">
      <header className="mb-16 w-full h-32 rounded-lg flex items-center justify-center relative">
        <div className="relative z-10 flex flex-col items-center gap-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            CLAVIS<span className="text-light-peru">.LOG</span>
          </h1>
          <p className="text-lg md:text-xl">개발 기록과 자아성찰</p>
        </div>
      </header>

      {postsMetadata.length === 0 ? (
        <div className="py-20">
          <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="flex gap-12">
            <RecentPostsSection posts={postsMetadata} limit={3} />
            <ProfileInfoSection userInfoPromise={fetchUserInfo()} />
          </div>
          <AllPostsSection posts={postsMetadata} />
        </>
      )}
    </DefaultPad>
  );
}
