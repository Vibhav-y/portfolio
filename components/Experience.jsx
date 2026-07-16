'use client'

import { motion } from 'framer-motion'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

const experience = [
  {
    id: 1,
    role: 'Full-Stack & DSA Training',
    company: 'W3Grads',
    period: 'Jun 2025 — Jul 2025',
    points: [
      'Intensive training program focused on modern web development paradigms.',
      'Built end-to-end applications demonstrating proficiency in core full-stack technologies.',
      'Mastered data structures and algorithms, achieving 5-star ratings on HackerRank in both Java and Python.',
      'Developed a strong foundation in computer science fundamentals, including operating systems, database management systems, and computer networks.',
    ],
    tags: ['DSA', 'React', 'Node.js', 'Express', 'MongoDB'],
  },
]

const labelStyle = {
  fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(var(--ink), 0.4)',
  textTransform: 'uppercase', letterSpacing: '0.16em', display: 'block',
}

export default function Experience() {
  return (
    <section id="experience" className="section container grid-box">
      <CornerPlus />
      <SectionHeader
        eyebrow="experience"
        title="Training"
        description="Not just theory — applying learned concepts to real-world development and system design."
        align="left"
        marginBottom={32}
      />

      <motion.div
        className="edi-sheet"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        {experience.map((exp) => (
          <div key={exp.id} className="edi-row edi-row-exp">

            {/* Meta */}
            <div className="edi-cell" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <span style={{ ...labelStyle, marginBottom: '16px' }}>Role</span>
                <h3 style={{ fontSize: 'clamp(22px, 2.1vw, 28px)', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '12px' }}>
                  {exp.role}
                </h3>
                <p style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 600 }}>@ {exp.company}</p>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(var(--ink), 0.5)', fontSize: '13px', marginTop: '10px' }}>{exp.period}</p>
              </div>

              {/* Tags — square */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {exp.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    border: '1px solid rgba(var(--ink), 0.14)',
                    padding: '6px 12px', color: 'rgba(var(--ink), 0.8)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="edi-cell">
              <span style={{ ...labelStyle, marginBottom: '20px' }}>Details</span>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0, margin: 0 }}>
                {exp.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', gap: '14px', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', marginTop: '4px', flexShrink: 0 }}>
                      0{i + 1}
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
