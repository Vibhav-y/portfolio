import { motion } from 'framer-motion'

export default function Skills() {
  return (
    <section id="skills" className="section container" style={{ paddingTop: '80px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '64px' }}
      >
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '11px', 
          fontWeight: 600, 
          color: 'rgba(255,255,255,0.4)', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px'
        }}>Capabilities</span>
        
        <h2 style={{ 
          fontSize: 'clamp(32px, 4vw, 42px)', 
          color: '#f9fafc', 
          lineHeight: 1.1, 
          letterSpacing: '-0.03em',
          marginBottom: '24px'
        }}>
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
        {/* Bento Cell 1: Frontend (Spans wider on large screens) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="liquid-glass"
           style={{ 
             gridColumn: '1 / -1',
             padding: '40px',
             borderRadius: '24px',
             display: 'flex', flexDirection: 'column', justifyContent: 'center'
           }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px' }}>
            Daily Drivers
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
             {['Java', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'].map(tech => (
               <div key={tech} style={{ 
                 background: 'rgba(255,255,255,0.03)', 
                 border: '1px solid rgba(255,255,255,0.08)',
                 padding: '12px 24px',
                 borderRadius: '12px',
                 fontSize: '16px',
                 fontWeight: 500,
                 color: '#fff',
                 display: 'flex', alignItems: 'center', gap: '8px'
               }}>
                 <div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                 {tech}
               </div>
             ))}
          </div>
        </motion.div>

        {/* Bento Cell 2: Backend & Systems */}
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
              { name: 'WebSockets', desc: 'Real-time sync' },
              { name: 'Docker', desc: 'Containerization' },
              { name: 'CRDTs (Yjs)', desc: 'Conflict resolution' }
            ].map(sys => (
              <li key={sys.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                 <strong style={{ color: '#fff', fontSize: '15px' }}>{sys.name}</strong>
                 <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{sys.desc}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bento Cell 3: Metrics / Visual */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="liquid-glass"
           style={{ 
             padding: '32px', borderRadius: '24px', 
             display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
             position: 'relative', overflow: 'hidden'
           }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', zIndex: 0 }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px', display: 'block' }}>
              Algorithms
            </span>
            <h3 style={{ fontSize: '32px', color: '#fff', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '4px' }}>5 Stars</h3>
            <p style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 500 }}>Java & Python (HackerRank)</p>
          </div>
          <div style={{ position: 'relative', zIndex: 1, marginTop: '32px' }}>
             <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
               Consistent focus on optimizing data structures and reducing time complexity in edge-case scenarios.
             </p>
          </div>
        </motion.div>

        {/* Bento Cell 4: Current Focus */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="liquid-glass"
           style={{ gridColumn: '1 / -1', padding: '32px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}
        >
           <div>
             <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px', display: 'block' }}>
               Currently Exploring
             </span>
             <h3 style={{ fontSize: '20px', color: '#fff', fontWeight: 500 }}>Next.js 14, Supabase, & LLM integrations</h3>
           </div>
           <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></div>
           </div>
        </motion.div>

      </div>
    </section>
  )
}
