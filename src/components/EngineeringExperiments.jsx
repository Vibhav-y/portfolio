import { motion } from 'framer-motion'

const experiments = [
  {
    id: 'e01', title: 'Interactive Git Visualizer', status: 'live', reads: 312,
    desc: 'Renders branching history as an interactive force-directed graph using D3.js. Hover nodes to inspect commit diffs.',
    arch: 'git log → JSON → D3 force graph → SVG',
    tags: ['TypeScript', 'D3.js', 'Git API', 'SVG']
  },
  {
    id: 'e02', title: 'WebSocket Chat Engine', status: 'archived', reads: 89,
    desc: 'A bare-metal WebSocket server built in Rust with Tokio. Benchmarked to handle 10k concurrent connections on a single core.',
    arch: 'TCP → Tokio async → broadcast channel → clients',
    tags: ['Rust', 'Tokio', 'WebSocket']
  },
  {
    id: 'e03', title: 'GLSL Shader Playground', status: 'wip', reads: 47,
    desc: 'Live-coding environment for fragment shaders inside the browser. Edit GLSL and see results at 60fps via WebGL2.',
    arch: 'Monaco → string → WebGL2 shader compile → canvas',
    tags: ['GLSL', 'WebGL2', 'Monaco Editor']
  },
  {
    id: 'e04', title: 'DIY Key-Value Store', status: 'archived', reads: 128,
    desc: 'Implemented a log-structured storage engine with a WAL, memtable, and SSTables — inspired by reading the LevelDB paper.',
    arch: 'Write → WAL → MemTable → compaction → SSTable',
    tags: ['Go', 'Storage', 'LSM Tree']
  },
  {
    id: 'e05', title: 'Edge Function Benchmarks', status: 'live', reads: 201,
    desc: 'Automated benchmark suite comparing cold-start latency across Cloudflare Workers, Deno Deploy, and Vercel Edge. Runs on a cron.',
    arch: 'Cron trigger → parallel fetch → SQLite → dashboard',
    tags: ['TypeScript', 'CF Workers', 'Deno', 'Benchmarking']
  },
  {
    id: 'e06', title: 'Operational Transform Engine', status: 'wip', reads: 64,
    desc: 'Scratch implementation of OT for collaborative text editing — built to understand how Google Docs sync model works.',
    arch: 'Client ops → server transform → broadcast → peers',
    tags: ['TypeScript', 'OT', 'Collab', 'Algorithms']
  }
]

export default function EngineeringExperiments() {
  return (
    <section id="experiments" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '64px' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>engineering experiments</span>
        <h2 className="section-title" style={{ marginTop: '16px', marginBottom: '16px' }}>Things I Built <br/>to Learn.</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px' }}>
          Side experiments, reading-driven implementations, and rabbit holes I fell into. These exist because I was curious, not because they were assigned.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        {experiments.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
            className="liquid-glass lg-card"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <span style={{ color: 'var(--accent)', fontWeight: 600, fontFamily: 'monospace' }}>{exp.id}</span>
                   <span className="tag-capsule" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', padding: '2px 8px', fontSize: '11px' }}>{exp.status}</span>
                </div>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>{exp.reads}</span>
             </div>
             
             <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>{exp.title}</h3>
             <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1 }}>{exp.desc}</p>
             
             <div style={{ background: 'rgba(255,255,255,0.4)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
               <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>// architecture</span>
               <p style={{ marginTop: '4px', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '13px' }}>{exp.arch}</p>
             </div>

             <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
               {exp.tags.map(tag => (
                 <span key={tag} style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>
                   {tag} {tag !== exp.tags[exp.tags.length - 1] && <span style={{ color: 'var(--text-tertiary)', margin: '0 4px' }}>·</span>}
                 </span>
               ))}
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
