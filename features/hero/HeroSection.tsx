'use client';

import { HeroContextProvider, useHero } from '@/features/hero/HeroProvider';
import { Button } from '@/components/ui/button';
import Scene from '@/components/Scene';
import { MoveDown, Undo2 } from 'lucide-react';

function HeroContent() {
  const { isPianoFocused, unfocusPiano } = useHero();

  const handleBackClick = () => {
    unfocusPiano();
  };

  return (
    <main className="w-dvw max-h-dvh aspect-video relative">
      {!isPianoFocused && (
        <div className="absolute w-1/2 h-full flex justify-center items-end px-10 flex-col z-10 transition-opacity duration-300">
          <h1 className="text-6xl font-bold">CLA6SHADE</h1>
          <div className="text-sm text-end mt-6 mb-10 gap-1 flex flex-col">
            <p>음악과 성취를 좋아하는 개발자입니다</p>
            <p>주로 Next.js, React, Node.js를 이용한 풀스택 애플리케이션을 개발합니다</p>
            <p>기획에 한계를 두지 않고 구현하는 것을 즐깁니다</p>
          </div>
          <a href="https://github.com/cla6shade" target="_blank">
            <Button variant="default" className="text-lg px-8 rounded-full cursor-pointer">
              VISIT GITHUB
            </Button>
          </a>
        </div>
      )}

      <Scene />

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
