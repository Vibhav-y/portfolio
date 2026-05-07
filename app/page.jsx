'use client'

import { useState, useEffect } from 'react'
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

  const [minLoaderTimeDone, setMinLoaderTimeDone] = useState(false)
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
      const t = setTimeout(() => setGreetingIndex(prev => prev + 1), 110)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setMinLoaderTimeDone(true), 120)
      return () => clearTimeout(t)
    }
  }, [greetingIndex, greetings.length])

  useEffect(() => {
    if (minLoaderTimeDone && imgsDone) setLoading(false)
  }, [minLoaderTimeDone, imgsDone])

  const loaderProgress = ((greetingIndex + 1) / greetings.length) * 100

  return (
    <>
      {loading ? (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0a0a0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '20px',
          }}
        >
          <span
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 600,
              color: '#fff',
              fontFamily: 'var(--font-main)',
              lineHeight: 1,
            }}
          >
            {greetings[greetingIndex]}
          </span>

          <div
            style={{
              width: 'min(360px, 72vw)',
              height: '3px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${loaderProgress}%`,
                height: '100%',
                background: 'linear-gradient(to right, #ff7a18, #ffb347)',
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </>
  )
}
