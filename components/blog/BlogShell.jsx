import Link from 'next/link'
import BrandMark from '../BrandMark'

export default function BlogShell({ children, activePage = 'notes', mainId = 'blog-main' }) {
  return <div className="blog-site">
    <a className="blog-skip" href={`#${mainId}`}>Skip to content</a>
    <header className="blog-site__nav"><Link href="/" className="blog-site__brand" aria-label="Vibhav home"><BrandMark/><span>Vibhav Yadav</span></Link><nav aria-label="Main navigation"><Link href="/#work">Work</Link><Link href="/#about">About</Link><Link href="/blog" aria-current={activePage === 'notes' ? 'page' : undefined}>Notes</Link><a href="/resume/general%20cv.pdf" target="_blank" rel="noreferrer">Résumé</a></nav><Link href="/#contact" className="blog-site__contact">Let’s talk ↗</Link></header>
    {children}
    <footer className="blog-site__footer"><div><span className="mono-label">THE NOTEBOOK STAYS OPEN</span><p>There’s always another<br/><em>rabbit hole.</em></p><Link href="/#work">See what I’m building ↗</Link></div><div className="blog-site__footer-bottom"><span>© {new Date().getFullYear()} Vibhav Yadav<br/><small>A little logic. A lot of heart.</small></span><div><a href="https://github.com/Vibhav-y" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:vibhavydm@gmail.com">Say hello ↗</a><a href={`#${mainId}`}>Back to top ↑</a></div></div></footer>
  </div>
}
