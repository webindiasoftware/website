import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Products() {
  const { data } = useData()
  const { hero, heroButtons, ecosystemHeading, items, standards, standardIntro, cta, ctaSecondaryButtonText } = data.products

  const heroRef = useScrollReveal()
  const cardsRef = useScrollReveal()
  const stdRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <main className="pt-0">
      {/* ── Hero ── */}
      <section ref={heroRef} className="px-5 md:px-12 py-24 max-w-container-max mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-6 uppercase">
              {hero.headline}
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mb-10 leading-relaxed">{hero.subtext}</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary-container text-on-primary font-label-bold text-label-bold uppercase px-8 py-4 hover:bg-on-background transition-colors">
                {heroButtons.primaryText}
              </button>
              <button className="border border-border-bold font-label-bold text-label-bold uppercase px-8 py-4 hover:bg-surface-muted transition-colors">
                {heroButtons.secondaryText}
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="w-full aspect-square border-2 border-border-bold p-4">
              <div className="w-full h-full bg-surface-muted border border-border-bold flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <span className="material-symbols-outlined text-9xl text-on-surface opacity-20">memory</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Cards ── */}
      <section ref={cardsRef} className="bg-surface-muted py-24 px-5 md:px-12 border-t border-b border-border-bold">
        <div className="max-w-container-max mx-auto">
          <div className="mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-4">{ecosystemHeading}</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(({ id, name, status, desc, img }) => (
              <div key={id} className="bg-white border border-border-bold flex flex-col group hover:border-primary transition-colors duration-300">
                <div className="w-full aspect-video mb-0 overflow-hidden bg-surface-main border-b border-border-faint">
                  <img className="w-full h-full object-cover" src={img} alt={name} />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md mb-4 uppercase">{name}</h3>
                  <p className="font-body-md text-body-md text-secondary mb-8 flex-grow">{desc}</p>
                  <div className="pt-6 border-t border-border-faint flex justify-between items-center">
                    <span className="font-label-bold text-label-bold uppercase text-secondary">{status}</span>
                    <Link to="/contact" className="text-primary font-label-bold text-label-bold uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                      Deploy <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Standards ── */}
      <section ref={stdRef} className="py-24 px-5 md:px-12 bg-surface-main">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-4">{standardIntro.heading}</h2>
            <p className="font-body-md text-body-md text-secondary max-w-xl mx-auto">
              {standardIntro.subtext}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {standards.map(({ id, icon, title, desc }) => (
              <div key={id} className="border border-border-bold p-8 flex flex-col justify-between group hover:bg-on-surface hover:text-surface-main transition-colors duration-300">
                <div>
                  <span className="material-symbols-outlined text-primary text-4xl mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  <h4 className="font-headline-md text-headline-md mb-4 uppercase">{title}</h4>
                  <p className="font-body-md text-body-md text-secondary group-hover:text-surface-variant">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="bg-primary py-24 px-5 md:px-12 text-on-primary border-t border-border-bold">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-6">{cta.headline}</h2>
          <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-12 opacity-90">{cta.body}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="bg-on-surface text-surface-main font-label-bold text-label-bold uppercase px-10 py-5 hover:bg-white hover:text-on-surface transition-colors">
              {cta.ctaText}
            </Link>
            <button className="border border-on-surface text-on-surface font-label-bold text-label-bold uppercase px-10 py-5 hover:bg-on-surface hover:text-surface-main transition-colors">
              {ctaSecondaryButtonText}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
