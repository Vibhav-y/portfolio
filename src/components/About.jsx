import { motion } from 'framer-motion'
import profileImg from '../assets/1774288544676-1-tjs99i.webp'
import resumePdf from '../assets/resume.pdf'

const links = [
  { name: 'GitHub',     url: 'https://github.com/Vibhav-y',    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { name: 'LinkedIn',   url: 'https://www.linkedin.com/in/vibhav-yadav/', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/vibhavydm', icon: 'M11.969 0C5.352 0 .001 5.378.001 11.996s5.351 11.996 11.968 11.996 11.968-5.379 11.968-11.996S18.585 0 11.969 0zM7.221 16.592l-.963-4.832H4.423v6.071H2.477V6.095h1.946v6.052h1.835L7.203 7.3h2.127l-1.01 4.966 2.053 5.565H8.381l-1.16-3.239zm12.302.04v-5.63l-2.008 3.5v2.13h-1.89V6.096h1.89v5.667l2.009-3.535v-2.13h1.889v10.505h-1.89z' },
  { name: 'LeetCode',   url: 'https://leetcode.com/u/vibhav-y/',   icon: 'M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.473 3.833-1.452l2.697-2.606c.514-.515.497-1.366-.037-1.902-.536-.535-1.388-.552-1.903-.038zm-6.495-6.505l-2.112-2.1c-.244-.244-.244-.64 0-.884l2.112-2.113c.244-.244.64-.244.884 0l2.112 2.113c.244.244.244.64 0 .884l-2.112 2.1c-.244.244-.64.244-.884 0z' },
  { name: 'Email',      url: 'mailto:vibhavydm@gmail.com',      icon: 'M12 12.713l11.985-8.713h-23.97l11.985 8.713zm0 2.47l-12-8.725v12.542h24v-12.542l-12 8.725z' },
  { name: 'Resume',     url: resumePdf,                               icon: 'M14 0h-14v24h24v-14l-10-10zm-12 22v-20h9v7h7v13h-16zm6-8h8v2h-8v-2zm0-4h8v2h-8v-2zm0 8h8v2h-8v-2zm6-11l5 5h-5v-5z' },
]

const card = {
  background: 'rgba(15, 15, 20, 0.85)',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  borderRadius: '20px',
}

export default function About() {
  return (
    <section id="about" className="section container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '48px' }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
          color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase',
          display: 'block', marginBottom: '16px'
        }}>About</span>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', color: '#f9fafc', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          Who I am.
        </h2>
      </motion.div>

      {/* ── GLOBAL GRID STYLES ── */}
      <style>{`
        .about-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
          grid-template-areas:
            "desc"
            "pic"
            "heur"
            "edu"
            "cont";
        }
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 35% 30% 35%;
            grid-template-rows: minmax(280px, auto) minmax(420px, auto);
            grid-template-areas:
              "desc pic  heur"
              "edu  edu  cont";
          }
        }
        .about-pill:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="about-grid">

        {/* ── CELL 1: Description (top-left) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ ...card, gridArea: 'desc', padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '100%', height: '100%', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.05, pointerEvents: 'none' }} />
          <h3 style={{ fontSize: '28px', lineHeight: 1.2, color: '#fff', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            I build systems,<br />not just features.
          </h3>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
            Computer Science Engineering student at Lovely Professional University. I specialize in robust backend architectures, interactive frontends, and writing optimized scale-ready code.
          </p>
        </motion.div>

        {/* ── CELL 2: Photo (top-center) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ ...card, gridArea: 'pic', position: 'relative', overflow: 'hidden', minHeight: '280px' }}
        >
          <img
            src={profileImg} alt="Vibhav Yadav" loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'contrast(1.1) saturate(1.1)' }}
          />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.7)', pointerEvents: 'none' }} />
        </motion.div>

        {/* ── CELL 3: Dev Heuristics (top-right) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ ...card, gridArea: 'heur', padding: '40px', display: 'flex', flexDirection: 'column' }}
        >
          <h3 style={{ fontSize: '20px', color: '#fff', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '8px' }}>
            Developer heuristics
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: '24px' }}>
            Core principles guiding my technical decisions and architecture.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '14px', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              principles.ts
            </span>
            <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#a3a3a3', lineHeight: 1.9 }}>
              <span style={{ color: 'var(--accent)' }}>export const</span> rules = [<br />
              {'  '}<span style={{ color: '#E5C07B' }}>"Complexity is a cost."</span>,<br />
              {'  '}<span style={{ color: '#E5C07B' }}>"Ship. Refactor. Scale."</span>,<br />
              {'  '}<span style={{ color: '#E5C07B' }}>"Measure before optimizing."</span><br />
              ]
            </pre>
          </div>
        </motion.div>

        {/* ── CELL 4: Education (bottom-left, HEAVY) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ ...card, gridArea: 'edu', padding: '48px', display: 'flex', flexDirection: 'column' }}
        >
          <h3 style={{ fontSize: '24px', color: '#fff', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '40px' }}>
            Education
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>

            {/* Currently — accent border card */}
            <div style={{ position: 'relative', background: 'rgba(255,122,24,0.05)', border: '1px solid rgba(255,122,24,0.35)', borderRadius: '16px', padding: '14px 20px 14px', paddingTop: '22px' }}>
              <span style={{ position: 'absolute', top: 0, left: '20px', transform: 'translateY(-50%)', background: 'var(--accent)', color: '#000', fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '999px' }}>Currently</span>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>B.Tech CSE</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Lovely Professional University</p>
              </div>
            </div>

            {/* 2022 */}
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '14px 20px 14px', paddingTop: '22px' }}>
              <span style={{ position: 'absolute', top: 0, left: '20px', transform: 'translateY(-50%)', background: 'rgba(25,25,35,1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '999px' }}>2022</span>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em' }}>Intermediate</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>MPVM Prayagraj</p>
              </div>
            </div>

            {/* 2020 */}
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '14px 20px 14px', paddingTop: '22px' }}>
              <span style={{ position: 'absolute', top: 0, left: '20px', transform: 'translateY(-50%)', background: 'rgba(25,25,35,1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '999px' }}>2020</span>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em' }}>Matriculate</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>MPVM Prayagraj</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── CELL 5: Connect (bottom-right, HEAVY) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ ...card, gridArea: 'cont', padding: '48px', display: 'flex', flexDirection: 'column' }}
        >
          <h3 style={{ fontSize: '24px', color: '#fff', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Connect & Explore
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1, alignContent: 'start' }}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="about-pill"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.icon} />
                </svg>
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
