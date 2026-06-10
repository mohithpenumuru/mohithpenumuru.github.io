/**
 * Infinite horizontal marquee with faded edges. Children are rendered
 * twice; the CSS track animation translates -50% for a seamless loop.
 *
 * @param {boolean} [reverse]  Scroll right-to-left instead.
 * @param {number}  [speed=28] Seconds per loop.
 */
export default function Marquee({ children, reverse = false, speed = 28, className = '' }) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max items-center gap-3"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex items-center gap-3">{children}</div>
        <div className="flex items-center gap-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
