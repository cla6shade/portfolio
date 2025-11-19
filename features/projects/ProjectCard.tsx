import type { HTMLAttributes, Ref } from 'react';

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  details?: string[];
  ref?: Ref<HTMLDivElement>;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  ref,
  ...rest
}: ProjectCardProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] p-8 flex flex-col justify-between ${rest.className ?? ''}`}
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/70 text-sm font-light leading-relaxed mb-6">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 bg-white/10 text-white/80 border border-white/20 rounded-full text-sm font-light"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {link && (
        <a
          href={link}
          className="inline-flex items-center gap-2 text-white/90 hover:text-white font-light transition-colors mt-6 group/link"
          onClick={(e) => e.stopPropagation()}
        ></a>
      )}
    </div>
  );
}
