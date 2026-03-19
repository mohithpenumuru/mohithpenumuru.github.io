import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Linkedin, Github, Send, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // EDIT: Connect to your backend, Formspree, or email service
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="section-pad" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Contact
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-12">
            Get in touch<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_340px] gap-12">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="text-sm text-gray-400 mb-1.5 block">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600
                    focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-gray-400 mb-1.5 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600
                    focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-sm text-gray-400 mb-1.5 block">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600
                  focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-colors"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-gray-400 mb-1.5 block">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600
                  focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 border border-accent/30 text-accent font-medium text-sm
                hover:bg-accent/20 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]
                transition-all duration-300"
            >
              {submitted ? 'Sent!' : 'Send Message'}
              <Send size={14} />
            </button>
          </motion.form>

          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass p-6">
              <h3 className="font-heading font-semibold text-white mb-3">
                Let&apos;s connect
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                I&apos;m always open to discussing new projects, AI/data
                engineering opportunities, or collaborations.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:mohithpenumuru1@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-accent transition-colors"
                >
                  <Mail size={15} className="text-accent" />
                  mohithpenumuru1@gmail.com
                </a>
                <a
                  href="tel:+919052472001"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-accent transition-colors"
                >
                  <Phone size={15} className="text-accent" />
                  +91 9052472001
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin size={15} className="text-accent" />
                  Bengaluru, India
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="font-heading font-semibold text-white mb-4">
                Socials
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohith-penumuru-3b9793205/', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/mohithpenumuru', label: 'GitHub' },
                  { icon: Mail, href: 'mailto:mohithpenumuru1@gmail.com', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center
                      text-gray-500 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon size={16} />
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
