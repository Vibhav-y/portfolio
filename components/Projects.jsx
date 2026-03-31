'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const jottrImg = '/projects/Jottr/image.webp'
const libraflowImg = '/projects/Libraflow/image.webp'
const streamixImg = '/projects/Streamix/image.webp'
const gittoolImg = '/projects/Gittool/image.webp'

const projects = [
  {
    id: 'jottr',
    label: 'FEATURED PROJECT · 01',
    name: 'Jottr Workspace',
    tagline: "Collaboration without friction.",
    description:
      'Real-time collaborative Notion-like workspace with Yjs CRDTs, Next.js and Supabase. Offline editing, role-level security, and zero-latency sync across devices.',
    tags: ['Next.js', 'Yjs', 'Supabase', 'PostgreSQL'],
    image: jottrImg,
    link: 'https://jottr.dev',
    accent: '#6C8EFF',
    stats: [
      { label: 'STATE', value: 'Yjs / CRDT' },
      { label: 'DATABASE', value: 'PostgreSQL' },
      { label: 'DEPLOY', value: 'Vercel' },
    ],
  },
  {
    id: 'libraflow',
    label: 'FULL-STACK · 02',
    name: 'LibraFlow Platform',
    tagline: 'Blog, monetize & connect.',
    description:
      'Full-Stack blogging engine with live chat, Razorpay monetization, JWT Auth, and MongoDB. Rich media editor, threaded comments, and analytics dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    image: libraflowImg,
    link: 'https://libraflow.cc',
    accent: '#4ECDC4',
    stats: [
      { label: 'AUTH', value: 'JWT / OAuth' },
      { label: 'DATABASE', value: 'MongoDB' },
      { label: 'PAYMENTS', value: 'Razorpay' },
    ],
  },
  {
    id: 'streamix',
    label: 'MEDIA PLATFORM · 03',
    name: 'Streamix',
    tagline: 'Stream everything, seamlessly.',
    description:
      'High-performance media streaming platform built for scale. Adaptive bitrate, custom player controls, and real-time analytics dashboard with CDN delivery.',
    tags: ['React', 'HLS', 'Node.js', 'Redis'],
    image: streamixImg,
    link: 'https://streamix-eight-inky.vercel.app/',
    accent: '#FF6B6B',
    stats: [
      { label: 'STREAM', value: 'HLS / MPEG' },
      { label: 'CACHE', value: 'Redis' },
      { label: 'SCALE', value: 'CDN' },
    ],
  },
  {
    id: 'gittool',
    label: 'DEV TOOL · 04',
    name: 'GitTool',
    tagline: 'Git ops made visual.',
    description:
      'A developer productivity tool that wraps complex Git operations in an intuitive visual interface. Branch management, diff viewer, and one-click staging.',
    tags: ['Electron', 'Git', 'Node.js', 'TypeScript'],
    image: gittoolImg,
    link: 'https://gittool.dev',
    accent: '#FFD93D',
    stats: [
      { label: 'PLATFORM', value: 'Electron' },
      { label: 'LANG', value: 'TypeScript' },
      { label: 'TARGET', value: 'Desktop' },
    ],
  },
]

function BrowserChrome({ url, accent }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.5)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
          <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
        ))}
      </div>
      <div style={{
        flex: 1,
        minWidth: 0,
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '6px',
        padding: '5px 12px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.45)',
        fontFamily: 'var(--font-mono)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>
        {url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          background: accent + '22',
          border: `1px solid ${accent}55`,
          borderRadius: '6px',
          padding: '4px 12px',
          fontSize: '12px', fontWeight: 500,
          color: accent,
          textDecoration: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = accent + '44'}
        onMouseLeave={e => e.currentTarget.style.background = accent + '22'}
      >
        Visit ↗
      </a>
    </div>
  )
}

/**
 * Each card uses the *container* scroll progress (tracked on the outer ref),
 * maps its own slice of that progress to a scale, and uses position:sticky.
 */
function ProjectCard({ project, index, count, containerProgress }) {
  const start = index / count
  const end   = (index + 1) / count
  const targetScale = 1 - (count - 1 - index) * 0.04

  const rawScale = useTransform(containerProgress, [start, end], [1, targetScale])
  const scale    = useSpring(rawScale, { stiffness: 120, damping: 30, mass: 0.8 })

  const CARD_TOP = 90

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      position: 'sticky',
      top: `${CARD_TOP + index * 18}px`,
      zIndex: index + 1,
    }}>
      <motion.div style={{ scale, transformOrigin: 'top center', width: '100%', marginTop: '10px' }}>
        <div
          className="liquid-glass project-card-grid"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`,
            background: 'rgba(10,10,12,0.85)',
            backdropFilter: 'blur(24px)',
            minHeight: '72vh',
          }}
        >
          {/* ── LEFT: Info pane ── */}
          <div style={{
            padding: '40px 44px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '0.18em', color: project.accent,
                textTransform: 'uppercase',
              }}>
                {project.label}
              </span>
              <h3 style={{
                fontSize: 'clamp(28px, 2.8vw, 40px)', fontWeight: 600,
                color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
              }}>
                {project.tagline}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, maxWidth: '380px' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    background: project.accent + '18',
                    border: `1px solid ${project.accent}33`,
                    borderRadius: '6px', padding: '4px 12px',
                    fontSize: '12px', fontFamily: 'var(--font-mono)', color: project.accent,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '16px', columnGap: '32px' }}>
                {project.stats.map(s => (
                  <div key={s.label}>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px',
                      color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                      letterSpacing: '0.15em', marginBottom: '6px',
                    }}>
                      {s.label}
                    </p>
                    <p style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Mockup pane ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            background: '#080810', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-30%', right: '-10%',
              width: '60%', height: '60%',
              background: project.accent, filter: 'blur(80px)',
              opacity: 0.08, borderRadius: '50%', pointerEvents: 'none',
            }} />
            <BrowserChrome url={project.link} accent={project.accent} />
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
              <img
                src={project.image}
                alt={`${project.name} interface`}
                loading="lazy"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  display: 'block', transition: 'transform 0.6s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                background: 'linear-gradient(to bottom, transparent, rgba(8,8,16,0.7))',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef(null)

  // Track how the container scrolls through the viewport (window scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="work" style={{ position: 'relative', overflow: 'visible' }}>
      {/* Header */}
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            SELECTED WORK
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', color: '#f9fafc',
            lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '620px',
          }}>
            Real-world systems,<br />not just code.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, maxWidth: '500px' }}>
            I build platforms that solve difficult engineering problems — from CRDT-based real-time sync to scalable full-stack apps.
          </p>
        </motion.div>
      </div>

      {/* Scroll container — must have position:relative for Framer Motion */}
      <div
        ref={containerRef}
        style={{
          height: `${projects.length * 100}vh`,
          position: 'relative',
          paddingLeft: '5vw',
          paddingRight: '5vw',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            count={projects.length}
            containerProgress={scrollYProgress}
          />
        ))}
      </div>

      <div style={{ height: '80px' }} />
    </section>
  )
}
