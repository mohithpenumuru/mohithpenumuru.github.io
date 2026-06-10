import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * Number that counts up from 0 when scrolled into view.
 *
 * @param {number} to        Target value.
 * @param {string} [suffix]  Appended after the number, e.g. "+", "%".
 * @param {number} [duration=1.8]
 */
export default function Counter({ to, suffix = '', duration = 1.8, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
