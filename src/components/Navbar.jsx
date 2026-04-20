import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Work', href: '#experience' },
  { num: '03', label: 'Skills', href: '#skills' },
  { num: '04', label: 'Certs', href: '#certifications' },
  { num: '05', label: 'Projects', href: '#projects' },
  { num: '07', label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-2xl text-ink tracking-tight hover:text-violet transition-colors duration-300"
        >
          MP<em className="not-italic text-violet">.</em>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] text-ink-muted hover:text-ink transition-colors duration-300 tracking-wider"
            >
              <span className="text-violet/70 mr-1.5">{link.num}</span>
              {link.label}
            </a>
          ))}
          <a
            href="./resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-wider px-4 py-2 rounded-full border border-violet/40 text-violet
              hover:bg-violet hover:text-ink transition-all duration-300"
          >
            RESUME
          </a>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="glass mx-4 mt-2 p-6 rounded-2xl flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm text-ink-muted hover:text-violet transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-violet/70 mr-2">{link.num}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
