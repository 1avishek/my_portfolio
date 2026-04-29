import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

function ScrollJourneyCar() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 0.28, 0.66, 1], ['-10vw', '18vw', '62vw', '104vw'])
  const y = useTransform(scrollYProgress, [0, 0.32, 0.7, 1], ['16vh', '28vh', '58vh', '82vh'])
  const rotate = useTransform(scrollYProgress, [0, 0.36, 0.72, 1], [-2, 4, -3, 2])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [0.2, 0.68, 0.56, 0])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-x-0 top-20 h-[82vh] w-full opacity-70"
        viewBox="0 0 1200 680"
        preserveAspectRatio="none"
      >
        <path
          className="journey-road"
          d="M-80 115 C 210 80, 265 225, 410 244 S 670 180, 774 318 S 890 570, 1280 520"
        />
      </svg>

      <motion.div className="mini-car absolute h-10 w-20 sm:h-12 sm:w-24" style={{ x, y, rotate, opacity }}>
        <svg viewBox="0 0 120 58" className="h-full w-full">
          <path
            d="M14 38h92l-9-20H76L63 8H38L24 20H12l-8 18h10Z"
            fill="var(--surface-strong)"
            stroke="var(--text-strong)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M39 19h19l8 10H28l11-10Z" fill="var(--pink)" opacity="0.88" />
          <path d="M70 19h18l5 10H78l-8-10Z" fill="var(--green)" opacity="0.9" />
          <path d="M13 38h94" stroke="var(--pink)" strokeWidth="3" strokeLinecap="round" />
          <rect x="22" y="41" width="18" height="8" rx="4" fill="var(--text-strong)" />
          <rect x="80" y="41" width="18" height="8" rx="4" fill="var(--text-strong)" />
        </svg>
      </motion.div>
    </div>
  )
}

export default ScrollJourneyCar
