import { ExternalLink, Github } from 'lucide-react';
import Flex from '@/components/container/Flex';
import ProjectBadgeCollection from '@/features/landing/projects/ProjectBadgeCollection';
import { Project } from '@/features/landing/projects/projects';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-4 min-h-80">
      <h2 className="text-3xl mb-4 tablet:text-4xl desktop:text-5xl tablet:mb-6 font-bold opacity-0 animate-fade-in-slide">
        {project.title}
      </h2>
      <ProjectBadgeCollection project={project} className="tablet:hidden animate-fade-in-slide" />

      <p className="text-base tablet:hidden text-peach-puff animate-fade-in-slide">{project.description}</p>
      <div className="space-y-2 opacity-0 animate-fade-in-slide delay-100">
        {project.details.map((detail, idx) => (
          <Flex key={idx} align="start">
            <span className="mr-2 text-gray-400 mt-0.5 text-sm tablet:text-base">•</span>
            <p className="text-sm tablet:text-base text-gray-200 leading-relaxed">{detail}</p>
          </Flex>
        ))}
      </div>

      <Flex className="gap-4 pt-2 opacity-0 animate-fade-in-slide delay-200">
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="no-underline">
            <Flex
              align="center"
              className="gap-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Visit Site</span>
            </Flex>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Flex
              align="center"
              className="gap-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <Github size={16} />
              <span className="text-sm">GitHub</span>
            </Flex>
          </a>
        )}
      </Flex>
    </div>
  );
}
