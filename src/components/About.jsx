import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Briefcase, GraduationCap, Phone } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import RadialOrbital from './ui/RadialOrbital'
import Counter from './ui/Counter'

const quickFacts = [
  { icon: MapPin, text: 'Bengaluru, India' },
  { icon: Briefcase, text: 'AI Engineer @ Deloitte' },
  { icon: GraduationCap, text: 'B.Tech, ECE' },
  { icon: Phone, text: '+91 9052472001' },
]

const stats = [
  { value: 3, suffix: '+', label: 'Years in Data & AI' },
  { value: 10, suffix: '', label: 'Cloud Certifications' },
  { value: 4, suffix: '+', label: 'AI Agents in Production' },
  { value: 1, suffix: '', label: 'Springer Publication' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-pad" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader number="01" title="About." italicWord="About" />

        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 items-start">
          {/* Avatar slot — orbital echo around the MP monogram */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative w-60 h-60 md:w-72 md:h-72 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <RadialOrbital size={288} nodes={[]} intensity="subtle" />
              </div>
              <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-surface border border-white/10 flex items-center justify-center">
                {/* When a real photo is supplied, replace the inner span with:
                    <img src="/photo.jpg" alt="Mohith Penumuru" className="w-full h-full object-cover" /> */}
                <span className="font-display text-5xl text-ink/30 select-none">MP</span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="font-display text-2xl md:text-[1.7rem] text-ink leading-snug mb-6 tracking-tight">
              A versatile AI &amp; Data Engineer crafting{' '}
              <em className="italic text-violet">intelligent</em> systems where data,
              agents, and cloud infrastructure converge.
            </p>
            <p className="text-ink-muted text-base leading-relaxed mb-8">
              Currently at Deloitte, building AI agents, MCP servers, and multi-agent
              orchestrations with{' '}
              <em className="font-display italic text-accent">intent</em> —
              turning enterprise data into autonomous decision-making.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {quickFacts.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 font-mono text-[11px] text-ink-muted glass px-3.5 py-1.5 rounded-full"
                >
                  <Icon size={12} className="text-violet" />
                  {text}
                </div>
              ))}
            </div>

            {/* Animated stat counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                  className="glass p-4 text-center sm:text-left"
                >
                  <div className="font-mono text-2xl md:text-3xl text-violet font-medium leading-none mb-2">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono text-[9px] text-ink-dim uppercase tracking-[0.15em] leading-relaxed">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
