'use client'

import GlassCard from './ui/glass-card'
import SectionHeader from './ui/section-header'
import CornerPlus from './ui/corner-plus'

export default function Now() {
  return (
    <section id="now" className="section container grid-box">
         <CornerPlus />
         <SectionHeader
            eyebrow="now"
            title="Current focus."
            description="A living snapshot of what I'm spending mental energy on. Inspired by Derek Sivers' /now page."
            eyebrowClassName="now-eyebrow"
            titleClassName="section-title"
            descriptionClassName="now-description"
         />

         <GlassCard liquid={false} style={{ padding: 'clamp(28px, 4vw, 48px)', background: 'var(--surface-cell)', border: '1px solid var(--lg-border)', borderRadius: 'var(--r-cell)', boxShadow: 'var(--shadow-cell)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'clamp(24px, 3vw, 40px)', paddingBottom: '20px', borderBottom: '1px solid rgba(var(--ink), 0.08)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'rgba(var(--ink), 0.5)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Updated 2026-03-17</span>
         </div>
         
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(28px, 4vw, 64px)' }}>
            
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
                 The AI stack end to end: embeddings, vector databases, chunking strategies, and how to measure retrieval quality properly. Doing daily DSA practice alongside it.
               </p>
            </div>
            

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 600 }}>## current focus</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
                 Learning AI in depth and building RAG pipelines in real projects, from embeddings and vector stores to retrieval quality. After that, back to sharpening DSA and algorithmic problem solving.
               </p>
            </div>

         </div>
         </GlassCard>
    </section>
  )
}
