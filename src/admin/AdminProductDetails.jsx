import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'
import { persistContent } from './persistContent'
import { FileUpload } from './FileUpload'

const blankDetail = {
  name: '', badge: '', badgeColor: 'bg-gray-50 text-gray-700 border-gray-200',
  category: '', tagline: '', heroDesc: '', heroImg: '', favicon: '',
  capabilities: [],
  spotlight1: { title: '', desc: '', bullets: [], img: '' },
  spotlight2: { title: '', desc: '', bullets: [], img: '' },
  specs: {
    database: { label: 'Database Layer', value: '', icon: 'database' },
    api: { label: 'API Protocol', value: '', icon: 'api' },
    hosting: { label: 'Hosting Environment', value: '', icon: 'cloud' },
    uptime: { label: 'Uptime Target', value: '', icon: 'verified' },
  },
}

export default function AdminProductDetails() {
  const { data, dispatch } = useData()
  const [editing, setEditing] = useState(null) // null = list, 'new' = new, slug = editing existing
  const [slugInput, setSlugInput] = useState('')
  const [form, setForm] = useState(blankDetail)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const slugs = Object.keys(data.productDetails || {})

  const openNew = () => { setSlugInput(''); setForm(JSON.parse(JSON.stringify(blankDetail))); setEditing('new') }
  const openEdit = (slug) => { setSlugInput(slug); setForm(JSON.parse(JSON.stringify(data.productDetails[slug]))); setEditing(slug) }
  const cancelEdit = () => { setEditing(null); setError('') }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))
  const setNested = (section, key) => (e) => setForm(f => ({ ...f, [section]: { ...f[section], [key]: e.target.value } }))

  const updateCapability = (i, field, val) => setForm(f => ({ ...f, capabilities: f.capabilities.map((c, idx) => idx === i ? { ...c, [field]: val } : c) }))
  const deleteCapability = (i) => setForm(f => ({ ...f, capabilities: f.capabilities.filter((_, idx) => idx !== i) }))
  const addCapability = () => setForm(f => ({ ...f, capabilities: [...f.capabilities, { title: 'New Capability', desc: 'Description.', icon: 'bolt', img: '' }] }))

  const updateBullet = (section, i, val) => setForm(f => {
    const bullets = [...f[section].bullets]; bullets[i] = val
    return { ...f, [section]: { ...f[section], bullets } }
  })
  const addBullet = (section) => setForm(f => ({ ...f, [section]: { ...f[section], bullets: [...f[section].bullets, 'New point'] } }))
  const deleteBullet = (section, i) => setForm(f => ({ ...f, [section]: { ...f[section], bullets: f[section].bullets.filter((_, idx) => idx !== i) } }))

  const updateSpec = (key, field, val) => setForm(f => ({ ...f, specs: { ...f.specs, [key]: { ...f.specs[key], [field]: val } } }))

  const save = async () => {
    const slug = slugInput.trim().toLowerCase()
    if (!slug) { setError('Slug is required.'); return }
    const nextDetails = { ...data.productDetails, [slug]: form }
    if (editing !== 'new' && editing !== slug) delete nextDetails[editing] // slug was renamed
    setSaving(true)
    setError('')
    try {
      await persistContent('productDetails', nextDetails)
      dispatch({ type: 'SET_PRODUCT_DETAILS', payload: nextDetails })
      setSaved(true)
      setTimeout(() => { setSaved(false); setEditing(null) }, 1200)
    } catch (err) {
      setError(err.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  const deleteDetail = async (slug) => {
    if (!confirm(`Delete product detail page for "${slug}"?`)) return
    const nextDetails = { ...data.productDetails }
    delete nextDetails[slug]
    try {
      await persistContent('productDetails', nextDetails)
      dispatch({ type: 'SET_PRODUCT_DETAILS', payload: nextDetails })
    } catch (err) {
      setError(err.message || 'Failed to delete.')
    }
  }

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">
              {editing === 'new' ? 'New Product Detail Page' : `Edit: ${form.name || editing}`}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Full /products/:slug landing page content</p>
            {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
          </div>
          <div className="flex gap-3">
            <button onClick={cancelEdit} className="px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <SaveButton onSave={save} saved={saved} saving={saving} />
          </div>
        </div>

        <Section title="Basics">
          <Field label="Slug (URL — must match a product's name, lowercase)" value={slugInput} onChange={e => setSlugInput(e.target.value)} placeholder="e.g. fitbuddy" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" value={form.name} onChange={set('name')} />
            <Field label="Category" value={form.category} onChange={set('category')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Badge Text" value={form.badge} onChange={set('badge')} placeholder="v4.2 Active" />
            <Field label="Badge Color (Tailwind classes)" value={form.badgeColor} onChange={set('badgeColor')} placeholder="bg-emerald-50 text-emerald-700 border-emerald-200" />
          </div>
          <Field label="Tagline" value={form.tagline} onChange={set('tagline')} />
          <Field label="Hero Description" value={form.heroDesc} onChange={set('heroDesc')} rows={3} />
          <FileUpload label="Hero Image" kind="image" value={form.heroImg} onChange={(url) => setForm(f => ({ ...f, heroImg: url }))} />
          <FileUpload label="Favicon (shown next to the product name in the sub-navbar)" kind="image" value={form.favicon} onChange={(url) => setForm(f => ({ ...f, favicon: url }))} />
        </Section>

        <Section title="Core Capabilities">
          <div className="space-y-3">
            {form.capabilities.map((c, i) => (
              <ListItem key={i} index={i} onDelete={() => deleteCapability(i)}>
                <Field label="Title" value={c.title} onChange={e => updateCapability(i, 'title', e.target.value)} />
                <Field label="Description" value={c.desc} onChange={e => updateCapability(i, 'desc', e.target.value)} rows={2} />
                <FileUpload label="Image" kind="image" value={c.img} onChange={(url) => updateCapability(i, 'img', url)} />
              </ListItem>
            ))}
          </div>
          <AddButton onClick={addCapability} label="Add Capability" />
        </Section>

        {['spotlight1', 'spotlight2'].map((section, idx) => (
          <Section key={section} title={`Feature Spotlight ${idx + 1}`}>
            <Field label="Title" value={form[section].title} onChange={setNested(section, 'title')} />
            <Field label="Description" value={form[section].desc} onChange={setNested(section, 'desc')} rows={3} />
            <FileUpload label="Image" kind="image" value={form[section].img} onChange={(url) => setForm(f => ({ ...f, [section]: { ...f[section], img: url } }))} />
            <div className="mt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Bullet Points</span>
              <div className="space-y-2">
                {form[section].bullets.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={b}
                      onChange={e => updateBullet(section, i, e.target.value)}
                      className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#1b1c1c]"
                    />
                    <button onClick={() => deleteBullet(section, i)} className="text-gray-300 hover:text-[#106F89] transition-colors">
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addBullet(section)} className="mt-2 text-xs text-[#106F89] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span> Add Bullet
              </button>
            </div>
          </Section>
        ))}

        <Section title="Technical Specs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(form.specs).map(([key, spec]) => (
              <div key={key} className="border border-gray-200 p-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{key}</span>
                <Field label="Label" value={spec.label} onChange={e => updateSpec(key, 'label', e.target.value)} />
                <Field label="Value" value={spec.value} onChange={e => updateSpec(key, 'value', e.target.value)} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Product Details</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the full /products/:slug landing pages</p>
          {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
        </div>
        <button onClick={openNew} className="bg-[#1b1c1c] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-[#106F89] transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">add</span>
          New Product Detail
        </button>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">All Product Detail Pages ({slugs.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {slugs.length === 0 && (
            <p className="text-sm text-gray-400 py-8 text-center">No product detail pages yet.</p>
          )}
          {slugs.map((slug) => {
            const detail = data.productDetails[slug]
            return (
              <div key={slug} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-[#1b1c1c]">{detail.name || slug}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{detail.badge} · /products/{slug}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(slug)} className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1b1c1c] flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-base">edit</span>
                    Edit
                  </button>
                  <button onClick={() => deleteDetail(slug)} className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#106F89] flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
