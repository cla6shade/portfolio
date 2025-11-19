import { Button } from '@/components/ui/button';

export default function HeroTextSection() {
  return (
    <div className="absolute w-1/2 h-full flex justify-center pb-10 items-end px-16 flex-col z-10">
      <h1 className="text-6xl font-bold opacity-0 animate-fade-in-slide">CLA6SHADE</h1>
      <div className="text-lg font-thin text-end mt-6 mb-10 gap-1 flex flex-col opacity-0 animate-fade-in-slide delay-200">
        <p>음악과 성취를 좋아하는 개발자입니다</p>
        <p>고객의 가치를 코드에 담는 우수한 개발자를 목표로 합니다</p>
        <p>기획에 한계를 두지 않고 구현하는 것을 즐깁니다</p>
      </div>
      <a
        href="https://github.com/cla6shade"
        target="_blank"
        className="opacity-0 animate-fade-in-slide delay-500"
      >
        <Button variant="default" className="text-lg px-8 rounded-full cursor-pointer">
          VISIT GITHUB
        </Button>
      </a>
    </div>
  );
}
