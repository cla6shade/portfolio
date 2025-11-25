import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  details: string[];
  link?: string;
  github?: string;
}

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-4 min-h-80 w-lg">
      <h2 className="text-5xl font-bold mb-12 opacity-0 animate-fade-in-slide">{project.title}</h2>
      <div className="space-y-2 opacity-0 animate-fade-in-slide delay-100">
        {project.details.map((detail, idx) => (
          <div key={idx} className="flex items-start">
            <span className="mr-2 text-gray-400 mt-0.5 text-base">•</span>
            <p className="text-base text-gray-200 leading-relaxed">{detail}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-2 opacity-0 animate-fade-in-slide delay-200">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <ExternalLink size={16} />
            <span className="text-sm">Visit Site</span>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <Github size={16} />
            <span className="text-sm">GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
}
