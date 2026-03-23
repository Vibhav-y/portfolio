import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const pos      = useRef({ x: 0, y: 0 })
  const smooth   = useRef({ x: 0, y: 0 })
  const rafRef   = useRef(null)

  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const onMove  = (e) => { pos.current = { x: e.clientX, y: e.clientY }; setVisible(true) }
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove',  onMove,  { passive: true })
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    /* Observe hover targets with a MutationObserver so dynamic elements are also covered */
    const applyHover = (el) => {
      el.addEventListener('mouseenter', () => setHovering(true))
      el.addEventListener('mouseleave', () => setHovering(false))
    }
    document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover')
      .forEach(applyHover)

    const mo = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover')
        .forEach(applyHover)
    })
    mo.observe(document.body, { childList: true, subtree: true })

    /* RAF loop — outer ring follows cursor instantly, inner dot lags */
    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.11
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.11

      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${smooth.current.x}px, ${smooth.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafRef.current)
      mo.disconnect()
    }
  }, [])

  const size    = hovering ? 40 : clicking ? 14 : 20
  const opacity = visible ? 1 : 0
  const color   = hovering ? 'var(--accent)' : 'rgba(232,237,242,0.7)'

  return (
    <>
      {/* Outer crosshair ring — instant */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop:  -size / 2,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity,
          transition: 'opacity 0.2s, width 0.15s, height 0.15s, margin 0.15s',
          willChange: 'transform',
        }}
      >
        {/* Crosshair lines */}
        {hovering ? (
          /* Bracket style on hover */
          <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
            style={{ position: 'absolute', inset: 0 }}>
            {/* top-left bracket */}
            <path d="M10 18 L10 10 L18 10" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            {/* top-right bracket */}
            <path d="M22 10 L30 10 L30 18" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            {/* bottom-left bracket */}
            <path d="M10 22 L10 30 L18 30" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            {/* bottom-right bracket */}
            <path d="M22 30 L30 30 L30 22" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          /* Crosshair style at rest */
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
            style={{ position: 'absolute', inset: 0 }}>
            <circle cx="10" cy="10" r="4.5" stroke={color} strokeWidth="1" />
            <line x1="10" y1="0"  x2="10" y2="6"  stroke={color} strokeWidth="0.8" />
            <line x1="10" y1="14" x2="10" y2="20" stroke={color} strokeWidth="0.8" />
            <line x1="0"  y1="10" x2="6"  y2="10" stroke={color} strokeWidth="0.8" />
            <line x1="14" y1="10" x2="20" y2="10" stroke={color} strokeWidth="0.8" />
          </svg>
        )}
      </div>

      {/* Inner smooth-following dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: '50%',
          background: color,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: hovering ? 0 : opacity,
          transition: 'opacity 0.15s, background 0.15s',
          willChange: 'transform',
          boxShadow: '0 0 6px 2px rgba(0,217,163,0.3)',
        }}
      />
    </>
  )
}
