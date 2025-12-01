import { Button } from '@/components/ui/button';
import Flex from '@/components/container/Flex';

export default function HeroTextSection() {
  return (
    <Flex
      direction="col"
      justify="center"
      align="end"
      className="absolute w-1/2 h-full pb-10 pr-16 xl:pr-24 3xl:pr-32 z-10 font-noto-sans"
    >
      <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold heading-gradient animate-fade-in-slide delay-0">
        CLA6SHADE
      </h1>
      <Flex
        direction="col"
        className="text-lg font-thin text-end mt-6 mb-8 gap-1 lg:text-xl 3xl:text-2xl opacity-0 animate-fade-in-slide delay-200"
      >
        <p>
          음악과 성취를 좋아하는 <span className="text-peach">프론트엔드 개발자</span>입니다
        </p>
        <p>고객의 가치를 코드에 담는 우수한 개발자를 목표로 합니다</p>
        <p>
          <span className="text-peach">기획에 한계를 두지 않고 구현하는 것</span>을 즐깁니다
        </p>
      </Flex>
      <a
        href="https://github.com/cla6shade"
        target="_blank"
        className="group opacity-0 animate-fade-in-slide delay-500"
      >
        <Button
          className="relative px-10 py-2 overflow-hidden
          text-base cursor-pointer text-background bg-gradient-to-r from-light-peru to-sandy-brown xl:px-12 xl:py-4
          hover:rounded-full rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(205,133,63,0.6)] hover:scale-105"
        >
          <span className="relative z-10 font-roboto">Visit Github</span>
          <div className="absolute inset-0 bg-gradient-to-r  from-sandy-brown to-light-peru opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </a>
    </Flex>
  );
}
