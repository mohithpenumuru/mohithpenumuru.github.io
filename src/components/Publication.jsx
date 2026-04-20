import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

export default function Publication() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="publication" className="section-pad" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader number="06" title="Published research." italicWord="research" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start gap-5 mb-5">
              <span className="font-mono text-violet/30 text-3xl select-none leading-none">01</span>
              <div className="w-11 h-11 rounded-xl bg-violet/10 flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-violet" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-snug mb-3 tracking-tight">
                  Design and Simulation of Glass Shaped Patch Antenna Array with
                  Circular Slots for Wireless Applications
                </h3>
                <p className="font-mono text-[11px] text-ink-dim leading-relaxed">
                  Penumuru Mohith · Pulimi Sai Nitish Kumar · Ari Jeevan Kumar · Pathipati Venkata Sai Chandradhar · K. Neelima · N. Vikram Teja
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5 ml-[88px]">
              <span className="font-mono text-[10px] text-violet bg-violet/5 border border-violet/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Springer Nature
              </span>
              <span className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                ICIHCNN 2022
              </span>
              <span className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Published Jan 2025
              </span>
              <span className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Pages 805–812
              </span>
            </div>

            <p className="text-ink-muted text-sm leading-relaxed mb-6 ml-[88px]">
              Presented a Glass-shaped patch antenna array with circular slots
              designed to operate at 7.5 GHz. Achieved 9.2 dB Gain, 1.09 VSWR,
              and &minus;27.658 dB Return loss. Designs developed and simulated
              in Ansys HFSS.
            </p>

            <div className="ml-[88px]">
              <a
                href="https://link.springer.com/chapter/10.1007/978-981-99-2832-3_93"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] text-violet hover:text-ink transition-colors duration-300 uppercase tracking-wider"
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
