import { motion, AnimatePresence } from 'framer-motion'

const graphs = {
  'monorepo': [
    { id: 't', label: 'Tokens', x: 20, y: 50 },
    { id: 'c', label: 'CSS Vars', x: 100, y: 50 },
    { id: 'r', label: 'React', x: 180, y: 50 },
    { from: 't', to: 'c' },
    { from: 'c', to: 'r' }
  ],
  'event-driven': [
    { id: 'k', label: 'Kafka', x: 20, y: 50 },
    { id: 'f', label: 'Flink', x: 100, y: 50 },
    { id: 'p', label: 'PG Materialized', x: 180, y: 50 },
    { from: 'k', to: 'f' },
    { from: 'f', to: 'p' }
  ],
  'p2p-mesh': [
    { id: 'n1', label: 'Peer A', x: 50, y: 20 },
    { id: 'n2', label: 'Peer B', x: 150, y: 20 },
    { id: 's', label: 'Signaling', x: 100, y: 80 },
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 's' },
    { from: 'n2', to: 's' }
  ],
  'edge-first': [
    { id: 'e', label: 'Edge Worker', x: 50, y: 50 },
    { id: 'kv', label: 'KV Store', x: 150, y: 50 },
    { from: 'e', to: 'kv', bidir: true }
  ]
}

export default function ArchitectureGraph({ tag, visible }) {
  const data = graphs[tag] || graphs['edge-first']
  const nodes = data.filter(d => d.id)
  const edges = data.filter(d => d.from)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            right: 0,
            width: 240,
            height: 120,
            background: 'rgba(13, 17, 23, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--accent)',
            borderRadius: 8,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            padding: 12,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 220 100">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
              </marker>
            </defs>
            
            {/* Edges */}
            {edges.map((edge, i) => {
              const fromNode = nodes.find(n => n.id === edge.from)
              const toNode = nodes.find(n => n.id === edge.to)
              return (
                <motion.line
                  key={`${edge.from}-${edge.to}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  x1={fromNode.x} y1={fromNode.y}
                  x2={toNode.x} y2={toNode.y}
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  markerEnd="url(#arrow)"
                />
              )
            })}

            {/* Nodes */}
            {nodes.map((node, i) => (
              <g key={node.id}>
                <motion.circle
                  initial={{ r: 0 }}
                  animate={{ r: 4 }}
                  transition={{ type: 'spring', damping: 10, delay: i * 0.15 }}
                  cx={node.x} cy={node.y}
                  fill="var(--accent)"
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  x={node.x} y={node.y - 10}
                  textAnchor="middle"
                  fill="white"
                  style={{ fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 500 }}
                >
                  {node.label}
                </motion.text>
              </g>
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
