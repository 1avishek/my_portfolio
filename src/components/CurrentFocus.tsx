import { Activity, AudioLines, CircleDot, HeartPulse, RadioTower } from 'lucide-react'
import { motion } from 'motion/react'

const focusItems = [
  {
    icon: AudioLines,
    title: 'Short-response speech recognition',
    body: 'Exploring ways to improve recognition of brief spoken answers and constrained response patterns.',
  },
  {
    icon: RadioTower,
    title: 'Audio AI experimentation',
    body: 'Working with speech and audio classification concepts, including keyword spotting and signal-aware evaluation.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare workflow support',
    body: 'Studying practical AI-assisted voicemail triage ideas without overclaiming beyond the research scope.',
  },
]

function CurrentFocus() {
  return (
    <section
      id="current-focus"
      className="section-shell py-20 sm:py-28"
      aria-labelledby="current-focus-title"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', y: 24 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.55 }}
        >
          <div className="eyebrow mb-5">
            <Activity aria-hidden="true" className="size-4 text-[var(--pink)]" />
            Current Focus
          </div>
          <h2 id="current-focus-title" className="section-title text-4xl sm:text-5xl">
            Thesis work around practical audio AI for healthcare-adjacent workflows.
          </h2>
          <p className="section-copy mt-6 text-base sm:text-lg">
            My current thesis direction explores AI-assisted voicemail triage and
            short-response speech recognition systems. The work is research-oriented,
            experimental, and grounded in practical questions about how audio AI can
            support real workflows.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="glass-card relative overflow-hidden p-5 sm:p-6"
        >
          <div className="halftone-panel absolute inset-y-0 right-0 w-1/2" aria-hidden="true" />
          <div className="relative grid gap-4">
            {focusItems.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: index * 0.08 }}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4"
                >
                  <div className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--green-soft)] text-[var(--text-strong)]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-black text-[var(--text-strong)]">{item.title}</h3>
                      <p className="section-copy mt-2 text-sm">{item.body}</p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="relative mt-5 flex flex-wrap gap-2">
            {['keyword spotting', 'short answers', 'audio classification', 'model evaluation'].map(
              (label) => (
                <span key={label} className="skill-pill">
                  <CircleDot aria-hidden="true" className="mr-2 size-3 text-[var(--pink)]" />
                  {label}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CurrentFocus
