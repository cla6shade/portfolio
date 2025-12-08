import { use } from 'react';

interface FollowerCountProps {
  followersPromise: Promise<number>;
}

export default function FollowerCount({ followersPromise }: FollowerCountProps) {
  const followers = use(followersPromise);
  return <>{followers}</>;
}