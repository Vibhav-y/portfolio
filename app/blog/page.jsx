import { getAllPosts, formatDate } from '../../lib/blog'
import Link from 'next/link'
import BlogShell from '../../components/blog/BlogShell'

export const metadata = {
  title: 'Writing — Vibhav Yadav',
  description:
    'Essays and build logs on full-stack engineering — real-time systems, performance, and the craft of shipping products.',
  alternates: { canonical: 'https://vibhavy.dev/blog' },
  openGraph: {
    type: 'website',
    url: 'https://vibhavy.dev/blog',
    title: 'Writing — Vibhav Yadav',
    description:
      'Essays and build logs on full-stack engineering — real-time systems, performance, and the craft of shipping products.',
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const latest = posts.slice(0, 3)
  const older = posts.slice(3)

  return (
    <BlogShell>
      <main className="blog-index" id="blog-main">
        <header className="blog-index__head">
          <div><span className="mono-label">THE FIELD NOTES / VIBHAV YADAV</span>
            <h1>Things learned.<br/><em>Things worth sharing.</em></h1>
            <p>Build logs, little discoveries, and the occasional rabbit hole. Notes from figuring things out, one project at a time.</p>
          </div>
          <aside className="blog-notebook" aria-label="About these notes"><span className="blog-notebook__tape" aria-hidden="true"/><span className="mono-label">A NOTE TO SELF</span><p>Build something.<br/>Learn something.<br/><em>Write it down.</em></p><span className="blog-notebook__signature">stay curious ✳</span></aside>
        </header>
        {latest.length > 0 && <section aria-labelledby="latest-notes-title">
          <div className="blog-shelf-label"><h2 id="latest-notes-title">01 / FRESH FROM THE NOTEBOOK</h2><span>the latest notes ↴</span></div>
          <ul className="blog-grid blog-grid--latest">
            {latest.map((post, index) => <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card__file"><span>NOTE / {(index + 1).toString().padStart(2, '0')}</span><span aria-hidden="true">↗</span></div>
                {post.meta.cover && <div className="blog-card__cover"><img src={post.meta.cover} alt="" loading="lazy"/></div>}
                <div className="blog-card__body">
                  <div className="blog-card__tags">{post.meta.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
                  <h3>{post.meta.title}</h3><p>{post.meta.summary}</p>
                  <div className="blog-card__meta"><time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time><span aria-hidden="true"> / </span><span>{post.meta.readingTime} min read</span></div>
                  <span className="blog-read-link">Open this note ↗</span>
                </div>
              </Link>
            </li>)}
          </ul>
        </section>}
        {older.length > 0 && <section aria-labelledby="older-notes-title">
          <div className="blog-shelf-label"><h2 id="older-notes-title">02 / EARLIER NOTES</h2><span>more from the notebook</span></div>
          <ul className="blog-archive">
            {older.map((post, index) => <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="blog-archive__row">
                <span className="blog-archive__number">{(index + 4).toString().padStart(2, '0')}</span>
                <div className="blog-archive__body"><h3>{post.meta.title}</h3><p>{post.meta.summary}</p><div className="blog-card__meta"><time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time><span aria-hidden="true"> / </span><span>{post.meta.readingTime} min read</span></div></div>
                <span className="blog-archive__arrow" aria-hidden="true">↗</span>
              </Link>
            </li>)}
          </ul>
        </section>}
        {posts.length === 0 && <p className="blog-empty">The first page is still being written. Check back soon.</p>}
      </main>
    </BlogShell>
  )
}
