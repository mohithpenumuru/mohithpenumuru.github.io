import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'

export default function Publication() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="publication" className="section-pad" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Publication
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-12">
            Research work<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 relative overflow-hidden group"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                <BookOpen size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white leading-snug mb-2">
                  Design and Simulation of Glass Shaped Patch Antenna Array with
                  Circular Slots for Wireless Applications
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Penumuru Mohith, Pulimi Sai Nitish Kumar, Ari Jeevan Kumar,
                  Pathipati Venkata Sai Chandradhar, K. Neelima, N. Vikram Teja
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-5 ml-[60px]">
              <span className="text-xs text-accent/80 bg-accent/5 border border-accent/10 px-3 py-1 rounded-full">
                Springer Nature
              </span>
              <span className="text-xs text-gray-500 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
                ICIHCNN 2022
              </span>
              <span className="text-xs text-gray-500 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
                Published: Jan 2025
              </span>
              <span className="text-xs text-gray-500 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
                Pages 805–812
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 ml-[60px]">
              Presented a Glass-shaped patch antenna array with circular slots
              designed to operate at 7.5 GHz. Achieved 9.2 dB Gain, 1.09 VSWR,
              and &minus;27.658 dB Return loss. Designs developed and simulated
              in Ansys HFSS.
            </p>

            <div className="ml-[60px]">
              <a
                href="https://link.springer.com/chapter/10.1007/978-981-99-2832-3_93"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-white
                  transition-colors duration-300 font-medium"
              >
                View on Springer
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
