import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Linkedin, Github, Send, Check, AlertTriangle, Loader2, ArrowUpRight } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Magnetic from './ui/Magnetic'
import { spotlightMove } from './ui/spotlight'

// Web3Forms delivery endpoint + access key. Get a free key at https://web3forms.com
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const FORM_KEY = '9986e52f-34e0-42bd-9504-78cb690e0478'

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mohithpenumuru1@gmail.com',
    href: 'mailto:mohithpenumuru1@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'mohith-penumuru',
    href: 'https://www.linkedin.com/in/mohith-penumuru-3b9793205/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'mohithpenumuru',
    href: 'https://github.com/mohithpenumuru',
  },
]

// Form inputs are rendered from this config rather than literal markup.
const inputRows = [
  { key: 'name', title: 'Your name', kind: 'text', hint: 'Ada Lovelace' },
  { key: 'email', title: 'Your email', kind: 'email', hint: 'you@company.com' },
]

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
          <span className="text-ink-muted"> bengaluru · hyderabad · chennai</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --open-to</span>
          <span className="text-amber-400"> remote</span>
          <span className="text-ink-dim">|</span>
          <span className="text-amber-400">hybrid</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --domains</span>
          <span className="text-violet/80"> &quot;AI Engineering · Data Engineering · Agentic Systems&quot;</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --stack</span>
          <span className="text-accent"> &quot;Cloud Platforms · Lakehouse · Multi-Agent AI · IaC&quot;</span>
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

function ChannelCard({ channel, index, inView }) {
  const Icon = channel.icon
  return (
    <motion.a
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
      href={channel.href}
      target={channel.href.startsWith('mailto') ? undefined : '_blank'}
      rel={channel.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      onMouseMove={spotlightMove}
      className="glass glass-hover spotlight-card flex items-center gap-4 px-5 py-4 group"
    >
      <div className="w-9 h-9 rounded-lg bg-violet/10 flex items-center justify-center shrink-0 group-hover:bg-violet/20 transition-colors duration-300">
        <Icon size={16} className="text-violet" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[9px] text-ink-dim uppercase tracking-[0.25em] mb-0.5">{channel.label}</p>
        <p className="text-ink-muted text-sm truncate group-hover:text-ink transition-colors duration-300">
          {channel.value}
        </p>
      </div>
      <ArrowUpRight
        size={15}
        className="text-ink-faint group-hover:text-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
      />
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [phase, setPhase] = useState('idle') // idle | busy | done | failed

  async function deliver(e) {
    e.preventDefault()
    if (phase === 'busy') return
    setPhase('busy')

    const payload = new FormData(e.target)
    payload.append('access_key', FORM_KEY)
    payload.append('subject', 'New message from portfolio')

    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: payload })
      const body = await res.json()
      if (body.success) {
        setPhase('done')
        e.target.reset()
      } else {
        setPhase('failed')
      }
    } catch {
      setPhase('failed')
    }
  }

  return (
    <section id="contact" className="section-pad" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="07"
          title="Let's build together."
          italicWord="build"
          subtitle="Have a project, a role, or an idea worth exploring? My inbox is open."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — terminal + direct channels */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <TerminalBlock />
            <div className="grid gap-3">
              {channels.map((channel, i) => (
                <ChannelCard key={channel.label} channel={channel} index={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* Right — message composer */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onMouseMove={spotlightMove}
            className="glass spotlight-card p-7"
          >
            <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.25em] mb-6">
              // drop a message
            </p>

            <form onSubmit={deliver} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {inputRows.map((row) => (
                  <label key={row.key} className="block">
                    <span className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.2em] block mb-2">
                      {row.title}
                    </span>
                    <input
                      type={row.kind}
                      name={row.key}
                      required
                      placeholder={row.hint}
                      autoComplete="off"
                      className="field"
                    />
                  </label>
                ))}
              </div>

              <label className="block">
                <span className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.2em] block mb-2">
                  What's on your mind
                </span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project, role, or idea…"
                  className="field resize-none"
                />
              </label>

              <div className="flex items-center justify-between gap-4 pt-1">
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    disabled={phase === 'busy'}
                    className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-violet to-accent
                      text-ink font-semibold text-sm shine disabled:opacity-60 disabled:cursor-not-allowed
                      hover:shadow-[0_0_35px_rgba(139,92,246,0.35)] transition-all duration-400"
                  >
                    {phase === 'busy' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </Magnetic>

                {phase === 'done' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400"
                  >
                    <Check size={13} />
                    Delivered — I'll reply soon.
                  </motion.p>
                )}
                {phase === 'failed' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400"
                  >
                    <AlertTriangle size={13} />
                    Something broke — email me directly.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
