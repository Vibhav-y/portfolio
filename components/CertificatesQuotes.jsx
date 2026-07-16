'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SectionHeader from './ui/section-header'
import ModalShader from './ui/modal-shader'

const cert1 = '/Certificates/image.webp'
const cert2 = '/Certificates/image copy.webp'
const cert3 = '/Certificates/image copy 2.webp'
const cert4 = '/Certificates/image copy 3.webp'

const certs = [
  {
    id: 'cert4',
    image: cert4,
    title: 'Oracle Data Platform Foundations',
    issuer: 'ORACLE',
    issuerSub: 'Foundations Associate · 2025',
    subtitle: 'Oracle Certified',
    desc: 'Validates core understanding of Oracle data infrastructure, services, and platform fundamentals across the Oracle Data Platform 2025 program.',
    accent: '#C74634',
  },
  {
    id: 'cert1',
    image: cert1,
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    issuerSub: 'IIT Kharagpur',
    subtitle: 'NPTEL Certified (IIT Kharagpur)',
    desc: 'Cloud computing fundamentals, distributed systems, and scalable infrastructure — completed with perfect performance in online assessments.',
    accent: '#f7790f',
  },
  {
    id: 'cert2',
    image: cert2,
    title: 'Python (Basic)',
    issuer: 'HACKERRANK',
    issuerSub: 'Skill Certification',
    subtitle: 'HackerRank Certified',
    desc: 'Core Python programming skills validated under assessment — problem solving, data structures, and efficient, clean code.',
    accent: '#4ECDC4',
  },
  {
    id: 'cert3',
    image: cert3,
    title: 'Frontend Developer (React)',
    issuer: 'HACKERRANK',
    issuerSub: 'Role Certification',
    subtitle: 'HackerRank Certified',
    desc: 'Modern web applications with React — component-based architecture, state management, and responsive, interactive interfaces.',
    accent: '#6C8EFF',
  },
];

const easeFluid = [0.22, 1, 0.36, 1]

// Scroll-pinned mode: the section pins while page scroll drives the cards.
// Comment the next line out to fall back to a plain swipe/snap carousel.
let PIN_SCROLL = false
PIN_SCROLL = true

