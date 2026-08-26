import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { ProjectPreview } from "./art/ProjectPreview";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="container-page pb-20 sm:pb-24">
      <Reveal>
        <p className="label mb-8">Projects</p>
      </Reveal>

      <div className="divide-y divide-line border-t rule dark:divide-line-dark">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.name} delay={i * 60}>
            <article className="group grid grid-cols-1 gap-6 py-8 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-8">
              <div className="h-32 w-32 rounded-md border rule p-4 transition-colors duration-300 group-hover:border-ink-faint dark:group-hover:border-cream-soft">
                <ProjectPreview />
              </div>

              <div className="min-w-0">
                <h3 className="flex items-center gap-2 text-xl font-medium text-ink transition-transform duration-300 ease-soft group-hover:translate-x-1 dark:text-cream">
                  <span className="index-mark">{project.number}</span>
                  {project.name}
                  <ArrowUpRight
                    size={16}
                    className="text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-cream-faint"
                  />
                </h3>
                <p className="mt-2 max-w-lg leading-relaxed text-ink-soft dark:text-cream-soft">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink-faint dark:text-cream-faint">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 font-mono text-xs text-ink-faint transition-colors duration-300 hover:text-ink dark:text-cream-faint dark:hover:text-cream"
                  >
                    <Github size={13} /> Source
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 font-mono text-xs text-ink-faint transition-colors duration-300 hover:text-ink dark:text-cream-faint dark:hover:text-cream"
                  >
                    <ArrowUpRight size={13} /> Live
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
