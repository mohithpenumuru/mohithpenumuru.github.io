import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import RadialOrbital from './ui/RadialOrbital'
import StatusPill from './ui/StatusPill'
import Particles from './ui/Particles'
import Magnetic from './ui/Magnetic'
import Marquee from './ui/Marquee'

const techStack = [
  'Databricks', 'AWS', 'LangChain', 'PySpark', 'Snowflake', 'Terraform', 'Azure', 'GCP',
  'LangGraph', 'MCP', 'Airflow', 'Docker',
]

const dynamicLines = [
  '> Building AI agents & MCP servers at Deloitte',
  '> Orchestrating multi-agent systems with LangGraph & AWS Strands',
  '> Designing data platforms on AWS, Databricks & Snowflake',
  '> 10x certified across AWS, Databricks, Snowflake, GCP & Azure',
]

const orbitalNodes = [
  { label: 'LangGraph',    ringIndex: 0, angle: -30 },
  { label: 'AWS Strands',  ringIndex: 0, angle: 60 },
  { label: 'MCP',          ringIndex: 1, angle: 200 },
  { label: 'Databricks',   ringIndex: 0, angle: 150 },
  { label: 'LLM',          ringIndex: 2, angle: 90 },
  { label: 'Snowflake',    ringIndex: 1, angle: 320 },
]

// Headline broken into words for the staggered blur reveal.
// `gradient: true` marks the animated gradient word.
const headlineWords = [
  { text: 'Engineering' },
  { text: 'the' },
  { text: 'AI-native', gradient: true },
  { text: 'era.' },
]

function TypingRotator({ lines }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = lines[lineIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 35)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 18)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setLineIndex((lineIndex + 1) % lines.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, lineIndex, lines])

  return (
    <span className="font-mono text-xs md:text-sm text-ink-muted">
      {displayed}
      <span className="cursor-blink" />
    </span>
  )
}

/** Tilts its children a few degrees toward the cursor (tracked across the hero). */
function OrbitalParallax({ children }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })
  const rotateX = useTransform(sy, [0, 1], [9, -9])
  const rotateY = useTransform(sx, [0, 1], [-9, 9])

  useEffect(() => {
    const section = ref.current?.closest('section')
    if (!section || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      px.set((e.clientX - rect.left) / rect.width)
      py.set((e.clientY - rect.top) / rect.height)
    }
    const onLeave = () => {
      px.set(0.5)
      py.set(0.5)
    }
    section.addEventListener('mousemove', onMove, { passive: true })
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [px, py])

  return (
    <motion.div ref={ref} style={{ rotateX, rotateY, transformPerspective: 900 }}>
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Subtle radial-gradient backdrop behind the orbital (CSS, no WebGL) */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-50" />

      {/* Constellation particle field */}
      <Particles className="absolute inset-0 w-full h-full" density={55} />

      {/* Centerpiece orbital with mouse parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 mb-12"
      >
        <OrbitalParallax>
          <RadialOrbital
            size={320}
            nodes={orbitalNodes}
            caption="CORE → AGENTS → TOOLS → MCP"
            intensity="full"
          />
        </OrbitalParallax>
      </motion.div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] text-ink leading-[1.02] tracking-tight mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word.text}
              initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 + i * 0.13 }}
              className="inline-block mr-[0.28em] last:mr-0"
            >
              {word.gradient ? (
                <em className="font-display italic bg-gradient-to-r from-violet via-accent to-violet bg-clip-text text-transparent gradient-text-animate">
                  {word.text}
                </em>
              ) : (
                word.text
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="text-ink-muted text-lg md:text-xl font-light max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          AI Engineer at Deloitte — building agents, MCP servers, and data platforms at enterprise scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-8 flex justify-center"
        >
          <TypingRotator lines={dynamicLines} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mb-8 max-w-xl mx-auto"
        >
          <Marquee speed={26}>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full
                  whitespace-nowrap hover:border-violet/30 hover:text-violet transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex justify-center mb-8"
        >
          <StatusPill label="AVAILABLE FOR SELECT PROJECTS" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Magnetic strength={0.3}>
            <a
              href="#projects"
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-violet to-accent text-ink font-semibold text-sm
                shine hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-400"
            >
              View My Work
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-white/10 text-ink-muted font-medium text-sm
                hover:border-violet/40 hover:text-violet transition-all duration-300 group flex items-center gap-2"
            >
              Get In Touch
              <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-violet/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-violet" />
        </motion.div>
      </motion.div>
    </section>
  )
}
