import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Numbered editorial section header.
 *
 * @param {string} number  Two-digit section index, e.g. "01"
 * @param {string} title   Heading text. The first occurrence of `italicWord` is wrapped in <em>.
 * @param {string} [italicWord]  Word inside `title` to render in italic display serif.
 * @param {string} [subtitle]    Optional one-line subhead in ink.muted.
 */
export default function SectionHeader({ number, title, italicWord, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  let titleNode = title
  if (italicWord && title.includes(italicWord)) {
    const [before, after] = title.split(italicWord)
    titleNode = (
      <>
        {before}
        <em className="font-display italic text-violet">{italicWord}</em>
        {after}
      </>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-14"
    >
      <p className="font-mono text-xs text-violet tracking-[0.35em] mb-4">
        — {number} —
      </p>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight">
        {titleNode}
      </h2>
      {subtitle && (
        <p className="text-ink-muted text-base mt-4 max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}
