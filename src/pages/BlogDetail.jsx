import { Link, useParams, Navigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'

export default function BlogDetail() {
  const { slug } = useParams()
  const { data } = useData()
  const { tags, sidebarCta, relatedHeading, bottomCta } = data.blog

  const post = data.blog.posts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  // Older posts were authored as plain text (paragraphs separated by a blank
  // line) before the rich text editor existed. New posts store real HTML.
  const content = post.content || ''
  const isHtml = /<[a-z][\s\S]*>/i.test(content)
  const paragraphs = isHtml ? null : content.split('\n\n').filter(Boolean)

  const heroRef = useScrollReveal()
  const contentRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  const relatedPosts = data.blog.posts.filter(p => p.slug !== slug && p.published).slice(0, 3)

  return (
    <main className="w-full max-w-container-max mx-auto px-5 md:px-12 py-12 md:py-20">
      {/* ── Hero ── */}
      <section ref={heroRef} className="mb-16">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <span className="bg-primary text-surface-main px-3 py-1 font-label-bold text-label-sm uppercase tracking-widest">
            {post.category}
          </span>
          <span className="text-secondary font-label-bold text-label-sm uppercase tracking-widest">
            {post.date} · {post.readTime || '5 min read'}
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background leading-tight max-w-4xl mb-6">
          {post.title}
        </h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl">{post.excerpt}</p>
      </section>

      {/* ── Content Grid ── */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main article */}
        <article className="lg:col-span-8 flex flex-col gap-12">
          {/* Hero image */}
          <div className="bento-border overflow-hidden bg-surface-muted">
            <img
              className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              src={post.img}
              alt={post.title}
            />
          </div>

          {/* Body content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-md text-headline-md text-on-background border-l-4 border-primary pl-6">
              {post.title}
            </h2>
            {isHtml ? (
              <div className="rich-content font-body-md text-body-md text-on-surface" dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              paragraphs.map((para, i) => (
                <p key={i} className="font-body-md text-body-md text-on-surface leading-relaxed">{para}</p>
              ))
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-8 border-t border-border-faint">
            {tags.map((tag) => (
              <span key={tag} className="bento-border px-4 py-1 font-label-bold text-label-sm uppercase hover:bg-on-background hover:text-surface-main cursor-pointer transition-all">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* CTA card */}
          <div className="bg-primary p-8 flex flex-col gap-6 text-surface-main">
            <h3 className="font-headline-md text-headline-md leading-tight">{sidebarCta.heading}</h3>
            <p className="font-body-md text-body-md opacity-90">
              {sidebarCta.body}
            </p>
            <Link to="/contact" className="bg-on-background text-surface-main py-4 font-label-bold text-label-bold uppercase tracking-widest hover:bg-surface-main hover:text-on-background transition-colors text-center block">
              {sidebarCta.primaryButtonText}
            </Link>
            <Link to="/contact" className="border border-surface-main text-surface-main py-4 font-label-bold text-label-bold uppercase tracking-widest hover:bg-surface-main hover:text-primary transition-colors text-center block">
              {sidebarCta.secondaryButtonText}
            </Link>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="bento-border p-8">
              <h3 className="font-label-bold text-label-bold uppercase mb-6 border-b border-border-bold pb-2 inline-block">
                {relatedHeading}
              </h3>
              <div className="flex flex-col gap-8">
                {relatedPosts.map((p) => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                    <h4 className="font-label-bold text-body-md group-hover:text-primary transition-colors leading-snug mb-2">{p.title}</h4>
                    <span className="text-label-sm text-secondary uppercase">{p.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ── Bottom CTA ── */}
      <section ref={ctaRef} className="mt-20 bento-border bg-on-background p-8 md:p-20 text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-main leading-tight">
            {bottomCta.heading}
          </h2>
          <p className="font-body-lg text-body-lg text-surface-muted">
            {bottomCta.body}
          </p>
          <Link to="/contact" className="bg-primary text-surface-main px-10 md:px-12 py-5 font-label-bold text-label-bold uppercase tracking-widest hover:bg-surface-main hover:text-primary transition-all">
            {bottomCta.buttonText}
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 border-t-8 border-r-8 border-primary opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-primary opacity-20 -ml-8 -mb-8 pointer-events-none"></div>
      </section>
    </main>
  )
}
