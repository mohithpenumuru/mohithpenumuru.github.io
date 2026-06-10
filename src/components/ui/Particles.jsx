import { useEffect, useRef } from 'react'

/**
 * Lightweight canvas particle field — drifting violet/cyan motes with
 * constellation lines between close neighbors. No WebGL, no deps.
 * Skipped entirely when prefers-reduced-motion is set.
 *
 * @param {number} [density=55]  Particle count.
 */
export default function Particles({ density = 55, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf
    let w = 0
    let h = 0
    let particles = []

    function resize() {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.4,
        cyan: Math.random() > 0.6,
      }))
    }

    function tick() {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.cyan ? 'rgba(34,211,238,0.5)' : 'rgba(139,92,246,0.55)'
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = dx * dx + dy * dy
          if (dist < 9000) {
            const alpha = 0.1 * (1 - dist / 9000)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    // Only animate while the canvas is actually on screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        raf = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(raf)
      }
    })

    resize()
    init()
    observer.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
