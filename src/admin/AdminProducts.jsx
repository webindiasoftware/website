import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'

let nextId = 400

export default function AdminProducts() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.products)))
  const [saved, setSaved] = useState(false)

  const touch = () => setSaved(false)
  const setNested = (section, key) => (e) => { setForm(f => ({ ...f, [section]: { ...f[section], [key]: e.target.value } })); touch() }

  const updateItem = (id, field, val) => { setForm(f => ({ ...f, items: f.items.map(p => p.id === id ? { ...p, [field]: val } : p) })); touch() }
  const deleteItem = (id) => { setForm(f => ({ ...f, items: f.items.filter(p => p.id !== id) })); touch() }
  const addItem = () => { setForm(f => ({ ...f, items: [...f.items, { id: nextId++, name: 'New Product', icon: 'widgets', url: '', status: 'Active', desc: 'Product description.', img: '' }] })); touch() }

  const updateStd = (id, field, val) => { setForm(f => ({ ...f, standards: f.standards.map(s => s.id === id ? { ...s, [field]: val } : s) })); touch() }
  const deleteStd = (id) => { setForm(f => ({ ...f, standards: f.standards.filter(s => s.id !== id) })); touch() }
  const addStd = () => { setForm(f => ({ ...f, standards: [...f.standards, { id: nextId++, icon: 'star', title: 'New Standard', desc: 'Description.' }] })); touch() }

  const save = () => {
    dispatch({ type: 'SET_PRODUCTS', payload: form })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Products Page</h1>
          <p className="text-sm text-gray-500 mt-1">Edit products page content</p>
        </div>
        <SaveButton onSave={save} saved={saved} />
      </div>

      <Section title="Hero">
        <Field label="Headline" value={form.hero.headline} onChange={setNested('hero', 'headline')} />
        <Field label="Subtext" value={form.hero.subtext} onChange={setNested('hero', 'subtext')} rows={3} />
      </Section>

      <Section title="Product Cards">
        <div className="space-y-3">
          {form.items.map((p, i) => (
            <ListItem key={p.id} index={i} onDelete={() => deleteItem(p.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" value={p.name} onChange={e => updateItem(p.id, 'name', e.target.value)} />
                <Field label="Status Badge" value={p.status} onChange={e => updateItem(p.id, 'status', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Icon (Material Symbol)" value={p.icon || ''} placeholder="e.g. fitness_center" onChange={e => updateItem(p.id, 'icon', e.target.value)} />
                <Field label="Product Website URL" value={p.url || ''} placeholder="https://yourproduct.com" onChange={e => updateItem(p.id, 'url', e.target.value)} />
              </div>
              <Field label="Description" value={p.desc} onChange={e => updateItem(p.id, 'desc', e.target.value)} rows={2} />
              <Field label="Image URL" value={p.img} onChange={e => updateItem(p.id, 'img', e.target.value)} />
              {p.img && (
                <img src={p.img} alt={p.name} className="h-20 w-auto object-cover border border-gray-200" />
              )}
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addItem} label="Add Product" />
      </Section>

      <Section title="Standards">
        <div className="space-y-3">
          {form.standards.map((s, i) => (
            <ListItem key={s.id} index={i} onDelete={() => deleteStd(s.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Icon" value={s.icon} onChange={e => updateStd(s.id, 'icon', e.target.value)} />
                <Field label="Title" value={s.title} onChange={e => updateStd(s.id, 'title', e.target.value)} />
              </div>
              <Field label="Description" value={s.desc} onChange={e => updateStd(s.id, 'desc', e.target.value)} rows={2} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addStd} label="Add Standard" />
      </Section>

      <Section title="CTA Section">
        <Field label="Headline" value={form.cta.headline} onChange={setNested('cta', 'headline')} />
        <Field label="Body" value={form.cta.body} onChange={setNested('cta', 'body')} rows={2} />
        <Field label="Button Text" value={form.cta.ctaText} onChange={setNested('cta', 'ctaText')} />
      </Section>
    </div>
  )
}
