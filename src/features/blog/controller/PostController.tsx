'use client';

import Flex from '@/components/container/Flex';
import useControl from '@/features/blog/controller/useControl';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PostController() {
  const { controllerItems, currentFocused } = useControl();

  return (
    <Flex className="w-60 fixed px-2">
      <Flex direction="col" className="w-full px-4 py-2 border border-border rounded-md gap-1">
        {controllerItems.map((item, index) => {
          const isFocused = currentFocused?.href === item.href;
          const paddingClass = item.level === 1 ? 'pl-0' : item.level === 2 ? 'pl-3' : 'pl-6';

          return (
            <Link
              key={`controller-item-${index}`}
              href={item.href}
              className={cn(
                'text-sm transition-colors hover:text-peru',
                paddingClass,
                isFocused ? 'text-sandy-brown font-semibold' : 'text-foreground font-normal',
              )}
            >
              {item.href.replace('#', '')}
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}
