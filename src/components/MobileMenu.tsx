import { useEffect, useRef } from 'react'
import { navigation } from '../data/site'
import SocialLinks from './SocialLinks'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={dialogRef} className="mobile-menu" onCancel={onClose} onClose={onClose}>
      <div className="mobile-menu__top">
        <span>Navigation</span>
        <button type="button" onClick={onClose} aria-label="Close navigation menu">
          Close
        </button>
      </div>
      <nav aria-label="Mobile navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </a>
        ))}
      </nav>
      <SocialLinks includeInstagram labels onNavigate={onClose} />
    </dialog>
  )
}

export default MobileMenu
