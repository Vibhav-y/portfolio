'use client'

import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import SectionHeader from './ui/section-header'

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
      paddingTop: '120px',
      paddingBottom: '64px',
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="container hero-container hero-grid" style={{ position: 'relative', zIndex: 10, width: '100%', gap: '4vw', alignItems: 'center' }}>
        
        {/* Left Copy */}
        <div className="hero-copy" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <SectionHeader
            eyebrow="नमस्ते"
            title={<>I'm Vibhav{' '}<span style={{ background: 'linear-gradient(to right, #ff7a18, #ffb347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 40px rgba(255,122,24,0.3)' }}>Yadav.</span></>}
            description="Full-stack developer crafting performant products with stunning UI & real-world impact."
            marginBottom={0}
            eyebrowClassName="hero-eyebrow"
            titleTag="h1"
            titleClassName="headline hero-name"
            descriptionClassName="hero-short"
          />

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
