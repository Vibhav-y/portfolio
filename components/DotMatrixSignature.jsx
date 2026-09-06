'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import styles from './Playground.module.css'

export default function DotMatrixSignature() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const pointer = { x: -10000, y: -10000 }
    let points = []
    let frame = 0
    let visible = true
    let disposed = false
    let ink = getComputedStyle(canvas).color

    const sample = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.min(Math.max(rect.width, 1), 1600)
      const height = Math.min(Math.max(rect.height, 1), 440)
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const source = document.createElement('canvas')
      source.width = Math.round(width)
      source.height = Math.round(height)
      const sourceContext = source.getContext('2d')
      sourceContext.fillStyle = '#fff'
      sourceContext.textAlign = 'center'
      sourceContext.textBaseline = 'alphabetic'
      const verticalInset = Math.max(8, height * 0.03)
      let size = Math.min(380, width / 3.45, height - verticalInset * 2)
      sourceContext.font = `500 ${size}px "Space Grotesk", sans-serif`
      if ('letterSpacing' in sourceContext) sourceContext.letterSpacing = '-0.065em'
      const metrics = sourceContext.measureText('VIBHAV')
      const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      const baseline = (height - glyphHeight) / 2 + metrics.actualBoundingBoxAscent
      sourceContext.fillText('VIBHAV', width / 2, baseline)

      const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data
      const step = width < 600 ? 2.6 : 3.2
      points = []
      for (let row = 0, y = step / 2; y < source.height; row++, y += step) {
        for (let x = step / 2 + (row % 2) * step / 2; x < source.width; x += step) {
          // Coverage across the cell gives smaller dots along the glyph contour.
          let coverage = 0
          for (const dy of [-.8, 0, .8]) for (const dx of [-.8, 0, .8]) {
            const px = Math.max(0, Math.min(source.width - 1, Math.round(x + dx)))
            const py = Math.max(0, Math.min(source.height - 1, Math.round(y + dy)))
            coverage += pixels[(py * source.width + px) * 4 + 3] / 255
          }
          coverage /= 9
          if (coverage > .12) {
            const texture = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
            const radius = step * (.21 + .22 * Math.sqrt(coverage)) * (.82 + .18 * Math.abs(texture))
            points.push({ homeX:x, homeY:y, x, y, radius })
          }
        }
      }
    }

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      context.clearRect(0, 0, width, height)
      context.fillStyle = ink
      const influence = 92

      points.forEach((point) => {
        let targetX = point.homeX
        let targetY = point.homeY
        if (!reduceMotion) {
          const dx = point.homeX - pointer.x
          const dy = point.homeY - pointer.y
          const distance = Math.hypot(dx, dy) || 1
          if (distance < influence) {
            const force = (1 - distance / influence) * 46
            targetX += (dx / distance) * force
            targetY += (dy / distance) * force
          }
          point.x += (targetX - point.x) * 0.16
          point.y += (targetY - point.y) * 0.16
        }
        context.beginPath()
        context.arc(reduceMotion ? targetX : point.x, reduceMotion ? targetY : point.y, point.radius, 0, Math.PI * 2)
        context.fill()
      })

      if (visible && !document.hidden && !reduceMotion) frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onPointerLeave = () => { pointer.x = -10000; pointer.y = -10000 }
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      sample()
      draw()
    })
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) draw()
    }, { rootMargin: '120px' })

    const refresh = () => { cancelAnimationFrame(frame); ink = getComputedStyle(canvas).color; draw() }
    const paletteObserver = new MutationObserver(refresh)
    const paletteRoot = canvas.closest('[data-palette]')
    if (paletteRoot) paletteObserver.observe(paletteRoot, { attributes:true, attributeFilter:['data-palette'] })
    document.addEventListener('visibilitychange', refresh)
    document.fonts.ready.then(() => { if (!disposed) { cancelAnimationFrame(frame); sample(); draw() } })
    sample()
    draw()
    resize.observe(canvas)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('pointerup', onPointerLeave)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      paletteObserver.disconnect()
      document.removeEventListener('visibilitychange', refresh)
      resize.disconnect()
      observer.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('pointerup', onPointerLeave)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className={styles.dotMatrix} role="img" aria-label="Vibhav" />
}
