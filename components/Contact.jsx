'use client'

import { useState } from 'react'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

const labelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  color: 'rgba(var(--ink), 0.4)',
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  display: 'block',
  marginBottom: '8px',
}

const valueStyle = {
  color: 'var(--text-primary)',
  fontSize: '16px',
  fontWeight: 500,
  textDecoration: 'none',
}

const fieldLabel = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  color: 'rgba(var(--ink), 0.45)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  marginBottom: '6px',
  display: 'block',
}

const inputStyle = {
  width: '100%',
  background: 'rgba(var(--ink), 0.03)',
  border: '1px solid rgba(var(--ink), 0.1)',
  padding: '12px 14px',
  color: 'var(--text-primary)',
  fontSize: '14px',
  fontFamily: 'var(--font-main)',
  outline: 'none',
  borderRadius: '12px',
}

const blockDivider = {
  height: '1px',
  background: 'rgba(var(--ink), 0.08)',
  margin: '20px 0',
}

const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vibhav-yadav/' },
  { name: 'GitHub', url: 'https://github.com/Vibhav-y' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/vibhavydm' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/vibhav-y/' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const name = (data.get('name') || '').toString().trim()
    const email = (data.get('email') || '').toString().trim()
    const message = (data.get('message') || '').toString().trim()
    const subject = name ? `Portfolio inquiry from ${name}` : 'Portfolio inquiry'
    const body = `${message}\n\n— ${name}${email ? ` <${email}>` : ''}`
    window.location.href = `mailto:vibhavydm@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="section container grid-box">
      <CornerPlus />
      <SectionHeader
        eyebrow="Contact"
        title="Let's build something."
        marginBottom={24}
      />

      <div className="edi-sheet">
        <div className="edi-row edi-row-split">

          {/* LEFT — Info stack */}
          <div className="edi-cell" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Status banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--status-live)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-primary)', fontWeight: 600 }}>
                Open for Opportunities
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.55, marginTop: '10px' }}>
              Currently seeking full-time roles in software engineering, backend systems, and full-stack development.
            </p>

            <div style={blockDivider} />

            {/* Email */}
            <div>
              <span style={labelStyle}>Email</span>
              <a href="mailto:vibhavydm@gmail.com" style={{ ...valueStyle, borderBottom: '1px solid var(--accent)', paddingBottom: '3px' }}>
                vibhavydm@gmail.com
              </a>
            </div>

            <div style={blockDivider} />

            {/* Location */}
            <div>
              <span style={labelStyle}>Location</span>
              <p style={valueStyle}>Jalandhar, Punjab, India</p>
            </div>

            <div style={blockDivider} />

            {/* Social */}
            <div>
              <span style={labelStyle}>Social</span>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...valueStyle, fontSize: '15px', transition: 'color .2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Direct message form */}
          <div className="edi-cell" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ ...labelStyle, marginBottom: '16px' }}>Direct Message</span>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px', flex: 1 }}>
              <div>
                <label style={fieldLabel}>Name</label>
                <input name="name" type="text" placeholder="John Doe" required style={inputStyle} />
              </div>
              <div>
                <label style={fieldLabel}>Email</label>
                <input name="email" type="email" placeholder="john@company.com" required style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label style={fieldLabel}>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell me about your project…"
                  required
                  style={{ ...inputStyle, resize: 'vertical', flex: 1, minHeight: '110px' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  justifySelf: 'start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 22px',
                  background: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background .25s ease, color .25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
              >
                {sent ? 'Opened in your mail client ✓' : 'Send message'}
                {!sent && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        #contact input:focus, #contact textarea:focus { border-color: var(--accent) !important; }
        #contact input::placeholder, #contact textarea::placeholder { color: rgba(var(--ink), 0.3); }
      `}</style>
    </section>
  )
}
