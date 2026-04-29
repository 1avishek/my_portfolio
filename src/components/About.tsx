import { Brain, GraduationCap, HeartPulse, PanelsTopLeft, Waves } from 'lucide-react'
import { motion } from 'motion/react'

const stats = [
  { value: 'Final year', label: 'Artificial Intelligence student' },
  { value: 'SAMK', label: 'Satakunta University of Applied Sciences' },
  { value: 'AI + software', label: 'Practical building direction' },
]

const interests = [
  { icon: Brain, label: 'Machine learning and model evaluation' },
  { icon: HeartPulse, label: 'Medical AI and healthcare-adjacent systems' },
  { icon: Waves, label: 'Speech/audio AI and short-response recognition' },
  { icon: PanelsTopLeft, label: 'Backend, frontend, and interactive technology' },
]

function CowIllustration() {
  return (
    <div className="cow-scene" role="img" aria-label="Small CSS cow saying hi">
      <span className="cow-bubble">hi</span>
      <div className="css-cow" aria-hidden="true">
        <span className="cow-tail" />
        <span className="cow-body">
          <span className="cow-spot cow-spot-one" />
          <span className="cow-spot cow-spot-two" />
        </span>
        <span className="cow-leg cow-leg-one" />
        <span className="cow-leg cow-leg-two" />
        <span className="cow-head">
          <span className="cow-ear cow-ear-left" />
          <span className="cow-ear cow-ear-right" />
          <span className="cow-horn cow-horn-left" />
          <span className="cow-horn cow-horn-right" />
          <span className="cow-eye cow-eye-left" />
          <span className="cow-eye cow-eye-right" />
          <span className="cow-muzzle">
            <span />
            <span />
          </span>
        </span>
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section-shell py-20 sm:py-28" aria-labelledby="about-title">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', y: 24 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.58 }}
          className="min-w-0"
        >
          <div className="eyebrow mb-5">
            <GraduationCap aria-hidden="true" className="size-4 text-[var(--green)]" />
            About
          </div>
          <h2 id="about-title" className="section-title text-balance text-4xl sm:text-5xl">
            Grounded AI curiosity, shaped through practical software.
          </h2>
          <p className="section-copy mt-6 text-base sm:text-lg">
            I am a final-year Artificial Intelligence student at Satakunta
            University of Applied Sciences in Finland. My work is centered on
            building and understanding practical AI systems: medical image
            analysis, computer vision models, audio AI experiments, web
            applications, and data workflows.
          </p>
          <p className="section-copy mt-5">
            I like the intersection where research questions become usable
            prototypes. That means learning the model, building the interface,
            understanding the data, and evaluating the result with care.
          </p>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.48, delay: 0.08 }}
          className="about-cow-card glass-card p-5"
          aria-label="Small playful greeting illustration"
        >
          <CowIllustration />
          <p className="section-copy mt-4 text-sm">
            A small reminder that thoughtful systems can still feel warm,
            curious, and human.
          </p>
        </motion.aside>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-4">
            <div className="text-lg font-black text-[var(--text-strong)]">{stat.value}</div>
            <div className="mt-1 text-sm font-semibold text-[var(--muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-3 lg:grid-cols-2">
        {interests.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.36, delay: index * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[var(--pink-soft)] text-[var(--text-strong)]">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="font-bold text-[var(--text-strong)]">{item.label}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default About
