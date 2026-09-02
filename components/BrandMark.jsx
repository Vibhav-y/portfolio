export default function BrandMark({ size = 28, className = '' }) {
  return (
    <img className={`brand-mark ${className}`} src="/brand-mark.png" width={size} height={size} alt="" aria-hidden="true" />
  )
}
