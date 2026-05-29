'use client'

import { useEffect, useRef } from 'react'
import CornerPlus from './ui/corner-plus'

const WORD = 'VIBHAV'

// Tuning knobs for the particle field.
const PARTICLE_R = 1.4       // visual radius (CSS px)
const PARTICLE_STEP = 5      // sample grid in CSS px (smaller = denser)
const REPEL_RADIUS = 90      // cursor influence radius
const REPEL_STRENGTH = 55    // max displacement
const LERP = 0.18            // how fast dots return to home

export default function Footer() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1e4, y: -1e4 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let dots = []
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1

    const sampleDots = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Offscreen canvas to render text + sample alpha.
      const off = document.createElement('canvas')
      off.width = Math.round(width * dpr)
      off.height = Math.round(height * dpr)
      const offCtx = off.getContext('2d')
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      offCtx.fillStyle = '#fff'
      // Big bold display text.
      const fontSize = Math.round(height * 0.92)
      offCtx.font = `700 ${fontSize}px "Space Grotesk", Inter, "Arial Black", sans-serif`
      offCtx.textAlign = 'center'
      offCtx.textBaseline = 'middle'
      offCtx.fillText(WORD, width / 2, height / 2)

      const img = offCtx.getImageData(0, 0, off.width, off.height).data
      const step = Math.max(2, Math.round(PARTICLE_STEP * dpr))
      const next = []
      for (let py = 0; py < off.height; py += step) {
        for (let px = 0; px < off.width; px += step) {
          const i = (py * off.width + px) * 4
          if (img[i + 3] > 140) {
            const hx = px / dpr
            const hy = py / dpr
            next.push({ hx, hy, x: hx, y: hy })
          }
        }
      }
      dots = next
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouseRef.current.x = -1e4
      mouseRef.current.y = -1e4
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#fff'
      const { x: mx, y: my } = mouseRef.current
      const r2 = REPEL_RADIUS * REPEL_RADIUS
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        let tx = d.hx
        let ty = d.hy
        const dx = d.hx - mx
        const dy = d.hy - my
        const dist2 = dx * dx + dy * dy
        if (dist2 < r2) {
          const dist = Math.sqrt(dist2) || 1
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          tx = d.hx + (dx / dist) * force
          ty = d.hy + (dy / dist) * force
        }
        d.x += (tx - d.x) * LERP
        d.y += (ty - d.y) * LERP

        ctx.beginPath()
        ctx.arc(d.x, d.y, PARTICLE_R, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    sampleDots()
    draw()

    let resizeT
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(() => {
        cancelAnimationFrame(raf)
        sampleDots()
        draw()
      }, 120)
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeT)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <footer
      id="footer"
      className="section container grid-box"
      style={{
        position: 'relative',
        textAlign: 'center',
        paddingBottom: 'clamp(20px, 2vw, 32px)',
      }}
    >
      <CornerPlus />

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={WORD}
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: 'clamp(140px, 18vw, 240px)',
          display: 'block',
          margin: '0 auto',
          cursor: 'crosshair',
        }}
      />

      <p
        style={{
          marginTop: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        © {new Date().getFullYear()} · Vibhav Yadav · Built with Next.js
      </p>
    </footer>
  )
}
