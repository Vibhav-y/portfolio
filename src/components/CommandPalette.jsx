import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const commands = [
  { cmd: '/work', label: 'View projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { cmd: '/experiments', label: 'Engineering experiments', action: () => document.getElementById('experiments')?.scrollIntoView({ behavior: 'smooth' }) },
  { cmd: '/oss', label: 'Open source work', action: () => document.getElementById('oss')?.scrollIntoView({ behavior: 'smooth' }) },
  { cmd: '/stack', label: 'Technical stack', action: () => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }) },
  { cmd: '/experience', label: 'Professional path', action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
  { cmd: '/now', label: 'What I\'m doing now', action: () => document.getElementById('now')?.scrollIntoView({ behavior: 'smooth' }) },
  { cmd: '/contact', label: 'Get in touch', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { cmd: '/theme --toggle', label: 'Toggle terminal theme', action: () => console.log('Theme toggle placeholder') },
  { cmd: '/quit', label: 'Exit command palette', action: 'close' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10)
  }, [open])

  const filtered = commands.filter(c => 
    c.cmd.toLowerCase().includes(query.toLowerCase()) || 
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleAction = (cmd) => {
    if (cmd.action === 'close') {
      setOpen(false)
    } else {
      cmd.action()
      setOpen(false)
    }
    setQuery('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((selectedIndex + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter') {
      handleAction(filtered[selectedIndex])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '15vh',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
        }} onClick={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'fit-content',
              background: '#121214',
              border: '1px solid var(--border-strong)',
              borderRadius: 12,
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Input area */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 18 }}>❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--mono)',
                  fontSize: 15,
                }}
              />
              <div style={{
                padding: '2px 6px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 4,
                fontSize: 10,
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--mono)',
              }}>ESC</div>
            </div>

            {/* Results area */}
            <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '8px' }}>
              {filtered.map((cmd, i) => (
                <div
                  key={cmd.cmd}
                  onClick={() => handleAction(cmd)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 8,
                    cursor: 'none',
                    background: i === selectedIndex ? 'rgba(0, 217, 163, 0.08)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 0.1s',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ 
                      fontFamily: 'var(--mono)', 
                      fontSize: 13, 
                      color: i === selectedIndex ? 'var(--accent)' : 'var(--text-primary)' 
                    }}>
                      {cmd.cmd}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{cmd.label}</span>
                  </div>
                  {i === selectedIndex && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', opacity: 0.6 }}>ENTER ↵</span>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                  No commands found matching "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '10px 16px',
              background: 'rgba(0,0,0,0.2)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
                {filtered.length} results available
              </span>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                 <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>↑↓ to navigate</span>
                 <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>↵ to select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
