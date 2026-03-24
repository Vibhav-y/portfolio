import { motion } from 'framer-motion'

export default function Skills() {
  return (
    <section id="stack" className="section container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '64px' }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
          color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase',
          display: 'block', marginBottom: '16px'
        }}>Capabilities</span>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', color: '#f9fafc', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>
          The Technical Arsenal.
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px' }}>
          My core stack and problem-solving tools mapped out in an optimized layout.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gridAutoRows: 'minmax(200px, auto)',
        gap: '24px'
      }}>

        {/* Cell 1: Daily Drivers — full width, categorized with icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="liquid-glass"
          style={{ gridColumn: '1 / -1', padding: '40px', borderRadius: '24px' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '32px', display: 'block' }}>
            Daily Drivers
          </span>

          {[
            {
              label: 'Frontend', color: '#6366f1',
              skills: [
                { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
                { name: 'Framer',     icon: 'https://cdn.simpleicons.org/framer/ffffff' },
              ],
            },
            {
              label: 'Backend', color: '#f97316',
              skills: [
                { name: 'Node.js',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'Express',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
                { name: 'Java',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { name: 'Python',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                { name: 'Socket.io', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
                { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/openapiinitiative/ffffff' },
              ],
            },
            {
              label: 'Databases', color: '#22c55e',
              skills: [
                { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                { name: 'Redis',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
              ],
            },
            {
              label: 'Tools & DevOps', color: '#a78bfa',
              skills: [
                { name: 'Git',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                { name: 'GitHub',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
                { name: 'Docker',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
              ],
            },
          ].map((cat, i, arr) => (
            <div key={cat.label} style={{ marginBottom: i < arr.length - 1 ? '28px' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: cat.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {cat.label}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {cat.skills.map(skill => (
                  <div key={skill.name} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '8px 16px', borderRadius: '10px',
                    fontSize: '14px', fontWeight: 500, color: '#fff',
                  }}>
                    <img src={skill.icon} alt={skill.name} width={16} height={16} loading="lazy" style={{ objectFit: 'contain', flexShrink: 0 }} />
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cell 2: Architecture & Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="liquid-glass"
          style={{ padding: '32px', borderRadius: '24px' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px', display: 'block' }}>
            Architecture & Systems
          </span>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'RESTful APIs', desc: 'Secure & scalable' },
              { name: 'WebSockets',   desc: 'Real-time sync' },
              { name: 'Docker',       desc: 'Containerization' },
              { name: 'CRDTs (Yjs)', desc: 'Conflict resolution' },
            ].map(sys => (
              <li key={sys.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                <strong style={{ color: '#fff', fontSize: '15px' }}>{sys.name}</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{sys.desc}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Cell 3: Algorithms stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="liquid-glass"
          style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px', display: 'block' }}>
              Algorithms
            </span>
            <h3 style={{ fontSize: '32px', color: '#fff', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '4px' }}>5 Stars</h3>
            <p style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 500, marginBottom: '10px' }}>Java & Python (HackerRank)</p>
            <h3 style={{ fontSize: '32px', color: '#E5C07B', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '4px' }}>250+</h3>
            <p style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 500 }}>questions solved (LeetCode)</p>
          </div>
          <div style={{ position: 'relative', zIndex: 1, marginTop: '32px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              Consistent focus on optimizing data structures and reducing time complexity in edge-case scenarios.
            </p>
          </div>
        </motion.div>

        {/* Cell 4: Currently Exploring — square card beside Algorithms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="liquid-glass"
          style={{
            padding: '32px', borderRadius: '24px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px', display: 'block' }}>
              Currently Exploring
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Next.js 14', 'Supabase', 'LLM integrations', 'AWS'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
                  <span style={{ fontSize: '16px', fontWeight: 500, color: '#fff' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, marginTop: '32px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              Actively building and shipping projects with these technologies.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
