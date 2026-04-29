export const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Current Focus', id: 'current-focus' },
  { label: 'Contact', id: 'contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export function scrollToSection(sectionId: SectionId) {
  const element = document.getElementById(sectionId)

  if (!element) {
    return
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
