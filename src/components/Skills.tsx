import {
  AudioLines,
  BrainCircuit,
  Database,
  FlaskConical,
  Layers3,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { skillCategories, stackHighlights } from '../data/skills'

const iconMap: Record<string, LucideIcon> = {
  core: Database,
  ai: BrainCircuit,
  applied: Layers3,
  research: FlaskConical,
}

function Skills() {
  return (
    <section id="skills" className="section-shell py-20 sm:py-28" aria-labelledby="skills-title">
      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)', y: 22 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="max-w-3xl"
      >
        <div className="eyebrow mb-5">
          <AudioLines aria-hidden="true" className="size-4 text-[var(--pink)]" />
          Skills
        </div>
        <h2 id="skills-title" className="section-title text-balance text-4xl sm:text-5xl">
          Tools I use to move from idea to tested prototype.
        </h2>
        <p className="section-copy mt-5">
          No fake percentages. Just a clear view of the technologies and research
          areas I am actively using or developing through projects.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = iconMap[category.icon]

          return (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: categoryIndex * 0.04 }}
              className="glass-card group p-5"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--green-soft)] text-[var(--text-strong)] transition group-hover:bg-[var(--pink-soft)]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-xl font-black text-[var(--text-strong)]">{category.title}</h3>
                  <p className="section-copy mt-2 text-sm">{category.summary}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.5 }}
        className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stackHighlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-black text-[var(--text-strong)]"
          >
            {highlight}
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default Skills
