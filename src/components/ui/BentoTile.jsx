import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SPAN_CLASSES = {
  '1x1': 'md:col-span-1 md:row-span-1',
  '2x1': 'md:col-span-2 md:row-span-1',
  '2x2': 'md:col-span-2 md:row-span-2',
}

const ACCENT_CLASSES = {
  violet: {
    dot: 'bg-violet',
    border: 'hover:border-violet/30',
  },
  cyan: {
    dot: 'bg-accent',
    border: 'hover:border-accent/30',
  },
}

/**
 * Variable-size glass tile for the Skills bento grid.
 *
 * @param {'1x1'|'2x1'|'2x2'} span     Grid span (md+ breakpoints).
 * @param {string}            label    Mono category label.
 * @param {'violet'|'cyan'}   accent   Dot + hover border color.
 * @param {boolean}           [featured]  Adds a subtle orbital echo background.
 * @param {number}            [index]  For stagger animation delay.
 * @param {React.ReactNode}   children Skill chips or arbitrary content.
 */
export default function BentoTile({ span, label, accent, featured, index = 0, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const colors = ACCENT_CLASSES[accent]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-opacity-30 overflow-hidden ${SPAN_CLASSES[span]} ${colors.border}`}
    >
      {featured && (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-violet/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-dashed border-accent/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-violet/20 blur-2xl" />
        </div>
      )}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
          <span className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.25em]">{label}</span>
        </div>
        {children}
      </div>
    </motion.div>
  )
}
