import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import './index.css'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Now from './components/Now'
import Contact from './components/Contact'
import Footer from './components/Footer'
import resumePdf from './assets/resume.pdf'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [greetingIndex, setGreetingIndex] = useState(0)

  const greetings = [
    "Hello", "Hola", "Bonjour", "Ciao", "こんにちは", 
    "안녕하세요", "مرحبا", "Olá", "Hallo", "नमस्कार", 
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "నమస్కారం", "ನಮಸ್ಕಾರ", "नमस्ते"
  ]

  // Vite resolves these the same way the components do — guaranteed same URL
  const CRITICAL_IMAGES = [
    new URL('./assets/hero-bg.webp', import.meta.url).href,
    new URL('./assets/1774288544676-1-tjs99i.webp', import.meta.url).href,
  ]

  const [animDone, setAnimDone] = useState(false)
  const [imgsDone, setImgsDone]  = useState(false)

  // Preload images the moment the app mounts
  useEffect(() => {
    Promise.all(
      CRITICAL_IMAGES.map(
        src => new Promise(resolve => {
          const img = new Image()
          img.onload = img.onerror = resolve  // resolve even on error so we never block forever
          img.src = src
        })
      )
    ).then(() => setImgsDone(true))
  }, [])

  // Cycle through greetings every 400ms
  useEffect(() => {
    if (greetingIndex < greetings.length - 1) {
      const t = setTimeout(() => setGreetingIndex(prev => prev + 1), 400)
      return () => clearTimeout(t)
    } else {
      // After last greeting, mark animation done after a short pause
      const t = setTimeout(() => setAnimDone(true), 800)
      return () => clearTimeout(t)
    }
  }, [greetingIndex, greetings.length])

  // Dismiss loader only when both conditions are met
  useEffect(() => {
    if (animDone && imgsDone) setLoading(false)
  }, [animDone, imgsDone])

  return (
    <>
      <div className="liquid-bg-container">
        <div className="liquid-blob blob-a"></div>
        <div className="liquid-blob blob-b"></div>
        <div className="liquid-blob blob-c"></div>
      </div>
      
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            style={{ 
              position: 'fixed', inset: 0, zIndex: 9999, 
              background: '#0a0a0a', display: 'flex', 
              alignItems: 'center', justifyContent: 'center' 
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={greetingIndex}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ 
                  fontSize: 'clamp(32px, 5vw, 64px)', 
                  fontWeight: 600, 
                  color: '#fff', 
                  fontFamily: 'var(--font-sans)',
                  position: 'absolute'
                }}
              >
                {greetingIndex === greetings.length - 1 ? (
                  // The final greeting "नमस्ते" uses a layoutId to fly into the hero section
                  <motion.div layoutId="namaste-greeting" style={{ zIndex: 10 }}>
                    {greetings[greetingIndex]}
                  </motion.div>
                ) : (
                  greetings[greetingIndex]
                )}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Certificates />
              <Skills />
              <Now />
              <Contact />
            </main>
            <Footer />
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Fixed Resume Button */}
      {!loading && (
        <motion.a 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, y: -4, boxShadow: '0 12px 40px rgba(255, 122, 24, 0.6)' }}
          href={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 9999,
            background: 'linear-gradient(to right, #ff7a18, #ffb347)',
            color: '#000',
            padding: '14px 24px',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
            boxShadow: '0 8px 32px rgba(255, 122, 24, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'none'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Resume
        </motion.a>
      )}
    </>
  )
}
