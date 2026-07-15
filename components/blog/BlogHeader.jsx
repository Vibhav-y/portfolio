'use client'

// Lightweight top bar for the blog section. The main site Navbar is built around
// home-page section anchors, so writing pages get their own minimal chrome.
import { motion } from 'framer-motion'

export default function BlogHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="blog-header"
    >
      <a href="/" className="blog-header__brand">VY.</a>
      <nav className="blog-header__nav">
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/blog" aria-current="page">Writing</a>
      </nav>
    </motion.header>
  )
}
