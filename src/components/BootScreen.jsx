import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLogs = [
  { text: 'initializing antigravity_kernel v4.2.0...', delay: 0 },
  { text: 'scanning hardware modules...', delay: 400 },
  { text: 'detected: neural_core [8 cores]', delay: 600 },
  { text: 'detected: gpu_accelerator [active]', delay: 800 },
  { text: 'loading system_assets...', delay: 1200 },
  { text: 'connecting to node_v5173...', delay: 1600 },
  { text: 'establishing secure handshake...', delay: 1900 },
  { text: 'mounting portfolio_v2.fs...', delay: 2200 },
  { text: 'booting user_interface...', delay: 2600 },
  { text: 'READY.', delay: 3000, final: true },
]

export default function BootScreen({ onComplete }) {
  const [logs, setLogs] = useState([])
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    bootLogs.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log])
        if (log.final) {
          setTimeout(() => setIsDone(true), 800)
          setTimeout(() => onComplete(), 1400)
        }
      }, log.delay)
    })
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0b0b0c',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
          }}
        >
          <div style={{
            width: '100%',
            maxWidth: '500px',
            fontFamily: 'var(--mono)',
            fontSize: '13px',
            lineHeight: '1.6',
            color: 'var(--accent)',
          }}>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  marginBottom: '4px',
                  color: log.final ? 'white' : 'var(--accent)',
                  fontWeight: log.final ? 'bold' : 'normal'
                }}
              >
                <span style={{ opacity: 0.5, marginRight: '10px' }}>[{new Date().toLocaleTimeString('en-GB')}]</span>
                <span>{log.text}</span>
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                background: 'var(--accent)',
                verticalAlign: 'middle',
                marginLeft: '4px'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
