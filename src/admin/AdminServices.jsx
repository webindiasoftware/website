import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'
import { persistContent } from './persistContent'

let nextId = 300

export default function AdminServices() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.services)))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const touch = () => setSaved(false)
  const setNested = (section, key) => (e) => { setForm(f => ({ ...f, [section]: { ...f[section], [key]: e.target.value } })); touch() }

  const updateSvc = (id, field, val) => { setForm(f => ({ ...f, coreServices: f.coreServices.map(s => s.id === id ? { ...s, [field]: val } : s) })); touch() }
  const deleteSvc = (id) => { setForm(f => ({ ...f, coreServices: f.coreServices.filter(s => s.id !== id) })); touch() }
  const addSvc = () => { setForm(f => ({ ...f, coreServices: [...f.coreServices, { id: nextId++, icon: 'code', title: 'New Service', desc: 'Service description.' }] })); touch() }

  // Architecture bullet list (array of strings)
  const updateBullet = (i, value) => {
    setForm(f => { const b = [...f.deepDive.architecture.bullets]; b[i] = value; return { ...f, deepDive: { ...f.deepDive, architecture: { ...f.deepDive.architecture, bullets: b } } } })
    touch()
  }
  const addBullet = () => {
    setForm(f => ({ ...f, deepDive: { ...f.deepDive, architecture: { ...f.deepDive.architecture, bullets: [...f.deepDive.architecture.bullets, 'New capability'] } } }))
    touch()
  }
  const deleteBullet = (i) => {
    setForm(f => { const b = f.deepDive.architecture.bullets.filter((_, idx) => idx !== i); return { ...f, deepDive: { ...f.deepDive, architecture: { ...f.deepDive.architecture, bullets: b } } } })
    touch()
  }

  // Security stat cards
  const updateSecurityStat = (id, field, val) => {
    setForm(f => ({ ...f, deepDive: { ...f.deepDive, security: { ...f.deepDive.security, stats: f.deepDive.security.stats.map(s => s.id === id ? { ...s, [field]: val } : s) } } }))
    touch()
  }

  // Stand-out stats
  const updateStandOutStat = (id, field, val) => {
    setForm(f => ({ ...f, standOut: { ...f.standOut, stats: f.standOut.stats.map(s => s.id === id ? { ...s, [field]: val } : s) } }))
    touch()
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await persistContent('services', form)
      dispatch({ type: 'SET_SERVICES', payload: form })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Services Page</h1>
          <p className="text-sm text-gray-500 mt-1">Edit services page content</p>
          {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
        </div>
        <SaveButton onSave={save} saved={saved} saving={saving} />
      </div>

      <Section title="Hero">
        <Field label="Badge Text" value={form.hero.badge} onChange={setNested('hero', 'badge')} />
        <Field label="Headline" value={form.hero.headline} onChange={setNested('hero', 'headline')} />
        <Field label="Subtext" value={form.hero.subtext} onChange={setNested('hero', 'subtext')} rows={3} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary Button Text" value={form.heroButtons.primaryText} onChange={setNested('heroButtons', 'primaryText')} />
          <Field label="Secondary Button Text" value={form.heroButtons.secondaryText} onChange={setNested('heroButtons', 'secondaryText')} />
        </div>
      </Section>

      <Section title="Core Services">
        <Field label="Section Heading" value={form.coreIntro.heading} onChange={setNested('coreIntro', 'heading')} />
        <Field label="Section Subtext" value={form.coreIntro.subtext} onChange={setNested('coreIntro', 'subtext')} rows={2} />
        <div className="space-y-3 mt-4">
          {form.coreServices.map((s, i) => (
            <ListItem key={s.id} index={i} onDelete={() => deleteSvc(s.id)}>
              <Field label="Title" value={s.title} onChange={e => updateSvc(s.id, 'title', e.target.value)} />
              <Field label="Description" value={s.desc} onChange={e => updateSvc(s.id, 'desc', e.target.value)} rows={2} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addSvc} label="Add Service" />
      </Section>

      <Section title="Technical Deep Dive — Architecture">
        <Field label="Heading" value={form.deepDive.architecture.heading} onChange={e => { setForm(f => ({ ...f, deepDive: { ...f.deepDive, architecture: { ...f.deepDive.architecture, heading: e.target.value } } })); touch() }} />
        <Field label="Body" value={form.deepDive.architecture.body} onChange={e => { setForm(f => ({ ...f, deepDive: { ...f.deepDive, architecture: { ...f.deepDive.architecture, body: e.target.value } } })); touch() }} rows={3} />
        <div className="mt-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Bullet Points</span>
          <div className="space-y-2">
            {form.deepDive.architecture.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={b}
                  onChange={e => updateBullet(i, e.target.value)}
                  className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#1b1c1c]"
                />
                <button onClick={() => deleteBullet(i)} className="text-gray-300 hover:text-[#106F89] transition-colors">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))}
          </div>
          <button onClick={addBullet} className="mt-2 text-xs text-[#106F89] font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">add</span> Add Bullet
          </button>
        </div>
      </Section>

      <Section title="Technical Deep Dive — Security">
        <Field label="Heading" value={form.deepDive.security.heading} onChange={e => { setForm(f => ({ ...f, deepDive: { ...f.deepDive, security: { ...f.deepDive.security, heading: e.target.value } } })); touch() }} />
        <Field label="Body" value={form.deepDive.security.body} onChange={e => { setForm(f => ({ ...f, deepDive: { ...f.deepDive, security: { ...f.deepDive.security, body: e.target.value } } })); touch() }} rows={3} />
        <Field label="Button Text" value={form.deepDive.security.buttonText} onChange={e => { setForm(f => ({ ...f, deepDive: { ...f.deepDive, security: { ...f.deepDive.security, buttonText: e.target.value } } })); touch() }} />
        <div className="mt-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Security Stats</span>
          <div className="space-y-3">
            {form.deepDive.security.stats.map((s) => (
              <div key={s.id} className="border border-gray-200 p-4 grid grid-cols-2 gap-3">
                <Field label="Value" value={s.value} onChange={e => updateSecurityStat(s.id, 'value', e.target.value)} />
                <Field label="Label" value={s.label} onChange={e => updateSecurityStat(s.id, 'label', e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Why Our Services Stand Out">
        <Field label="Section Heading" value={form.standOut.heading} onChange={setNested('standOut', 'heading')} />
        <div className="space-y-3 mt-4">
          {form.standOut.stats.map((s) => (
            <div key={s.id} className="border border-gray-200 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Value (optional)" value={s.value} onChange={e => updateStandOutStat(s.id, 'value', e.target.value)} />
                <Field label="Title" value={s.title} onChange={e => updateStandOutStat(s.id, 'title', e.target.value)} />
              </div>
              <Field label="Description (optional)" value={s.desc} onChange={e => updateStandOutStat(s.id, 'desc', e.target.value)} rows={2} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="CTA Section">
        <Field label="Headline" value={form.cta.headline} onChange={setNested('cta', 'headline')} />
        <Field label="Body" value={form.cta.body} onChange={setNested('cta', 'body')} rows={2} />
        <Field label="Button Text" value={form.cta.ctaText} onChange={setNested('cta', 'ctaText')} />
      </Section>
    </div>
  )
}
