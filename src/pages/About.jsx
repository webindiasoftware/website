import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'

export default function About() {
  const { data } = useData()
  const { hero, story, values, leaders, cta } = data.about

  const heroRef = useScrollReveal()
  const storyRef = useScrollReveal()
  const valuesRef = useScrollReveal()
  const leaderRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[480px] flex flex-col justify-center items-start px-5 md:px-12 py-24 max-w-container-max mx-auto overflow-hidden">
        <div className="z-10 max-w-4xl">
          <span className="inline-block bg-primary-container text-on-primary px-4 py-1 font-label-bold text-label-sm mb-6">
            {hero.badge}
          </span>
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-6 leading-none">
            {hero.headline.includes('\n') ? hero.headline.split('\n').map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            )) : hero.headline}
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">{hero.subtext}</p>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block select-none">
          <span className="font-headline-xl text-[200px] font-black leading-none">SKIRL</span>
        </div>
      </section>

      {/* ── Story ── */}
      <section ref={storyRef} className="px-5 md:px-12 py-24 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 md:sticky md:top-32">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">{story.headline}</h2>
            <div className="h-1 w-16 bg-primary-container"></div>
          </div>
          <div className="md:col-span-8 space-y-12">
            <div className="bento-border p-8 md:p-12 bg-white">
              <h3 className="font-headline-md text-headline-md mb-6">{story.title}</h3>
              <div className="font-body-lg text-body-lg space-y-6 text-on-surface">
                <p>{story.body1}</p>
                <p>{story.body2}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bento-border p-8 flex flex-col justify-between aspect-square bg-surface-muted">
                <span className="font-headline-xl text-primary-container opacity-20 text-6xl font-black">01</span>
                <div>
                  <h4 className="font-label-bold text-label-bold mb-2 uppercase">Origins</h4>
                  <p className="text-secondary font-body-md text-body-md">Founded in a high-stakes silicon environment focused on performance tuning.</p>
                </div>
              </div>
              <div className="bento-border p-8 flex flex-col justify-between aspect-square bg-on-background text-on-primary">
                <span className="font-headline-xl text-white opacity-20 text-6xl font-black">02</span>
                <div>
                  <h4 className="font-label-bold text-label-bold mb-2 uppercase">Transformation</h4>
                  <p className="text-surface-variant font-body-md text-body-md">Scaled into a full-spectrum digital infrastructure firm serving global enterprises.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section ref={valuesRef} className="bg-on-background text-on-primary py-24 md:py-32">
        <div className="px-5 md:px-12 max-w-container-max mx-auto">
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">DNA OF PERFORMANCE</h2>
            <p className="font-body-lg text-body-lg text-surface-variant">Our foundational pillars define every line of code we ship.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ id, icon, title, desc }) => (
              <div key={id} className="border border-white/20 p-8 md:p-12 hover:bg-primary-container transition-standard group">
                <div className="mb-8">
                  <span className="material-symbols-outlined text-4xl text-primary-container group-hover:text-white transition-standard">{icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-4">{title}</h3>
                <p className="text-surface-variant group-hover:text-white transition-standard font-body-md text-body-md">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section ref={leaderRef} className="px-5 md:px-12 py-24 md:py-32 max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg">EXECUTIVE LEADERSHIP</h2>
            <p className="text-secondary font-body-lg text-body-lg mt-2">The minds behind the kinetic engine.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map(({ id, name, role, img }) => (
            <div key={id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bento-border bg-surface-muted">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-standard duration-500" src={img} alt={name} />
                <div className="absolute inset-0 bg-primary-container mix-blend-multiply opacity-0 group-hover:opacity-40 transition-standard"></div>
              </div>
              <h4 className="font-headline-md text-headline-md uppercase">{name}</h4>
              <p className="text-primary font-label-bold text-label-sm tracking-widest uppercase mt-1">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="bg-primary-container py-24 md:py-32 relative overflow-hidden">
        <div className="px-5 md:px-12 max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg text-on-primary-container mb-6">{cta.headline}</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container/90">{cta.body}</p>
          </div>
          <Link to="/contact" className="shrink-0 bg-on-background text-on-primary px-12 py-6 font-label-bold text-label-bold uppercase tracking-widest hover:bg-white hover:text-on-background transition-all">
            {cta.ctaText}
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      </section>
    </main>
  )
}
