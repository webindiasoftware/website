import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'

const techDiagram = [
  { red: true }, { dash: true }, { red: true }, {},
  {}, { red: true }, {}, { dash: true, red: true },
  { dash: true }, {}, { red: true }, {},
  { red: true }, {}, { dash: true }, { red: true },
]

export default function Services() {
  const { data } = useData()
  const { hero, heroButtons, coreIntro, coreServices, deepDive, standOut, cta } = data.services

  const heroRef = useScrollReveal()
  const gridRef = useScrollReveal()
  const archRef = useScrollReveal()
  const statsRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="py-24 px-5 md:px-12 max-w-container-max mx-auto border-b border-border-bold">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1 bento-border font-label-bold text-label-bold uppercase mb-8 tracking-widest bg-surface-muted">
            {hero.badge}
          </span>
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-8 leading-tight">
            {hero.headline}
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mb-12">{hero.subtext}</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-on-background text-on-primary px-8 md:px-10 py-4 md:py-5 font-label-bold text-label-bold uppercase tracking-widest hover:bg-primary-container transition-colors">
              {heroButtons.primaryText}
            </button>
            <button className="bento-border text-on-background px-8 md:px-10 py-4 md:py-5 font-label-bold text-label-bold uppercase tracking-widest hover:bg-surface-muted transition-colors">
              {heroButtons.secondaryText}
            </button>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section ref={gridRef} className="py-24 px-5 md:px-12 max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">{coreIntro.heading}</h2>
            <p className="text-secondary font-body-md text-body-md">{coreIntro.subtext}</p>
          </div>
          <div className="hidden md:block">
            <div className="bento-border p-4 bg-surface-muted">
              <span className="font-label-bold text-label-bold text-on-background uppercase tracking-wider">{coreServices.length} Modules Active</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border-bold">
          {coreServices.map(({ id, icon, title, desc }) => (
            <div key={id} className="p-8 md:p-12 border-r border-b border-border-bold group hover:bg-surface-muted transition-all cursor-pointer">
              <span className="material-symbols-outlined text-primary text-4xl mb-8 block">{icon}</span>
              <h3 className="font-headline-md text-headline-md mb-4 group-hover:translate-x-2 transition-transform">{title}</h3>
              <p className="text-secondary font-body-md text-body-md mb-8">{desc}</p>
              <span className="font-label-bold text-label-bold uppercase tracking-widest text-primary flex items-center gap-2">
                Explore <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Technical Deep Dive ── */}
      <section ref={archRef} className="border-t border-b border-border-bold overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[600px]">
          <div className="p-8 md:p-24 border-b md:border-b-0 md:border-r border-border-bold flex flex-col justify-center">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">{deepDive.architecture.heading}</h2>
            <p className="font-body-lg text-body-lg text-secondary mb-12">
              {deepDive.architecture.body}
            </p>
            <ul className="space-y-4">
              {deepDive.architecture.bullets.map((item) => (
                <li key={item} className="flex items-center gap-4 font-label-bold text-label-bold uppercase tracking-wider">
                  <span className="w-2 h-2 bg-primary shrink-0"></span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-muted relative flex items-center justify-center p-8 md:p-12 min-h-[320px]">
            <div className="relative w-full max-w-sm aspect-square bento-border bg-white flex items-center justify-center">
              <div className="grid grid-cols-4 grid-rows-4 gap-3 w-3/4 h-3/4">
                {techDiagram.map((cell, i) => (
                  <div key={i} className={`bento-border flex items-center justify-center ${cell.dash ? 'border-dashed' : ''} ${cell.red ? 'border-primary border-2' : 'border-secondary'}`}>
                    {i === 0 && <span className="w-3 h-3 bg-primary animate-pulse"></span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[600px]">
          <div className="bg-on-background order-2 md:order-1 relative p-8 md:p-12 flex items-center justify-center overflow-hidden min-h-[320px]">
            <div className="relative z-10 w-full max-w-md text-on-primary">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {deepDive.security.stats.map(({ id, value, label }) => (
                  <div key={id} className="p-6 md:p-8 border border-white/20 bg-white/5">
                    <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary block mb-2">{value}</span>
                    <span className="font-label-bold text-label-bold uppercase tracking-wider text-primary">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-8 md:p-24 flex flex-col justify-center order-1 md:order-2">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">{deepDive.security.heading}</h2>
            <p className="font-body-lg text-body-lg text-secondary mb-12">
              {deepDive.security.body}
            </p>
            <button className="w-fit bento-border px-8 py-4 font-label-bold text-label-bold uppercase tracking-widest hover:bg-on-background hover:text-on-primary transition-all duration-300">
              {deepDive.security.buttonText}
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Bento ── */}
      <section ref={statsRef} className="py-24 px-5 md:px-12 max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-center mb-16">{standOut.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bento-border p-8 md:p-12 bg-surface-muted flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-start">
              <span className="font-headline-xl text-headline-lg-mobile md:text-headline-xl font-black">{standOut.stats[0].value}</span>
              <span className="material-symbols-outlined text-primary text-3xl">speed</span>
            </div>
            <div>
              <h4 className="font-label-bold text-label-bold uppercase tracking-widest text-primary mb-2">{standOut.stats[0].title}</h4>
              <p className="text-secondary font-body-md text-body-md">{standOut.stats[0].desc}</p>
            </div>
          </div>
          <div className="md:col-span-2 bento-border p-8 md:p-12 flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-start">
              <span className="font-headline-xl text-headline-lg-mobile md:text-headline-xl font-black">{standOut.stats[1].value}</span>
              <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
            </div>
            <div>
              <h4 className="font-label-bold text-label-bold uppercase tracking-widest text-primary mb-2">{standOut.stats[1].title}</h4>
              <p className="text-secondary font-body-md text-body-md">{standOut.stats[1].desc}</p>
            </div>
          </div>
          <div className="md:col-span-1 bento-border p-8 md:p-12 bg-on-background text-on-primary flex flex-col justify-between min-h-[180px]">
            <span className="font-headline-md text-headline-md text-primary">{standOut.stats[2].value}</span>
            <div>
              <h4 className="font-label-bold text-label-bold uppercase tracking-widest mb-2">{standOut.stats[2].title}</h4>
              <p className="text-surface-dim text-label-sm font-label-sm">{standOut.stats[2].desc}</p>
            </div>
          </div>
          <div className="md:col-span-2 bento-border p-8 md:p-12 flex flex-col justify-between min-h-[180px]">
            <h4 className="font-label-bold text-label-bold uppercase tracking-widest text-primary mb-4">{standOut.stats[3].title}</h4>
            <p className="font-body-md text-body-md text-secondary">{standOut.stats[3].desc}</p>
            <div className="flex gap-2 mt-8">
              {[1, 2, 3].map((i) => <div key={i} className="h-1 flex-1 bg-primary"></div>)}
              <div className="h-1 flex-1 bg-surface-muted border border-border-faint"></div>
            </div>
          </div>
          <div className="md:col-span-1 bento-border p-8 md:p-12 bg-surface-muted flex flex-col justify-center items-center text-center min-h-[180px]">
            <span className="material-symbols-outlined text-primary text-5xl mb-4">public</span>
            <span className="font-label-bold text-label-bold uppercase tracking-wider">{standOut.stats[4].title}</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="px-5 md:px-12 py-24 max-w-container-max mx-auto">
        <div className="bg-primary-container p-8 md:p-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-primary-container mb-8">{cta.headline}</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container/90">{cta.body}</p>
          </div>
          <Link to="/contact" className="shrink-0 bg-on-background text-on-primary px-8 md:px-12 py-5 md:py-6 font-label-bold text-label-bold uppercase tracking-widest hover:bg-white hover:text-on-background transition-all whitespace-nowrap">
            {cta.ctaText}
          </Link>
        </div>
      </section>
    </main>
  )
}
