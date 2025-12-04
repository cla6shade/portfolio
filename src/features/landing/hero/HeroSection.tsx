'use client';

import { HeroContextProvider, useHero } from '@/features/landing/hero/HeroProvider';
import { Button } from '@/components/ui/button';
import Scene from '@/features/landing/hero/scene/Scene';
import { MoveDown, Undo2 } from 'lucide-react';
import HeroTextSection from '@/features/landing/hero/HeroTextSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import MusicController from '@/components/music-controller/MusicController';
import Flex from '@/components/container/Flex';

function HeroContent() {
  const { isPianoFocused, unfocusPiano } = useHero();
  const { targetRef: observerTargetRef, isIntersecting: shouldMountScene } =
    useIntersectionObserver({ rootMargin: '100px' });

  const handleBackClick = () => {
    unfocusPiano();
  };

  return (
    <main className="w-full h-[40rem] max-h-dvh tablet:h-auto tablet:aspect-video relative">
      {!isPianoFocused && <HeroTextSection />}

      <Scene frameloop={shouldMountScene ? 'always' : 'never'} />
      <div ref={observerTargetRef} className="absolute inset-0 pointer-events-none" />

      <Flex justify="center" className="absolute bottom-6 w-full">
        {!isPianoFocused ? (
          <div className="animate-bounce">
            <MoveDown />
          </div>
        ) : (
          <Flex direction="col" className="gap-4">
            <MusicController />
            <Button variant="secondary" className="rounded-full" onClick={handleBackClick}>
              <Undo2 size={16} />
              Back
            </Button>
          </Flex>
        )}
      </Flex>
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
