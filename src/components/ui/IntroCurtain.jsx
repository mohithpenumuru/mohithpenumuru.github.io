import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Brief page-load curtain: monogram + growing hairline, then the whole
 * panel slides up to reveal the hero. Total ~1.4s, skipped for
 * reduced-motion users.
 */
export default function IntroCurtain() {
  const [show, setShow] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
    }, 1000)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center gap-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-7xl text-ink tracking-tight"
          >
            MP<em className="not-italic text-violet">.</em>
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="h-px w-40 origin-left bg-gradient-to-r from-violet to-accent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
