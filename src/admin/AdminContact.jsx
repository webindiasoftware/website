import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'

let nextId = 500

export default function AdminContact() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.contact)))
  const [saved, setSaved] = useState(false)

  const touch = () => setSaved(false)
  const setNested = (section, key) => (e) => { setForm(f => ({ ...f, [section]: { ...f[section], [key]: e.target.value } })); touch() }

  const updateBadge = (id, field, val) => { setForm(f => ({ ...f, trustBadges: f.trustBadges.map(b => b.id === id ? { ...b, [field]: val } : b) })); touch() }
  const deleteBadge = (id) => { setForm(f => ({ ...f, trustBadges: f.trustBadges.filter(b => b.id !== id) })); touch() }
  const addBadge = () => { setForm(f => ({ ...f, trustBadges: [...f.trustBadges, { id: nextId++, title: 'New Badge', desc: 'Badge description.' }] })); touch() }

  const updateSectorOption = (i, value) => setForm(f => { const o = [...f.form.sectorOptions]; o[i] = value; return { ...f, form: { ...f.form, sectorOptions: o } } })
  const addSectorOption = () => setForm(f => ({ ...f, form: { ...f.form, sectorOptions: [...f.form.sectorOptions, 'NEW SECTOR'] } }))
  const deleteSectorOption = (i) => setForm(f => ({ ...f, form: { ...f.form, sectorOptions: f.form.sectorOptions.filter((_, idx) => idx !== i) } }))

  const save = () => {
    dispatch({ type: 'SET_CONTACT', payload: form })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Contact Page</h1>
          <p className="text-sm text-gray-500 mt-1">Edit contact page content. Phone, email, and address come from Company Settings.</p>
        </div>
        <SaveButton onSave={save} saved={saved} />
      </div>

      <Section title="Hero">
        <Field label="Heading" value={form.hero.heading} onChange={setNested('hero', 'heading')} />
        <Field label="Subtext" value={form.hero.subtext} onChange={setNested('hero', 'subtext')} rows={3} />
      </Section>

      <Section title="Contact Info Card Labels">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Phone Card Label" value={form.cardLabels.operations} onChange={setNested('cardLabels', 'operations')} />
          <Field label="Email Card Label" value={form.cardLabels.directInquiry} onChange={setNested('cardLabels', 'directInquiry')} />
          <Field label="Address Card Label" value={form.cardLabels.headquarters} onChange={setNested('cardLabels', 'headquarters')} />
        </div>
      </Section>

      <Section title="Security Badge">
        <Field label="Heading" value={form.security.heading} onChange={setNested('security', 'heading')} />
        <Field label="Body" value={form.security.body} onChange={setNested('security', 'body')} rows={2} />
      </Section>

      <Section title="Contact Form">
        <Field label="Heading" value={form.form.heading} onChange={setNested('form', 'heading')} />
        <Field label="Success Message" value={form.form.successMessage} onChange={setNested('form', 'successMessage')} rows={2} />
        <Field label="Disclaimer" value={form.form.disclaimer} onChange={setNested('form', 'disclaimer')} rows={2} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Button Text" value={form.form.buttonText} onChange={setNested('form', 'buttonText')} />
          <Field label="Urgency Field Label" value={form.form.urgencyLabel} onChange={setNested('form', 'urgencyLabel')} />
        </div>
        <div className="mt-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">{form.form.sectorLabel || 'Industry Sector'} Options</span>
          <Field label="Field Label" value={form.form.sectorLabel} onChange={setNested('form', 'sectorLabel')} />
          <div className="space-y-2 mt-2">
            {form.form.sectorOptions.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={opt}
                  onChange={e => updateSectorOption(i, e.target.value)}
                  className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#1b1c1c]"
                />
                <button onClick={() => deleteSectorOption(i)} className="text-gray-300 hover:text-[#106F89] transition-colors">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))}
          </div>
          <button onClick={addSectorOption} className="mt-2 text-xs text-[#106F89] font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">add</span> Add Sector Option
          </button>
        </div>
      </Section>

      <Section title="Map Card">
        <Field label="Heading" value={form.map.heading} onChange={setNested('map', 'heading')} />
        <Field label="Body" value={form.map.body} onChange={setNested('map', 'body')} rows={2} />
        <Field label="Button Text" value={form.map.buttonText} onChange={setNested('map', 'buttonText')} />
      </Section>

      <Section title="Trust Badges">
        <div className="space-y-3">
          {form.trustBadges.map((b, i) => (
            <ListItem key={b.id} index={i} onDelete={() => deleteBadge(b.id)}>
              <Field label="Title" value={b.title} onChange={e => updateBadge(b.id, 'title', e.target.value)} />
              <Field label="Description" value={b.desc} onChange={e => updateBadge(b.id, 'desc', e.target.value)} rows={2} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addBadge} label="Add Trust Badge" />
      </Section>
    </div>
  )
}
