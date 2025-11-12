import Scene from '@/components/Scene';
import { Button } from '@/components/ui/button';
import { MoveDown } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-dvw h-dvh relative">
      <div className="absolute w-1/2 h-full flex py-72 items-end px-10 flex-col z-10">
        <h1 className="text-6xl font-bold">
          CLA6SHADE
        </h1>
        <div className="text-sm text-end mt-4 mb-8 gap-1 flex flex-col">
          <p>음악과 성취를 좋아하는 개발자입니다</p>
          <p>주로 Next.js, React, Node.js를 이용한 풀스택 애플리케이션을 개발합니다</p>
          <p>기획에 한계를 두지 않고 구현하는 것을 즐깁니다</p>
        </div>
        <a href="https://github.com/cla6shade" target="_blank">
          <Button variant="default" className="text-lg px-8 rounded-full cursor-pointer">VISIT GITHUB</Button>
        </a>
      </div>
      <Scene />
      <div className="absolute bottom-6 w-full flex justify-center animate-bounce">
        <MoveDown />
      </div>
    </main>
  );
}
