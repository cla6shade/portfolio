'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTransition() {
  const pathname = usePathname();
  useEffect(() => {
    console.log('effect');
    return () => console.log(`cleanup - ${pathname}`);
  }, [pathname]);
}
