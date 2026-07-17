const assetModules = import.meta.glob('../assets/*.{avif,jpeg,jpg,png,svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const findAsset = (name: string) => assetModules[`../assets/${name}`]
const journeyAsset = Object.entries(assetModules).find(([path]) => {
  const name = path.toLowerCase()
  return name.includes('bangladesh') && name.includes('finland')
})?.[1]

export const site = {
  name: 'Avishek Kuri Ananda',
  role: 'AI-focused developer',
  identity:
    'Artificial Intelligence graduate from Satakunta University of Applied Sciences (SAMK), based in Finland and originally from Bangladesh.',
  headline:
    'I build machine learning systems and backend tools, with recent work in medical imaging, speech recognition, and data pipelines.',
  professionalSummary:
    'Building practical systems across medical imaging, speech, data, and backend applications.',
  educationLine:
    'Artificial Intelligence graduate from Satakunta University of Applied Sciences (SAMK) · Based in Finland · Originally from Bangladesh',
  availability:
    'Open to opportunities in AI, machine learning, backend development, and data engineering.',
  shortAvailability: 'Open to professional opportunities.',
  footerEducation: 'Artificial Intelligence graduate from SAMK',
  email: 'avishekkuriananda@gmail.com',
  googleAnalyticsId: 'G-BMN58BKD61',
  location: 'Bangladesh → Finland',
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
  avatar: findAsset('avatar.png'),
  homeProfile: findAsset('home-profile.webp') ?? findAsset('home-profile.jpg'),
  journey: journeyAsset,
}
