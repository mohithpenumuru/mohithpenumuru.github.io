import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Publication from './components/Publication'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="font-body noise relative">
      {/* Fixed gradient mesh blobs — creates depth across the entire page */}
      <div className="mesh-gradient">
        <div
          className="mesh-blob"
          style={{
            width: 800,
            height: 800,
            top: '-5%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)',
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: 600,
            height: 600,
            top: '25%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)',
            animationDelay: '6s',
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: 700,
            height: 700,
            top: '55%',
            left: '-12%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)',
            animationDelay: '12s',
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: 500,
            height: 500,
            bottom: '5%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)',
            animationDelay: '18s',
          }}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Certifications />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Publication />
        <CTA />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
