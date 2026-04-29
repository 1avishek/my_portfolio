import { MotionConfig } from 'motion/react'
import About from './components/About'
import Contact from './components/Contact'
import CurrentFocus from './components/CurrentFocus'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import ScrollJourneyCar from './components/ScrollJourneyCar'
import Skills from './components/Skills'
import { useMouseGlow } from './hooks/useMouseGlow'

function App() {
  useMouseGlow()

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-root">
        <a href="#home" className="skip-link">
          Skip to content
        </a>
        <div className="cursor-glow" aria-hidden="true" />
        <ScrollJourneyCar />
        <Navbar />
        <main className="content-layer">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CurrentFocus />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App
