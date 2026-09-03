function Icon({ size = 18, className, children }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">{children}</svg>
}

export function ArrowMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="M3 16 16 3M8 3h8v8" stroke="currentColor" strokeWidth="1.55" strokeLinecap="square" strokeLinejoin="miter" /></Icon> }
export function MailMark({ size = 18, className }) { return <Icon size={size} className={className}><rect x="2.5" y="4" width="15" height="12" rx=".5" stroke="currentColor" strokeWidth="1.45" /><path d="m3.4 5 6.6 5 6.6-5" stroke="currentColor" strokeWidth="1.45" /></Icon> }
export function PinMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="M10 17s5-4.3 5-8.5A5 5 0 0 0 5 8.5C5 12.7 10 17 10 17Z" stroke="currentColor" strokeWidth="1.45" /><circle cx="10" cy="8.5" r="1.65" fill="currentColor" /></Icon> }
export function MenuMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.45" /></Icon> }
export function CloseMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.45" /></Icon> }
export function CodeMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="m7 4-5 6 5 6M13 4l5 6-5 6M11.5 2.5 8.5 17.5" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="miter" /></Icon> }
export function PlusMark({ size = 18, className, open = false }) { return <Icon size={size} className={className}><path d="M3 10h14" stroke="currentColor" strokeWidth="1.45" /><path d="M10 3v14" stroke="currentColor" strokeWidth="1.45" style={{ transformOrigin: 'center', transform: `scaleY(${open ? 0 : 1})`, transition: 'transform 320ms cubic-bezier(.22,1,.36,1)' }} /></Icon> }
export function SunMark({ size = 18, className }) { return <Icon size={size} className={className}><circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 1.8v2.1M10 16.1v2.1M18.2 10h-2.1M3.9 10H1.8M15.8 4.2l-1.5 1.5M5.7 14.3l-1.5 1.5M15.8 15.8l-1.5-1.5M5.7 5.7 4.2 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></Icon> }
export function MoonMark({ size = 18, className }) { return <Icon size={size} className={className}><path d="M16.1 12.4A6.9 6.9 0 0 1 7.6 3.9a6.9 6.9 0 1 0 8.5 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></Icon> }
