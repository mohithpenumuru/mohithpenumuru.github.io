import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const orbs = [
  { w: 500, h: 500, top: '5%', left: '10%', bg: 'rgba(139,92,246,0.1)', delay: 0 },
  { w: 350, h: 350, top: '55%', right: '5%', bg: 'rgba(0,212,255,0.08)', delay: 4 },
  { w: 250, h: 250, bottom: '15%', left: '55%', bg: 'rgba(59,130,246,0.07)', delay: 8 },
]

const techStack = [
  'Databricks', 'AWS', 'LangChain', 'PySpark', 'Snowflake', 'Terraform', 'Azure', 'GCP',
]

const dynamicLines = [
  'Building AI Agents & MCP Servers at Deloitte',
  'Designing scalable data pipelines on AWS & Databricks',
  'Turning raw data into enterprise intelligence — at scale',
  '10x Certified across AWS, Databricks, Snowflake, GCP & Azure',
]

function TypingRotator({ lines }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = lines[lineIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 40)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 20)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setLineIndex((lineIndex + 1) % lines.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, lineIndex, lines])

  return (
    <span>
      {displayed}
      <span className="cursor-blink" />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center aurora-bg overflow-hidden"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="orb"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: orb.bg,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-violet font-medium text-sm md:text-base tracking-[0.25em] uppercase mb-6"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] text-white glow leading-[1.05] mb-6"
        >
          Mohith Penumuru
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-gray-400 text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mb-5 leading-relaxed"
        >
          AI Engineer | Data Engineer — Building Intelligent Systems
          with AI Agents, Cloud &amp; Data at Scale
        </motion.p>

        {/* Dynamic typing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm">
            <span className="text-violet font-mono">&gt;</span>
            <span className="text-gray-300 font-mono text-xs md:text-sm">
              <TypingRotator lines={dynamicLines} />
            </span>
          </div>
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.4 + i * 0.06 }}
              className="text-xs font-medium text-violet/70 bg-violet/5 border border-violet/15 px-3 py-1.5 rounded-full
                hover:bg-violet/10 hover:border-violet/30 transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet to-accent text-white font-bold text-sm
              hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-400 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-white/10 text-gray-300 font-semibold text-sm
              hover:border-violet/40 hover:text-violet transition-all duration-300 group flex items-center gap-2"
          >
            Get In Touch
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
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
