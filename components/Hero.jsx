'use client'

import { motion } from 'framer-motion'
import Magnetic from './Magnetic'

const heroBg = '/hero-bg.webp'

const capabilities = [
  { n: '01', title: 'Problem Solving', desc: 'Turning complex ideas into simple, usable, and efficient solutions.' },
  { n: '02', title: 'Frontend Experience', desc: 'Smooth, interactive, and visually engaging user interfaces.' },
  { n: '03', title: 'Backend Systems', desc: 'Scalable APIs and reliable server-side architectures.' },
  { n: '04', title: 'Performance', desc: 'Optimized for speed, scalability, and real-world usage.' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="section hero-shell"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 'clamp(88px, 12vw, 120px)',
        paddingBottom: 'clamp(32px, 5vw, 56px)',
        backgroundColor: 'var(--bg-base)',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--accent)', display: 'block',
          }}
        >
          नमस्ते — Full-Stack Developer
        </motion.span>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="headline"
          style={{ marginTop: '22px', textTransform: 'uppercase', letterSpacing: '-0.045em' }}
        >
          I&apos;m Vibhav <span style={{ color: 'var(--accent)' }}>Yadav.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ marginTop: '24px', color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '540px', lineHeight: 1.6 }}
        >
          Full-stack developer crafting performant products with stunning UI &amp; real-world impact.
        </motion.p>

        {/* CTA — sharp bordered link */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '36px' }}
        >
          <Magnetic strength={0.2}>
            <a
              href="#work"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '16px 28px',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'background 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
            >
              View Projects
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </Magnetic>
        </motion.div>

        {/* Capability strip — hairline grid, sharp */}
        <motion.div
          className="edi-cap-grid"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{ marginTop: 'clamp(36px, 5vw, 56px)' }}
        >
          {capabilities.map((c) => (
            <div key={c.n} className="edi-cap-cell">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>{c.n}</span>
              <h3 style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', fontWeight: 600, color: '#fff', margin: '14px 0 8px', letterSpacing: '-0.01em' }}>
                {c.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.55 }}>{c.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
