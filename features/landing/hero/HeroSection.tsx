'use client';

import { HeroContextProvider, useHero } from '@/features/landing/hero/HeroProvider';
import { Button } from '@/components/ui/button';
import Scene from '@/features/landing/hero/scene/Scene';
import { MoveDown, Undo2 } from 'lucide-react';
import HeroTextSection from '@/features/landing/hero/HeroTextSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function HeroContent() {
  const { isPianoFocused, unfocusPiano } = useHero();
  const { targetRef: observerTargetRef, isIntersecting: shouldMountScene } =
    useIntersectionObserver({ rootMargin: '100px' });

  const handleBackClick = () => {
    unfocusPiano();
  };

  return (
    <main className="w-full max-h-dvh aspect-video relative">
      {!isPianoFocused && <HeroTextSection />}

      <Scene frameloop={shouldMountScene ? 'always' : 'never'} />
      <div ref={observerTargetRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute bottom-6 w-full flex justify-center">
        {!isPianoFocused ? (
          <div className="animate-bounce">
            <MoveDown />
          </div>
        ) : (
          <Button
            onClick={handleBackClick}
            variant="secondary"
            className="flex items-center gap-2 px-6 py-3 rounded-full"
          >
            <Undo2 size={20} />
            돌아가기
          </Button>
        )}
      </div>
    </main>
  );
}

export default function HeroSection() {
  return (
    <HeroContextProvider>
      <HeroContent />
    </HeroContextProvider>
  );
}
