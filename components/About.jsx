'use client'

import { motion } from 'framer-motion'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

const profileImg = '/1774288544676-1-tjs99i.webp'
const resumePdf = '/resume/general%20cv.pdf'

const links = [
  { name: 'GitHub',     url: 'https://github.com/Vibhav-y',    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { name: 'LinkedIn',   url: 'https://www.linkedin.com/in/vibhav-yadav/', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/vibhavydm', icon: 'M11.969 0C5.352 0 .001 5.378.001 11.996s5.351 11.996 11.968 11.996 11.968-5.379 11.968-11.996S18.585 0 11.969 0zM7.221 16.592l-.963-4.832H4.423v6.071H2.477V6.095h1.946v6.052h1.835L7.203 7.3h2.127l-1.01 4.966 2.053 5.565H8.381l-1.16-3.239zm12.302.04v-5.63l-2.008 3.5v2.13h-1.89V6.096h1.89v5.667l2.009-3.535v-2.13h1.889v10.505h-1.89z' },
  { name: 'LeetCode',   url: 'https://leetcode.com/u/vibhav-y/',   icon: 'M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.473 3.833-1.452l2.697-2.606c.514-.515.497-1.366-.037-1.902-.536-.535-1.388-.552-1.903-.038zm-6.495-6.505l-2.112-2.1c-.244-.244-.244-.64 0-.884l2.112-2.113c.244-.244.64-.244.884 0l2.112 2.113c.244.244.244.64 0 .884l-2.112 2.1c-.244.244-.64.244-.884 0z' },
  { name: 'Email',      url: 'mailto:vibhavydm@gmail.com',      icon: 'M12 12.713l11.985-8.713h-23.97l11.985 8.713zm0 2.47l-12-8.725v12.542h24v-12.542l-12 8.725z' },
  { name: 'Resume',     url: resumePdf,                          icon: 'M14 0h-14v24h24v-14l-10-10zm-12 22v-20h9v7h7v13h-16zm6-8h8v2h-8v-2zm0-4h8v2h-8v-2zm0 8h8v2h-8v-2zm6-11l5 5h-5v-5z' },
]

const education = [
  { year: 'Currently', degree: 'B.Tech CSE', school: 'Lovely Professional University', current: true },
  { year: '2022', degree: 'Intermediate', school: 'MPVM Prayagraj' },
  { year: '2020', degree: 'Matriculate', school: 'MPVM Prayagraj' },
]

const heuristics = ['"Complexity is a cost."', '"Ship. Refactor. Scale."', '"Measure before optimizing."']

const mantras = [
  "You're not tired. You're undisciplined.",
  'Doubt kills more dreams than failure ever will.',
]

const labelStyle = {
  fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)',
  textTransform: 'uppercase', letterSpacing: '0.16em', display: 'block',
}

export default function About() {
  return (
    <section id="about" className="section container grid-box">
      <CornerPlus />
      <SectionHeader
        eyebrow="About"
        title="Who I am."
        marginBottom={24}
        eyebrowClassName="about-eyebrow"
      />

      <motion.div
        className="edi-sheet"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >

        {/* Row 1: Intro + Photo */}
        <div className="edi-row edi-row-2">
          <div className="edi-cell" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '32px' }}>
            <div>
              <span style={{ ...labelStyle, marginBottom: '14px' }}>Profile</span>
              <h3 style={{ fontSize: 'clamp(24px, 2.3vw, 32px)', lineHeight: 1.12, color: '#fff', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '16px' }}>
                I build systems,<br />not just features.
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '560px' }}>
                Computer Science Engineering student at Lovely Professional University. I specialize in robust backend architectures, interactive frontends, and writing optimized scale-ready code.
              </p>
            </div>
            <div>
              {/* separator between Profile and the lower blocks */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '28px' }} />
              <div className="about-inner-grid">
                {/* Developer Heuristics */}
                <div>
                  <span style={{ ...labelStyle, marginBottom: '14px' }}>Developer Heuristics</span>
                  <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#a3a3a3', lineHeight: 1.9 }}>
                    <span style={{ color: 'var(--accent)' }}>const</span> rules = [{'\n'}
                    {heuristics.map((h, i) => (
                      <span key={i}>{'  '}<span style={{ color: '#E5C07B' }}>{h}</span>{i < heuristics.length - 1 ? ',' : ''}{'\n'}</span>
                    ))}
                    ]
                  </pre>
                </div>
                {/* Mantras */}
                <div className="about-mantras">
                  <span style={{ ...labelStyle, marginBottom: '18px' }}>Mantras</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {mantras.map((q, i) => (
                      <p key={i} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '14px', fontSize: '15px', fontWeight: 600, color: '#fff', lineHeight: 1.45, letterSpacing: '-0.01em' }}>
                        {q}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="edi-cell edi-cell--flush about-photo-cell" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3 / 4', alignSelf: 'stretch' }}>
            <img
              src={profileImg} alt="Vibhav Yadav" loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', filter: 'grayscale(0.15) contrast(1.05)' }}
            />
            <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 90px rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Row 2: Education | Connect */}
        <div className="edi-row edi-row-split">
          <div className="edi-cell">
          <span style={{ ...labelStyle, marginBottom: '14px' }}>Education</span>
          <div>
            {education.map((e, i) => (
              <div key={e.degree} style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
                padding: '11px 0',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: e.current ? 'var(--accent)' : 'rgba(255,255,255,0.4)', minWidth: '90px',
                  }}>
                    {e.year}
                  </span>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: e.current ? '#fff' : 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>
                    {e.degree}
                  </h4>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right' }}>{e.school}</span>
              </div>
            ))}
          </div>
          </div>

          {/* Connect */}
          <div className="edi-cell">
            <span style={{ ...labelStyle, marginBottom: '14px' }}>Connect</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {links.map((link, i) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="edi-link"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '11px 4px',
                    textDecoration: 'none',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '14px', fontWeight: 500,
                    borderTop: i >= 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    borderLeft: i % 2 === 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    paddingLeft: i % 2 === 1 ? '18px' : '4px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d={link.icon} />
                  </svg>
                  {link.name}
                  <span className="edi-arrow">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
