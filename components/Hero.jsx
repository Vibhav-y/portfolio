'use client'

import { motion } from 'framer-motion'
import Magnetic from './Magnetic'

const heroBg = '/hero-bg.webp'

const skillTiles = [
  {
    title: 'Problem Solving',
    desc: 'Turning complex ideas into simple, usable, and efficient solutions.'
  },
  {
    title: 'Frontend Experience',
    desc: 'Creating smooth, interactive, and visually engaging user interfaces.'
  },
  {
    title: 'Backend Systems',
    desc: 'Building scalable APIs and reliable server-side architectures.'
  },
  {
    title: 'Performance',
    desc: 'Optimized for speed, scalability, and real-world usage.'
  }
]

export default function Hero() {
  return (
    <section id="home" className="section hero-shell" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'flex-end', 
      paddingTop: '160px',
      paddingBottom: '80px',
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="container hero-container hero-grid" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', width: '100%', gap: '4vw', alignItems: 'center' }}>
        
        {/* Left Copy */}
        <div className="hero-copy" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}
          >
            <span style={{ fontFamily: 'var(--font-main)', color: 'rgba(255,255,255,0.65)', fontSize: '20px', fontWeight: 500, letterSpacing: '0.05em' }}>नमस्ते</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Namaste</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="headline hero-name"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(56px, 8vw, 96px)', lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: '24px' }}
          >
            I'm Vibhav{' '}
            <span style={{ 
              background: 'linear-gradient(to right, #ff7a18, #ffb347)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255,122,24,0.3)'
            }}>
              Yadav.
            </span>
          </motion.h1>

          <motion.p
            className="hero-short"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, maxWidth: '600px', fontWeight: 400 }}
          >
            Full-stack developer crafting performant products with stunning UI &amp; real-world impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5 }}
            style={{ marginTop: '40px' }}
          >
            <Magnetic strength={0.2}>
              <a 
                href="#work" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(to right, #ff7a18, #ffb347)',
                  color: '#000',
                  fontWeight: 600,
                  fontSize: '16px',
                  padding: '16px 32px',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(255,122,24,0.3)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '-0.01em'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,122,24,0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,122,24,0.3)';
                }}
              >
                View Projects
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right 2x2 Feature Grid */}
        <motion.div
          className="hero-tiles-wrap"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%' }}
        >
          <div className="hero-skill-grid" style={{ zIndex: 10 }}>
            {skillTiles.map((tile, i) => (
              <motion.div 
                key={tile.title} 
                className="hero-skill-tile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + (i * 0.1) }}
                whileHover={{ y: -5 }}
                style={{ 
                  aspectRatio: '1 / 1', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center' 
                }}
              >
                <h3>{tile.title}</h3>
                <p className="hero-skill-desc">{tile.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
