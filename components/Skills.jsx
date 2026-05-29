'use client'

import { motion } from 'framer-motion'
import GlassCard from './ui/glass-card'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

const driverCategories = [
  {
    label: 'Frontend', color: '#6366f1',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Framer', icon: 'https://cdn.simpleicons.org/framer/ffffff' },
    ],
  },
  {
    label: 'Backend', color: '#f97316',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Socket.io', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
      { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/openapiinitiative/ffffff' },
    ],
  },
  {
    label: 'Databases', color: '#22c55e',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ],
  },
  {
    label: 'Tools & DevOps', color: '#a78bfa',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
  },
]

const architecture = [
  { name: 'RESTful APIs', desc: 'Secure & scalable' },
  { name: 'WebSockets', desc: 'Real-time sync' },
  { name: 'Docker', desc: 'Containerization' },
  { name: 'CRDTs (Yjs)', desc: 'Conflict resolution' },
]

const exploring = ['Next.js 14', 'Supabase', 'LLM integrations', 'AWS']

const labelStyle = {
  fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)',
  textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block',
}

function CategoryBlock({ cat }) {
  return (
    <div className="skills-driver-cell">
      <div className="skills-driver-label">
        <div style={{ width: '6px', height: '6px', background: cat.color, flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: cat.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {cat.label}
        </span>
      </div>
      <div className="skills-driver-chips">
        {cat.skills.map(skill => (
          <div key={skill.name} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '6px 12px', borderRadius: '0px',
            fontSize: '14px', fontWeight: 500, color: '#fff',
          }}>
            <img src={skill.icon} alt={skill.name} width={16} height={16} loading="lazy" style={{ objectFit: 'contain', flexShrink: 0 }} />
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="stack" className="section container grid-box">
      <CornerPlus />
      <SectionHeader
        eyebrow="Capabilities"
        title="The Technical Arsenal."
        description="My core stack and problem-solving tools mapped out in an optimized layout."
        marginBottom={24}
      />

      {/* Main grid: Daily Drivers (wide) + side column */}
      <div className="skills-main">

        {/* Daily Drivers — 2x2 inner grid */}
        <GlassCard
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          as={motion.div} liquid={false}
          style={{ padding: 'clamp(24px, 2.6vw, 36px)', borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span style={{ ...labelStyle, marginBottom: '28px' }}>Daily Drivers</span>
          <div className="skills-drivers-grid">
            {driverCategories.map(cat => (
              <CategoryBlock key={cat.label} cat={cat} />
            ))}
          </div>
        </GlassCard>

        {/* Side column */}
        <div className="skills-side">

          {/* Algorithms */}
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            as={motion.div} liquid={false}
            style={{ padding: 'clamp(22px, 2.2vw, 30px)', borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', flex: 1 }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ ...labelStyle, marginBottom: '18px' }}>Algorithms</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '30px', color: '#fff', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    5<span style={{ color: '#E5C07B' }}>★</span>
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>HackerRank</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '30px', color: '#E5C07B', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '2px' }}>250+</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>LeetCode</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginTop: '18px' }}>
                Consistent focus on optimizing data structures and reducing time complexity in edge-case scenarios.
              </p>
            </div>
          </GlassCard>

          {/* Currently Exploring */}
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            as={motion.div} liquid={false}
            style={{ padding: 'clamp(22px, 2.2vw, 30px)', borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', flex: 1 }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ ...labelStyle, marginBottom: '18px' }}>Currently Exploring</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {exploring.map(item => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(34,197,94,0.06)',
                    border: '1px solid rgba(34,197,94,0.22)',
                    padding: '10px 14px', borderRadius: '0px',
                  }}>
                    <div style={{ width: '6px', height: '6px', background: '#22c55e', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Architecture & Systems — full-width bottom bar */}
      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        as={motion.div} liquid={false}
        style={{ padding: 'clamp(16px, 1.6vw, 22px)', borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '16px' }}
      >
        <span style={{ ...labelStyle, marginBottom: '14px' }}>Architecture &amp; Systems</span>
        <div className="skills-arch-grid">
          {architecture.map(sys => (
            <div key={sys.name} className="skills-arch-cell">
              <strong style={{ color: '#fff', fontSize: '16px', display: 'block', marginBottom: '6px' }}>{sys.name}</strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{sys.desc}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  )
}
