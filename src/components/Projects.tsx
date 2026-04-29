import { Telescope } from 'lucide-react'
import { motion } from 'motion/react'
import { FaGithub } from 'react-icons/fa6'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

function Projects() {
  return (
    <section
      id="projects"
      className="section-shell py-20 sm:py-28"
      aria-labelledby="projects-title"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', y: 22 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-5">
            <Telescope aria-hidden="true" className="size-4 text-[var(--green)]" />
            Real Projects
          </div>
          <h2 id="projects-title" className="section-title text-balance text-4xl sm:text-5xl">
            Medical AI, chatbot deployment, and data engineering projects.
          </h2>
          <p className="section-copy mt-5">
            A focused selection of work that reflects practical AI building:
            computer vision models, deployed web applications, and ML pipelines.
          </p>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          href="https://github.com/1avishek"
          target="_blank"
          rel="noreferrer"
          className="secondary-button w-full sm:w-auto"
        >
          <FaGithub aria-hidden="true" className="size-4" />
          Explore More on GitHub
        </motion.a>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
