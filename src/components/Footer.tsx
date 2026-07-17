import { site } from '../data/site'
import AnalyticsConsent from './AnalyticsConsent'
import SocialLinks from './SocialLinks'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <strong>{site.name.toUpperCase()}</strong>
          {/* <p>{site.footerEducation}</p>
          <p>{site.location}</p> */}
          <div className="footer-meta">
            <p>{site.shortAvailability}</p>
            <AnalyticsConsent />
          </div>
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
