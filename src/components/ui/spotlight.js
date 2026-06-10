/**
 * Shared mousemove handler for `.spotlight-card` elements.
 * Writes the cursor position into CSS vars consumed by the
 * radial-highlight pseudo-element in index.css.
 */
export function spotlightMove(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
}
