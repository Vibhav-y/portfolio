export default function Footer() {
  return (
    <footer style={{ padding: '40px 0', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          $ exit 0 <span style={{ color: 'var(--text-tertiary)', margin: '0 8px' }}>#</span> vibhav yadav · 2026
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
          built with React + Vite <br/>v1.0.0
        </p>
      </div>
    </footer>
  )
}
