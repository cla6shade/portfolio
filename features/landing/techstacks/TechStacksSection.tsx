'use client';

import { useRef } from 'react';
import DefaultPad from '@/components/container/DefaultPad';
import TechStackCard from './TechStackCard';

const TECH_STACKS = [
  { name: 'TypeScript', src: '/techstacks/typescript.svg' },
  { name: 'React', src: '/techstacks/react.svg' },
  { name: 'Next.js', src: '/techstacks/nextjs.svg' },
  { name: 'Node.js', src: '/techstacks/nodejs.svg' },
  { name: 'MySQL', src: '/techstacks/mysql.svg' },
];

export default function TechStacksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="relative h-[300dvh] bg-neutral-900">
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center">
        <DefaultPad className="w-full flex flex-col gap-12">
          <h2 className="text-7xl font-bold text-primary uppercase heading-gradient">TECH STACK</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl w-full">
            {TECH_STACKS.map((stack, index) => (
              <TechStackCard
                key={`tech-stack-${index}`}
                name={stack.name}
                src={stack.src}
                sectionRef={sectionRef}
                index={index}
                totalCount={TECH_STACKS.length}
              />
            ))}
          </div>
        </DefaultPad>
      </div>
    </div>
  );
}
