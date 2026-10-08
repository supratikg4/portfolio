import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 animate-page">
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-4 tracking-tight">
            Technical
            <br />
            Projects
          </h1>
          <div className="w-16 h-1 bg-stone-900" />
        </div>

        <p className="text-stone-600 max-w-md font-light text-lg">
          A selection of my work focusing on machine learning, data
          engineering, and full-stack software development. Seeking Summer
          Internship roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
