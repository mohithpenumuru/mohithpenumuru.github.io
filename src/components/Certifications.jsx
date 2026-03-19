import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award } from 'lucide-react'

const certifications = [
  {
    name: 'Certified Data Engineer Associate',
    provider: 'AWS',
    accent: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    name: 'Certified Data Engineer Professional',
    provider: 'Databricks',
    accent: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/20',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    name: 'Certified Generative AI Engineer Associate',
    provider: 'Databricks',
    accent: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/20',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    name: 'SnowPro Core Certified',
    provider: 'Snowflake',
    accent: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    name: 'Terraform Associate (003)',
    provider: 'HashiCorp',
    accent: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    name: 'Cloud Data Engineer Professional',
    provider: 'Google Cloud',
    accent: 'from-blue-500/20 to-green-500/20',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    name: 'Associate Data Practitioner',
    provider: 'Google Cloud',
    accent: 'from-blue-500/20 to-green-500/20',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    name: 'Azure Data Engineer Associate',
    provider: 'Microsoft',
    accent: 'from-blue-600/20 to-sky-500/20',
    border: 'border-sky-500/20',
    text: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    name: 'Azure Fundamentals',
    provider: 'Microsoft',
    accent: 'from-blue-600/20 to-sky-500/20',
    border: 'border-sky-500/20',
    text: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    name: 'Azure Data Fundamentals',
    provider: 'Microsoft',
    accent: 'from-blue-600/20 to-sky-500/20',
    border: 'border-sky-500/20',
    text: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
]

function CertCard({ cert, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`relative glass glass-hover p-5 group overflow-hidden`}
    >
      {/* Gradient glow overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cert.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
      />

      <div className="relative z-10">
        {/* Provider badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${cert.bg} ${cert.text}`}
          >
            {cert.provider}
          </span>
          <Award size={16} className={`${cert.text} opacity-50`} />
        </div>

        {/* Cert name */}
        <h3 className="font-heading font-semibold text-white text-sm leading-snug">
          {cert.name}
        </h3>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certifications" className="section-pad" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Certifications
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Industry recognized<span className="text-accent">.</span>
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            10 professional certifications across AWS, Databricks, Snowflake,
            Google Cloud, Microsoft Azure, and HashiCorp.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
