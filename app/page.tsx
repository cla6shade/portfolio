'use client';

import { useEffect, useRef } from 'react';
import HeroSection from '@/features/hero/HeroSection';
import ProjectsSection from '@/features/projects/ProjectsSection';
import Lenis from 'lenis';

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <HeroSection />
      <ProjectsSection />
    </>
  );
}
