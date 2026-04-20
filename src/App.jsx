import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Publication from './components/Publication'
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
            width: 900,
            height: 900,
            top: '-10%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%)',
            animationDuration: '35s',
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: 700,
            height: 700,
            bottom: '-5%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.13), transparent 70%)',
            animationDuration: '35s',
            animationDelay: '12s',
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
        <div className="section-divider" />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
