'use client';

import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import { projects } from './constants';

const ProjectsSection = () => {
  return (
    <section className="relative w-full min-h-screen flex">
      <div className="w-2/5 sticky top-0 h-screen flex items-center justify-center px-12">
        <div className="max-w-md">
          <h2 className="text-6xl font-bold mb-6">Projects</h2>
          <p className="text-xl text-gray-600">프로젝트 목록</p>
        </div>
      </div>

      <ScrollStack
        className="w-3/5"
        useWindowScroll={true}
        itemDistance={120}
        itemStackDistance={40}
        stackPosition="25%"
        baseScale={0.88}
        itemScale={0.04}
      >
        {projects.map((project) => (
          <ScrollStackItem key={project.title} itemClassName="bg-white">
            <div className="h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-lg mb-4">{project.description}</p>
                </div>
                {project.thumbnail && (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-16 h-16 ml-4 rounded-lg object-cover"
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 flex-1 mb-4">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="text-gray-700 text-sm leading-relaxed flex items-start">
                    <span className="mr-2 text-gray-400">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 mt-auto">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Visit Site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default ProjectsSection;
