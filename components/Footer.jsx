'use client'

import { useEffect, useRef } from 'react'
import CornerPlus from './ui/corner-plus'

const WORD = 'VIBHAV'

// Konami easter egg morphs the name through these phrases, then back home.
const EGG_PHRASES = ['LET’S', 'MAKE SOMETHING', 'TOGETHER', 'LET’S CONNECT', 'THANKS :)', 'नमस्ते']

// Tuning knobs for the particle field.
const PARTICLE_R = 1.4       // visual radius (CSS px)
const PARTICLE_STEP = 5      // sample grid in CSS px (smaller = denser)
const REPEL_RADIUS = 90      // cursor influence radius
const REPEL_STRENGTH = 55    // max displacement
const LERP = 0.18            // how fast dots return to home
const MORPH_LERP = 0.12      // how fast dots flow to a morph target
const SCENE_HOLD = 1500      // ms each egg phrase is held
const ACCENT = '#ff7a18'

export default function Footer() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1e4, y: -1e4 })

  // Easter egg #1 — an interactive console for anyone who opens DevTools.
  useEffect(() => {
    if (typeof window === 'undefined' || window.__vyHello) return
    window.__vyHello = true

    const EMAIL = 'vibhavydm@gmail.com'
    const GITHUB = 'https://github.com/Vibhav-y'
    const RESUME = '/resume/general%20cv.pdf'

    // shared styles
    const banner = 'background:#ff7a18;color:#0a0a0a;font:800 22px/1.6 "Space Grotesk",sans-serif;padding:8px 16px;border-radius:2px'
    const sub = 'color:#888;font:500 13px/1.8 monospace'
    const cmd = 'color:#ff7a18;font:700 13px/1.8 monospace'
    const arrow = 'color:#666;font:13px/1.8 monospace'
    const ok = 'color:#10b981;font:600 13px monospace'

    console.log('%c  नमस्ते — VIBHAV YADAV  ', banner)
    console.log(
      '%cFull-stack developer · building real systems, not just features.\n' +
      '%cThis console is live. Type a command:\n',
      sub, sub
    )
    const row = (c, d) => console.log(`%c${c}%c  ${d}`, cmd, arrow)
    row('vibhav.hire()    ', '→ start a conversation')
    row('vibhav.resume()  ', '→ open my CV')
    row('vibhav.projects()', '→ what I’ve shipped')
    row('vibhav.source()  ', '→ this portfolio on GitHub')
    row('vibhav.help()    ', '→ show this menu again')
    console.log(
      '\n%cp.s. there’s a Konami code hidden on the page → ↑ ↑ ↓ ↓ ← → ← → B A',
      'color:#555;font:12px monospace'
    )

    const help = () => {
      console.log('%c  VIBHAV — console commands  ', banner)
      row('vibhav.hire()    ', '→ start a conversation')
      row('vibhav.resume()  ', '→ open my CV')
      row('vibhav.projects()', '→ what I’ve shipped')
      row('vibhav.source()  ', '→ this portfolio on GitHub')
      return '↑ pick one'
    }

    window.vibhav = {
      help,
      hire() {
        console.log('%c✉  Opening your mail client… talk soon!', ok)
        window.open(`mailto:${EMAIL}?subject=${encodeURIComponent('Let’s build something')}`, '_blank')
        return `Or just email ${EMAIL}`
      },
      resume() {
        console.log('%c📄  Opening CV…', ok)
        window.open(RESUME, '_blank')
        return 'Opened in a new tab.'
      },
      source() {
        console.log('%c⌥  Opening GitHub…', ok)
        window.open(GITHUB, '_blank')
        return GITHUB
      },
      projects() {
        console.table([
          { project: 'Jottr Workspace', stack: 'Next.js · Yjs · Supabase', link: 'jottr.dev' },
          { project: 'LibraFlow', stack: 'React · Node · MongoDB', link: 'libraflow.cc' },
          { project: 'Streamix', stack: 'HLS · React · Redis', link: 'streamix…vercel.app' },
          { project: 'GitTool', stack: 'Electron · TypeScript', link: 'gittool.dev' },
        ])
        return 'Click any project on the page for the full story.'
      },
      toString() { return 'Type vibhav.help() for commands' },
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let dots = []
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1

    // ── Egg / morph state ──
    let egg = false          // is the morph sequence running
    let scenes = []          // array of point-arrays to morph through
    let sceneIdx = 0
    let nextSceneAt = 0
    let targets = null       // current target point-array, or null = home
    let colorMix = 0         // 0 = white, 1 = accent (eased for a smooth tint)

    // Sample any string into an array of {x,y} points, auto-fit to the canvas.
    const sampleText = (text) => {
      const off = document.createElement('canvas')
      off.width = Math.round(width * dpr)
      off.height = Math.round(height * dpr)
      const c = off.getContext('2d')
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.fillStyle = '#fff'
      c.textAlign = 'center'
      c.textBaseline = 'alphabetic'
      const fontAt = (s) => `700 ${s}px "Space Grotesk", Inter, "Arial Black", sans-serif`
      const maxW = width * 0.88
      const maxH = height * 0.66

      let fs = Math.round(height * 0.78)
      c.font = fontAt(fs)
      // Fit to width.
      const w0 = c.measureText(text).width
      if (w0 > maxW) {
        fs = Math.max(18, Math.floor((fs * maxW) / w0))
        c.font = fontAt(fs)
      }
      // Fit to the *actual* glyph height (caps + descenders), then centre on it.
      let m = c.measureText(text)
      let gh = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
      if (gh > maxH) {
        fs = Math.max(18, Math.floor((fs * maxH) / gh))
        c.font = fontAt(fs)
        m = c.measureText(text)
      }
      const asc = m.actualBoundingBoxAscent
      const desc = m.actualBoundingBoxDescent
      // Baseline placed so the visible ink is vertically centred in the canvas.
      const y = height / 2 + (asc - desc) / 2
      c.fillText(text, width / 2, y)
      const img = c.getImageData(0, 0, off.width, off.height).data
      const step = Math.max(2, Math.round(PARTICLE_STEP * dpr))
      const pts = []
      for (let py = 0; py < off.height; py += step) {
        for (let px = 0; px < off.width; px += step) {
          if (img[(py * off.width + px) * 4 + 3] > 140) {
            pts.push({ x: px / dpr, y: py / dpr })
          }
        }
      }
      return pts
    }

    const sampleDots = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const home = sampleText(WORD)
      dots = home.map((p) => ({ hx: p.x, hy: p.y, x: p.x, y: p.y }))
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
      const now = performance.now()

      // Advance the egg scene timeline.
      if (egg && now >= nextSceneAt) {
        sceneIdx++
        if (sceneIdx < scenes.length) {
          targets = scenes[sceneIdx]
          nextSceneAt = now + SCENE_HOLD
        } else {
          // sequence done — flow home, drop the tint
          egg = false
          targets = null
        }
      }

      // Ease the global colour tint toward its goal.
      colorMix += ((egg ? 1 : 0) - colorMix) * 0.08
      const r = Math.round(255 + (255 - 255) * colorMix)
      const g = Math.round(255 + (122 - 255) * colorMix)
      const b = Math.round(255 + (24 - 255) * colorMix)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      const radius = PARTICLE_R * (1 + 0.5 * colorMix)

      const { x: mx, y: my } = mouseRef.current
      const r2 = REPEL_RADIUS * REPEL_RADIUS
      const tgt = targets

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        let gx, gy, lerp
        if (tgt) {
          // Morphing — flow toward the target glyph (wrap if fewer points).
          const t = tgt[i % tgt.length]
          gx = t.x
          gy = t.y
          lerp = MORPH_LERP
        } else {
          // Home — with cursor repel.
          gx = d.hx
          gy = d.hy
          lerp = LERP
          const dx = d.hx - mx
          const dy = d.hy - my
          const dist2 = dx * dx + dy * dy
          if (dist2 < r2) {
            const dist = Math.sqrt(dist2) || 1
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
            gx = d.hx + (dx / dist) * force
            gy = d.hy + (dy / dist) * force
          }
        }
        d.x += (gx - d.x) * lerp
        d.y += (gy - d.y) * lerp

        ctx.beginPath()
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    // Konami: morph the name through the egg phrases, then reassemble.
    const triggerEgg = () => {
      if (egg) return
      scenes = EGG_PHRASES.map(sampleText)
      // Grow the particle pool so even the longest phrase is fully formed
      // (otherwise the modulo mapping leaves the tail of wide words empty).
      const need = scenes.reduce((m, s) => Math.max(m, s.length), dots.length)
      const homeCount = dots.length
      while (dots.length < need) {
        const src = dots[(Math.random() * homeCount) | 0]
        // Extra dots melt back into a real VIBHAV point when the egg ends.
        dots.push({ hx: src.hx, hy: src.hy, x: src.x, y: src.y })
      }
      sceneIdx = 0
      targets = scenes[0]
      egg = true
      nextSceneAt = performance.now() + SCENE_HOLD
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

    // Easter egg #2 — Konami code anywhere on the page triggers the blast.
    const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']
    let konamiPos = 0
    const onKey = (e) => {
      const k = e.key.toLowerCase()
      if (k === KONAMI[konamiPos]) {
        konamiPos++
        if (konamiPos === KONAMI.length) {
          konamiPos = 0
          // bring the footer into view so the effect is actually seen
          canvas.scrollIntoView({ behavior: 'smooth', block: 'center' })
          triggerEgg()
        }
      } else {
        konamiPos = k === KONAMI[0] ? 1 : 0
      }
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeT)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
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
