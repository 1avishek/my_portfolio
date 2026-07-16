import { site } from '../data/site'
import SocialLinks from './SocialLinks'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <strong>{site.name.toUpperCase()}</strong>
          {/* <p>{site.footerEducation}</p>
          <p>{site.location}</p> */}
          <p>{site.shortAvailability}</p>
        </div>
        <SocialLinks includeInstagram />
        <p>© {new Date().getFullYear()}</p>
        <a className="scroll-top" href="#top" aria-label="Scroll to the top">
          ↑
        </a>
      </div>
    </footer>
  )
}

export default Footer
