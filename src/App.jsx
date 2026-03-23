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
              <Projects />
              <Certificates />
              <Skills />
              <Experience />
              <Now />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
