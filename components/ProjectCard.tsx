import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isExternal = project.link.startsWith("http");

  return (
    <article className="group">
      <a
        href={project.link}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={`View ${project.title}`}
      >
        <div className="relative h-64 sm:h-80 w-full overflow-hidden mb-6 bg-stone-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
        </div>

        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold tracking-widest uppercase text-stone-500">
            {project.category}
          </span>
          <ArrowUpRight
            size={20}
            className="text-stone-400 group-hover:text-stone-900 transition-colors"
          />
        </div>

        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-3 group-hover:underline underline-offset-4 decoration-2 decoration-stone-300">
          {project.title}
        </h2>

        <p className="text-stone-600 mb-6 font-light leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <span
              key={technology}
              className="text-xs font-medium text-stone-700 bg-stone-100 px-3 py-1 rounded-sm border border-stone-200"
            >
              {technology}
            </span>
          ))}
        </div>
      </a>
    </article>
  );
}
