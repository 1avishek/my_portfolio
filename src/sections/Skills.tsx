import SectionHeading from '../components/SectionHeading'
import { skillGroups } from '../data/skills'

function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          label="Skills"
          title={
            <>
              How I build
              <br />
              {' practical systems.'}
            </>
          }
          id="skills-title"
          description="Technologies and methods demonstrated across selected projects and applied research."
        />

        <div className="skill-groups">
          {skillGroups.map((group) => (
            <article className="skill-row" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
