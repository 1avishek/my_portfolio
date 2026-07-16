import { site } from '../data/site'

function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title">Let’s work together</h2>
        <p className="contact-intro">
          I am open to AI, machine learning, data, backend, and research-oriented opportunities.
          Feel free to reach out about professional roles, collaborations, project feedback,
          research ideas, or something useful we could build together.
        </p>

        <a className="contact-strip" href={`mailto:${site.email}`}>
          Get in touch <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

export default Contact
