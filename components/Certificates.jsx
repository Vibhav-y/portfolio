'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

const cert1 = '/Certificates/image.webp'
const cert2 = '/Certificates/image copy.webp'
const cert3 = '/Certificates/image copy 2.webp'
const cert4 = '/Certificates/image copy 3.webp'

const certs = [
  {
    id: 'cert4',
    image: cert4,
    title: 'Oracle Data Platform Foundations',
    subtitle: 'Oracle Certified',
    desc: 'Oracle Certified Foundations Associate for the Oracle Data Platform 2025 program. Validates core understanding of Oracle data infrastructure, services, and platform fundamentals.',
    accent: '#C74634',
  },
  {
    id: 'cert1',
    image: cert1,
    title: 'Cloud Computing',
    subtitle: 'NPTEL Certified (IIT Kharagpur)',
    desc: 'Completed an NPTEL-certified course covering cloud computing fundamentals, distributed systems, and scalable infrastructure. Achieved a consolidated score of 66% with perfect performance in online assessments.',
    accent: '#f7790f',
  },
  {
    id: 'cert2',
    image: cert2,
    title: 'Python (Basic)',
    subtitle: 'HackerRank Certified',
    desc: 'Validated core Python programming skills through HackerRank assessment, focusing on problem solving, data structures, and writing efficient, clean code.',
    accent: '#4ECDC4',
  },
  {
    id: 'cert3',
    image: cert3,
    title: 'Frontend Developer (React)',
    subtitle: 'HackerRank Certified',
    desc: 'Demonstrated proficiency in building modern web applications using React, including component-based architecture, state management, and creating responsive, interactive user interfaces.',
    accent: '#6C8EFF',
  },
];

// 4-card diamond stack:
//   top    : |     (active, centered, in front, highest on screen)
//   middle : / \   (left & right, angled outward)
//   bottom : |     (inactive, centered behind, peeks out below active)
const fanConfig = [
  { x: '-22%', rotate: -14, y:  6,  scale: 0.85, z: 1, opacity: 1 }, // slot 0 — middle left  /
  { x: '0%',   rotate:   0, y: -28, scale: 1.0,  z: 4, opacity: 1 }, // slot 1 — top front |   (active)
  { x: '22%',  rotate:  14, y:  6,  scale: 0.85, z: 2, opacity: 1 }, // slot 2 — middle right \
  { x: '0%',   rotate:   0, y:  64, scale: 0.78, z: 0, opacity: 1 }, // slot 3 — bottom peek |  (inactive)
]

export default function Certificates() {
  const [selected, setSelected] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const intervalRef = useRef(null)

  const activeCert = certs[activeIndex]

  useEffect(() => {
    setMounted(true)
  }, [])

  const startCycle = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % certs.length)
    }, 4000)
  }

  useEffect(() => {
    if (!paused) startCycle()
    else clearInterval(intervalRef.current)
    return () => clearInterval(intervalRef.current)
  }, [paused])

  return (
    <>
      <section id="certificates" className="section">
        <div className="container grid-box" style={{ paddingBlock: 'clamp(36px, 4vw, 56px)' }}>
        <CornerPlus />
        <SectionHeader
          eyebrow="CREDENTIALS"
          title="Certified & always learning."
          description="A collection of credentials earned across engineering, algorithms, and software design."
          align="left"
          marginBottom={32}
          eyebrowClassName="cert-eyebrow"
        />

        {/* The 2-Column Split Layout */}
        <div 
          className="cert-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            alignItems: 'center',
            marginTop: '48px',
          }}
        >
          
          {/* LEFT: Fanned Images Pure Animation */}
          <div className="cert-fan-area" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            {certs.map((cert, i) => {
              const slot = (i - activeIndex + certs.length + 1) % certs.length
              const cfg = fanConfig[slot]
              const isCenter = slot === 1
              const isActive = i === activeIndex

              return (
                <motion.div
                  key={cert.id}
                  onClick={() => {
                    if (isActive) {
                      setSelected(cert)
                    } else {
                      setActiveIndex(i)
                      startCycle()
                    }
                  }}
                  animate={{
                    x: cfg.x,
                    rotate: isActive ? 0 : cfg.rotate,
                    y: isActive ? cfg.y - 12 : cfg.y,
                    scale: cfg.scale,
                    zIndex: cfg.z,
                    opacity: cfg.opacity ?? 1,
                  }}
                  transition={{ type: 'spring', stiffness: 160, damping: 24, opacity: { duration: 0.1 } }}
                  className="cert-card"
                  style={{
                    position: 'absolute',
                    height: 'auto',
                    cursor: 'pointer',
                    transformOrigin: 'bottom center',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    border: `1px solid ${isActive ? cert.accent : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: isActive
                      ? `0 40px 80px rgba(0,0,0,0.6)`
                      : '0 20px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    loading="lazy"
                    style={{ 
                      width: '100%', 
                      display: 'block', 
                      objectFit: 'cover' 
                    }} 
                  />

                  {/* Dim overlay for background cards */}
                  <motion.div 
                    animate={{ opacity: isActive ? 0 : 0.6 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: '#000',
                      pointerEvents: 'none',
                    }}
                  />
                  
                  {/* Expand hint for active card */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        position: 'absolute', top: '12px', right: '12px',
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                        borderRadius: '0px', padding: '5px 11px',
                        fontSize: '10px', fontFamily: 'var(--font-mono)',
                        color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      Enlarge
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* RIGHT: Text Content & Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', minHeight: '280px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: activeCert.accent,
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '18px',
                  }}>
                    <span style={{ width: '20px', height: '1px', background: activeCert.accent }} />
                    {activeCert.subtitle}
                  </span>

                  <h3 style={{
                    fontSize: 'clamp(28px, 3vw, 38px)',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    {activeCert.title}
                  </h3>

                  <p style={{
                    fontSize: '16px',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                    {activeCert.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* List navigation below content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '40px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              {certs.map((cert, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={cert.id}
                    onClick={() => {
                      setActiveIndex(i)
                      startCycle()
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                      background: 'none', border: 'none',
                      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      padding: '15px 2px', borderRadius: '0px', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                        color: isActive ? cert.accent : 'rgba(255,255,255,0.3)',
                      }}>
                        0{i + 1}
                      </span>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: isActive ? 600 : 500,
                        textTransform: 'uppercase', letterSpacing: '-0.01em',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}>
                        {cert.title}
                      </span>
                    </span>

                    <span style={{
                      width: isActive ? '26px' : '10px', height: '1px',
                      background: isActive ? cert.accent : 'rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease', flexShrink: 0,
                    }} />
                  </button>
                )
              })}
            </div>
          </div>
          
        </div>
        </div>
      </section>

      {/* Lightbox — portal to body */}
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
                background: 'rgba(0,0,0,0.88)',
                backdropFilter: 'blur(20px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '32px',
              }}
            >
              <motion.div
                key="modal-content"
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.88, opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                style={{
                  maxWidth: '900px', width: '100%',
                  background: 'rgba(12,12,16,0.97)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0px', overflow: 'hidden',
                  boxShadow: '0 48px 100px rgba(0,0,0,0.7)',
                  position: 'relative'
                }}
              >
                <img src={selected.image} alt={selected.title}
                  style={{ width: '100%', display: 'block', maxHeight: '80vh', objectFit: 'contain' }}
                />
                <div style={{
                  padding: '20px 28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#fff', fontWeight: 600 }}>{selected.title}</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>{selected.subtitle}</p>
                  </div>
                  <button onClick={() => setSelected(null)} style={{
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0px', padding: '8px 18px', color: '#fff',
                    fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>Close</button>
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
