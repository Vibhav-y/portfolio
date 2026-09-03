// Monochrome brand mark. brand-mark.png is an alpha silhouette with a
// transparent background, used as a CSS mask rather than drawn as an image, so
// the glyph paints in currentColor and matches the wordmark beside it in both
// themes instead of sitting in its own black box.
export default function BrandMark({ className = '' }) {
  return <span className={`brand-mark ${className}`} aria-hidden="true" />
}
