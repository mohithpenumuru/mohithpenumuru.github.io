import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Ambient flashlight glow that trails the cursor — adds depth to the
 * dark surface without replacing the native cursor. Fine pointers only.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const x = useSpring(mx, { stiffness: 120, damping: 25, mass: 0.4 })
  const y = useSpring(my, { stiffness: 120, damping: 25, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return
    setEnabled(true)
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ left: x, top: y }}
      className="fixed z-[1] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full"
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(34,211,238,0.03) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
