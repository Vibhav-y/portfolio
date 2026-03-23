import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 50], ["rgba(0,0,0,0)", "rgba(10,10,10,0.8)"])
  const blur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"])
  const borderB = useTransform(scrollY, [0, 50], ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.05)"])

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 8vw',
        background: yBg,
        backdropFilter: blur,
        borderBottom: borderB
      }}
    >
      {/* CSS for the Glitch Effect (Scoped loosely) */}
      <style dangerouslySetInnerHTML={{__html: `
        .glitch-logo {
          position: relative;
          color: #fff;
          font-weight: 800;
          font-size: 24px;
          letter-spacing: -0.05em;
          text-decoration: none;
          display: inline-block;
        }
        .glitch-logo::before,
        .glitch-logo::after {
          content: "VY.";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-logo::before {
          color: #0ff;
          z-index: -1;
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }
        .glitch-logo::after {
          color: #f0f;
          z-index: -2;
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 1px); }
        }
      `}} />

      {/* Left Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a href="#home" className="glitch-logo">
           VY.
        </a>
      </div>

      {/* Center Links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {[
          { label: 'Home', id: 'home' },
          { label: 'Projects', id: 'work' },
          { label: 'Stack', id: 'stack' },
          { label: 'About', id: 'about' }
        ].map((link) => (
          <a key={link.label} href={`#${link.id}`} style={{
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '14px',
            transition: 'color 0.2s',
            cursor: 'none'
          }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <a href="#contact" style={{
          background: 'linear-gradient(to right, #ff7a18, #ffb347)',
          borderRadius: '999px',
          padding: '10px 24px',
          color: '#000',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 14px rgba(255,122,24,0.3)',
          cursor: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 20px rgba(255,122,24,0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 14px rgba(255,122,24,0.3)';
        }}
        >
          Let's talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </motion.nav>
  )
}
