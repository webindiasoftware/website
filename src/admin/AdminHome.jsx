import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'
import { persistContent } from './persistContent'
import { FileUpload } from './FileUpload'

let nextId = 100

export default function AdminHome() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.home)))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const touch = () => setSaved(false)
  const setNested = (section, key) => (e) => { setForm(f => ({ ...f, [section]: { ...f[section], [key]: e.target.value } })); touch() }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await persistContent('home', form)
      dispatch({ type: 'SET_HOME', payload: form })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  // Generic list updater
  const updateList = (key, id, field, value) => {
    setForm(f => ({ ...f, [key]: f[key].map(item => item.id === id ? { ...item, [field]: value } : item) }))
    touch()
  }
  const deleteFromList = (key, id) => { setForm(f => ({ ...f, [key]: f[key].filter(i => i.id !== id) })); touch() }
  const addToList = (key, template) => { setForm(f => ({ ...f, [key]: [...f[key], { id: nextId++, ...template }] })); touch() }

  // WhyUs nested updater
  const updateCard = (id, field, value) => {
    setForm(f => ({ ...f, whyUs: { ...f.whyUs, cards: f.whyUs.cards.map(c => c.id === id ? { ...c, [field]: value } : c) } }))
    touch()
  }
  const updateChecklist = (i, value) => {
    setForm(f => { const cl = [...f.whyUs.checklist]; cl[i] = value; return { ...f, whyUs: { ...f.whyUs, checklist: cl } } })
    touch()
  }
  const addChecklistItem = () => {
    setForm(f => ({ ...f, whyUs: { ...f.whyUs, checklist: [...f.whyUs.checklist, 'NEW ITEM'] } }))
    touch()
  }
  const deleteChecklistItem = (i) => {
    setForm(f => { const cl = f.whyUs.checklist.filter((_, idx) => idx !== i); return { ...f, whyUs: { ...f.whyUs, checklist: cl } } })
    touch()
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Home Page</h1>
          <p className="text-sm text-gray-500 mt-1">Edit all content sections on the home page</p>
          {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
        </div>
        <SaveButton onSave={save} saved={saved} saving={saving} />
      </div>

      {/* Hero */}
      <Section title="Hero Section">
        <Field label="Headline" value={form.hero.headline} onChange={setNested('hero', 'headline')} />
        <Field label="Subtext" value={form.hero.subtext} onChange={setNested('hero', 'subtext')} rows={3} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="CTA 1 Text" value={form.hero.cta1Text} onChange={setNested('hero', 'cta1Text')} />
          <Field label="CTA 1 Link" value={form.hero.cta1Link} onChange={setNested('hero', 'cta1Link')} />
          <Field label="CTA 2 Text" value={form.hero.cta2Text} onChange={setNested('hero', 'cta2Text')} />
          <Field label="CTA 2 Link" value={form.hero.cta2Link} onChange={setNested('hero', 'cta2Link')} />
        </div>
        <FileUpload
          label="Hero Video (leave empty to use the default video)"
          kind="video"
          value={form.hero.heroVideo}
          onChange={(url) => { setForm(f => ({ ...f, hero: { ...f.hero, heroVideo: url } })); touch() }}
        />
      </Section>

      {/* Services */}
      <Section title="Services (Home Preview)">
        <div className="space-y-3">
          {form.services.map((s, i) => (
            <ListItem key={s.id} index={i} onDelete={() => deleteFromList('services', s.id)}>
              <Field label="Title" value={s.title} onChange={e => updateList('services', s.id, 'title', e.target.value)} />
              <Field label="Description" value={s.desc} onChange={e => updateList('services', s.id, 'desc', e.target.value)} rows={2} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={() => addToList('services', { icon: 'star', title: 'New Service', desc: 'Service description.' })} label="Add Service" />
      </Section>

      {/* Products */}
      <Section title="Featured Products (Home Preview)">
        <div className="space-y-3">
          {form.products.map((p, i) => (
            <ListItem key={p.id} index={i} onDelete={() => deleteFromList('products', p.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" value={p.name} onChange={e => updateList('products', p.id, 'name', e.target.value)} />
                <Field label="Badge Text" value={p.badge} onChange={e => updateList('products', p.id, 'badge', e.target.value)} />
              </div>
              <Field label="Description" value={p.desc} onChange={e => updateList('products', p.id, 'desc', e.target.value)} rows={2} />
              <FileUpload label="Image" kind="image" value={p.img} onChange={(url) => updateList('products', p.id, 'img', url)} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={() => addToList('products', { name: 'New Product', badge: 'New', badgeDark: false, desc: 'Product description.', img: '' })} label="Add Product" />
      </Section>

      {/* Industries */}
      <Section title="Industries We Serve">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {form.industries.map((ind, i) => (
            <ListItem key={ind.id} index={i} onDelete={() => deleteFromList('industries', ind.id)}>
              <Field label="Label" value={ind.label} onChange={e => updateList('industries', ind.id, 'label', e.target.value)} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={() => addToList('industries', { icon: 'domain', label: 'New Industry' })} label="Add Industry" />
      </Section>

      {/* Why Us */}
      <Section title="Why Choose Us">
        <Field label="Headline" value={form.whyUs.headline} onChange={e => { setForm(f => ({ ...f, whyUs: { ...f.whyUs, headline: e.target.value } })); touch() }} />
        <Field label="Body Text" value={form.whyUs.body} onChange={e => { setForm(f => ({ ...f, whyUs: { ...f.whyUs, body: e.target.value } })); touch() }} rows={3} />
        <div className="mt-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Checklist Items</span>
          <div className="space-y-2">
            {form.whyUs.checklist.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={item}
                  onChange={e => updateChecklist(i, e.target.value)}
                  className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#1b1c1c]"
                />
                <button onClick={() => deleteChecklistItem(i)} className="text-gray-300 hover:text-[#106F89] transition-colors">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))}
          </div>
          <button onClick={addChecklistItem} className="mt-2 text-xs text-[#106F89] font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">add</span> Add Checklist Item
          </button>
        </div>
        <div className="mt-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Feature Cards</span>
          <div className="space-y-3">
            {form.whyUs.cards.map((c, i) => (
              <ListItem key={c.id} index={i} onDelete={() => { setForm(f => ({ ...f, whyUs: { ...f.whyUs, cards: f.whyUs.cards.filter(x => x.id !== c.id) } })); touch() }}>
                <Field label="Title" value={c.title} onChange={e => updateCard(c.id, 'title', e.target.value)} />
                <Field label="Description" value={c.desc} onChange={e => updateCard(c.id, 'desc', e.target.value)} rows={2} />
              </ListItem>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section title="Testimonials">
        <div className="space-y-3">
          {form.testimonials.map((t, i) => (
            <ListItem key={t.id} index={i} onDelete={() => deleteFromList('testimonials', t.id)}>
              <Field label="Quote Text" value={t.text} onChange={e => updateList('testimonials', t.id, 'text', e.target.value)} rows={3} />
              <Field label="Author" value={t.author} onChange={e => updateList('testimonials', t.id, 'author', e.target.value)} placeholder="Name, Title" />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={() => addToList('testimonials', { text: 'New testimonial text.', author: 'Name, Role' })} label="Add Testimonial" />
      </Section>

      {/* CTA */}
      <Section title="CTA Section">
        <Field label="Headline" value={form.cta.headline} onChange={setNested('cta', 'headline')} />
        <Field label="Body" value={form.cta.body} onChange={setNested('cta', 'body')} rows={2} />
        <Field label="Button Text" value={form.cta.ctaText} onChange={setNested('cta', 'ctaText')} />
      </Section>
    </div>
  )
}
