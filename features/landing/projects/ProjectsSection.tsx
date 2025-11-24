'use client';

import { useEffect, useRef, useState } from 'react';
import { projects } from './constants';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import DefaultPad from '@/components/container/DefaultPad';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenterY = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const cardCenterY = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenterY - cardCenterY);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setCurrentIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      <DefaultPad>
        <div className="flex relative">
          <div ref={containerRef} className="w-1/2 flex flex-col gap-8 pt-[30dvh] pb-[25dvh] pr-20">
            {projects.map((project, index) => (
              <div
                key={`project-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <div className="w-1/2 top-0 h-screen flex flex-col py-[30dvh] sticky">
            <h2 className="text-xl mb-4">PROJECTS</h2>
            <h2 className="text-5xl font-bold mb-12">{projects[currentIndex].title}</h2>
            <ProjectDetail
              project={projects[currentIndex]}
              key={`project-detail-${currentIndex}`}
            />
          </div>
        </div>
      </DefaultPad>
    </section>
  );
}
