import { Menu, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { navItems, scrollToSection } from '../utils/navigation'
import type { SectionId } from '../utils/navigation'
import ThemeToggle from './ThemeToggle'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState<SectionId>('home')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveId(visible.target.id as SectionId)
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.12, 0.28, 0.42],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const handleNavigate = (sectionId: SectionId) => {
    setIsOpen(false)
    scrollToSection(sectionId)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-[var(--line)] shadow-[0_18px_60px_var(--shadow)]' : ''
      }`}
      style={{ background: isScrolled ? 'var(--nav-bg)' : 'transparent', backdropFilter: 'blur(22px)' }}
    >
      <nav
        className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            handleNavigate('home')
          }}
          className="nav-link group flex min-w-0 items-center gap-3 rounded-full"
          aria-label="AVISHEK KURI ANANDA home"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-sm font-black text-[var(--text-strong)] shadow-[0_0_34px_var(--pink-soft)]">
            AK
          </span>
          <span className="hidden min-w-0 min-[420px]:block">
            <span className="block truncate text-sm font-black text-[var(--text-strong)]">
              AVISHEK KURI ANANDA
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)]">
              <Sparkles aria-hidden="true" className="size-3 text-[var(--pink)]" />
              AI-focused developer
            </span>
          </span>
        </a>

        <div className="hidden min-w-0 items-center gap-0.5 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1 backdrop-blur-xl lg:flex xl:gap-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavigate(item.id)
                }}
                className={`nav-link rounded-full px-2.5 py-2 text-xs font-extrabold transition xl:px-3.5 xl:text-sm ${
                  isActive
                    ? 'bg-[#090909] text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)]'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-strong)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            className="icon-button mobile-menu-button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="border-t border-[var(--line)] bg-[var(--nav-bg)] px-4 pb-5 pt-2 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavigate(item.id)
                  }}
                  className={`nav-link rounded-2xl px-3 py-3 text-sm font-extrabold transition hover:bg-[var(--surface-muted)] ${
                    activeId === item.id
                      ? 'bg-[#090909] text-white'
                      : 'text-[var(--text-strong)]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
