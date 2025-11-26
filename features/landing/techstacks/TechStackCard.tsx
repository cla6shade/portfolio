'use client';

import { useRef, useEffect, type RefObject } from 'react';
import Image from 'next/image';

interface TechStackCardProps {
  name: string;
  src: string;
  sectionRef: RefObject<HTMLDivElement | null>;
  index: number;
  totalCount: number;
}

export default function TechStackCard({
  name,
  src,
  sectionRef,
  index,
  totalCount,
}: TechStackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !cardRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - windowHeight)));

      const calculateRotation = (): number => {
        const cardDelay = 0.06 * index;

        const firstFlip = {
          start: cardDelay,
          duration: 0.15,
          get end() {
            return this.start + this.duration;
          },
        };

        const secondFlip = {
          start: 0.8 + cardDelay * 0.3,
          duration: 0.1,
          get end() {
            return Math.min(this.start + this.duration, 1.0);
          },
          get actualDuration() {
            return this.end - this.start;
          },
        };

        if (scrollProgress < firstFlip.start) return 0;
        if (scrollProgress < firstFlip.end) {
          return ((scrollProgress - firstFlip.start) / firstFlip.duration) * 180;
        }
        if (scrollProgress < secondFlip.start) return 180;
        if (scrollProgress < secondFlip.end) {
          return 180 + ((scrollProgress - secondFlip.start) / secondFlip.actualDuration) * 180;
        }
        return 360;
      };

      cardRef.current.style.transform = `rotateY(${calculateRotation()}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRef, index, totalCount]);

  return (
    <div ref={cardRef} className="relative w-full h-48 transform-3d">
      <div className="absolute inset-0 rounded-lg backface-hidden" />

      <div
        className="absolute inset-0 rounded-lg flex
        flex-col items-center justify-center gap-4 p-6 backface-hidden rotate-y-180"
      >
        <div className="w-20 h-20 relative">
          <Image src={src} alt={name} fill className="object-contain" />
        </div>
        <span className="text-base font-medium text-primary">{name}</span>
      </div>
    </div>
  );
}
