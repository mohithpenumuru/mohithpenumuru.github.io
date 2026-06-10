import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** Floating glass button that appears after scrolling past the hero. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 glass w-11 h-11 !rounded-full flex items-center justify-center
            text-ink-muted hover:text-violet hover:border-violet/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
            transition-all duration-300"
        >
          <ArrowUp size={17} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
