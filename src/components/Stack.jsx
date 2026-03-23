import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stack = {
  daily: [
    { name: 'TypeScript', icon: '⬡', note: 'primary language' },
    { name: 'React / Next.js', icon: '⬡', note: 'UI layer' },
    { name: 'Node.js', icon: '⬡', note: 'runtime' },
    { name: 'PostgreSQL', icon: '⬡', note: 'database' },
    { name: 'Neovim', icon: '⬡', note: 'editor' },
    { name: 'Warp', icon: '⬡', note: 'terminal' },
    { name: 'Linear', icon: '⬡', note: 'planning' },
    { name: 'Figma', icon: '⬡', note: 'design' },
  ],
  specialties: [
    { name: 'Design Systems', icon: '◈', note: 'tokens → components' },
    { name: 'WebGL / Three.js', icon: '◈', note: 'creative UI' },
    { name: 'Real-time', icon: '◈', note: 'WebSocket · WebRTC' },
    { name: 'Performance', icon: '◈', note: 'profiling · optimising' },
    { name: 'Rust', icon: '◈', note: 'systems programming' },
    { name: 'GraphQL', icon: '◈', note: 'API design' },
  ],
  exploring: [
    { name: 'Elixir / LiveView', icon: '◻', note: 'learning now' },
    { name: 'WASM', icon: '◻', note: 'experiments' },
    { name: 'Edge Functions', icon: '◻', note: 'CF Workers · Deno' },
    { name: 'LLM tooling', icon: '◻', note: 'prompt eng.' },
  ],
}

const columns = [
  { key: 'daily',       label: 'daily_drivers',   accent: 'var(--accent)' },
  { key: 'specialties', label: 'specialties',      accent: '#7c6af7' },
  { key: 'exploring',   label: 'exploring',        accent: '#f59e0b' },
]

function StackItem({ name, icon, note, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid var(--border-subtle)',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: accent, fontSize: 12, lineHeight: 1, opacity: 0.8 }}>{icon}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>
          {name}
        </span>
      </div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
        {note}
      </span>
    </motion.div>
  )
}

export default function Stack() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="stack" style={{ padding: '140px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56 }}
        >
          <p className="section-label">tools &amp; tech</p>
          <h2 className="headline">The Stack</h2>
          <p style={{ marginTop: 14, fontSize: 15, color: 'var(--text-tertiary)', maxWidth: 440, lineHeight: 1.65 }}>
            Not skill bars. Real tools, honest categories, and what I'm actually learning.
          </p>
        </motion.div>

        {/* Config-file-like panel */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {/* File header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(255,255,255,0.02)',
          }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ marginLeft: 10, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              stack.config.ts
            </span>
          </div>

          {/* Three columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }} className="stack-cols">
            {columns.map((col, ci) => (
              <div
                key={col.key}
                style={{
                  padding: '24px 28px',
                  borderRight: ci < 2 ? '1px solid var(--border-subtle)' : 'none',
                }}
                className={ci > 0 ? 'stack-col-hide' : ''}
              >
                {/* Column header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  marginBottom: 20,
                  paddingBottom: 14,
                  borderBottom: `2px solid`,
                  borderImage: `linear-gradient(90deg, ${col.accent}, transparent) 1`,
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: col.accent, fontWeight: 600, letterSpacing: '0.06em' }}>
                    {col.label}
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    [{stack[col.key].length}]
                  </span>
                </div>

                {/* Items */}
                {stack[col.key].map((item, ii) => (
                  <StackItem
                    key={item.name}
                    {...item}
                    accent={col.accent}
                    delay={ci * 0.05 + ii * 0.04}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .stack-cols { grid-template-columns: 1fr !important; }
          .stack-cols > div { border-right: none !important; border-bottom: 1px solid var(--border-subtle); }
        }
      `}</style>
    </section>
  )
}
