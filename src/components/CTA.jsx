import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Terminal, ArrowRight } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-pad" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-5 glow">
            Let&apos;s Build Something<span className="text-accent">.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Open to AI &amp; data engineering roles, consulting opportunities,
            and cloud platform projects.
          </p>
        </motion.div>

        {/* Terminal block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass max-w-2xl mx-auto text-left mb-10 overflow-hidden"
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[10px] text-gray-600 ml-2 font-mono">terminal</span>
          </div>

          {/* Terminal content */}
          <div className="p-5 font-mono text-sm space-y-3">
            <div className="flex flex-wrap gap-x-1">
              <span className="text-accent">&gt;</span>
              <span className="text-gray-300"> mohith.penumuru</span>
              <span className="text-gray-600"> --status</span>
              <span className="text-emerald-400"> available</span>
              <span className="text-gray-600"> --location</span>
              <span className="text-gray-300"> bengaluru</span>
              <span className="text-gray-600"> --open-to</span>
              <span className="text-amber-400"> remote</span>
              <span className="text-gray-600">|</span>
              <span className="text-amber-400">hybrid</span>
            </div>

            <div className="flex flex-wrap gap-x-1">
              <span className="text-accent">&gt;</span>
              <span className="text-gray-600"> --expertise</span>
              <span className="text-purple-400"> &quot;AI Agents&quot;</span>
              <span className="text-gray-600"> --stack</span>
              <span className="text-cyan-400"> &quot;Databricks, AWS, LangChain, Snowflake&quot;</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-accent">&gt;</span>
              <span className="text-gray-500"> Ready to collaborate</span>
              <span className="cursor-blink text-accent" />
            </div>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-surface font-bold text-sm
              hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all duration-400 hover:scale-105 group"
          >
            Start a Conversation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
