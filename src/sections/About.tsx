import { media } from '../data/site'

function AboutVisual() {
  if (media.journey) {
    return (
      <img
        src={media.journey}
        width="1200"
        height="1500"
        loading="lazy"
        decoding="async"
        alt="Editorial illustration connecting Bangladesh and Finland through flag-inspired colors"
      />
    )
  }

  return (
    <svg viewBox="0 0 600 760" role="img" aria-label="Route from Bangladesh to Finland">
      <path d="M90 620 C160 470 390 500 510 140" />
      <circle cx="90" cy="620" r="13" />
      <circle cx="510" cy="140" r="13" />
    </svg>
  )
}

function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-layout">
          <div className="about-narrative">
            <header className="about-heading">
              <h2 id="about-title">
                <span>A Bit</span>
                <br />
                {' About Me'}
              </h2>
            </header>

            <div className="about-copy">
              <p>
              I’m from Bangladesh and now based in Finland, where I graduated in Data Engineering from Satakunta University of Applied Sciences (SAMK).
              Moving between these two places has shaped how I approach both learning and problem-solving: stay curious, adapt quickly, and build things that are useful beyond the classroom.
              </p>
              <p>
              I like working on projects from beginning to end.
              That usually means understanding the problem, preparing and checking the data, building the model or backend, testing whether it works, and turning it into something people can use.
              </p>
              <p>
              My recent work has included medical image classification, Finnish speech recognition, backend APIs, and data pipelines.
              I am now looking for a role where I can keep building, learn from an experienced team, and take responsibility for real technical work.
              </p>
            </div>
          </div>

          <div className="about-visual">
            <AboutVisual />
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
