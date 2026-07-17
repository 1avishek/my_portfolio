import avatar from '../assets/avatar.webp'
import homeProfile from '../assets/home-profile.jpg'
import journey from '../assets/bangladesh-finland-story.webp'

export const site = {
  name: 'Avishek Kuri Ananda',
  headline:
    'I build machine learning systems and backend tools, with recent work in medical imaging, speech recognition, and data pipelines.',
  availability:
    'Open to opportunities in AI, machine learning, backend development, and data engineering.',
  shortAvailability: 'Open to professional opportunities.',
  email: 'avishekkuriananda@gmail.com',
  googleAnalyticsId: 'G-BMN58BKD61',
  links: {
    github: 'https://github.com/1avishek',
    linkedin: 'https://www.linkedin.com/in/avishek-kuri-ananda/',
    instagram: 'https://www.instagram.com/anandaavishek/',
  },
} as const

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const media = {
  avatar,
  homeProfile,
  journey,
}
