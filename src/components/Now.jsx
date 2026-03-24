import { motion } from 'framer-motion'

export default function Now() {
  return (
    <section id="now" className="section container">
       <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '64px' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>now</span>
        <h2 className="section-title" style={{ marginTop: '16px', marginBottom: '16px' }}>Current focus.</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px' }}>
          A living snapshot of what I'm spending mental energy on. Inspired by Derek Sivers' /now page.
        </p>
      </motion.div>

      <div className="liquid-glass lg-sheet" style={{ padding: '64px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid var(--accent)', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Updated 2026-03-17</span>
         </div>
         
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 600 }}>## currently building</h3>
               <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>GitTool CLI</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>A powerful command-line interface for GitTool, bringing AI-powered GitHub workflows, repository analysis, and streamlined version control directly to your terminal. Check out the core platform at <a href="https://github.com/Vibhav-y/GitTool" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Vibhav-y/GitTool</a>.</p>
               </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 600 }}>## currently learning</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
                 Elixir + LiveView for real-time collaborative features without the JS complexity. Working through *Programming Elixir 1.6* and building a small kanban board.
               </p>
            </div>
            

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 600 }}>## current focus</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
                 Bridging the gap between theoretical computer science and production-ready applications. Deeply focused on optimizing system architecture, clean code practices, and algorithmic efficiency.
               </p>
            </div>

         </div>
      </div>
    </section>
  )
}
