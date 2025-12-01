import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | null;
  initialState?: boolean;
}

export function useIntersectionObserver(options?: UseIntersectionObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(options?.initialState ?? true);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: options?.rootMargin,
        threshold: options?.threshold,
        root: options?.root,
      },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [options?.rootMargin, options?.threshold, options?.root]);

  return { targetRef, isIntersecting };
}