export default function CertificatesQuotes() {
  const [selected, setSelected] = useState(null)
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  const setActiveFromProgress = (v) => {
    setActive(Math.min(certs.length - 1, Math.max(0, Math.round(v * (certs.length - 1)))))
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    if (PIN_SCROLL) {
      // The section pins while the page scrolls; that vertical progress drives
      // the horizontal position of the card track.
      const onScroll = () => {
        const section = sectionRef.current
        if (!section) return
        const range = section.offsetHeight - window.innerHeight
        if (range <= 0) return
        const y = window.scrollY - (section.getBoundingClientRect().top + window.scrollY)
        const v = Math.min(1, Math.max(0, y / range))
        track.scrollLeft = v * (track.scrollWidth - track.clientWidth)
        setActiveFromProgress(v)
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    // Plain horizontal snap carousel — the track scrolls, the page doesn't pin.
    const onTrackScroll = () => {
      const range = track.scrollWidth - track.clientWidth
      if (range <= 0) return
      setActiveFromProgress(track.scrollLeft / range)
    }
    onTrackScroll()
    track.addEventListener('scroll', onTrackScroll, { passive: true })
    return () => track.removeEventListener('scroll', onTrackScroll)
  }, [])

  // Arrows/dots move to the position that centers card i (page scroll when
  // pinned, track scroll otherwise).
  const goTo = (i) => {
    const clamped = Math.min(certs.length - 1, Math.max(0, i))
    if (PIN_SCROLL) {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const range = section.offsetHeight - window.innerHeight
      window.scrollTo({
        top: sectionTop + (clamped / (certs.length - 1)) * range,
        behavior: 'smooth',
      })
      return
    }
    const track = trackRef.current
    if (!track) return
    const range = track.scrollWidth - track.clientWidth
    track.scrollTo({
      left: (clamped / (certs.length - 1)) * range,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (!selected) return
    const onKey = e => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [selected])

  return (
    <>
      <section
        id="certificates"
        className="section"
        ref={sectionRef}
        style={PIN_SCROLL
          ? { height: `${100 + (certs.length - 1) * 85}vh`, position: 'relative' }
          : { position: 'relative' }}
      >
        <div style={PIN_SCROLL
          ? { position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center' }
          : undefined}
        >
        <div className="container grid-box" style={{ padding: 'clamp(24px, 3vw, 48px) 0', overflow: 'hidden', width: '100%' }}>
          <div style={{ paddingInline: 'clamp(20px, 3vw, 48px)' }}>
            <SectionHeader
              eyebrow="CREDENTIALS"
              title="Certified & always learning."
              description="Every credential here was earned under assessment. Here's what they stand for."
              align="left"
              marginBottom={28}
              eyebrowClassName="cert-eyebrow"
            />
          </div>

          {/* Quote-card carousel — page-scroll-driven when pinned, swipe/snap otherwise */}
          <div style={{ position: 'relative' }}>
            <div ref={trackRef} className="certq-track" style={PIN_SCROLL ? { scrollSnapType: 'none', overflowX: 'hidden' } : undefined}>
              {certs.map((c, i) => {
                const isActive = i === active
                return (
                  <motion.article
                    key={c.id}
                    className="certq-card"
                    animate={{ scale: isActive ? 1 : 0.96, opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.45, ease: easeFluid }}
                    whileHover={isActive ? { y: -4 } : {}}
                    onClick={() => (isActive ? setSelected(c) : goTo(i))}
                  >
                    {/* Blurred certificate backdrop + accent tint */}
                    <div className="certq-bg" aria-hidden="true">
                      <img src={c.image} alt="" loading="lazy" draggable={false} />
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(115deg, ${c.accent}cc 0%, ${c.accent}55 55%, ${c.accent}99 100%)` }} />
                    </div>

                    {/* White inset quote panel */}
                    <div className="certq-panel">
                      <span className="certq-mark" style={{ color: c.accent }}>“</span>
                      <p className="certq-text">{c.desc}</p>
                      <div className="certq-person">
                        <span className="certq-avatar" style={{ background: `${c.accent}1f`, color: c.accent }}>
                          {c.title.charAt(0)}
                        </span>
                        <span>
                          <span className="certq-name">{c.title}</span>
                          <span className="certq-role">{c.subtitle}</span>
                        </span>
                      </div>
                    </div>

                    {/* Issuer as a "logo" on the right */}
                    <div className="certq-logo">
                      <span className="certq-logo-name">{c.issuer}</span>
                      <span className="certq-logo-sub">{c.issuerSub}</span>
                      <span className="certq-view">View certificate →</span>
                    </div>
                  </motion.article>
                )
              })}
            </div>

            <CarouselArrow dir="left"  disabled={active === 0}                onClick={() => goTo(active - 1)} />
            <CarouselArrow dir="right" disabled={active === certs.length - 1} onClick={() => goTo(active + 1)} />
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
            {certs.map((c, i) => (
              <button
                key={c.id}
                aria-label={`Go to ${c.title}`}
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
      </section>

      {/* Lightbox — certificate left, credential story right, shader behind */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              key="modal-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 99999,
                background: 'rgba(var(--base), 0.7)',
                backdropFilter: 'blur(20px) saturate(140%)',
                WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(14px, 2.5vw, 40px)',
              }}
            >
              <motion.div
                key="modal-content"
                initial={{ y: 28, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 24, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: easeFluid }}
                onClick={e => e.stopPropagation()}
                className="pmodal"
              >
                <ModalShader accent={selected.accent} />

                <motion.button
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.3, ease: easeFluid }}
                  style={{
                    position: 'absolute', top: 16, right: 16, zIndex: 3,
                    width: 40, height: 40, borderRadius: '999px',
                    background: 'rgba(var(--paper), 0.85)',
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid var(--hairline)',
                    color: 'var(--text-primary)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 24px rgba(var(--shadow-ink), 0.14)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </motion.button>

                {/* LEFT — the certificate itself */}
                <div className="pmodal-visual">
                  <motion.img
                    src={selected.image}
                    alt={selected.title}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: easeFluid }}
                  />
                  <div className="pmodal-meta">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(var(--paper), 0.9)' }}>
                      {selected.issuer} · {selected.issuerSub}
                    </span>
                  </div>
                </div>

                {/* RIGHT — credential story on a glass panel */}
                <div className="pmodal-panel">
                  <div className="pmodal-scroll">
                    <span className="mono-label" style={{ color: selected.accent, display: 'block', marginBottom: '10px' }}>
                      {selected.subtitle}
                    </span>
                    <h3 style={{
                      fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 700,
                      color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1,
                      marginBottom: '16px',
                    }}>
                      {selected.title}
                    </h3>

                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 26px' }}>
                      {selected.desc}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px 20px' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Issuer</div>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{selected.issuer}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Program</div>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{selected.issuerSub}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pmodal-ctas">
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: 'var(--text-tertiary)',
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--status-live)' }} />
                      Verified credential
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

function CarouselArrow({ dir, onClick, disabled }) {
  return (
    <motion.button
      aria-label={dir === 'left' ? 'Previous certificate' : 'Next certificate'}
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
