import { ReactNode } from 'react';

export default function PostControllerTrack({ children }: { children: ReactNode }) {
  return <div className="py-32 w-60 h-full">{children}</div>;
}
