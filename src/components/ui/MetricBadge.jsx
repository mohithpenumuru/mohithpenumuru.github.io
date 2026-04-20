/**
 * Large mono headline metric used at the top-left of project cards.
 *
 * @param {string} value  Big mono value, e.g. "60% ↓", "3 domains", "100%", "4+ agents".
 * @param {string} label  Small caption under the value, e.g. "runtime reduction".
 */
export default function MetricBadge({ value, label }) {
  return (
    <div>
      <div className="font-mono text-3xl md:text-4xl text-violet font-medium leading-none tracking-tight">
        {value}
      </div>
      <div className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.2em] mt-2">
        {label}
      </div>
    </div>
  )
}
