import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { spotlightMove } from './ui/spotlight'

const certifications = [
  { name: 'Certified Data Engineer Associate', provider: 'AWS',         accent: 'from-amber-500/20 to-orange-600/20', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  { name: 'Certified Data Engineer Professional', provider: 'Databricks', accent: 'from-red-500/20 to-orange-500/20', text: 'text-red-400', bg: 'bg-red-500/10' },
  { name: 'Certified Generative AI Engineer Associate', provider: 'Databricks', accent: 'from-red-500/20 to-orange-500/20', text: 'text-red-400', bg: 'bg-red-500/10' },
  { name: 'SnowPro Core Certified', provider: 'Snowflake',              accent: 'from-cyan-500/20 to-blue-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { name: 'Terraform Associate (003)', provider: 'HashiCorp',           accent: 'from-purple-500/20 to-violet-500/20', text: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'Cloud Data Engineer Professional', provider: 'Google Cloud', accent: 'from-blue-500/20 to-green-500/20', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Associate Data Practitioner', provider: 'Google Cloud',      accent: 'from-blue-500/20 to-green-500/20', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Azure Data Engineer Associate', provider: 'Microsoft',       accent: 'from-blue-600/20 to-sky-500/20', text: 'text-sky-400', bg: 'bg-sky-500/10' },
  { name: 'Azure Fundamentals', provider: 'Microsoft',                  accent: 'from-blue-600/20 to-sky-500/20', text: 'text-sky-400', bg: 'bg-sky-500/10' },
  { name: 'Azure Data Fundamentals', provider: 'Microsoft',             accent: 'from-blue-600/20 to-sky-500/20', text: 'text-sky-400', bg: 'bg-sky-500/10' },
]

function CertCard({ cert, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      onMouseMove={spotlightMove}
      className="relative glass glass-hover spotlight-card shine p-5 group overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${cert.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full ${cert.bg} ${cert.text}`}>
            {cert.provider}
          </span>
          <Award size={14} className={`${cert.text} opacity-40`} />
        </div>
        <h3 className="font-display text-base text-ink leading-snug tracking-tight">
          {cert.name}
        </h3>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="04"
          title="Industry-recognized."
          italicWord="recognized"
          subtitle="10 industry certifications across AWS, Databricks, Snowflake, Google Cloud, Microsoft Azure, and HashiCorp."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
