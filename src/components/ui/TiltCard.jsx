import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { spotlightMove } from './spotlight'

/**
 * 3D mouse-tracking tilt wrapper with the shared spotlight highlight.
 * Pairs with the `.spotlight-card` CSS class (set automatically).
 *
 * @param {number} [maxTilt=6]  Max rotation in degrees on each axis.
 */
export default function TiltCard({ children, className = '', maxTilt = 6 }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 160, damping: 20 })
  const sy = useSpring(py, { stiffness: 160, damping: 20 })
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
    spotlightMove(e)
  }

  function onMouseLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`spotlight-card ${className}`}
    >
      {children}
    </motion.div>
  )
}
