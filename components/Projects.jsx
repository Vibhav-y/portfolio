'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TransitionLink } from './PageTransition'
import SectionHeader from './ui/section-header'
import ProjectModal from './ProjectModal'
import { FEATURED_PROJECTS as PROJECTS } from '../lib/projects'

const easeFluid = [0.22, 1, 0.36, 1]

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef(null)
  const cardEls = useRef([])

  useEffect(() => { setMounted(true) }, [])

  // Pinned section: page scroll sets a target progress; a rAF loop eases the
  // rendered progress toward it (exponential smoothing), and every card's
  // transform is computed from that continuous value — no stepping.
  const targetP = useRef(0)
  const currentP = useRef(0)
  const lastFrame = useRef(0)
  const activeRef = useRef(0)

  const applyTransforms = (pv) => {
    cardEls.current.forEach((el, i) => {
      if (!el) return
      const d = Math.max(-3, Math.min(3, i - pv))
      // symmetric: the previous card parks as a left peek, the next as a
      // right peek; both slightly shrunk and dimmed for depth
      const ad = Math.min(Math.abs(d), 1)
      const x = d * 106
      const scale = 1 - 0.14 * ad
      const opacity = 1 - 0.3 * ad
      el.style.transform = `translateX(${x}%) scale(${scale})`
      el.style.opacity = opacity
      el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10))
    })
    const idx = Math.min(PROJECTS.length - 1, Math.max(0, Math.round(pv)))
    if (idx !== activeRef.current) {
      activeRef.current = idx
      setActive(idx)
    }
  }

  useEffect(() => {
    let raf = 0
    const tick = () => {
      lastFrame.current = performance.now()
      const delta = targetP.current - currentP.current
      if (Math.abs(delta) > 0.0004) {
        currentP.current += delta * 0.09
        applyTransforms(currentP.current)
      }
      raf = requestAnimationFrame(tick)
    }

    // Dwell + snap: each card holds the center for a stretch of scroll, then
    // eases to the next with a smoothstep — centered cards need a push to move.
    const DWELL = 0.32
    const shape = (raw) => {
      const seg = Math.floor(raw)
      const f = raw - seg
      const t = Math.min(1, Math.max(0, (f - DWELL) / (1 - 2 * DWELL)))
      return seg + t * t * (3 - 2 * t)
    }

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const range = section.offsetHeight - window.innerHeight
      if (range <= 0) return
      const y = window.scrollY - (section.getBoundingClientRect().top + window.scrollY)
      const v = Math.min(1, Math.max(0, y / range))
      targetP.current = shape(v * (PROJECTS.length - 1))
      // rAF throttled (hidden tab)? apply directly so state never goes stale
      if (performance.now() - lastFrame.current > 250) {
        currentP.current = targetP.current
        applyTransforms(currentP.current)
      }
    }

    applyTransforms(0)
    onScroll()
    raf = requestAnimationFrame(tick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (i) => {
    const section = sectionRef.current
    if (!section) return
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const range = section.offsetHeight - window.innerHeight
    window.scrollTo({
      top: sectionTop + (i / (PROJECTS.length - 1)) * range,
      behavior: 'smooth',
    })
  }

  const project = PROJECTS[active]

  return (
    <>
      <section
        id="work"
        data-section="projects"
        ref={sectionRef}
        style={{ height: `${100 + (PROJECTS.length - 1) * 85}vh`, position: 'relative', paddingBlock: 0 }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="container grid-box" style={{ padding: 'clamp(24px, 3vw, 48px) 0', overflow: 'hidden', width: '100%' }}>
            <div style={{ paddingInline: 'clamp(20px, 3vw, 48px)', position: 'relative' }}>
              <SectionHeader
                eyebrow="SELECTED WORK"
                title="Real-world systems, not just code."
                align="left"
                marginBottom={24}
              />
              {/* pinned to the eyebrow row so the title keeps the full width */}
              <TransitionLink
                href="/projects"
                label="Projects."
                className="proj-viewall"
                style={{ position: 'absolute', top: -6, right: 'clamp(20px, 3vw, 48px)', marginBottom: 0 }}
              >
                View all projects
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </TransitionLink>
            </div>

            {/* Per-slide header: project name left, summary headline right */}
            <div style={{ paddingInline: 'clamp(20px, 3vw, 48px)', minHeight: '86px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  className="cert-show-head"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: easeFluid }}
                >
                  <div>
                    <span className="mono-label" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      color: project.accent, marginBottom: '8px',
                    }}>
                      <span style={{ width: '20px', height: '1px', background: project.accent }} />
                      {project.label} · {project.year}
                    </span>
                    <h3 style={{
                      fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700,
                      color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15,
                    }}>
                      {project.name}
                    </h3>
                  </div>
                  <p className="cert-show-headline">{project.summary}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card stage — one front card, the next peeking right */}
            <div style={{ position: 'relative', marginTop: '20px' }}>
              <div className="proj-stage">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.id}
                    ref={el => { cardEls.current[i] = el }}
                    className="proj-card"
                    onClick={() => (i === activeRef.current ? setSelected(p) : goTo(i))}
                  >
                    <CardImage project={p} />
                    <div className="cert-card-cta">
                      <span>Read Casestudy</span>
                    </div>
                  </div>
                ))}
              </div>

              <CarouselArrow dir="left"  disabled={active === 0}                   onClick={() => goTo(active - 1)} />
              <CarouselArrow dir="right" disabled={active === PROJECTS.length - 1} onClick={() => goTo(active + 1)} />
            </div>

            {/* Below: tag pills left, status quote right */}
            <div style={{ paddingInline: 'clamp(20px, 3vw, 48px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  className="cert-show-foot"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeFluid, delay: 0.05 }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {project.tags.map(t => (
                      <span key={t} className="tag-capsule">{t}</span>
                    ))}
                  </div>
                  <div className="cert-quote">
                    <span style={{
                      fontSize: '22px', lineHeight: 1, color: project.accent,
                      fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: '2px',
                    }}>&ldquo;</span>
                    <p style={{
                      fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)',
                      fontStyle: 'italic', margin: 0,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    aria-label={`Go to ${p.name}`}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === active ? '26px' : '8px', height: '8px',
                      borderRadius: '999px', border: 'none', cursor: 'pointer',
                      background: i === active ? 'var(--accent)' : 'rgba(var(--ink), 0.18)',
                      transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal — rendered via portal to body */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

// Renders the card screenshot, falling back to a branded accent tile if the
// image is missing or fails to load (e.g. a project without a shot yet).
function CardImage({ project }) {
  const [broken, setBroken] = useState(false)
  if (!project.image || broken) {
    return (
      <div
        className="proj-card-fallback"
        style={{ background: `linear-gradient(135deg, ${project.accent}26, ${project.accent}0a)` }}
      >
        <span style={{ color: project.accent }}>{project.name}</span>
      </div>
    )
  }
  return (
    <img
      src={project.image}
      alt={project.name}
      loading="lazy"
      draggable={false}
      onError={() => setBroken(true)}
    />
  )
}

function CarouselArrow({ dir, onClick, disabled }) {
  return (
    <motion.button
      aria-label={dir === 'left' ? 'Previous project' : 'Next project'}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.08 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      className="cert-arrow"
      style={{
        [dir]: 'clamp(10px, 2vw, 26px)',
        opacity: disabled ? 0.25 : 1,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'left' ? <path d="M19 12H5M12 19l-7-7 7-7" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
      </svg>
    </motion.button>
  )
}
