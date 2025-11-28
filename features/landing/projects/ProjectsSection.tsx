'use client';

import { useEffect, useRef, useState } from 'react';
import { projects } from './constants';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const calculateZTransform = (cardIndex: number, currentIndex: number): number => {
      if (cardIndex === currentIndex) {
        return 0;
      } else if (cardIndex < currentIndex) {
        return -100;
      } else {
        return -150;
      }
    };

    const calculateCurrentSection = (): number => {
      if (!containerRef.current) return 0;

      const scrollY = window.scrollY;
      const sectionStart = containerRef.current.offsetTop;
      const sectionHeight = containerRef.current.offsetHeight - window.innerHeight;

      const scrollRate = Math.max(
        0,
        Math.min(100, ((scrollY - sectionStart) / sectionHeight) * 100),
      );

      const projectCount = projects.length;

      const firstCardRange = 15;
      const lastCardRange = 30;
      const middleRange = 100 - firstCardRange - lastCardRange;

      // First card
      if (scrollRate < firstCardRange) return 0;

      // Last card
      if (scrollRate >= 100 - lastCardRange) {
        return projectCount - 1;
      }

      const middleCardCount = projectCount - 2;
      if (middleCardCount > 0) {
        const middleCardRange = middleRange / middleCardCount;
        const middleScrollProgress = scrollRate - firstCardRange;
        const middleIndex = Math.floor(middleScrollProgress / middleCardRange);
        return Math.min(1 + middleIndex, projectCount - 2);
      }

      return 0;
    };

    const updateCardTransforms = (currentIdx: number) => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const zValue = calculateZTransform(index, currentIdx);
        const opacity = index === currentIdx ? 1 : 0.3;
        const scale = index === currentIdx ? 1 : 0.9;

        card.style.transform = `translateZ(${zValue}px) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.pointerEvents = index === currentIdx ? 'auto' : 'none';
      });
    };

    const handleScroll = () => {
      const newIndex = calculateCurrentSection();
      updateCardTransforms(newIndex);
      setCurrentIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative h-[300dvh]"
    >
      <div className="sticky top-0 h-screen w-full px-16 md:px-20 lg:px-40 xl:px-60 z-10">
        <div className="flex h-full w-full">
          <div className="w-1/2 flex items-center justify-end pr-20 perspective-1000">
            <div className="w-full preserve-3d relative h-[26rem]">
              {projects.map((project, index) => (
                <div
                  key={`project-card-${index}`}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute inset-0 transition-all duration-500 ease-out w-full flex justify-end"
                >
                  <ProjectCard project={project} isActive={index === currentIndex} />
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-center pl-20">
            <h2 className="text-xl mb-4 heading-gradient">PROJECTS</h2>
            <ProjectDetail
              project={projects[currentIndex]}
              key={`project-detail-${currentIndex}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
