'use client'

// Renders a small "+" crosshair straddling each of the 4 corners of its
// positioned parent. Parent must be position: relative (the .grid-box class is).
export default function CornerPlus({ color = 'rgba(255,255,255,0.4)', size = 12 }) {
  const half = size / 2
  const mark = (pos) => (
    <span
      aria-hidden="true"
      style={{ position: 'absolute', width: size, height: size, color, pointerEvents: 'none', zIndex: 2, ...pos }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M6 0V12M0 6H12" />
      </svg>
    </span>
  )
  return (
    <>
      {mark({ top: -half, left: -half })}
      {mark({ top: -half, right: -half })}
      {mark({ bottom: -half, left: -half })}
      {mark({ bottom: -half, right: -half })}
    </>
  )
}
