import { Suspense, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, MapPin, Building } from 'lucide-react';
import SectionTitle from '@/features/blog/sections/SectionTitle';
import { Button } from '@/components/ui/button';

interface GitHubUserInfo {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface ProfileInfoSectionProps {
  userInfoPromise: Promise<GitHubUserInfo>;
}

function ProfileInfoContent({ userInfoPromise }: ProfileInfoSectionProps) {
  const userInfo = use(userInfoPromise);

  return (
    <aside className="hidden desktop:block w-80">
      <SectionTitle>Profile</SectionTitle>
      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-sandy-brown/20">
            <Image
              src={userInfo.avatar_url}
              alt={userInfo.name || userInfo.login}
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">{userInfo.name || userInfo.login}</h2>
            <p className="text-sm text-muted-foreground">@{userInfo.login}</p>
          </div>

          {userInfo.bio && (
            <p className="text-sm text-center text-muted-foreground">{userInfo.bio}</p>
          )}
        </div>

        <div className="space-y-3">
          {userInfo.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{userInfo.location}</span>
            </div>
          )}

          {userInfo.company && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="w-4 h-4" />
              <span>{userInfo.company}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
          <div className="text-center">
            <div className="text-lg font-bold">{userInfo.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{userInfo.following}</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{userInfo.public_repos}</div>
            <div className="text-xs text-muted-foreground">Repos</div>
          </div>
        </div>

        <Button asChild variant="ghost">
          <Link
            href={userInfo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 text-light-peru hover:text-sandy-brown rounded-md transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">View on GitHub</span>
          </Link>
        </Button>
      </div>
    </aside>
  );
}

export default function ProfileInfoSection({ userInfoPromise }: ProfileInfoSectionProps) {
  return (
    <Suspense
      fallback={
        <aside className="hidden desktop:block w-80">
          <div className="border-l-4 border-l-muted pl-2 animate-pulse">
            <div className="h-7 w-20 bg-muted rounded" />
          </div>
          <div className="p-6 space-y-6 animate-pulse">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-24 h-24 rounded-full bg-muted ring-2 ring-sandy-brown/20" />

              <div className="text-center space-y-1">
                <div className="h-7 w-32 bg-muted rounded mx-auto" />
                <div className="h-5 w-24 bg-muted rounded mx-auto" />
              </div>

              <div className="h-10 w-full bg-muted rounded" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="h-5 w-32 bg-muted rounded" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="text-center">
                <div className="h-7 w-8 bg-muted rounded mx-auto mb-1" />
                <div className="h-4 w-16 bg-muted rounded mx-auto" />
              </div>
              <div className="text-center">
                <div className="h-7 w-8 bg-muted rounded mx-auto mb-1" />
                <div className="h-4 w-16 bg-muted rounded mx-auto" />
              </div>
              <div className="text-center">
                <div className="h-7 w-8 bg-muted rounded mx-auto mb-1" />
                <div className="h-4 w-12 bg-muted rounded mx-auto" />
              </div>
            </div>

            <div className="h-10 w-full bg-muted rounded" />
          </div>
        </aside>
      }
    >
      <ProfileInfoContent userInfoPromise={userInfoPromise} />
    </Suspense>
  );
}
