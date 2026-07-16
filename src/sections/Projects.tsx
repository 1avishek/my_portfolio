import ProjectRow from '../components/ProjectRow'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'
import { site } from '../data/site'

function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          label="Projects"
          title={
            <>
              Practical systems,
              <br />
              {' built and tested.'}
            </>
          }
          id="projects-title"
        />

        <div className="project-list">
          {projects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>

        <a className="all-projects-link" href={site.links.github} target="_blank" rel="noopener noreferrer">
          View all projects on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}

export default Projects
