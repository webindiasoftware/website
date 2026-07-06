import { useState } from 'react'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'
import { submitContact } from '../api/client'

export default function Contact() {
  const { data } = useData()
  const { phone, email, address } = data.global
  const { hero, cardLabels, security, form: formContent, map, trustBadges } = data.contact

  const [form, setForm] = useState({ name: '', email: '', sector: formContent.sectorOptions[0], urgency: 'standard', brief: '' })
  const [activeLabel, setActiveLabel] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const heroRef = useScrollReveal()
  const formRef = useScrollReveal()
  const mapRef = useScrollReveal()
  const trustRef = useScrollReveal()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    try {
      await submitContact(form)
      setSubmitted(true)
      setForm({ name: '', email: '', sector: formContent.sectorOptions[0], urgency: 'standard', brief: '' })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit. Please try again.')
    }
  }

  return (
    <main className="max-w-container-max mx-auto px-5 md:px-12 py-12">
      {/* ── Hero ── */}
      <header ref={heroRef} className="mb-16">
        <div className="w-16 h-2 bg-primary mb-6"></div>
        <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl uppercase max-w-4xl">
          {hero.heading}
        </h1>
        <p className="font-body-lg text-body-lg text-secondary mt-6 max-w-2xl">
          {hero.subtext}
        </p>
      </header>

      {/* ── Main Grid ── */}
      <div ref={formRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contact info */}
        <div className="md:col-span-4 space-y-6">
          <div className="border border-border-bold p-8 flex flex-col justify-between min-h-40 hover:bg-surface-muted transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>phone_iphone</span>
              <span className="font-label-bold text-label-bold uppercase">{cardLabels.operations}</span>
            </div>
            <div className="font-headline-md text-headline-md">{phone}</div>
          </div>

          <div className="border border-border-bold p-8 flex flex-col justify-between min-h-40 hover:bg-surface-muted transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>alternate_email</span>
              <span className="font-label-bold text-label-bold uppercase">{cardLabels.directInquiry}</span>
            </div>
            <div className="font-headline-md text-headline-md break-all">{email}</div>
          </div>

          <div className="border border-border-bold p-8 flex flex-col justify-between min-h-56 hover:bg-surface-muted transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <span className="font-label-bold text-label-bold uppercase">{cardLabels.headquarters}</span>
            </div>
            <div className="font-body-lg text-body-lg leading-tight whitespace-pre-line">{address}</div>
          </div>

          <div className="bg-on-background text-on-primary p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">security</span>
              <h3 className="font-label-bold text-label-bold uppercase">{security.heading}</h3>
            </div>
            <p className="font-label-sm text-label-sm text-secondary-fixed-dim">
              {security.body}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-8 border border-border-bold p-8 md:p-12">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-12">{formContent.heading}</h2>

          {submitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-300 text-green-800 font-label-bold text-label-bold flex items-center gap-3">
              <span className="material-symbols-outlined">check_circle</span>
              {formContent.successMessage}
            </div>
          )}
          {submitError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-300 text-red-800 font-label-bold text-label-bold flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              {submitError}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className={`font-label-bold text-label-bold uppercase block transition-colors ${activeLabel === 'name' ? 'text-primary' : ''}`}>Full Name</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} onFocus={() => setActiveLabel('name')} onBlur={() => setActiveLabel('')} placeholder="ALAN TURING" required className="w-full bg-white border border-border-bold p-4 font-body-md text-body-md focus:outline-none focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label className={`font-label-bold text-label-bold uppercase block transition-colors ${activeLabel === 'email' ? 'text-primary' : ''}`}>Company Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} onFocus={() => setActiveLabel('email')} onBlur={() => setActiveLabel('')} placeholder="ALAN@ENIGMA.TECH" required className="w-full bg-white border border-border-bold p-4 font-body-md text-body-md focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-label-bold text-label-bold uppercase block">{formContent.sectorLabel}</label>
                <select name="sector" value={form.sector} onChange={handleChange} className="w-full bg-white border border-border-bold p-4 font-body-md text-body-md appearance-none cursor-pointer focus:outline-none focus:border-primary">
                  {formContent.sectorOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-bold text-label-bold uppercase block">{formContent.urgencyLabel}</label>
                <div className="flex gap-6 items-center h-full mt-4">
                  {['standard', 'critical'].map((val) => (
                    <label key={val} className="flex items-center gap-2 font-label-sm text-label-sm uppercase cursor-pointer">
                      <input type="radio" name="urgency" value={val} checked={form.urgency === val} onChange={handleChange} className="w-4 h-4 accent-primary" />
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`font-label-bold text-label-bold uppercase block transition-colors ${activeLabel === 'brief' ? 'text-primary' : ''}`}>Technical Brief</label>
              <textarea name="brief" rows={6} value={form.brief} onChange={handleChange} onFocus={() => setActiveLabel('brief')} onBlur={() => setActiveLabel('')} placeholder="DESCRIBE YOUR SYSTEM REQUIREMENTS AND SCALABILITY GOALS..." className="w-full bg-white border border-border-bold p-4 font-body-md text-body-md resize-none focus:outline-none focus:border-primary" />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 pt-4">
              <p className="text-secondary font-label-sm text-label-sm max-w-sm">
                {formContent.disclaimer}
              </p>
              <button type="submit" className="bg-on-background text-on-primary px-10 py-5 font-label-bold text-label-bold uppercase hover:bg-primary transition-colors flex items-center gap-2 justify-center shrink-0">
                {formContent.buttonText}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Map ── */}
      <section ref={mapRef} className="mt-6">
        <div className="w-full h-[300px] md:h-[500px] border border-border-bold relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHZ7rnTR5iihmoK_LqtRxPbR91wkNe18TO7Im6AQuVPgPN2rYOBiIedu-1uGnpFsLJmVlWlmLnxbTmbm2L4Ewa_lkeLMvnzeT6X8XGzhZvziUYE7jT7CStCi1_J0UG6B2jcc35r2tA-U_3pFFIeOdu-bfkQRz-u_jKsfOlG2wadQDJWfs-gt3qouiIfvF3RhCq6ehU1d9t48217mmmWq6XA34EfLh6lE0ebesLLA-TZn1J6Fc6bO6Wxd2KqZJj6acTfNUypVrq5fNb" alt="Kolkata office location" />
          <div className="absolute top-6 left-6 bg-on-background text-on-primary p-6 md:p-8 z-10 max-w-xs">
            <h4 className="font-label-bold text-label-bold uppercase mb-2">{map.heading}</h4>
            <p className="font-label-sm text-label-sm text-secondary-fixed-dim">{map.body}</p>
            <button className="mt-4 font-label-bold text-label-bold uppercase text-primary flex items-center gap-2 hover:underline">
              {map.buttonText} <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section ref={trustRef} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-0 border border-border-bold">
        {trustBadges.map(({ id, title, desc }, i) => (
          <div key={id} className={`p-8 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-border-bold' : ''}`}>
            <h5 className="font-label-bold text-label-bold uppercase mb-4">{title}</h5>
            <p className="font-body-md text-body-md text-secondary">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
