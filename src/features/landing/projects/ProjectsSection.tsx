'use client';

import { useEffect, useRef, useState } from 'react';
import { projects } from './projects';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import Flex from '@/components/container/Flex';
import DefaultPad from '@/components/container/DefaultPad';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef<{ offsetTop: number; offsetHeight: number }>(null);

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
      if (!offsetRef.current) return 0;

      const scrollY = window.scrollY;
      const sectionStart = offsetRef.current.offsetTop;
      const sectionHeight = offsetRef.current.offsetHeight - window.innerHeight;

      const scrollRate = Math.max(
        0,
        Math.min(100, ((scrollY - sectionStart) / sectionHeight) * 100),
      );

      const projectCount = projects.length;

      const firstCardRange = 30;
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
      id="projects"
      ref={(el) => {
        if (!el) return;
        offsetRef.current = {
          offsetTop: el.offsetTop,
          offsetHeight: el.offsetHeight,
        };
      }}
      className="w-full bg-gradient-to-b from-neutral-950 to-neutral-900 relative h-[350dvh]"
    >
      <DefaultPad className="sticky top-0 h-screen w-full z-10">
        <Flex className="h-full w-full tablet:flex-row" direction="col" justify="center">
          <Flex
            align="center"
            justify="end"
            className="w-full tablet:w-1/2 tablet:pr-8 lg-desktop:pr-16 py-8 perspective-1000"
          >
            <div className="w-full preserve-3d relative h-48 tablet:h-[26rem]">
              {projects.map((project, index) => (
                <Flex
                  key={`project-card-${index}`}
                  justify="center"
                  className="absolute inset-0 tablet:justify-end transition-all duration-500 ease-out w-full"
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                >
                  <ProjectCard project={project} isActive={index === currentIndex} />
                </Flex>
              ))}
            </div>
          </Flex>

          <Flex
            direction="col"
            justify="center"
            className="w-full tablet:w-1/2 tablet:pl-8 lg-desktop:pl-16"
          >
            <h2 className="text-xl mb-4 heading-gradient">PROJECTS</h2>
            <ProjectDetail
              project={projects[currentIndex]}
              key={`project-detail-${currentIndex}`}
            />
          </Flex>
        </Flex>
      </DefaultPad>
    </section>
  );
}
