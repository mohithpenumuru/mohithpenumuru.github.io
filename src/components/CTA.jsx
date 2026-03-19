import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

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
            Let&apos;s Build Something<span className="text-violet">.</span>
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
              <span className="text-violet">&gt;</span>
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
              <span className="text-violet">&gt;</span>
              <span className="text-gray-600"> --expertise</span>
              <span className="text-violet/80"> &quot;AI Agents&quot;</span>
              <span className="text-gray-600"> --stack</span>
              <span className="text-cyan-400"> &quot;Databricks, AWS, LangChain, Snowflake&quot;</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-violet">&gt;</span>
              <span className="text-gray-500"> Ready to collaborate</span>
              <span className="cursor-blink" />
            </div>
          </div>
        </motion.div>

        {/* CTA button with sliding icon animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="#contact"
            className="btn-slide inline-flex items-center gap-2 h-12 pl-6 pr-14 rounded-full bg-gradient-to-r from-violet to-accent text-white font-bold text-sm
              hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-all duration-500 hover:scale-105 group relative"
          >
            <span className="relative z-10 transition-all duration-500">
              Start a Conversation
            </span>
            <div className="btn-icon w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ArrowUpRight size={16} />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
