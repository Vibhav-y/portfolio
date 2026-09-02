import 'katex/dist/katex.min.css'
import Link from 'next/link'

import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  formatDate,
} from '../../../lib/blog'
import '../../../components/blog/blog.css'
import { ArrowMark } from '../../../components/SiteIcons'
import Navbar from '../../../components/Navbar'
import styles from './page.module.css'

export const dynamicParams = false

// Drafts are excluded here too — with dynamicParams=false that makes a
// draft's URL 404 instead of quietly shipping an unlisted page.
export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { meta } = getPostBySlug(slug)
  const url = `https://vibhavy.dev/blog/${slug}`
  return {
    title: `${meta.title} — Vibhav Yadav`,
    description: meta.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date,
      authors: [meta.author],
      ...(meta.cover ? { images: [{ url: meta.cover }] } : {}),
    },
    twitter: {
      card: meta.cover ? 'summary_large_image' : 'summary',
      title: meta.title,
      description: meta.summary,
    },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const { meta } = getPostBySlug(slug)
  const { prev, next } = getAdjacentPosts(slug)
  // Turbopack compiles every content/blog/*.mdx into a module at build time;
  // the dynamic specifier resolves to the one matching this slug.
  const { default: PostBody } = await import(`../../../content/blog/${slug}.mdx`)

  return (
    <div className={`${styles.page} editorial-page`}>
      <Navbar />
      <main>
        <article>
          <header className={`${styles.hero} editorial-hero`}>
            <div><Link href="/blog" className={styles.back}>← All writing</Link><div className={styles.tags}>
              {meta.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <h1>{meta.title}</h1>
            {meta.summary && <p className="blog-post__summary">{meta.summary}</p>}
            </div><div className={styles.heroMeta}>
              <span>{meta.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(meta.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{meta.readingTime} min read</span>
            </div>
          </header>

          {meta.cover && (
            <div className={styles.cover}>
              <img src={meta.cover} alt="" />
            </div>
          )}

          <div className={styles.reading}><aside>Essay<br />{slug.replaceAll('-', ' ')}</aside><div className="blog-prose">
            <PostBody />
          </div></div>
        </article>

        {(prev || next) && (
          <nav className={styles.postNav} aria-label="More posts">
            {prev ? (
              <Link href={`/blog/${prev.slug}`}>
                <span>← Newer</span>
                <strong>{prev.meta.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`}>
                <span>Older →</span>
                <strong>{next.meta.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </main>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Vibhav Yadav</span><Link href="/blog">Back to journal <ArrowMark size={14} /></Link></footer>
    </div>
  )
}
