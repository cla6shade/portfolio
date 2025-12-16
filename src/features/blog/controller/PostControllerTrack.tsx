import { ReactNode } from 'react';
import Flex from '@/components/container/Flex';

export default function PostControllerTrack({ children }: { children: ReactNode }) {
  return (
    <div className="py-32 w-60 h-full hidden tablet:block">
      <Flex className="w-60 fixed px-4">{children}</Flex>
    </div>
  );
}
