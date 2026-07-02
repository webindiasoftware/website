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
      </Section>

      <Section title="Core Services">
        <div className="space-y-3">
          {form.coreServices.map((s, i) => (
            <ListItem key={s.id} index={i} onDelete={() => deleteSvc(s.id)}>
              <Field label="Title" value={s.title} onChange={e => updateSvc(s.id, 'title', e.target.value)} />
              <Field label="Description" value={s.desc} onChange={e => updateSvc(s.id, 'desc', e.target.value)} rows={2} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addSvc} label="Add Service" />
      </Section>

      <Section title="CTA Section">
        <Field label="Headline" value={form.cta.headline} onChange={setNested('cta', 'headline')} />
        <Field label="Body" value={form.cta.body} onChange={setNested('cta', 'body')} rows={2} />
        <Field label="Button Text" value={form.cta.ctaText} onChange={setNested('cta', 'ctaText')} />
      </Section>
    </div>
  )
}
