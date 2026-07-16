import type { ReactNode } from 'react'

type SectionHeadingProps = {
  label?: string
  title: ReactNode
  id: string
  description?: string
}

function SectionHeading({ label, title, id, description }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {label && <p className="section-label">{label}</p>}
      <h2 id={id}>{title}</h2>
      {description && <p className="section-heading-copy">{description}</p>}
    </header>
  )
}

export default SectionHeading
