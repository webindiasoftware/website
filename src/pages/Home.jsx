import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'
import { submitContact } from '../api/client'
import defaultHeroVideo from '../assets/hero-video.mp4'

import corporateImg from '../assets/corporate.png'
import retailImg from '../assets/retail.png'
import healthcareImg from '../assets/healthcare.png'
import educationImg from '../assets/education.png'
import manufacturingImg from '../assets/manufacturing.png'
import travelImg from '../assets/travel.png'

// Fallback artwork shown until an admin uploads a custom image per industry (home.industries[i].image).
const industryFallbackImages = [corporateImg, retailImg, healthcareImg, educationImg, manufacturingImg, travelImg]


// Decorative overlay/sparkle badges for the Services grid, cycled by card index.
// Content (title, description, image) is admin-editable via home.services in DataContext.
const serviceVisuals = [
  {
    overlays: [
      { id: 'o1', icon: 'bar_chart', title: 'SEO & Web Vitals', value: 'Status: Optimized', pos: 'absolute bottom-6 left-6 w-[190px] md:w-[210px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' },
      { id: 'o2', icon: 'speed', title: 'Lighthouse Score', value: 'Rating: 100/100', pos: 'absolute top-6 right-6 w-[170px] md:w-[185px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' }
    ],
    sparkles: [
      { id: 's1', pos: 'absolute top-6 left-12 w-4 h-4 text-purple-300' },
      { id: 's2', pos: 'absolute bottom-8 right-16 w-5 h-5 text-purple-400' }
    ]
  },
  {
    overlays: [
      { id: 'o1', icon: 'sync', title: 'Cross-Platform Sync', value: 'iOS & Android Ready', pos: 'absolute bottom-6 left-6 w-[190px] md:w-[210px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' },
      { id: 'o2', icon: 'notifications_active', title: 'Push Gateway', value: 'Delivered: 99.9%', pos: 'absolute top-6 right-6 w-[160px] md:w-[175px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' }
    ],
    sparkles: [
      { id: 's1', pos: 'absolute top-10 left-8 w-5 h-5 text-purple-300' },
      { id: 's2', pos: 'absolute bottom-10 right-20 w-4 h-4 text-purple-400' }
    ]
  },
  {
    overlays: [
      { id: 'o1', icon: 'credit_card', title: 'Stripe Gateway', value: 'Secure Portal Sync', pos: 'absolute bottom-6 left-6 w-[180px] md:w-[195px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' },
      { id: 'o2', icon: 'inventory_2', title: 'Real-Time Stock', value: 'Synced: 12ms ago', pos: 'absolute top-6 right-6 w-[180px] md:w-[195px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' }
    ],
    sparkles: [
      { id: 's1', pos: 'absolute top-6 left-16 w-4 h-4 text-purple-400' },
      { id: 's2', pos: 'absolute bottom-6 right-12 w-5 h-5 text-purple-300' }
    ]
  },
  {
    overlays: [
      { id: 'o1', icon: 'settings_suggest', title: 'Process Automation', value: 'Workflows: Active', pos: 'absolute bottom-6 left-6 w-[190px] md:w-[210px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' },
      { id: 'o2', icon: 'cloud_done', title: 'Enterprise Sync', value: 'Replica Set UP', pos: 'absolute top-6 right-6 w-[160px] md:w-[175px] bg-white border border-purple-200/80 rounded-xl p-3 shadow-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300' }
    ],
    sparkles: [
      { id: 's1', pos: 'absolute top-12 left-12 w-5 h-5 text-purple-300' },
      { id: 's2', pos: 'absolute bottom-12 right-12 w-4 h-4 text-purple-400' }
    ]
  }
]


