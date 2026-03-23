import { useRef, useMemo } from 'react'

export default function Background3D() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      background: 'radial-gradient(circle at center, #121214 0%, #0b0b0c 100%)',
      pointerEvents: 'none'
    }} />
  )
}
