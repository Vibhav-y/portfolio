'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

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

/* ── Filmstrip: alternating image pills + name text, auto-scrolls ── */
function FilmStrip({ project, speed }) {
  const reps = [...Array(10), ...Array(10)]
  return (
    <div style={{ display: 'flex', gap: '18px', alignItems: 'center', animation: `marquee ${speed}s linear infinite`, width: 'max-content' }}>
      {reps.map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{
            width: 'clamp(160px,16vw,240px)',
            height: '78px',
            borderRadius: '999px',
            overflow: 'hidden',
            flexShrink: 0,
            background: '#0a0a12',
            border: `1px solid ${project.accent}22`,
          }}>
            <img
              src={project.image}
              alt={project.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>
          <span style={{
            fontSize: 'clamp(22px,2.4vw,34px)',
            fontWeight: 700,
            letterSpacing: '-.035em',
            textTransform: 'uppercase',
            color: project.accent,
            flexShrink: 0,
            padding: '0 24px',
            whiteSpace: 'nowrap',
            opacity: .85,
          }}>
            {project.name}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Single project row ── */
function ProjectRow({ project, index, isBold, onOpen }) {
  const [hov, setHov] = useState(false)
  const titleSize = isBold
    ? 'clamp(36px,5.5vw,72px)'
    : 'clamp(32px,4.8vw,64px)'
  const collapsedH = isBold ? 100 : 90
  const expandedH = isBold ? 270 : 248
  const stripSpeed = 26

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project) } }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        cursor: 'pointer',
        color: 'inherit',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        overflow: 'hidden',
        height: hov ? expandedH : collapsedH,
        transition: 'height .55s cubic-bezier(.22,1,.36,1), background .3s',
        background: hov ? `${project.accent}08` : 'transparent',
        position: 'relative',
        outline: 'none',
      }}
    >
      {/* ── Title bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        height: `${collapsedH}px`,
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,.22)', minWidth: '28px', flexShrink: 0 }}>
            0{index + 1}
          </span>
          <h3 style={{
            fontSize: titleSize,
            fontWeight: 700,
            letterSpacing: '-.04em',
            textTransform: 'uppercase',
            color: hov ? project.accent : 'var(--text-primary)',
            transition: 'color .3s ease',
            lineHeight: 1,
          }}>
            {project.name}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.14em',
            textTransform: 'uppercase', color: project.accent,
            opacity: hov ? 1 : 0, transition: 'opacity .3s',
          }}>
            {project.label}
          </span>
          <div style={{
            width: 36, height: 36, flexShrink: 0,
            border: `1px solid ${hov ? project.accent : 'rgba(255,255,255,.18)'}`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hov ? project.accent : 'rgba(255,255,255,.35)',
            transform: hov ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'all .32s cubic-bezier(.22,1,.36,1)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Filmstrip preview on hover ── */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          height: `${expandedH - collapsedH}px`,
          overflow: 'hidden',
          opacity: hov ? 1 : 0,
          transition: 'opacity .35s ease .1s',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <FilmStrip project={project} speed={stripSpeed} />
      </div>

      {/* Accent left border on hover */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
        background: project.accent,
        opacity: hov ? 1 : 0,
        transition: 'opacity .3s ease',
      }} />
    </div>
  )
}

// Section label inside the modal body — mono uppercase with a short accent rule.
function ModalSectionLabel({ children, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
      <span style={{ width: '18px', height: '1px', background: color }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color }}>
        {children}
      </span>
    </div>
  )
}

/* ── Project detail modal ── */
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
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '900px',
          background: 'var(--bg-base)',
          border: `1px solid ${project.accent}55`,
          boxShadow: `0 30px 90px rgba(0,0,0,0.65), 0 0 0 1px ${project.accent}18`,
          position: 'relative',
          maxHeight: 'calc(100vh - 48px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: 'clamp(20px, 2.2vw, 28px) clamp(24px, 2.6vw, 36px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: project.accent, display: 'block', marginBottom: '8px',
            }}>
              {project.label}
            </span>
            <h3 style={{
              fontSize: 'clamp(24px, 2.6vw, 34px)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: project.year ? '10px' : 0,
            }}>
              {project.name}
            </h3>
            {(project.year || project.status) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                {project.year && <span>{project.year}</span>}
                {project.year && project.status && <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.3)' }} />}
                {project.status && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '6px', height: '6px',
                      background: project.status === 'Live' ? '#10b981' : project.accent,
                    }} />
                    {project.status}
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            style={{
              flexShrink: 0,
              width: 36, height: 36,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Image */}
          <div style={{
            position: 'relative',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: '#080810',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 50% 0%, ${project.accent}22, transparent 60%)`,
              pointerEvents: 'none',
            }} />
            <img
              src={project.image}
              alt={project.name}
              style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '400px' }}
            />
          </div>

          {/* Body content */}
          <div style={{ padding: 'clamp(20px, 2.4vw, 32px) clamp(24px, 2.6vw, 36px)', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Summary tagline */}
            {project.summary && (
              <p style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', color: '#fff', fontWeight: 500, lineHeight: 1.5, margin: 0, letterSpacing: '-0.005em' }}>
                {project.summary}
              </p>
            )}

            {/* Description */}
            {project.description && (
              <div>
                <ModalSectionLabel color={project.accent}>Overview</ModalSectionLabel>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
                  {project.description}
                </p>
              </div>
            )}

            {/* Features */}
            {project.features?.length > 0 && (
              <div>
                <ModalSectionLabel color={project.accent}>Key Features</ModalSectionLabel>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px 24px' }}>
                  {project.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      <span style={{ flexShrink: 0, marginTop: '7px', width: '5px', height: '5px', background: project.accent }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {project.highlights?.length > 0 && (
              <div>
                <ModalSectionLabel color={project.accent}>Technical Highlights</ModalSectionLabel>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {project.highlights.map((h) => (
                    <li key={h} style={{ display: 'flex', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      <span style={{ flexShrink: 0, marginTop: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accent, letterSpacing: '0.08em' }}>›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats */}
            <div>
              <ModalSectionLabel color={project.accent}>Stack</ModalSectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '18px 24px' }}>
                {project.stats.map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: project.accent + '14',
                    border: `1px solid ${project.accent}30`,
                    padding: '5px 12px',
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
        </div>

        {/* Footer CTAs */}
        <div style={{
          padding: 'clamp(16px, 1.8vw, 22px) clamp(24px, 2.6vw, 36px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 22px',
              background: project.accent,
              border: `1px solid ${project.accent}`,
              color: '#000',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px ${project.accent}55` }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
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
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 22px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={GITHUB_ICON} /></svg>
              View code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects({ variant }) {
  const isBold = variant === 'raw'
  const [selected, setSelected] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section id="work" data-section="projects" className="section container grid-box" style={{ position: 'relative' }}>
      <CornerPlus />
      <SectionHeader
        eyebrow="SELECTED WORK"
        title={<>Real-world systems,<br />not just code.</>}
        description="Click any project for the full story."
        marginBottom={0}
      />

      {/* Rows */}
      <div style={{ marginTop: '56px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} isBold={isBold} onOpen={setSelected} />
        ))}
      </div>

      {/* Modal — rendered via portal to body */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
