import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import { FaGithub } from 'react-icons/fa6'
import type { Project } from '../data/projects'

const accentClasses: Record<Project['accent'], string> = {
  cyan: 'from-[var(--pink-soft)] via-transparent to-[var(--green-soft)]',
  violet: 'from-[var(--green-soft)] via-transparent to-[var(--pink-soft)]',
  emerald: 'from-[var(--green-soft)] via-transparent to-transparent',
  amber: 'from-[rgba(247,185,85,0.20)] via-transparent to-[var(--pink-soft)]',
}

type ProjectCardProps = {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass-card group relative overflow-hidden p-5 sm:p-6"
    >
      <div
        className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-br ${accentClasses[project.accent]} opacity-90 transition-opacity group-hover:opacity-100`}
        aria-hidden="true"
      />
      <div className="halftone-panel absolute bottom-0 right-0 h-36 w-56" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-[var(--pink)]">{project.category}</p>
            <h3 className="mt-3 text-2xl font-black leading-tight text-[var(--text-strong)]">
              {project.title}
            </h3>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-strong)] transition group-hover:rotate-3 group-hover:border-[var(--pink)]">
            <ArrowUpRight aria-hidden="true" className="size-5" />
          </span>
        </div>

        <p className="section-copy mt-5 min-h-24 text-sm">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="skill-pill">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="primary-button w-full sm:w-auto"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              Live Demo
            </a>
          ) : null}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="secondary-button w-full sm:w-auto"
          >
            <FaGithub aria-hidden="true" className="size-4" />
            Explore Repository
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
