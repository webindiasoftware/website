import { useState, lazy, Suspense } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'

// Lazy-loaded: same reasoning as AdminBlog — TipTap is heavy, only needed while
// actually editing a legal page's body.
const RichTextEditor = lazy(() => import('./RichTextEditor').then(m => ({ default: m.RichTextEditor })))

let nextId = 600

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function AdminFooter() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.footer)))
  const [saved, setSaved] = useState(false)

  const touch = () => setSaved(false)

  const updateNavLink = (id, field, val) => { setForm(f => ({ ...f, navLinks: f.navLinks.map(l => l.id === id ? { ...l, [field]: val } : l) })); touch() }
  const deleteNavLink = (id) => { setForm(f => ({ ...f, navLinks: f.navLinks.filter(l => l.id !== id) })); touch() }
  const addNavLink = () => { setForm(f => ({ ...f, navLinks: [...f.navLinks, { id: nextId++, label: 'New Link', to: '/' }] })); touch() }

  const updateLegalPage = (id, field, val) => {
    setForm(f => ({
      ...f,
      legalPages: f.legalPages.map(p => {
        if (p.id !== id) return p
        const next = { ...p, [field]: val }
        // Keep the slug in sync with the title unless the admin has customized it directly.
        if (field === 'title' && !p._slugEdited) next.slug = slugify(val)
        if (field === 'slug') next._slugEdited = true
        return next
      }),
    }))
    touch()
  }
  const deleteLegalPage = (id) => { setForm(f => ({ ...f, legalPages: f.legalPages.filter(p => p.id !== id) })); touch() }
  const addLegalPage = () => {
    setForm(f => ({ ...f, legalPages: [...f.legalPages, { id: nextId++, slug: 'new-page', title: 'New Page', content: '<p>Write this page\'s content here.</p>' }] }))
    touch()
  }

  const save = () => {
    dispatch({ type: 'SET_FOOTER', payload: form })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Footer</h1>
          <p className="text-sm text-gray-500 mt-1">Edit footer navigation links and legal pages (Privacy Policy, Terms, etc.)</p>
        </div>
        <SaveButton onSave={save} saved={saved} />
      </div>

      <Section title="Navigation Links">
        <div className="space-y-3">
          {form.navLinks.map((l, i) => (
            <ListItem key={l.id} index={i} onDelete={() => deleteNavLink(l.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Label" value={l.label} onChange={e => updateNavLink(l.id, 'label', e.target.value)} />
                <Field label="Link (e.g. /services)" value={l.to} onChange={e => updateNavLink(l.id, 'to', e.target.value)} />
              </div>
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addNavLink} label="Add Link" />
      </Section>

      <Section title="Legal Pages">
        <p className="text-xs text-gray-400 -mt-2 mb-2">Each page below gets its own public page at /legal/&lt;slug&gt;, linked from the footer's Legal column.</p>
        <div className="space-y-4">
          {form.legalPages.map((p, i) => (
            <ListItem key={p.id} index={i} onDelete={() => deleteLegalPage(p.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Title" value={p.title} onChange={e => updateLegalPage(p.id, 'title', e.target.value)} />
                <Field label="URL Slug" value={p.slug} onChange={e => updateLegalPage(p.id, 'slug', e.target.value)} />
              </div>
              <p className="text-xs text-gray-400">Public URL: /legal/{p.slug}</p>
              <Suspense fallback={<div className="border border-gray-200 min-h-40 flex items-center justify-center text-sm text-gray-400">Loading editor…</div>}>
                <RichTextEditor label="Content" value={p.content} onChange={(html) => updateLegalPage(p.id, 'content', html)} />
              </Suspense>
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addLegalPage} label="Add Legal Page" />
      </Section>
    </div>
  )
}
