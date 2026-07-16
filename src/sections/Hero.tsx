import { media, site } from '../data/site'

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-photo">
        {media.homeProfile ? (
          <img
            src={media.homeProfile}
            width="900"
            height="1100"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            alt="Black-and-white portrait of Avishek Kuri Ananda"
          />
        ) : (
          <div className="image-placeholder" role="img" aria-label="Portrait placeholder">
            <span>Home portrait</span>
          </div>
        )}
      </div>

      <div className="hero-copy">
        <p className="hero-intro">HI THERE 👋, I’M</p>
        <h1 id="hero-title">
          <span>Avishek</span>
          <span>Kuri</span>
          <span>Ananda</span>
        </h1>
        <div className="hero-summary">
          <p>{site.headline}</p>
          {/* <p>{site.educationLine}</p> */}
          <p>{site.availability}</p>
        </div>
        <a className="hero-cta" href="#contact">
          Let’s talk <span aria-hidden="true">↘</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
