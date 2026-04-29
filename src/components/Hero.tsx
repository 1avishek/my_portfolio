import { ArrowDown, ArrowRight, BrainCircuit, Mail, Play } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import profileArt from '../assets/profile-art.png'
import { socialLinks } from '../data/socialLinks'
import { useRotatingText } from '../hooks/useRotatingText'
import { scrollToSection } from '../utils/navigation'
import SocialIcon from './SocialIcon'

const roles = [
  'Final-Year Artificial Intelligence Student',
  'AI-Focused Developer',
  'Machine Learning & Medical AI Projects',
  'Building Practical AI Systems',
]

const particles = [
  { left: '8%', top: '18%', size: 'h-2 w-2', delay: 0.2, color: 'var(--pink)' },
  { left: '20%', top: '74%', size: 'h-2.5 w-2.5', delay: 0.8, color: 'var(--green)' },
  { left: '56%', top: '14%', size: 'h-1.5 w-1.5', delay: 1.2, color: 'var(--pink)' },
  { left: '84%', top: '72%', size: 'h-2 w-2', delay: 0.5, color: 'var(--green)' },
]

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const activeRole = useRotatingText(roles, 2400)

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24"
      aria-labelledby="hero-title"
    >
      <div className="aurora-field" aria-hidden="true" />
      <div className="grid-background" aria-hidden="true" />

      {!prefersReducedMotion
        ? particles.map((particle) => (
            <motion.span
              key={`${particle.left}-${particle.top}`}
              className={`absolute rotate-45 rounded-sm ${particle.size}`}
              style={{ left: particle.left, top: particle.top, backgroundColor: particle.color }}
              animate={{ y: [-10, 12, -10], opacity: [0.28, 0.78, 0.28] }}
              transition={{
                duration: 6.2,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
          ))
        : null}

      <div className="section-shell relative z-10 grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', y: 28 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.72, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <div className="eyebrow mb-6">
            <BrainCircuit aria-hidden="true" className="size-4 text-[var(--pink)]" />
            Final-year AI student at SAMK, Finland
          </div>

          <h1
            id="hero-title"
            className="section-title max-w-5xl text-balance text-5xl sm:text-6xl lg:text-7xl"
          >
            Practical AI systems with a{' '}
            <span className="text-gradient">creative research pulse.</span>
          </h1>

          <div className="mt-6 flex min-h-12 flex-wrap items-center gap-3 text-lg font-bold text-[var(--muted)] sm:text-xl">
            <span>Currently</span>
            <span className="relative inline-flex min-w-72 overflow-hidden rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[var(--text-strong)] backdrop-blur-xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeRole}
                  initial={{ y: 18, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -18, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.26 }}
                >
                  {activeRole}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <p className="section-copy mt-7 max-w-2xl text-base sm:text-lg">
            I am AVISHEK KURI ANANDA, building practical AI and software projects
            around medical imaging, computer vision, speech/audio AI, data systems,
            and interactive web experiences.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="primary-button"
              onClick={() => scrollToSection('projects')}
            >
              <Play aria-hidden="true" className="size-4" />
              View Projects
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => scrollToSection('contact')}
            >
              <Mail aria-hidden="true" className="size-4" />
              Contact Me
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socialLinks.map((link) => {
              const external = link.href.startsWith('http')

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="icon-button"
                  aria-label={link.label}
                >
                  <SocialIcon label={link.label} />
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.1, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          aria-label="Editorial AI identity artwork"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="art-frame aspect-[0.94/1]"
          >
            <img
              src={profileArt}
              width="2390"
              height="1792"
              alt="Neon editorial portrait of Avishek working with immersive technology"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_42%,rgba(255,255,255,0.22),transparent_58%)] mix-blend-soft-light" />
          </motion.div>

          <motion.div
            className="glass-card absolute -bottom-5 left-4 right-4 p-4 sm:left-auto sm:right-2 sm:w-72"
            animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-[var(--pink)]">research loop</p>
                <p className="mt-1 text-sm font-black text-[var(--text-strong)]">
                  model idea -&gt; prototype -&gt; evaluate
                </p>
              </div>
              <ArrowRight aria-hidden="true" className="size-5 text-[var(--green)]" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        className="icon-button scroll-cue-button absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about section"
      >
        <ArrowDown aria-hidden="true" className="size-5" />
      </button>
    </section>
  )
}

export default Hero
