import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Briefcase, GraduationCap, Phone } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-pad" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-medium text-sm tracking-[0.2em] uppercase mb-3">
            About Me
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-14">
            Get to know me<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 items-start">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center md:justify-start"
          >
            <div className="avatar-ring w-60 h-60 md:w-68 md:h-68">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-surface">
                {/* EDIT: Replace with <img src="your-photo.jpg" alt="Mohith Penumuru" className="w-full h-full object-cover" /> */}
                <div className="w-full h-full bg-gradient-to-br from-accent/10 via-surface to-purple-900/15 flex items-center justify-center">
                  <span className="font-heading text-6xl text-white/20 font-bold select-none">
                    MP
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              Versatile AI &amp; Data Engineer with a strong analytical
              background and hands-on expertise in designing scalable data
              solutions and building intelligent AI systems. Proficient in data
              ingestion, transformation, modeling, and visualization across cloud
              environments.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Currently focused on building AI Agents, MCP servers, and agentic
              workflows at Deloitte. Skilled in developing data pipelines,
              implementing AI/ML solutions, and transforming raw data into
              actionable insights to drive business growth. Adept at
              collaborating across teams to solve real-world problems using
              cutting-edge technologies.
            </p>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: MapPin, text: 'Bengaluru, India' },
                { icon: Briefcase, text: 'AI Engineer @ Deloitte' },
                { icon: GraduationCap, text: 'B.Tech, ECE' },
                { icon: Phone, text: '+91 9052472001' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm text-gray-400 glass px-4 py-2 rounded-full"
                >
                  <Icon size={14} className="text-accent" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
