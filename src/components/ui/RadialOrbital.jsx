import { motion } from 'framer-motion'
import { useState } from 'react'

const RING_CONFIG = [
  { radius: 140, dashed: false, opacity: 0.25, duration: 60, direction: 1 },
  { radius: 90,  dashed: true,  opacity: 0.3,  duration: 40, direction: -1 },
  { radius: 45,  dashed: false, opacity: 0.4,  duration: 25, direction: 1 },
]

/**
 * The signature radial orbital "AI brain" — concentric rings with a glowing core
 * and orbiting labeled nodes. Pure CSS/SVG + framer-motion. No WebGL.
 *
 * @param {number}                size      Outer diameter in px (default 320).
 * @param {Array<{label: string, ringIndex: 0|1|2, angle: number}>} nodes
 *                                          Labeled orbiting nodes. `angle` in degrees (0 = right, 90 = bottom).
 * @param {string}                [caption] Optional mono caption shown beneath the orbital.
 * @param {'full'|'subtle'}       intensity Visual weight. 'subtle' lowers opacity for echo use.
 */
export default function RadialOrbital({ size = 320, nodes = [], caption, intensity = 'full' }) {
  const [hoveredNode, setHoveredNode] = useState(null)
  const opacityMultiplier = intensity === 'subtle' ? 0.35 : 1
  const scale = size / 320

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Soft radial glow backdrop */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(139,92,246,0.18) 0%, rgba(34,211,238,0.08) 35%, transparent 70%)',
          opacity: opacityMultiplier,
        }}
      />

      {/* Concentric rings */}
      {RING_CONFIG.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.radius * 2 * scale,
            height: ring.radius * 2 * scale,
            border: ring.dashed
              ? `1px dashed rgba(34,211,238,${ring.opacity * opacityMultiplier})`
              : `1px solid rgba(139,92,246,${ring.opacity * opacityMultiplier})`,
            boxShadow:
              i === 2
                ? `0 0 30px rgba(139,92,246,${0.3 * opacityMultiplier}), inset 0 0 20px rgba(139,92,246,${0.15 * opacityMultiplier})`
                : 'none',
          }}
          animate={{ rotate: ring.direction * 360 }}
          transition={{ duration: ring.duration, ease: 'linear', repeat: Infinity }}
        />
      ))}

      {/* Core orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: 36 * scale,
          height: 36 * scale,
          background: 'radial-gradient(circle, #fff 0%, #a78bfa 40%, #8b5cf6 100%)',
          boxShadow: `0 0 30px rgba(139,92,246,${0.8 * opacityMultiplier}), 0 0 60px rgba(34,211,238,${0.4 * opacityMultiplier})`,
        }}
      />

      {/* Orbiting labeled nodes (positioned on their assigned ring) */}
      {nodes.map((node, i) => {
        const ring = RING_CONFIG[node.ringIndex] ?? RING_CONFIG[0]
        const r = ring.radius * scale
        const rad = (node.angle * Math.PI) / 180
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        const isHovered = hoveredNode === i
        return (
          <div
            key={node.label}
            className="absolute"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <button
              type="button"
              onMouseEnter={() => setHoveredNode(i)}
              onMouseLeave={() => setHoveredNode(null)}
              className="relative -translate-x-1/2 -translate-y-1/2 group"
              aria-label={node.label}
            >
              <span
                className="block w-2.5 h-2.5 rounded-full bg-accent"
                style={{
                  boxShadow: `0 0 12px rgba(34,211,238,${0.8 * opacityMultiplier})`,
                  opacity: opacityMultiplier,
                }}
              />
              {intensity === 'full' && (
                <span
                  className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-wider uppercase text-accent transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {node.label}
                </span>
              )}
            </button>
          </div>
        )
      })}

      {/* Optional caption beneath the orbital */}
      {caption && intensity === 'full' && (
        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] text-violet/70 tracking-[0.25em] uppercase whitespace-nowrap"
          style={{ top: `calc(100% + 1.5rem)` }}
        >
          {caption}
        </div>
      )}
    </div>
  )
}
