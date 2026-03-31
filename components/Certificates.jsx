'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const cert1 = '/Certificates/image.webp'
const cert2 = '/Certificates/image copy.webp'
const cert3 = '/Certificates/image copy 2.webp'

const certs = [
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

const fanConfig = [
  { x: '-22%', rotate: -12, y: 20,  scale: 0.85, z: 1 },
  { x: '0%',   rotate:   0, y: 0,   scale: 1.05, z: 3 },
  { x: '22%',  rotate:  12, y: 20,  scale: 0.85, z: 2 },
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
      <section id="certificates" className="section" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
            color: 'var(--accent)', letterSpacing: '0.2em',
            textTransform: 'uppercase', display: 'block', marginBottom: '16px',
          }}>
            CREDENTIALS
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', color: '#f9fafc',
            lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '600px', margin: '0 auto',
          }}>
            Certified &amp; always learning.
          </h2>
          <p style={{
            color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7,
            maxWidth: '500px', marginTop: '16px', margin: '16px auto 0',
          }}>
            A collection of credentials earned across engineering, algorithms, and software design.
          </p>
        </motion.div>

        {/* The 2-Column Split Layout */}
        <div 
          className="cert-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            alignItems: 'center',
            marginTop: '80px',
          }}
        >
          
          {/* LEFT: Fanned Images Pure Animation */}
          <div style={{
            position: 'relative',
            height: '640px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
                  }}
                  transition={{ type: 'spring', stiffness: 160, damping: 24 }}
                  className="cert-card"
                  style={{
                    position: 'absolute',
                    height: 'auto',
                    cursor: 'pointer',
                    transformOrigin: 'bottom center',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: `2px solid ${isActive ? cert.accent : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: isActive 
                      ? `0 40px 80px rgba(0,0,0,0.6), 0 0 40px ${cert.accent}33`
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
                        borderRadius: '6px', padding: '4px 10px',
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
            <div style={{ position: 'relative', minHeight: '180px' }}>
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
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    background: activeCert.accent + '22',
                    border: `1px solid ${activeCert.accent}44`,
                    color: activeCert.accent,
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '20px',
                  }}>
                    {activeCert.subtitle}
                  </span>
                  
                  <h3 style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
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
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none',
                      padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.2s',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                    }}
                  >
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                    }}>
                      {cert.title}
                    </span>
                    
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: isActive ? cert.accent : 'transparent',
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
                  borderRadius: '24px', overflow: 'hidden',
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
                    borderRadius: '10px', padding: '8px 18px', color: '#fff',
                    fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-mono)',
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
