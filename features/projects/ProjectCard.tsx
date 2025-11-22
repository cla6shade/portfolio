interface Project {
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  details: string[];
  link?: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative rounded-xl shadow-2xl overflow-hidden h-96 w-full">
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-6">
        <h3 className="text-3xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-200 text-lg mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
