import { useState } from 'react'
import { media, navigation } from '../data/site'
import MobileMenu from './MobileMenu'
import SocialLinks from './SocialLinks'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="avatar-link" href="#top" aria-label="Scroll to the top">
          {media.avatar ? (
            <img src={media.avatar} width="48" height="48" decoding="async" alt="" />
          ) : (
            <span aria-hidden="true">AK</span>
          )}
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-socials">
          <SocialLinks />
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}

export default Header
