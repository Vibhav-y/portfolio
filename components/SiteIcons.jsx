function Icon({ size = 18, className, children }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">{children}</svg>
}

export function ArrowMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="M3 16 16 3M8 3h8v8" stroke="currentColor" strokeWidth="1.55" strokeLinecap="square" strokeLinejoin="miter" /></Icon> }
export function MailMark({ size = 18, className }) { return <Icon size={size} className={className}><rect x="2.5" y="4" width="15" height="12" rx=".5" stroke="currentColor" strokeWidth="1.45" /><path d="m3.4 5 6.6 5 6.6-5" stroke="currentColor" strokeWidth="1.45" /></Icon> }
export function PinMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="M10 17s5-4.3 5-8.5A5 5 0 0 0 5 8.5C5 12.7 10 17 10 17Z" stroke="currentColor" strokeWidth="1.45" /><circle cx="10" cy="8.5" r="1.65" fill="currentColor" /></Icon> }
export function MenuMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.45" /></Icon> }
export function CloseMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.45" /></Icon> }
export function CodeMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="m7 4-5 6 5 6M13 4l5 6-5 6M11.5 2.5 8.5 17.5" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="miter" /></Icon> }
