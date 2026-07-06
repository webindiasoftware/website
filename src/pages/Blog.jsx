import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Blog() {
  const { data } = useData()
  const { hero, featuredCtaText, gridCtaText, subscribe, featured, posts } = data.blog
  const [email, setEmail] = useState('')

  const heroRef = useScrollReveal()
  const featuredRef = useScrollReveal()
  const gridRef = useScrollReveal()
  const subscribeRef = useScrollReveal()

  const publishedPosts = posts.filter(p => p.published)

  return (
    <main className="w-full max-w-container-max mx-auto px-5 md:px-12 py-16">
      {/* ── Hero ── */}
      <header ref={heroRef} className="mb-24">
        <div className="border-l-4 border-primary-container pl-8 py-4">
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl uppercase">{hero.heading}</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mt-4">
            {hero.subtext}
          </p>
        </div>
      </header>

      {/* ── Featured Article ── */}
      <section ref={featuredRef} className="mb-24">
        <Link to={`/blog/${featured.slug}`} className="border border-border-bold grid grid-cols-1 md:grid-cols-2 group cursor-pointer overflow-hidden">
          <div className="h-64 md:h-auto overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={featured.img}
              alt={featured.title}
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-block bg-primary-container text-on-primary-container text-label-sm font-label-sm px-3 py-1 mb-6 uppercase tracking-wider self-start">
              {featured.category}
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 leading-tight">
              {featured.title}
            </h2>
            <p className="font-body-md text-body-md text-secondary mb-8">{featured.excerpt}</p>
            <span className="flex items-center gap-2 font-label-bold text-label-bold uppercase tracking-widest group-hover:text-primary-container transition-colors">
              {featuredCtaText}
              <span className="material-symbols-outlined">trending_flat</span>
            </span>
          </div>
        </Link>
      </section>

      {/* ── Article Grid ── */}
      <section ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {publishedPosts.map(({ id, slug, category, title, excerpt, img }) => (
          <article key={id} className="border border-border-bold p-8 flex flex-col hover:border-primary-container transition-colors duration-300">
            <div className="h-48 mb-8 bg-surface-muted overflow-hidden border border-border-bold">
              <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src={img} alt={title} />
            </div>
            <span className="inline-block bg-primary-container text-on-primary-container text-label-sm font-label-sm px-3 py-1 mb-6 self-start uppercase tracking-wider">
              {category}
            </span>
            <h3 className="font-headline-md text-headline-md mb-4 grow">{title}</h3>
            <p className="text-secondary mb-8 font-body-md text-body-md">{excerpt}</p>
            <Link to={`/blog/${slug}`} className="flex items-center gap-2 font-label-bold text-label-bold uppercase tracking-widest text-primary-container hover:text-on-background transition-colors">
              {gridCtaText}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </article>
        ))}
      </section>

      {/* ── Subscribe ── */}
      <section ref={subscribeRef} className="bg-on-background p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="text-surface-main max-w-xl">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-4">{subscribe.heading}</h2>
          <p className="font-body-lg text-body-lg text-secondary-fixed-dim">
            {subscribe.body}
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={subscribe.placeholder}
            className="bg-transparent border-2 border-white text-white px-6 py-4 w-full sm:w-72 md:w-80 font-label-bold text-label-bold focus:outline-none focus:border-primary-container placeholder:text-secondary"
          />
          <button
            onClick={() => setEmail('')}
            className="bg-primary-container text-on-primary px-8 py-4 font-label-bold text-label-bold uppercase tracking-widest hover:bg-white hover:text-on-background transition-all whitespace-nowrap"
          >
            {subscribe.buttonText}
          </button>
        </div>
      </section>
    </main>
  )
}
