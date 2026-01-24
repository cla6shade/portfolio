'use client';

import DefaultPad from '@/components/container/DefaultPad';
import Flex from '@/components/container/Flex';
import { Briefcase, Users, Award, GraduationCap, Code, Mail } from 'lucide-react';
import Image from 'next/image';
import InfoSection from '@/features/landing/basic-info/InfoSection';
import InfoItem from '@/features/landing/basic-info/InfoItem';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

export default function BasicInfoSection() {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    initialState: false,
  });

  return (
    <section
      id="basic-info"
      ref={targetRef}
      className="relative min-h-screen bg-gradient-to-b from-black to-neutral-950 py-20 font-noto-sans"
    >
      <DefaultPad className="w-full">
        <Flex direction="col" className="gap-16">
          <Flex
            direction="col"
            align="center"
            className={cn(
              'tablet:flex-row tablet:items-center gap-6 tablet:gap-8 opacity-0',
              isIntersecting && 'animate-fade-in-slide [animation-delay:0ms]',
            )}
          >
            <Image
              src="https://avatars.githubusercontent.com/u/111969754"
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-sandy-brown"
            />
            <Flex direction="col">
              <h2 className="text-4xl xl:text-5xl 2xl:text-6xl heading-gradient font-bold mb-4">
                BASIC INFO
              </h2>
              <Flex direction="col" className="gap-2">
                <Flex className="gap-2">
                  <GraduationCap className="text-sandy-brown" size={24} />
                  <p className="text-base tablet:text-lg desktop:text-xl text-gray-400">
                    부산대학교 졸업 예정 (2026.02)
                  </p>
                </Flex>
                <Flex className="gap-2">
                  <Mail className="text-sandy-brown" size={24} />
                  <a
                    href="mailto:cla6shade@gmail.com"
                    className="text-base tablet:text-lg desktop:text-xl text-gray-400"
                  >
                    cla6shade@gmail.com
                  </a>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 desktop:gap-12">
            <InfoSection
              icon={<Briefcase className="text-light-peru" size={28} />}
              title="Work Experience"
              className={cn(
                'border-light-peru opacity-0',
                isIntersecting && 'animate-fade-in-slide [animation-delay:200ms]',
              )}
            >
              <InfoItem
                content="한국해양과학기술원"
                description="2025.01 - 2025.02, 2025.07 - 2025.08"
                className="group-hover:text-light-peru"
              />
              <InfoItem
                content="외주 개발"
                description="2023.01 - 2024.06"
                className="group-hover:text-light-peru"
              />
            </InfoSection>

            <div
              className={cn(
                'border-l-4 border-sandy-brown pl-6 opacity-0',
                isIntersecting && 'animate-fade-in-slide [animation-delay:400ms]',
              )}
            >
              <Flex align="center" className="gap-3 mb-6">
                <Code className="text-sandy-brown" size={28} />
                <h4 className="text-2xl tablet:text-3xl font-bold text-white">Tech Stacks</h4>
              </Flex>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  content="TypeScript"
                  description="2024 ~"
                  className="group-hover:text-sandy-brown"
                  icon="/techstacks/typescript.svg"
                />
                <InfoItem
                  content="JavaScript"
                  description="2022 ~"
                  className="group-hover:text-sandy-brown"
                  icon="/techstacks/javascript.svg"
                />
                <InfoItem
                  content="React"
                  description="2023 ~"
                  className="group-hover:text-sandy-brown"
                  icon="/techstacks/react.svg"
                />
                <InfoItem
                  content="Next.js"
                  description="2025 ~"
                  className="group-hover:text-sandy-brown"
                  icon="/techstacks/nextjs.svg"
                />
                <InfoItem
                  content="Node.js"
                  description="2022 ~"
                  className="group-hover:text-sandy-brown"
                  icon="/techstacks/nodejs.svg"
                />
                <InfoItem
                  content="MySQL"
                  description="2023 ~"
                  className="group-hover:text-sandy-brown"
                  icon="/techstacks/mysql.svg"
                />
              </div>
            </div>

            <InfoSection
              icon={<Award className="text-peach-puff" size={28} />}
              title="Awards"
              className={cn(
                'border-peach-puff opacity-0',
                isIntersecting && 'animate-fade-in-slide [animation-delay:600ms]',
              )}
            >
              <InfoItem
                content="부산대학교 창의융합 SW해커톤 최우수상"
                description="정보컴퓨터공학부장상, 18팀 중 4위 (2025.09)"
                className="group-hover:text-peach-puff"
              />
              <InfoItem
                content="공공빅데이터 활용 창업 경진대회 아이디어 부문 장려상"
                description="부산광역시장상, 71팀 중 4위 (2025.07)"
                className="group-hover:text-peach-puff"
              />
              <InfoItem
                content="부산대학교 알고리즘대회 PNU Coderace 정보컴퓨터공학부장상"
                description="약 150명 중 6위 (2022.08)"
                className="group-hover:text-peach-puff"
              />
            </InfoSection>

            <InfoSection
              icon={<Users className="text-peach" size={28} />}
              title="Etc."
              className={cn(
                'border-peach opacity-0',
                isIntersecting && 'animate-fade-in-slide [animation-delay:800ms]',
              )}
            >
              <InfoItem
                content="부산대학교 밴드동아리 우든키드 회장"
                description="2023.01 - 2023.11"
                className="group-hover:text-peach"
              />
              <InfoItem
                content="IT 서비스 개발 동아리 APPTIVE 프론트엔드 멘토"
                description="2023.09 - 2025.09"
                className="group-hover:text-peach"
              />
            </InfoSection>
          </div>
        </Flex>
      </DefaultPad>
    </section>
  );
}
