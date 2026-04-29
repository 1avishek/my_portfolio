import { socialLinks } from '../data/socialLinks'
import { navItems, scrollToSection } from '../utils/navigation'
import SocialIcon from './SocialIcon'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="content-layer border-t border-[var(--line)] bg-[var(--surface-muted)] py-10">
      <div className="section-shell flex flex-col gap-8 py-0 md:flex-row md:items-center md:justify-between">
        <div>
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('home')
            }}
            className="nav-link inline-flex items-center gap-3 rounded-full"
          >
            <span className="grid size-11 place-items-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-sm font-black text-[var(--text-strong)]">
              AK
            </span>
            <span>
              <span className="block font-black text-[var(--text-strong)]">
                AVISHEK KURI ANANDA
              </span>
              <span className="text-sm font-semibold text-[var(--muted)]">
                AI-focused developer.
              </span>
            </span>
          </a>
          <p className="mt-4 text-sm font-semibold text-[var(--muted)]">
            @Copyright {year}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(item.id)
              }}
              className="nav-link rounded-full px-3 py-2 text-sm font-black text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text-strong)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
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
      </div>
    </footer>
  )
}

export default Footer
