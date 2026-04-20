/**
 * Glass pill with pulsing green dot — used for "Available for…" status.
 *
 * @param {string} label  Text after the dot.
 */
export default function StatusPill({ label }) {
  return (
    <div className="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[11px] text-ink-muted tracking-wider">{label}</span>
    </div>
  )
}
