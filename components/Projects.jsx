'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'
import ModalShader from './ui/modal-shader'

const PROJECTS = [
  {
    id: 'jottr', name: 'Jottr Workspace', label: 'REAL-TIME COLLAB',
    year: '2024 — present', status: 'Live',
    tags: ['Next.js', 'Yjs', 'Supabase', 'PostgreSQL'],
    image: '/projects/Jottr/image.webp', accent: '#6C8EFF',
    link: 'https://jottr.dev',
    github: null,
    summary: 'A Notion-like collaborative workspace built for zero-friction teamwork.',
    description:
      "Jottr is a collaborative knowledge workspace built around CRDTs so multiple writers can edit the same document without conflicts, locks, or stale snapshots. The editor maintains a local copy of state via Yjs, applies operations optimistically, and reconciles with peers as they come online — including users who have been editing offline. Auth, persistence, and access control all run through Supabase, with Postgres row-level security enforcing per-document permissions at the database layer instead of a fragile middleware tier.",
    features: [
      'Real-time multi-cursor editing with awareness presence',
      'Offline-first — local edits queue and merge on reconnect',
      'Block-based editor (headings, lists, code, tables, embeds)',
      'Nested workspaces and pages with drag-to-reorder hierarchy',
      'Public/private sharing with per-role access control',
      'Markdown import + export, with copy-as-rich-text',
    ],
    highlights: [
      'Yjs CRDT layer + Supabase Realtime for transport',
      'Row-level security: auth enforced in Postgres, not the API',
      'Lightweight presence sync built on Yjs awareness protocol',
    ],
    stats: [['STATE', 'Yjs / CRDT'], ['DATABASE', 'PostgreSQL'], ['DEPLOY', 'Vercel'], ['AUTH', 'Supabase RLS']],
  },
  {
    id: 'libraflow', name: 'LibraFlow Platform', label: 'FULL-STACK BLOG',
    year: '2024', status: 'Live',
    tags: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    image: '/projects/Libraflow/image.webp', accent: '#4ECDC4',
    link: 'https://libraflow.cc',
    github: null,
    summary: 'Full-stack publishing platform with monetisation, live chat, and analytics.',
    description:
      "LibraFlow is a complete publishing platform for independent writers and small editorial teams. It combines a rich Markdown-aware editor, threaded comments, and a paid-subscriber pipeline so creators can ship content and get paid in the same place. Razorpay handles tips, paywalls, and recurring subscriptions; Socket.io powers a live chat layer between readers and authors over Redis pub/sub; and a writer-facing analytics dashboard surfaces reads, retention, and revenue side by side.",
    features: [
      'Rich text editor with embeds, code blocks, and image uploads',
      'Razorpay-powered tips, subscriptions, and soft paywalls',
      'Live chat between readers and authors via Socket.io',
      'Threaded comments with Markdown support and moderation',
      'Author dashboard — views, retention, MRR, top posts',
      'JWT + OAuth (Google, GitHub) authentication',
    ],
    highlights: [
      'Realtime chat scaled across nodes via Redis pub/sub',
      'Soft paywall: first 30% free, remainder gated by subscription',
      'Daily email digest pipeline driven by a cron worker',
    ],
    stats: [['AUTH', 'JWT / OAuth'], ['DATABASE', 'MongoDB'], ['PAYMENTS', 'Razorpay'], ['REALTIME', 'Socket.io']],
  },
  {
    id: 'streamix', name: 'Streamix', label: 'MEDIA PLATFORM',
    year: '2024', status: 'Live',
    tags: ['HLS', 'React', 'Node.js', 'Redis'],
    image: '/projects/Streamix/image.webp', accent: '#FF6B6B',
    link: 'https://streamix-eight-inky.vercel.app/',
    github: null,
    summary: 'High-performance media streaming with adaptive bitrate and edge caching.',
    description:
      "Streamix is a media streaming platform engineered around adaptive bitrate delivery and edge caching. Source media is transcoded into HLS bitrate ladders and served from a CDN, so playback starts within a second regardless of network. The custom HLS.js-based player handles quality switching automatically while posting engagement events back to the backend in real time. Redis caches trending and recommendation data so hot reads never hit Postgres.",
    features: [
      'HLS adaptive bitrate streaming with auto quality switching',
      'Custom HLS.js-based player UI with keyboard controls',
      'Real-time view counts and engagement analytics',
      'CDN delivery for sub-second time-to-first-frame',
      'Search, recommendations, and trending feeds',
      'Watch history with resume-where-you-left-off',
    ],
    highlights: [
      'Multi-bitrate HLS encoding pipeline (240p → 1080p)',
      'Edge cache with sub-second TTFB at the player',
      'Custom engagement events streamed from the player to a metrics worker',
    ],
    stats: [['STREAM', 'HLS / MPEG-DASH'], ['CACHE', 'Redis'], ['SCALE', 'CDN'], ['PLAYER', 'Custom HLS.js']],
  },
  {
    id: 'gittool', name: 'GitTool', label: 'DEV TOOL',
    year: '2024 — present', status: 'In Development',
    tags: ['Electron', 'TypeScript', 'Git', 'Node.js'],
    image: '/projects/Gittool/image.webp', accent: '#FFD93D',
    link: 'https://gittool.dev',
    github: 'https://github.com/Vibhav-y/GitTool',
    summary: 'A cross-platform desktop client that makes complex Git operations visual.',
    description:
      "GitTool is a cross-platform desktop client that wraps the messy parts of Git in a visual interface — branch graphs, side-by-side and inline diffs, stash management, conflict resolution, and interactive rebase. Built with Electron + TypeScript, the same UI ships natively on macOS, Windows, and Linux. The repo layer uses libgit2 bindings for performance, and a file-watcher keeps the UI reactive to external changes so the view never goes stale.",
    features: [
      'Visual branch graph with drag-to-merge and rebase',
      'Side-by-side and inline diff views with syntax highlighting',
      'Stash manager with named, browsable stashes',
      'One-click staging by file, hunk, or individual line',
      'Conflict resolution UI with three-way merge view',
      'Interactive rebase editor (reword / squash / drop)',
    ],
    highlights: [
      'libgit2 bindings — fast repo ops, no shelling out to `git`',
      'File-system watcher keeps the UI reactive to external commits',
      'Theme system with mono fonts and light/dark/system modes',
    ],
    stats: [['PLATFORM', 'Electron'], ['LANG', 'TypeScript'], ['TARGET', 'Desktop'], ['VCS', 'Git 2.x+']],
  },
]

