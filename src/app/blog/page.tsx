import DefaultPad from '@/components/container/DefaultPad';
import { getAllBlogPosts } from '@/features/blog/utils/post';
import RecentPostsSection from '@/features/blog/sections/RecentPostsSection';
import AllPostsSection from '@/features/blog/sections/AllPostsSection';
import ProfileInfoSection from '@/features/blog/sections/ProfileInfoSection';
import fetchUserInfo from '@/features/landing/utils/fetch-user-info';

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
