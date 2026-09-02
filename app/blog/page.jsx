import { ArrowMark } from '../../components/SiteIcons'
import Link from 'next/link'
import { getAllPosts, formatDate } from '../../lib/blog'
import Navbar from '../../components/Navbar'
import styles from './page.module.css'

export const metadata = { title: 'Writing — Vibhav Yadav', description: 'Essays and build logs on full-stack engineering — real-time systems, performance, and the craft of shipping products.', alternates: { canonical: 'https://vibhavy.dev/blog' } }

function Meta({ post }) { return <p className={styles.meta}>{formatDate(post.meta.date)} <span>·</span> {post.meta.readingTime} min read</p> }

export default function BlogIndex() {
  const posts = getAllPosts()
  return <div className={`${styles.page} editorial-page`}>
    <Navbar />
    <main>
      <section className={`${styles.hero} editorial-hero`}><div><p className={styles.kicker}>01 · Journal</p><h1>Notes on<br />building things.</h1></div><div className={styles.heroNote}><p>Writing on real-time systems, engineering decisions, and the small details that turn an idea into a product.</p><span>{String(posts.length).padStart(2, '0')} published notes</span></div></section>
      <section className={styles.archive} aria-label="Writing archive"><div className={styles.archiveHeading}><span>Latest notes</span><span>Read at your own pace</span></div>
        <div className={styles.articleList}>{posts.map((post, index) => <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.article}><span className={styles.articleNumber}>{String(index + 1).padStart(2, '0')}</span><div className={styles.articleCopy}><div className={styles.tags}>{post.meta.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><h2>{post.meta.title}</h2><p>{post.meta.summary}</p></div>{post.meta.cover && <img className={styles.articleImage} src={post.meta.cover} alt="" loading="lazy" />}<div className={styles.articleMeta}><Meta post={post} /><ArrowMark size={18} /></div></Link>)}</div>
      </section>
    </main>
    <footer className={styles.footer}><span>© {new Date().getFullYear()} Vibhav Yadav</span><a href="mailto:vibhavydm@gmail.com">Start a conversation <ArrowMark size={14} /></a></footer>
  </div>
}
