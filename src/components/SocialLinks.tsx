import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { site } from '../data/site'

type SocialLinksProps = {
  includeInstagram?: boolean
  labels?: boolean
  onNavigate?: () => void
}

const links = [
  { label: 'LinkedIn', href: site.links.linkedin, Icon: FaLinkedinIn },
  { label: 'GitHub', href: site.links.github, Icon: FaGithub },
  { label: 'Instagram', href: site.links.instagram, Icon: FaInstagram },
]

function SocialLinks({ includeInstagram = false, labels = false, onNavigate }: SocialLinksProps) {
  return (
    <div className="social-links" aria-label="Social links">
      {links
        .filter((link) => includeInstagram || link.label !== 'Instagram')
        .map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels ? undefined : label}
            onClick={onNavigate}
          >
            <Icon aria-hidden="true" />
            {labels ? <span>{label}</span> : null}
          </a>
        ))}
    </div>
  )
}

export default SocialLinks