export default function Home() {
  const { data } = useData()
  const { hero, servicesIntro, services, productsIntro, products, industriesIntro, industries, whyUs, testimonials, cta } = data.home
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [activeIndustry, setActiveIndustry] = useState(4)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setContactError('')
    try {
      await submitContact({
        name: contactForm.name,
        email: contactForm.email,
        sector: 'GENERAL INQUIRY',
        urgency: 'standard',
        brief: contactForm.message,
      })
      setContactSubmitted(true)
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setContactSubmitted(false), 4000)
    } catch (err) {
      setContactError(err.message || 'Failed to submit. Please try again.')
    }
  }

  useEffect(() => {
    if (testimonials.length === 0) return
    const id = setInterval(() => setCurrentTestimonial((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [testimonials.length])

  useEffect(() => {
    if (currentTestimonial >= testimonials.length) setCurrentTestimonial(0)
  }, [testimonials.length, currentTestimonial])

  const heroRef = useScrollReveal()
  const servicesRef = useScrollReveal()
  const productsRef = useScrollReveal()
  const industriesRef = useScrollReveal()
  const whyRef = useScrollReveal()
  const testimonialRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  const t = testimonials[currentTestimonial] || testimonials[0]

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative flex items-center px-5 md:px-12 pt-2 pb-8 bg-surface-main">
        <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 z-10 transition-transform duration-500">
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-6">
              {hero.headline}
            </h1>
            <p className="font-body-lg text-body-lg text-secondary mb-10 max-w-2xl">{hero.subtext}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={hero.cta2Link}
                className="border border-border-bold text-on-background px-8 py-4 font-label-bold text-label-bold uppercase tracking-wider hover:bg-on-background hover:text-on-primary transition-all"
              >
                {hero.cta2Text}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative mt-10 lg:mt-0 lg:scale-105 transition-transform duration-500">
            <div className="w-full overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-3.5">
              <div className="w-full rounded-[2rem] overflow-hidden">
                <video
                  src={hero.heroVideo || defaultHeroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section ref={servicesRef} className="py-24 px-5 md:px-12 bg-surface-main">
        <div className="max-w-container-max mx-auto">
          
          {/* Header adapted from screenshot */}
          <div className="text-left mb-16 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {servicesIntro.heading}
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed max-w-3xl font-medium">
              {servicesIntro.subtext}
            </p>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {services.map((service, idx) => {
              const visuals = serviceVisuals[idx % serviceVisuals.length]
              return (
              <div key={service.id} className="flex flex-col group">
                
                {/* Graphic panel */}
                <div className="bg-[#f8fafc] border border-gray-100 relative w-full h-[280px] md:h-[320px] rounded-4xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200/80 ">
                  
                  {/* Sparkles */}
                  {visuals.sparkles.map((sparkle) => (
                    <svg key={sparkle.id} className={`${sparkle.pos} animate-pulse`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" fill="#c084fc" />
                    </svg>
                  ))}

                  {/* Center Image card */}
                  <div className="w-[60%] h-[70%] rounded-2xl overflow-hidden relative shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-white group-hover:scale-[1.02] transition-transform duration-500">
                    <img className="w-full h-full object-cover" src={service.bgImage} alt={service.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                  </div>

                  {/* Overlays */}
                  {visuals.overlays.map((overlay) => (
                    <div key={overlay.id} className={overlay.pos}>
                      <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-[#f3e8ff] text-[#a855f7]">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {overlay.icon}
                        </span>
                      </div>
                      <div className="min-w-0 text-left">
                        <h5 className="font-bold text-gray-800 text-[11px] md:text-[12px] leading-tight truncate">{overlay.title}</h5>
                        <p className="text-[10px] text-gray-500 font-medium leading-none mt-1 truncate">{overlay.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Text Details below */}
                <div className="text-left mt-6">
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base mt-2.5 leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>

              </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── Products ── */}
      <section ref={productsRef} className="py-24 px-5 md:px-12 bg-surface-muted">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">{productsIntro.heading}</h2>
            <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
              {productsIntro.subtext}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(({ id, name, badge, badgeDark, desc, img }) => (
              <div key={id} className="bg-white group rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none flex flex-col justify-between">
                <div>
                  <div className="relative overflow-hidden aspect-video rounded-2xl mt-5 mx-5 shadow-sm">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={img} alt={name} />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">{name}</h3>
                      <span className={`px-3 py-1 text-label-sm font-label-bold uppercase ${badgeDark ? 'bg-on-background text-on-primary' : 'bg-primary-container text-on-primary'}`}>
                        {badge}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-secondary leading-relaxed mb-6">{desc}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 mt-auto flex justify-end">
                  <Link
                    to={"/products/" + (name.toLowerCase() === 'erp solutions' ? 'skirlerp' : name.toLowerCase())}
                    className="text-primary font-label-bold text-label-bold uppercase tracking-wider hover:text-black transition-colors duration-200 flex items-center gap-1 group/btn"
                  >
                    Learn More
                    <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover/btn:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section ref={industriesRef} className="py-24 px-5 md:px-12 bg-surface-main relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">{industriesIntro.heading}</h2>
            <p className="font-body-md text-body-md text-secondary">{industriesIntro.subtext}</p>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 md:px-16 mt-8">
            
            {/* Connecting Track Line */}
            <div className="absolute top-[48px] left-16 right-16 bottom-0 border-2 border-dashed rounded-t-[180px] rounded-b-[240px] pointer-events-none -z-10 hidden md:block" style={{ borderColor: '#e2e8f0' }} />

            {/* Circular buttons layout */}
            <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-16 px-0">
              
              {/* Row Left chevron */}
              <button
                onClick={() => setActiveIndustry((idx) => (idx - 1 + industries.length) % industries.length)}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer text-gray-500 hover:text-gray-900 shrink-0"
              >
                <span className="material-symbols-outlined text-[20px] font-bold">chevron_left</span>
              </button>

              <div style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex justify-between items-center flex-grow mx-2 md:mx-10 gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible py-2">
                {industries.map((item, index) => {
                  const isActive = index === activeIndustry;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndustry(index)}
                      className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 shrink-0 cursor-pointer
                        ${isActive
                          ? 'border-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.45)] scale-110 bg-gradient-to-br from-orange-50/40 via-white to-white ring-4 ring-orange-100/50'
                          : 'border-gray-200 hover:border-gray-300 hover:scale-105 shadow-sm'
                        }`}
                    >
                      <span className={`material-symbols-outlined text-[22px] md:text-[26px] transition-colors duration-300 ${isActive ? 'text-[#0b577a] font-semibold' : 'text-gray-600'}`}>
                        {item.icon}
                      </span>
                      <span className={`text-[10px] md:text-[11px] font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-gray-900 font-extrabold' : 'text-gray-500'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Row Right chevron */}
              <button
                onClick={() => setActiveIndustry((idx) => (idx + 1) % industries.length)}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer text-gray-500 hover:text-gray-900 shrink-0"
              >
                <span className="material-symbols-outlined text-[20px] font-bold">chevron_right</span>
              </button>
            </div>

            {/* Detailed Card container wrapper */}
            <div className="relative max-w-4xl mx-auto px-0">
              
              {/* Card Left chevron */}
              <button
                onClick={() => setActiveIndustry((idx) => (idx - 1 + industries.length) % industries.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer text-gray-500 hover:text-gray-900"
              >
                <span className="material-symbols-outlined text-[20px] font-bold">chevron_left</span>
              </button>

              {/* Card Main Block */}
              <div
                key={activeIndustry}
                className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-3xl border border-gray-100/80 overflow-hidden relative animate-[slideDown_0.35s_ease-out]"
              >
                {/* Left details */}
                <div className="p-8 md:p-12 flex flex-col justify-center text-left bg-white z-10">
                  <span className="material-symbols-outlined text-5xl text-[#0b577a] mb-5 block">
                    {industries[activeIndustry].icon}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
                    {industries[activeIndustry].label}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed font-medium">
                    {industries[activeIndustry].desc}
                  </p>
                </div>

                {/* Right image + case study */}
                <div className="flex flex-col h-full bg-gray-50">
                  <div className="flex-grow relative aspect-video md:aspect-auto min-h-[250px] md:min-h-0 overflow-hidden">
                    <img
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      src={industries[activeIndustry].image || industryFallbackImages[activeIndustry % industryFallbackImages.length]}
                      alt={industries[activeIndustry].label}
                    />
                  </div>
                  <div className="bg-white border-t border-gray-100 px-6 py-5 shrink-0 text-left">
                    <p className="text-sm font-bold text-gray-800 tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      {industries[activeIndustry].caseStudy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Right chevron */}
              <button
                onClick={() => setActiveIndustry((idx) => (idx + 1) % industries.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer text-gray-500 hover:text-gray-900"
              >
                <span className="material-symbols-outlined text-[20px] font-bold">chevron_right</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section ref={whyRef} className="py-24 px-5 md:px-12 bg-surface-main">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6">{whyUs.headline}</h2>
              <p className="font-body-lg text-body-lg text-secondary mb-8">{whyUs.body}</p>
              <ul className="space-y-4 mb-8">
                {whyUs.checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-label-bold text-label-bold">
                    <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.cards.map(({ id, icon, title, desc, dark }) => (
                <div key={id} className={`p-10 border border-border-bold flex flex-col justify-between min-h-[250px] ${dark ? 'bg-on-background text-on-primary' : ''}`}>
                  <span className="material-symbols-outlined text-5xl text-primary-container">{icon}</span>
                  <div>
                    <h3 className={`font-headline-md text-headline-md mb-2 ${dark ? 'text-on-primary' : ''}`}>{title}</h3>
                    <p className={dark ? 'text-secondary-container' : 'text-secondary'}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section ref={testimonialRef} className="py-24 px-5 md:px-12 bg-surface-muted border-b border-border-bold">
          <div className="max-w-container-max mx-auto text-center">
            <div className="mb-12">
              <span className="material-symbols-outlined text-6xl text-primary-container opacity-20">format_quote</span>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="font-headline-md text-headline-md italic mb-8 transition-all duration-500">"{t.text}"</p>
              <div className="font-label-bold text-label-bold uppercase tracking-widest">— {t.author}</div>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2 h-2 rounded-full transition-colors ${i === currentTestimonial ? 'bg-primary-container' : 'bg-border-faint'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA / Contact Form ── */}
      <section ref={ctaRef} className="py-24 px-5 md:px-12 bg-primary-container text-on-primary relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column details */}
            <div className="lg:col-span-6 text-left space-y-6">
              <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white uppercase leading-none">
                {cta.headline}
              </h2>
              <p className="font-body-lg text-body-lg text-slate-200 max-w-xl leading-relaxed opacity-95">
                {cta.body}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/10 max-w-md">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#106F89]">phone_iphone</span>
                  <p className="text-sm text-slate-200 font-semibold">{cta.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#106F89]">alternate_email</span>
                  <p className="text-sm text-slate-200 font-semibold">{cta.email}</p>
                </div>
              </div>
            </div>

            {/* Right Column form card */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 backdrop-blur rounded-[24px] p-8 md:p-10 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 text-left">{cta.formHeading}</h3>

              {contactSubmitted && (
                <div className="mb-6 p-4 bg-teal-950/40 border border-[#106F89]/50 text-teal-300 font-semibold text-sm flex items-center gap-3 rounded-lg text-left">
                  <span className="material-symbols-outlined text-teal-400">check_circle</span>
                  Thank you! Your request has been logged successfully.
                </div>
              )}
              {contactError && (
                <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 text-red-300 font-semibold text-sm flex items-center gap-3 rounded-lg text-left">
                  <span className="material-symbols-outlined text-red-400">error</span>
                  {contactError}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Alan Turing"
                    className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#106F89] focus:bg-white/10 transition-colors"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Company Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="alan@enigma.tech"
                    className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#106F89] focus:bg-white/10 transition-colors"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Project Brief</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your system requirements or product lifecycle scope..."
                    className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#106F89] focus:bg-white/10 transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#106F89] hover:bg-[#0c596d] text-white font-label-bold text-label-bold uppercase py-4 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 mt-2"
                >
                  {cta.ctaText}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
            </div>

          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 border-l border-b border-white opacity-20 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      </section>
    </main>
  )
}
