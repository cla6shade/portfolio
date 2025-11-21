'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import DefaultPad from '@/components/DefaultPad';
import { projects } from '@/features/projects/constants';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(0);

  const handleCardSwap = (idx: number) => {
    setSelectedProject(idx);
  };

  return (
    <section className="min-h-180 bg-black pt-24 relative">
      <DefaultPad>
        <h2 className="text-4xl font-bold text-white mb-12 opacity-0 animate-fade-in-slide">
          PROJECTS
        </h2>

        <div className="flex gap-12 items-start">
          <div className="flex-1">
            <ProjectDetail project={projects[selectedProject]} />
          </div>

          <div className="flex flex-col">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </DefaultPad>
    </section>
  );
}
