import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'
import { persistContent } from './persistContent'
import { FileUpload } from './FileUpload'

let nextId = 400

export default function AdminProducts() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.products)))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const touch = () => setSaved(false)
  const setNested = (section, key) => (e) => { setForm(f => ({ ...f, [section]: { ...f[section], [key]: e.target.value } })); touch() }

  const updateItem = (id, field, val) => { setForm(f => ({ ...f, items: f.items.map(p => p.id === id ? { ...p, [field]: val } : p) })); touch() }
  const deleteItem = (id) => { setForm(f => ({ ...f, items: f.items.filter(p => p.id !== id) })); touch() }
  const addItem = () => { setForm(f => ({ ...f, items: [...f.items, { id: nextId++, name: 'New Product', icon: 'widgets', url: '', status: 'Active', desc: 'Product description.', img: '' }] })); touch() }

  const updateStd = (id, field, val) => { setForm(f => ({ ...f, standards: f.standards.map(s => s.id === id ? { ...s, [field]: val } : s) })); touch() }
  const deleteStd = (id) => { setForm(f => ({ ...f, standards: f.standards.filter(s => s.id !== id) })); touch() }
  const addStd = () => { setForm(f => ({ ...f, standards: [...f.standards, { id: nextId++, icon: 'star', title: 'New Standard', desc: 'Description.' }] })); touch() }

  const setDetailPage = (key) => (e) => { setForm(f => ({ ...f, detailPage: { ...f.detailPage, [key]: e.target.value } })); touch() }
  const setDetailPageNested = (section, key) => (e) => {
    setForm(f => ({ ...f, detailPage: { ...f.detailPage, [section]: { ...f.detailPage[section], [key]: e.target.value } } }))
    touch()
  }
  const updateAdditionalSpec = (id, field, val) => {
    setForm(f => ({ ...f, detailPage: { ...f.detailPage, additionalSpecs: f.detailPage.additionalSpecs.map(s => s.id === id ? { ...s, [field]: val } : s) } }))
    touch()
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await persistContent('products', form)
      dispatch({ type: 'SET_PRODUCTS', payload: form })
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
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Products Page</h1>
          <p className="text-sm text-gray-500 mt-1">Edit products page content</p>
          {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
        </div>
        <SaveButton onSave={save} saved={saved} saving={saving} />
      </div>

      <Section title="Hero">
        <Field label="Headline" value={form.hero.headline} onChange={setNested('hero', 'headline')} />
        <Field label="Subtext" value={form.hero.subtext} onChange={setNested('hero', 'subtext')} rows={3} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary Button Text" value={form.heroButtons.primaryText} onChange={setNested('heroButtons', 'primaryText')} />
          <Field label="Secondary Button Text" value={form.heroButtons.secondaryText} onChange={setNested('heroButtons', 'secondaryText')} />
        </div>
      </Section>

      <Section title="Product Cards">
        <Field label="Section Heading" value={form.ecosystemHeading} onChange={e => { setForm(f => ({ ...f, ecosystemHeading: e.target.value })); touch() }} />
        <div className="space-y-3 mt-4">
          {form.items.map((p, i) => (
            <ListItem key={p.id} index={i} onDelete={() => deleteItem(p.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" value={p.name} onChange={e => updateItem(p.id, 'name', e.target.value)} />
                <Field label="Status Badge" value={p.status} onChange={e => updateItem(p.id, 'status', e.target.value)} />
              </div>
              <Field label="Product Website URL" value={p.url || ''} placeholder="https://yourproduct.com" onChange={e => updateItem(p.id, 'url', e.target.value)} />
              <Field label="Description" value={p.desc} onChange={e => updateItem(p.id, 'desc', e.target.value)} rows={2} />
              <FileUpload label="Image" kind="image" value={p.img} onChange={(url) => updateItem(p.id, 'img', url)} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addItem} label="Add Product" />
      </Section>

      <Section title="Standards">
        <Field label="Section Heading" value={form.standardIntro.heading} onChange={setNested('standardIntro', 'heading')} />
        <Field label="Section Subtext" value={form.standardIntro.subtext} onChange={setNested('standardIntro', 'subtext')} rows={2} />
        <div className="space-y-3 mt-4">
          {form.standards.map((s, i) => (
            <ListItem key={s.id} index={i} onDelete={() => deleteStd(s.id)}>
              <Field label="Title" value={s.title} onChange={e => updateStd(s.id, 'title', e.target.value)} />
              <Field label="Description" value={s.desc} onChange={e => updateStd(s.id, 'desc', e.target.value)} rows={2} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addStd} label="Add Standard" />
      </Section>

      <Section title="CTA Section">
        <Field label="Headline" value={form.cta.headline} onChange={setNested('cta', 'headline')} />
        <Field label="Body" value={form.cta.body} onChange={setNested('cta', 'body')} rows={2} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary Button Text" value={form.cta.ctaText} onChange={setNested('cta', 'ctaText')} />
          <Field label="Secondary Button Text" value={form.ctaSecondaryButtonText} onChange={e => { setForm(f => ({ ...f, ctaSecondaryButtonText: e.target.value })); touch() }} />
        </div>
      </Section>

      <Section title="Product Detail Page Template">
        <p className="text-xs text-gray-400 -mt-2 mb-2">Shared copy used across every product's detail page (e.g. /products/fitbuddy).</p>

        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">404 / Not Found</span>
        <Field label="Heading" value={form.detailPage.notFound.heading} onChange={setDetailPageNested('notFound', 'heading')} />
        <Field label="Body" value={form.detailPage.notFound.body} onChange={setDetailPageNested('notFound', 'body')} rows={2} />
        <Field label="Button Text" value={form.detailPage.notFound.buttonText} onChange={setDetailPageNested('notFound', 'buttonText')} />

        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2 mt-4">Hero Buttons</span>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary Button Text" value={form.detailPage.heroButtons.primaryText} onChange={setDetailPageNested('heroButtons', 'primaryText')} />
          <Field label="Secondary Button Text" value={form.detailPage.heroButtons.secondaryText} onChange={setDetailPageNested('heroButtons', 'secondaryText')} />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2 mt-4">Section Labels</span>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Capabilities Label" value={form.detailPage.capabilitiesLabel} onChange={setDetailPage('capabilitiesLabel')} />
          <Field label="Capabilities Heading" value={form.detailPage.capabilitiesHeading} onChange={setDetailPage('capabilitiesHeading')} />
          <Field label="Spotlight 1 Label" value={form.detailPage.spotlight1Label} onChange={setDetailPage('spotlight1Label')} />
          <Field label="Spotlight 2 Label" value={form.detailPage.spotlight2Label} onChange={setDetailPage('spotlight2Label')} />
          <Field label="Specs Label" value={form.detailPage.specsLabel} onChange={setDetailPage('specsLabel')} />
          <Field label="Specs Heading" value={form.detailPage.specsHeading} onChange={setDetailPage('specsHeading')} />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2 mt-4">Additional Specs Row</span>
        <div className="space-y-3">
          {form.detailPage.additionalSpecs.map((s) => (
            <div key={s.id} className="border border-gray-200 p-4 grid grid-cols-2 gap-3">
              <Field label="Label" value={s.label} onChange={e => updateAdditionalSpec(s.id, 'label', e.target.value)} />
              <Field label="Value" value={s.value} onChange={e => updateAdditionalSpec(s.id, 'value', e.target.value)} />
            </div>
          ))}
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2 mt-4">Inquiry Form</span>
        <Field label="Heading (use {name} for the product name)" value={form.detailPage.formHeading} onChange={setDetailPage('formHeading')} />
        <Field label="Body" value={form.detailPage.formBody} onChange={setDetailPage('formBody')} rows={2} />
        <Field label="Success Message" value={form.detailPage.formSuccessMessage} onChange={setDetailPage('formSuccessMessage')} rows={2} />
        <Field label="Button Text" value={form.detailPage.formButtonText} onChange={setDetailPage('formButtonText')} />
      </Section>
    </div>
  )
}
