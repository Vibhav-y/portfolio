// Original personal mark, inheriting the surrounding text color in every theme.
export default function BrandMark({ className = '' }) {
  return <span className={`brand-mark ${className}`} aria-hidden="true" />
}
