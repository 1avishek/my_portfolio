import { Mail } from 'lucide-react'
import type { ComponentType } from 'react'
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import type { SocialLink } from '../data/socialLinks'

const brandIcons: Record<SocialLink['label'], ComponentType<{ className?: string }>> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Email: Mail,
}

type SocialIconProps = {
  label: SocialLink['label']
  className?: string
}

function SocialIcon({ label, className }: SocialIconProps) {
  const Icon = brandIcons[label]

  return <Icon aria-hidden="true" className={className} />
}

export default SocialIcon
