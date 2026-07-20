import type { Project } from '../data/projects'

type ProjectRowProps = {
  project: Project
}

function ProjectActions({ project }: ProjectRowProps) {
  if (!project.publicationUrl && !project.live && !project.github) return null

  return (
    <div className="project-links" aria-label={`${project.title} links`}>
      {project.publicationUrl ? (
        <a
          href={project.publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.publicationAriaLabel}
        >
          {project.publicationLabel} <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {project.live ? (
        <a href={project.live} target="_blank" rel="noopener noreferrer">
          Live demo <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {project.github ? (
        <a href={project.github} target="_blank" rel="noopener noreferrer">
          Source code <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  )
}

function TechnologyLabels({ project }: ProjectRowProps) {
  return (
    <ul className="project-technologies" aria-label={`${project.title} technologies`}>
      {project.technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  )
}

function FeaturedCaseStudy({ project }: ProjectRowProps) {
  const caseStudy = project.caseStudy
  if (!caseStudy) return null

  return (
    <div className="project-copy project-copy--featured">
      <p className="featured-label">{project.featuredLabel}</p>
      <h3>
        Finnish Short-Utterance Data
        <br />
        {' Collection and Recognition Pipeline'}
      </h3>
      <p className="project-category">{project.category}</p>
      <p className="project-support">{project.supportingLine}</p>
      <p className="project-intro">{project.description}</p>
      <p className="project-support">{project.publicationNote}</p>

      <div className="case-study-details">
        <section>
          <h4>Challenge</h4>
          <p>{caseStudy.challenge}</p>
        </section>
        <section>
          <h4>Built</h4>
          <ul className="case-study-built">
            {caseStudy.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4>Outcome</h4>
          <p>{caseStudy.outcome}</p>
        </section>
      </div>

      <TechnologyLabels project={project} />
      <ProjectActions project={project} />
      <p className="project-status">{project.status}</p>
    </div>
  )
}

function ProjectRow({ project }: ProjectRowProps) {
  return (
    <article className={`project-row${project.caseStudy ? ' project-row--featured' : ''}`}>
      {project.caseStudy ? (
        <FeaturedCaseStudy project={project} />
      ) : (
        <div className="project-copy">
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <TechnologyLabels project={project} />
          <ProjectActions project={project} />
        </div>
      )}
    </article>
  )
}

export default ProjectRow
