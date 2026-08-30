'use client'

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

      <div className="edi-sheet">
        {experience.map((exp) => (
          <div key={exp.id} className="edi-row edi-row-exp training-record">

            {/* Meta */}
            <div className="edi-cell training-summary">
              <span style={{ ...labelStyle, marginBottom: '16px' }}>Training</span>
              <div className="training-period">{exp.period}</div>
              <h3 className="training-role">{exp.role}</h3>
              <p className="training-company">@ {exp.company}</p>

              <div className="training-tags" aria-label="Skills covered">
                {exp.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="edi-cell training-details">
              <span style={{ ...labelStyle, marginBottom: '20px' }}>What it covered</span>
              <ul className="training-list">
                {exp.points.map((pt, i) => (
                  <li key={i}>
                    <span className="training-list-number">0{i + 1}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
