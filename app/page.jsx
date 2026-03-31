'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import MacbookReveal from '../components/MacbookReveal'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Certificates from '../components/Certificates'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Now from '../components/Now'
import Contact from '../components/Contact'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [greetingIndex, setGreetingIndex] = useState(0)

  const greetings = [
    "Hello", "Hola", "Bonjour", "Ciao", "こんにちは",
    "안녕하세요", "مرحبا", "Olá", "Hallo", "नमस्कार",
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "నమస్కారం", "ನಮಸ್ಕಾರ", "नमस्ते"
  ]

  const CRITICAL_IMAGES = ['/hero-bg.webp', '/1774288544676-1-tjs99i.webp']

  const [animDone, setAnimDone] = useState(false)
  const [imgsDone, setImgsDone] = useState(false)

  useEffect(() => {
    Promise.all(
      CRITICAL_IMAGES.map(
        src => new Promise(resolve => {
          const img = new Image()
          img.onload = img.onerror = resolve
          img.src = src
        })
      )
    ).then(() => setImgsDone(true))
  }, [])

  useEffect(() => {
    if (greetingIndex < greetings.length - 1) {
      const t = setTimeout(() => setGreetingIndex(prev => prev + 1), 400)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setAnimDone(true), 800)
      return () => clearTimeout(t)
    }
  }, [greetingIndex, greetings.length])

  useEffect(() => {
    if (animDone && imgsDone) setLoading(false)
  }, [animDone, imgsDone])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: '#0a0a0a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                  fontWeight: 600, color: '#fff',
                  fontFamily: 'var(--font-main)',
                  position: 'absolute',
                }}
              >
                {greetings[greetingIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* MacBook reveal scene — before portfolio */}
            <MacbookReveal />

            {/* Full portfolio */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
