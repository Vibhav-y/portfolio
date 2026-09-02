'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Re-mounts on every route change, so it doubles as a lightweight page
// transition — content fades/slides up as you move between / and /projects.
export default function Template({ children }) {
  const pathname = usePathname()

  // The homepage has its own staged entrance choreography. Keeping the route
  // wrapper's initial opacity there can leave the entire page invisible when
  // a background tab pauses animation frames, so only / bypasses this wrapper.
  if (pathname === '/') return <div>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
