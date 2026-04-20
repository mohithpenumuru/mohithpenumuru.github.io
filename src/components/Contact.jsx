import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Linkedin, Github, Send, MapPin, Phone } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

function TerminalBlock() {
  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-[10px] text-ink-dim ml-2">terminal</span>
      </div>
      <div className="p-5 font-mono text-[12px] space-y-2.5 leading-relaxed">
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-muted"> mohith.penumuru</span>
          <span className="text-ink-dim"> --status</span>
          <span className="text-emerald-400"> available</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --location</span>
          <span className="text-ink-muted"> bengaluru</span>
          <span className="text-ink-dim"> --open-to</span>
          <span className="text-amber-400"> remote</span>
          <span className="text-ink-dim">|</span>
          <span className="text-amber-400">hybrid</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --expertise</span>
          <span className="text-violet/80"> &quot;AI Agents · MCP&quot;</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --stack</span>
          <span className="text-accent"> &quot;Databricks · AWS · LangGraph · Snowflake&quot;</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> Ready to collaborate</span>
          <span className="cursor-blink" />
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="section-pad" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="07"
          title="Let us build something."
          italicWord="build"
          subtitle="Open to AI & data engineering roles, consulting, and cloud platform projects."
        />

        <div className="grid md:grid-cols-[1fr_360px] gap-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Name</label>
                <input
                  id="name" type="text" required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                    focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Email</label>
                <input
                  id="email" type="email" required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                    focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Subject</label>
              <input
                id="subject" type="text"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                  focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Message</label>
              <textarea
                id="message" rows={5} required
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                  focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet to-accent text-ink font-mono text-[11px] uppercase tracking-wider
                hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              {submitted ? 'Sent' : 'Send Message'}
              <Send size={13} />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <TerminalBlock />

            <div className="glass p-6">
              <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.25em] mb-4">Direct</p>
              <div className="space-y-3">
                <a href="mailto:mohithpenumuru1@gmail.com" className="flex items-center gap-3 text-sm text-ink-muted hover:text-violet transition-colors">
                  <Mail size={14} className="text-violet" />
                  mohithpenumuru1@gmail.com
                </a>
                <a href="tel:+919052472001" className="flex items-center gap-3 text-sm text-ink-muted hover:text-violet transition-colors">
                  <Phone size={14} className="text-violet" />
                  +91 9052472001
                </a>
                <div className="flex items-center gap-3 text-sm text-ink-muted">
                  <MapPin size={14} className="text-violet" />
                  Bengaluru, India
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.25em] mb-4">Socials</p>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohith-penumuru-3b9793205/', label: 'LinkedIn' },
                  { icon: Github,   href: 'https://github.com/mohithpenumuru', label: 'GitHub' },
                  { icon: Mail,     href: 'mailto:mohithpenumuru1@gmail.com', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center
                      text-ink-dim hover:text-violet hover:border-violet/30 hover:bg-violet/5 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
