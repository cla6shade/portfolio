'use client';

import { useRef } from 'react';
import Image from 'next/image';
import useHoverTilt from '@/hooks/useHoverTilt';
import Flex from '@/components/container/Flex';
import ProjectBadgeCollection from '@/features/landing/projects/ProjectBadgeCollection';
import { Project } from '@/features/landing/projects/projects';

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
}

export default function ProjectCard({ project, isActive = true }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useHoverTilt(
    cardRef,
    isActive ? { maxRotation: 10, translateZ: 20 } : { maxRotation: 0, translateZ: 0 },
  );

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl shadow-2xl overflow-hidden h-full w-full
        max-w-lg transition-transform duration-200 ease-out preserve-3d"
    >
      {project.thumbnail && (
        <Image src={project.thumbnail} alt={project.title} className="object-cover" fill />
      )}

      <div className="hidden tablet:block absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <Flex direction="col" justify="end" className="relative h-full p-6 hidden tablet:flex">
        <h3 className="text-3xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-200 text-lg mb-4">{project.description}</p>

        <ProjectBadgeCollection
          project={project}
          className="bg-white/20 backdrop-blur-sm text-white border-white/30"
        />
      </Flex>
    </div>
  );
}
