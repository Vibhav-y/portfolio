import { useState } from 'react'
import { motion } from 'framer-motion'
import Magnetic from './Magnetic'

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => {
        setFormStatus('idle');
        e.target.reset();
      }, 3000);
    }, 1200);
  };

  return (
    <section id="contact" className="section container" style={{ paddingTop: '80px', paddingBottom: '160px' }}>
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
        }}>Contact</span>

        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 42px)',
          color: '#f9fafc',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
        }}>
          Let's build something.
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>

        {/* Left Column Bento */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* Status Box */}
          <div className="liquid-glass" style={{ padding: '32px', borderRadius: '24px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px', display: 'block' }}>
              Status
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', width: '12px', height: '12px' }}>
                <div style={{ position: 'absolute', inset: 0, background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                <div style={{ position: 'absolute', inset: '2px', background: '#10b981', borderRadius: '50%' }}></div>
              </div>
              <span style={{ fontSize: '18px', color: '#fff', fontWeight: 500 }}>Open for Opportunities</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px', lineHeight: 1.5 }}>
              Currently seeking full-time roles in software engineering, backend systems, and full-stack development.
            </p>
          </div>

          {/* Contact Details Box */}
          <div className="liquid-glass" style={{ padding: '32px', borderRadius: '24px', flexGrow: 1 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '32px', display: 'block' }}>
              Details
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>EMAIL</p>
                <a href="mailto:vibhavydm@gmail.com" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none', borderBottom: '1px solid var(--accent)', paddingBottom: '4px' }}>vibhavydm@gmail.com</a>
              </div>
              <div className="contact-flex">
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>LOCATION</p>
                  <p style={{ color: '#fff', fontSize: '16px' }}>Jalandhar, Punjab, India</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>SOCIAL</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="https://www.linkedin.com/in/vibhav-yadav/" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>LinkedIn</a>
                    <a href="https://github.com/Vibhav-y" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column Bento: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="liquid-glass"
          style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '32px', display: 'block' }}>
            Direct Message
          </span>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>NAME</label>
              <input type="text" placeholder="John Doe" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none'
              }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>EMAIL</label>
              <input type="email" placeholder="john@company.com" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none'
              }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>MESSAGE</label>
              <textarea rows="4" placeholder="Tell me about your project..." style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none',
                resize: 'none', flexGrow: 1
              }}></textarea>
            </div>
            <Magnetic strength={0.1}>
              <button type="submit" disabled={formStatus !== 'idle'} style={{
                width: '100%', padding: '16px', background: formStatus === 'sent' ? '#10b981' : '#fff', color: formStatus === 'sent' ? '#fff' : '#000',
                border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600,
                cursor: formStatus === 'idle' ? 'pointer' : 'default', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                marginTop: '8px',
                transition: 'all 0.3s ease',
                opacity: formStatus === 'sending' ? 0.7 : 1
              }}>
                {formStatus === 'idle' && <>Send Message <span style={{ color: 'var(--accent)' }}>↗</span></>}
                {formStatus === 'sending' && 'Sending...'}
                {formStatus === 'sent' && 'Message Sent! ✓'}
              </button>
            </Magnetic>
          </form>
        </motion.div>

      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        input:focus, textarea:focus { border-color: rgba(255,255,255,0.3) !important; }
      `}</style>
    </section>
  )
}
