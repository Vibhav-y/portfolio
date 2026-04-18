'use client'

import { motion } from 'framer-motion'
import GlassCard from './ui/glass-card'
import SectionHeader from './ui/section-header'

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
      'Developed a strong foundation in computer science fundamentals, including operating systems, database management systems, and computer networks.'
    ],
    tags: ['DSA','React', 'Node.js', 'Express', 'MongoDB']
  }
]

export default function Experience() {
  return (
    <section id="experience" className="section container">
      <SectionHeader
        eyebrow="experience"
        title="Training"
        description="Not just theory — applying learned concepts to real-world development and system design."
        align="center"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '24px' }}>
        {experience.map((exp, idx) => (
          <GlassCard
            key={exp.id}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="exp-grid"
            style={{ 
              padding: 'clamp(24px, 5vw, 40px)',
              borderRadius: '24px',
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '8px' }}>{exp.period}</p>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{exp.role}</h3>
              <p style={{ color: 'var(--accent)', fontSize: '15px' }}>@ {exp.company}</p>
            </div>
            
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '16px', display: 'block', textTransform: 'uppercase' }}>Details</span>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', padding: 0 }}>
                {exp.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent)', marginTop: '2px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span> 
                    {pt}
                  </li>
                ))}
              </ul>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '11px',
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    padding: '6px 12px', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
