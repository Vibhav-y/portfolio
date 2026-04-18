'use client'

import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  marginBottom = 64,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  descriptionWidth = 600,
  titleTag: TitleTag = 'h2',
}) {
  const isCentered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom, textAlign: isCentered ? 'center' : 'left' }}
    >
      {eyebrow ? (
        <span
          className={cn('section-header-eyebrow', eyebrowClassName)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          {eyebrow}
        </span>
      ) : null}

      <TitleTag
        className={cn('section-header-title', titleClassName)}
        style={{
          fontSize: 'clamp(32px, 4vw, 42px)',
          color: '#f9fafc',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: description ? '24px' : 0,
        }}
      >
        {title}
      </TitleTag>

      {description ? (
        <p
          className={cn('section-header-description', descriptionClassName)}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '16px',
            lineHeight: 1.7,
            maxWidth: typeof descriptionWidth === 'number' ? `${descriptionWidth}px` : descriptionWidth,
            margin: isCentered ? '0 auto' : 0,
          }}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}