const GITHUB_ICON = 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'

// Section label inside the modal body — mono uppercase with a short accent rule.
function ModalSectionLabel({ children, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
      <span style={{ width: '18px', height: '1px', background: color }} />
      <span className="mono-label" style={{ color }}>
        {children}
      </span>
    </div>
  )
}

/* ── Project detail modal — image left, story right, shader behind ── */
function ProjectModal({ project, onClose }) {
  // Esc to close + lock body scroll while open.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(238,240,244,0.7)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(14px, 2.5vw, 40px)',
      }}
    >
      <motion.div
        initial={{ y: 28, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="pmodal"
      >
        {/* live silk backdrop, tinted to the project accent */}
        <ModalShader accent={project.accent} />

        {/* Close */}
        <motion.button
          aria-label="Close"
          onClick={onClose}
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 3,
            width: 40, height: 40, borderRadius: '999px',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid var(--hairline)',
            color: 'var(--text-primary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 24px rgba(15,23,42,0.14)',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </motion.button>

        {/* LEFT — screenshot floating on the shader */}
        <div className="pmodal-visual">
          <motion.img
            src={project.image}
            alt={project.name}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="pmodal-meta">
            {(project.year || project.status) && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>
                {project.year}
                {project.status && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.status === 'Live' ? 'var(--status-live)' : '#fff' }} />
                    {project.status}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* RIGHT — the story, on a glass panel */}
        <div className="pmodal-panel">
          <div className="pmodal-scroll">
            <span className="mono-label" style={{ color: project.accent, display: 'block', marginBottom: '10px' }}>
              {project.label}
            </span>
            <h3 style={{
              fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 700,
              color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1,
              marginBottom: '12px',
            }}>
              {project.name}
            </h3>

            {project.summary && (
              <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.55, margin: '0 0 22px' }}>
                {project.summary}
              </p>
            )}

            {project.description && (
              <div style={{ marginBottom: '24px' }}>
                <ModalSectionLabel color={project.accent}>Overview</ModalSectionLabel>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {project.description}
                </p>
              </div>
            )}

            {project.features?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <ModalSectionLabel color={project.accent}>Key Features</ModalSectionLabel>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {project.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: '11px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, marginTop: '7px', width: '5px', height: '5px', borderRadius: '50%', background: project.accent }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.highlights?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <ModalSectionLabel color={project.accent}>Technical Highlights</ModalSectionLabel>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {project.highlights.map((h) => (
                    <li key={h} style={{ display: 'flex', gap: '11px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, marginTop: '3px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accent }}>›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <ModalSectionLabel color={project.accent}>Stack</ModalSectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '14px 20px' }}>
                {project.stats.map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: project.accent + '14',
                    border: `1px solid ${project.accent}30`,
                    borderRadius: '999px',
                    padding: '5px 13px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: project.accent,
                    letterSpacing: '0.04em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs pinned at the panel foot */}
          <div className="pmodal-ctas">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '11px 22px', borderRadius: '999px',
                background: project.accent, border: `1px solid ${project.accent}`,
                color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 26px ${project.accent}66` }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Visit live
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '11px 22px', borderRadius: '999px',
                  background: 'rgba(255,255,255,0.7)', border: '1px solid var(--hairline)',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={GITHUB_ICON} /></svg>
                View code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const easeFluid = [0.22, 1, 0.36, 1]

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef(null)
  const cardEls = useRef([])

  useEffect(() => { setMounted(true) }, [])

  // Pinned section: page scroll sets a target progress; a rAF loop eases the
  // rendered progress toward it (exponential smoothing), and every card's
  // transform is computed from that continuous value — no stepping.
  const targetP = useRef(0)
  const currentP = useRef(0)
  const lastFrame = useRef(0)
  const activeRef = useRef(0)

  const applyTransforms = (pv) => {
    cardEls.current.forEach((el, i) => {
      if (!el) return
      const d = Math.max(-3, Math.min(3, i - pv))
      // symmetric: the previous card parks as a left peek, the next as a
      // right peek; both slightly shrunk and dimmed for depth
      const ad = Math.min(Math.abs(d), 1)
      const x = d * 106
      const scale = 1 - 0.14 * ad
      const opacity = 1 - 0.3 * ad
      el.style.transform = `translateX(${x}%) scale(${scale})`
      el.style.opacity = opacity
      el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10))
    })
    const idx = Math.min(PROJECTS.length - 1, Math.max(0, Math.round(pv)))
    if (idx !== activeRef.current) {
      activeRef.current = idx
      setActive(idx)
    }
  }

  useEffect(() => {
    let raf = 0
    const tick = () => {
      lastFrame.current = performance.now()
      const delta = targetP.current - currentP.current
      if (Math.abs(delta) > 0.0004) {
        currentP.current += delta * 0.09
        applyTransforms(currentP.current)
      }
      raf = requestAnimationFrame(tick)
    }

    // Dwell + snap: each card holds the center for a stretch of scroll, then
    // eases to the next with a smoothstep — centered cards need a push to move.
    const DWELL = 0.32
    const shape = (raw) => {
      const seg = Math.floor(raw)
      const f = raw - seg
      const t = Math.min(1, Math.max(0, (f - DWELL) / (1 - 2 * DWELL)))
      return seg + t * t * (3 - 2 * t)
    }

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const range = section.offsetHeight - window.innerHeight
      if (range <= 0) return
      const y = window.scrollY - (section.getBoundingClientRect().top + window.scrollY)
      const v = Math.min(1, Math.max(0, y / range))
      targetP.current = shape(v * (PROJECTS.length - 1))
      // rAF throttled (hidden tab)? apply directly so state never goes stale
      if (performance.now() - lastFrame.current > 250) {
        currentP.current = targetP.current
        applyTransforms(currentP.current)
      }
    }

    applyTransforms(0)
    onScroll()
    raf = requestAnimationFrame(tick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (i) => {
    const section = sectionRef.current
    if (!section) return
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const range = section.offsetHeight - window.innerHeight
    window.scrollTo({
      top: sectionTop + (i / (PROJECTS.length - 1)) * range,
      behavior: 'smooth',
    })
  }

  const project = PROJECTS[active]

  return (
    <>
      <section
        id="work"
        data-section="projects"
        ref={sectionRef}
        style={{ height: `${100 + (PROJECTS.length - 1) * 85}vh`, position: 'relative', paddingBlock: 0 }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="container grid-box" style={{ padding: 'clamp(24px, 3vw, 48px) 0', overflow: 'hidden', width: '100%' }}>
            <div style={{ paddingInline: 'clamp(20px, 3vw, 48px)' }}>
              <SectionHeader
                eyebrow="SELECTED WORK"
                title="Real-world systems, not just code."
                align="left"
                marginBottom={24}
              />
            </div>

            {/* Per-slide header: project name left, summary headline right */}
            <div style={{ paddingInline: 'clamp(20px, 3vw, 48px)', minHeight: '86px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  className="cert-show-head"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: easeFluid }}
                >
                  <div>
                    <span className="mono-label" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      color: project.accent, marginBottom: '8px',
                    }}>
                      <span style={{ width: '20px', height: '1px', background: project.accent }} />
                      {project.label} · {project.year}
                    </span>
                    <h3 style={{
                      fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700,
                      color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15,
                    }}>
                      {project.name}
                    </h3>
                  </div>
                  <p className="cert-show-headline">{project.summary}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card stage — one front card, the next peeking right */}
            <div style={{ position: 'relative', marginTop: '20px' }}>
              <div className="proj-stage">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.id}
                    ref={el => { cardEls.current[i] = el }}
                    className="proj-card"
                    onClick={() => (i === activeRef.current ? setSelected(p) : goTo(i))}
                  >
                    <img src={p.image} alt={p.name} loading="lazy" draggable={false} />
                    <div className="cert-card-cta">
                      <span>Read Casestudy</span>
                    </div>
                  </div>
                ))}
              </div>

              <CarouselArrow dir="left"  disabled={active === 0}                   onClick={() => goTo(active - 1)} />
              <CarouselArrow dir="right" disabled={active === PROJECTS.length - 1} onClick={() => goTo(active + 1)} />
            </div>

            {/* Below: tag pills left, status quote right */}
            <div style={{ paddingInline: 'clamp(20px, 3vw, 48px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  className="cert-show-foot"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeFluid, delay: 0.05 }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {project.tags.map(t => (
                      <span key={t} className="tag-capsule">{t}</span>
                    ))}
                  </div>
                  <div className="cert-quote">
                    <span style={{
                      fontSize: '22px', lineHeight: 1, color: project.accent,
                      fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: '2px',
                    }}>&ldquo;</span>
                    <p style={{
                      fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)',
                      fontStyle: 'italic', margin: 0,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    aria-label={`Go to ${p.name}`}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === active ? '26px' : '8px', height: '8px',
                      borderRadius: '999px', border: 'none', cursor: 'pointer',
                      background: i === active ? 'var(--accent)' : 'rgba(15,23,42,0.18)',
                      transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal — rendered via portal to body */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

function CarouselArrow({ dir, onClick, disabled }) {
  return (
    <motion.button
      aria-label={dir === 'left' ? 'Previous project' : 'Next project'}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.08 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      className="cert-arrow"
      style={{
        [dir]: 'clamp(10px, 2vw, 26px)',
        opacity: disabled ? 0.25 : 1,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'left' ? <path d="M19 12H5M12 19l-7-7 7-7" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
      </svg>
    </motion.button>
  )
}
