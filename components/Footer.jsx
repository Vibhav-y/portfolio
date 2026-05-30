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
  const overlayRef = useRef(null)
  const mouseRef = useRef({ x: -1e4, y: -1e4 })

  // Easter egg #1 — an interactive console for anyone who opens DevTools.
  useEffect(() => {
    if (typeof window === 'undefined' || window.__vyHello) return
    window.__vyHello = true

    const EMAIL = 'vibhavydm@gmail.com'
    const GITHUB = 'https://github.com/Vibhav-y'
    const LINKEDIN = 'https://www.linkedin.com/in/vibhav-yadav/'
    const LEETCODE = 'https://leetcode.com/u/vibhav-y/'
    const RESUME = '/resume/general%20cv.pdf'

    // shared styles
    const banner = 'background:#ff7a18;color:#0a0a0a;font:800 22px/1.6 "Space Grotesk",sans-serif;padding:8px 16px;border-radius:2px'
    const sub = 'color:#888;font:500 13px/1.8 monospace'
    const cmd = 'color:#ff7a18;font:700 13px/1.8 monospace'
    const arrow = 'color:#666;font:13px/1.8 monospace'
    const ok = 'color:#10b981;font:600 13px monospace'
    const dim = 'color:#555;font:12px monospace'

    const COMMANDS = [
      ['vibhav.help()       ', 'show this menu'],
      ['vibhav.about()      ', 'who I am, in 3 lines'],
      ['vibhav.projects()   ', 'what I’ve shipped'],
      ['vibhav.skills()     ', 'my stack, by layer'],
      ['vibhav.now()        ', 'what I’m working on'],
      ['vibhav.contact()    ', 'every way to reach me'],
      ['vibhav.hire()       ', 'start a conversation'],
      ['vibhav.resume()     ', 'open my CV'],
      ['vibhav.source()     ', 'this portfolio on GitHub'],
      ['vibhav.say("hi")    ', 'make the footer spell anything'],
      ['vibhav.party()      ', 'launch the particle show'],
    ]
    const row = (c, d) => console.log(`%c${c}%c  → ${d}`, cmd, arrow)

    console.log('%c  नमस्ते — VIBHAV YADAV  ', banner)
    console.log(
      '%cFull-stack developer · building real systems, not just features.\n' +
      '%cThis console is live — try a command:\n',
      sub, sub
    )
    COMMANDS.forEach(([c, d]) => row(c, d))
    console.log('\n%cp.s. there’s a Konami code on the page → ↑ ↑ ↓ ↓ ← → ← → B A', dim)

    const morphAvailable = () => typeof window.__vyMorph === 'function'

    const api = {
      help() {
        console.log('%c  VIBHAV — console commands  ', banner)
        COMMANDS.forEach(([c, d]) => row(c, d))
        return '↑ pick one'
      },
      about() {
        console.log(
          '%cVibhav Yadav%c — CSE @ Lovely Professional University.\n' +
          '%cI build full-stack products end-to-end: CRDT-based realtime sync,\n' +
          'scalable APIs, and interfaces that feel fast. Currently shipping GitTool.',
          'color:#fff;font:700 14px monospace', sub, sub
        )
        return 'vibhav.projects() to see the work →'
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
      skills() {
        console.table({
          Frontend: 'React · Next.js · Tailwind · Framer Motion',
          Backend: 'Node · Express · Python · Java · Socket.io',
          Data: 'PostgreSQL · MongoDB · Redis · Yjs / CRDT',
          'Tools & DevOps': 'Git · Docker · Vercel · Supabase',
        })
        return 'vibhav.now() for what I’m exploring →'
      },
      now() {
        console.log(
          '%c◉ NOW%c\n' +
          '%c· Building   %cGitTool — AI-assisted Git workflows\n' +
          '%c· Exploring  %cElixir / LiveView, LLM tooling, AWS\n' +
          '%c· Focused on %cclean architecture & algorithmic efficiency',
          'color:#10b981;font:700 13px monospace', '',
          arrow, 'color:#fff;font:13px monospace',
          arrow, 'color:#fff;font:13px monospace',
          arrow, 'color:#fff;font:13px monospace'
        )
        return 'Inspired by Derek Sivers’ /now page.'
      },
      contact() {
        console.table({
          Email: EMAIL,
          GitHub: GITHUB,
          LinkedIn: LINKEDIN,
          LeetCode: LEETCODE,
        })
        return 'vibhav.hire() opens a pre-filled email →'
      },
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
      say(text) {
        const t = String(text == null ? '' : text).slice(0, 20).toUpperCase()
        if (!t.trim()) return 'Usage: vibhav.say("your text")'
        if (!morphAvailable()) return 'Scroll to the footer first, then try again.'
        window.__vyMorph([t], 2200)
        console.log(`%c✦  Spelling “${t}” in the footer…`, ok)
        return 'Look down ↓'
      },
      party(seconds) {
        if (typeof window.__vyParty !== 'function') return 'Scroll to the footer first, then try again.'
        window.__vyParty(seconds)
        console.log('%c🎉  PARTY MODE — particles incoming!', 'color:#ff7a18;font:700 14px monospace')
        return 'Look down ↓ (try vibhav.party(10) for a longer one)'
      },
      sudo(...args) {
        console.log('%cNice try. %cPermission denied (you’re not root here 😉).', 'color:#ff5f57;font:700 13px monospace', sub)
        return 'But vibhav.hire() always works.'
      },
      coffee() {
        console.log('%c☕  Brewing… 418 I’m a teapot.', 'color:#E5C07B;font:700 13px monospace')
        return 'Fueled by caffeine & curiosity.'
      },
      toString() { return 'Type vibhav.help() for commands' },
    }

    window.vibhav = api
    window.vy = api // short alias
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return

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
    let sceneHold = SCENE_HOLD
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
          nextSceneAt = now + sceneHold
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

    // Morph the particle field through a list of phrases, then reassemble.
    const morph = (phrases, hold = SCENE_HOLD) => {
      const list = (Array.isArray(phrases) ? phrases : [phrases]).filter(Boolean).map(String)
      if (!list.length) return
      scenes = list.map(sampleText)
      // Grow the particle pool so even the longest phrase is fully formed
      // (otherwise the modulo mapping leaves the tail of wide words empty).
      const need = scenes.reduce((m, s) => Math.max(m, s.length), dots.length)
      const homeCount = dots.length
      while (dots.length < need) {
        const src = dots[(Math.random() * homeCount) | 0]
        // Extra dots melt back into a real VIBHAV point when the morph ends.
        dots.push({ hx: src.hx, hy: src.hy, x: src.x, y: src.y })
      }
      sceneIdx = 0
      targets = scenes[0]
      egg = true
      sceneHold = hold
      nextSceneAt = performance.now() + hold
    }
    const triggerEgg = () => { if (!egg) morph(EGG_PHRASES) }

    // ── PARTY: a full-screen choreographed particle dance ──
    // A drifting particle field across the whole screen + a rotating 3D
    // particle sphere in the centre.
    const octx = overlay.getContext('2d', { alpha: true })
    let partyRaf = 0
    let partyStart = 0
    let partyDur = 0
    let ocw = 0, och = 0, odpr = 1
    let field = []           // background drifters: { x, y, vx, vy }
    let sphere = []          // unit-sphere points: { x, y, z, hue }
    let sphereR = 0
    let lasers = []          // { ang, t0, hue }
    let lastLaserAt = 0

    const FIELD_COUNT = 2800
    const SPHERE_COUNT = 1400
    const LASER_SPEED = 2600 // px/s
    const LASER_TRAIL = 240
    const LASER_EVERY = 260  // ms between shots

    // ── Web Audio synthesized SFX (no files; works offline) ──
    let audioCtx = null
    const ensureAudio = () => {
      try {
        if (!audioCtx) {
          const AC = window.AudioContext || window.webkitAudioContext
          if (!AC) return null
          audioCtx = new AC()
        }
        if (audioCtx.state === 'suspended') audioCtx.resume()
        return audioCtx
      } catch { return null }
    }
    const blip = (type, f0, f1, dur, peak) => {
      const ac = ensureAudio()
      if (!ac) return
      const o = ac.createOscillator()
      const g = ac.createGain()
      const t = ac.currentTime
      o.type = type
      o.frequency.setValueAtTime(f0, t)
      o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(peak, t + 0.012)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g); g.connect(ac.destination)
      o.start(t); o.stop(t + dur + 0.02)
    }
    const playLaser = () => blip('square', 1300, 170, 0.18, 0.10)
    const playWhoosh = () => blip('sawtooth', 110, 880, 0.55, 0.07)

    const buildParty = () => {
      ocw = window.innerWidth
      och = window.innerHeight
      odpr = Math.min(window.devicePixelRatio || 1, 2)
      overlay.width = Math.round(ocw * odpr)
      overlay.height = Math.round(och * odpr)
      octx.setTransform(odpr, 0, 0, odpr, 0, 0)

      lasers = []
      lastLaserAt = 0

      // Background field — particles everywhere, slow random drift.
      field = []
      for (let i = 0; i < FIELD_COUNT; i++) {
        field.push({
          x: Math.random() * ocw,
          y: Math.random() * och,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        })
      }

      // Sphere — evenly spread points via the Fibonacci sphere.
      sphereR = Math.min(ocw, och) * 0.22
      sphere = []
      const golden = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < SPHERE_COUNT; i++) {
        const y = 1 - (i / (SPHERE_COUNT - 1)) * 2
        const rr = Math.sqrt(Math.max(0, 1 - y * y))
        const theta = golden * i
        sphere.push({
          x: Math.cos(theta) * rr,
          y,
          z: Math.sin(theta) * rr,
          hue: ((Math.atan2(Math.sin(theta) * rr, Math.cos(theta) * rr) / Math.PI) * 180 + 180),
        })
      }
    }

    const partyLoop = () => {
      const now = performance.now()
      const elapsed = now - partyStart
      const remain = partyDur - elapsed
      const t = elapsed / 1000
      octx.clearRect(0, 0, ocw, och)

      const cx = ocw / 2
      const cy = och / 2
      octx.globalAlpha = Math.max(0, Math.min(1, Math.min(elapsed / 400, remain / 700)))

      // ── Background field — drift + wrap, gentle hue-cycling, one fill ──
      // A clear circular void around the centre keeps the sphere clean (no
      // particles behind / around it).
      const baseAlpha = Math.max(0, Math.min(1, Math.min(elapsed / 400, remain / 700)))
      const fdot = Math.max(1.4, Math.min(ocw, och) * 0.0026)
      const clearR = sphereR * 1.45
      const clearR2 = clearR * clearR
      octx.fillStyle = `hsl(${(t * 30) % 360}, 80%, 65%)`
      octx.globalAlpha = baseAlpha * 0.8
      octx.beginPath()
      for (let i = 0; i < field.length; i++) {
        const p = field[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x += ocw; else if (p.x > ocw) p.x -= ocw
        if (p.y < 0) p.y += och; else if (p.y > och) p.y -= och
        const dx = p.x - cx, dy = p.y - cy
        if (dx * dx + dy * dy < clearR2) continue // skip the sphere's zone
        octx.moveTo(p.x + fdot, p.y)
        octx.arc(p.x, p.y, fdot, 0, Math.PI * 2)
      }
      octx.fill()
      octx.globalAlpha = baseAlpha

      // ── Centre sphere — rotate Y + fixed tilt, perspective projection ──
      const ay = t * 0.6              // spin around Y
      const cosY = Math.cos(ay), sinY = Math.sin(ay)
      const tilt = 0.5
      const cosT = Math.cos(tilt), sinT = Math.sin(tilt)
      const focal = 2.2               // perspective strength
      for (let i = 0; i < sphere.length; i++) {
        const s = sphere[i]
        // rotate around Y
        let x = s.x * cosY - s.z * sinY
        let z = s.x * sinY + s.z * cosY
        const y0 = s.y
        // tilt around X
        const y = y0 * cosT - z * sinT
        z = y0 * sinT + z * cosT
        // perspective: depth in [-1,1] → scale
        const persp = focal / (focal + z)
        const sx = cx + x * sphereR * persp
        const sy = cy + y * sphereR * persp
        const depth = (z + 1) / 2     // 0 = back, 1 = front
        const r = Math.max(0.6, (0.9 + 2.2 * persp) * (0.5 + depth))
        octx.fillStyle = `hsl(${(s.hue + t * 50) % 360}, 95%, ${Math.round(35 + depth * 35)}%)`
        octx.globalAlpha = (remain / 700 < 1 ? Math.max(0, remain / 700) : 1) * (0.35 + depth * 0.65)
        octx.beginPath()
        octx.arc(sx, sy, r, 0, Math.PI * 2)
        octx.fill()
      }
      octx.globalAlpha = 1

      // ── Lasers — beams fire from the sphere outward, with a "pew" ──
      // Stop firing during the fade-out so it ends cleanly.
      if (remain > 800 && now - lastLaserAt > LASER_EVERY) {
        lastLaserAt = now
        const shots = 1 + (Math.random() < 0.4 ? 1 : 0)
        for (let k = 0; k < shots; k++) {
          lasers.push({ ang: Math.random() * Math.PI * 2, t0: now, hue: (t * 80 + Math.random() * 60) % 360 })
        }
        playLaser()
      }
      const diag = Math.hypot(ocw, och)
      octx.save()
      octx.globalCompositeOperation = 'lighter'
      octx.globalAlpha = baseAlpha
      octx.lineCap = 'round'
      for (let li = lasers.length - 1; li >= 0; li--) {
        const L = lasers[li]
        const dist = sphereR + ((now - L.t0) / 1000) * LASER_SPEED
        if (dist - LASER_TRAIL > diag) { lasers.splice(li, 1); continue }
        const tail = Math.max(sphereR * 0.9, dist - LASER_TRAIL)
        const c = Math.cos(L.ang), s = Math.sin(L.ang)
        const x1 = cx + c * tail, y1 = cy + s * tail
        const x2 = cx + c * dist, y2 = cy + s * dist
        const grad = octx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, `hsla(${L.hue}, 100%, 65%, 0)`)
        grad.addColorStop(1, `hsla(${L.hue}, 100%, 72%, 0.95)`)
        octx.strokeStyle = grad
        octx.lineWidth = 3
        octx.beginPath(); octx.moveTo(x1, y1); octx.lineTo(x2, y2); octx.stroke()
        octx.fillStyle = `hsla(${L.hue}, 100%, 88%, 0.95)`
        octx.beginPath(); octx.arc(x2, y2, 4.5, 0, Math.PI * 2); octx.fill()
      }
      octx.restore()
      octx.globalAlpha = 1

      if (remain <= 0) {
        overlay.style.display = 'none'
        octx.clearRect(0, 0, ocw, och)
        return
      }
      partyRaf = requestAnimationFrame(partyLoop)
    }

    const startParty = (seconds) => {
      partyDur = Math.min(10000, Math.max(5000, (Number(seconds) || 7) * 1000))
      buildParty()
      overlay.style.display = 'block'
      partyStart = performance.now()
      playWhoosh()
      cancelAnimationFrame(partyRaf)
      partyLoop()
    }

    // Expose hooks so the DevTools console egg can drive the particles.
    window.__vyMorph = (phrases, hold) => {
      canvas.scrollIntoView({ behavior: 'smooth', block: 'center' })
      morph(phrases, hold)
    }
    window.__vyParty = (seconds) => { startParty(seconds) }

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
      cancelAnimationFrame(partyRaf)
      clearTimeout(resizeT)
      overlay.style.display = 'none'
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      if (window.__vyMorph) window.__vyMorph = null
      if (window.__vyParty) window.__vyParty = null
      if (audioCtx) { try { audioCtx.close() } catch {} audioCtx = null }
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

      {/* Full-screen overlay for the party dance (hidden until launched). */}
      <canvas
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'none',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      />
    </footer>
  )
}
