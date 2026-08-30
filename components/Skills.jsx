'use client'

import GlassCard from './ui/glass-card'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

// Category dots use the site's own accent family (hero silk / ambient blobs):
// periwinkle, orange, mint, amber — no foreign hues.
const driverCategories = [
  {
    label: 'Frontend', color: '#6C8EFF',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Framer', icon: 'https://cdn.simpleicons.org/framer/0F172A' },
    ],
  },
  {
    label: 'Backend', color: '#f7790f',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Socket.io', icon: 'https://cdn.simpleicons.org/socketdotio/0F172A' },
      { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/openapiinitiative/0F172A' },
    ],
  },
  {
    label: 'Databases', color: '#4ECDC4',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ],
  },
  {
    label: 'Tools & DevOps', color: '#ffb347',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
  },
]

const exploring = ['Next.js 14', 'Supabase', 'LLM integrations', 'AWS']

const labelStyle = {
  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)',
  textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block',
}

// Shared nested-cell surface — same recipe as .edi-sheet / --surface-cell.
const cellCard = {
  background: 'var(--surface-cell)',
  border: '1px solid var(--lg-border)',
  borderRadius: 'var(--r-cell)',
  boxShadow: 'var(--shadow-cell)',
}

// On hover, the chip's cursor becomes the skill's own icon: the SVG is drawn
// onto a small canvas once (browsers need a sized bitmap for custom cursors)
// and cached as a data-URL cursor per icon.
const cursorCache = {}
const iconCursor = (e, src) => {
  const el = e.currentTarget
  if (cursorCache[src]) { el.style.cursor = cursorCache[src]; return }
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    try {
      const c = document.createElement('canvas')
      c.width = 28
      c.height = 28
      c.getContext('2d').drawImage(img, 0, 0, 28, 28)
      cursorCache[src] = `url(${c.toDataURL('image/png')}) 14 14, pointer`
      el.style.cursor = cursorCache[src]
    } catch { /* tainted canvas or decode failure — keep default cursor */ }
  }
  img.src = src
}

function CategoryBlock({ cat }) {
  return (
    <div className="skills-driver-cell">
      <div className="skills-driver-label">
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
        <span className="mono-label">
          {cat.label}
        </span>
      </div>
      <div className="skills-driver-chips">
        {cat.skills.map(skill => (
          <div
            key={skill.name}
            className="tag-capsule"
            style={{ gap: '8px', padding: '7px 14px' }}
            onMouseEnter={(e) => iconCursor(e, skill.icon)}
          >
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
          liquid={false}
          style={{ ...cellCard, padding: 'clamp(22px, 2.4vw, 34px)' }}
        >
          <span style={{ ...labelStyle, marginBottom: '22px' }}>Daily Drivers</span>
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
            liquid={false}
            style={{ ...cellCard, padding: 'clamp(20px, 2.2vw, 30px)', position: 'relative', overflow: 'hidden', flex: 1 }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ ...labelStyle, marginBottom: '18px' }}>Algorithms</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '34px', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    5<span style={{ color: 'var(--accent)' }}>★</span>
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>HackerRank</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '34px', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '2px' }}>250<span style={{ color: 'var(--accent)' }}>+</span></h3>
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
            liquid={false}
            style={{ ...cellCard, padding: 'clamp(20px, 2.2vw, 30px)', position: 'relative', overflow: 'hidden', flex: 1 }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ ...labelStyle, marginBottom: '18px' }}>Currently Exploring</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {exploring.map(item => (
                  <div key={item} className="tag-capsule" style={{ gap: '10px', padding: '7px 14px', minWidth: 0 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--status-live)', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

    </section>
  )
}
