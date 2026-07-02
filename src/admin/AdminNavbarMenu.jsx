import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'
import { persistContent } from './persistContent'

let nextId = 500

export default function AdminNavbarMenu() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.navbarProducts)))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const touch = () => setSaved(false)

  const updateCategory = (catId, field, val) => {
    setForm(f => f.map(c => c.id === catId ? { ...c, [field]: val } : c))
    touch()
  }
  const deleteCategory = (catId) => { setForm(f => f.filter(c => c.id !== catId)); touch() }
  const addCategory = () => {
    setForm(f => [...f, { id: nextId++, title: 'New Category', items: [] }])
    touch()
  }

  const updateItem = (catId, itemId, field, val) => {
    setForm(f => f.map(c => c.id === catId
      ? { ...c, items: c.items.map(i => i.id === itemId ? { ...i, [field]: val } : i) }
      : c))
    touch()
  }
  const deleteItem = (catId, itemId) => {
    setForm(f => f.map(c => c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c))
    touch()
  }
  const addItem = (catId) => {
    setForm(f => f.map(c => c.id === catId
      ? { ...c, items: [...c.items, { id: nextId++, name: 'New Product', desc: 'Short description.', icon: 'widgets', bgColor: 'bg-gray-100', iconColor: 'text-gray-600', url: '/products' }] }
      : c))
    touch()
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await persistContent('navbarProducts', form)
      dispatch({ type: 'SET_NAVBAR_PRODUCTS', payload: form })
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
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Products Menu</h1>
          <p className="text-sm text-gray-500 mt-1">Edit the Products dropdown mega-menu in the navbar</p>
          {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
        </div>
        <SaveButton onSave={save} saved={saved} saving={saving} />
      </div>

      <Section title="Categories">
        <div className="space-y-4">
          {form.map((cat, i) => (
            <ListItem key={cat.id} index={i} onDelete={() => deleteCategory(cat.id)}>
              <Field label="Category Title" value={cat.title} onChange={e => updateCategory(cat.id, 'title', e.target.value)} />

              <div className="pl-4 border-l-2 border-gray-100 space-y-3 mt-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Items in this category</span>
                {cat.items.map((item, j) => (
                  <ListItem key={item.id} index={j} onDelete={() => deleteItem(cat.id, item.id)}>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Name" value={item.name} onChange={e => updateItem(cat.id, item.id, 'name', e.target.value)} />
                      <Field label="Link URL" value={item.url} onChange={e => updateItem(cat.id, item.id, 'url', e.target.value)} placeholder="/products/slug" />
                    </div>
                    <Field label="Description" value={item.desc} onChange={e => updateItem(cat.id, item.id, 'desc', e.target.value)} rows={2} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Icon Bg (Tailwind class)" value={item.bgColor} onChange={e => updateItem(cat.id, item.id, 'bgColor', e.target.value)} placeholder="bg-[#f3e8ff]" />
                      <Field label="Icon Color (Tailwind class)" value={item.iconColor} onChange={e => updateItem(cat.id, item.id, 'iconColor', e.target.value)} placeholder="text-[#a855f7]" />
                    </div>
                  </ListItem>
                ))}
                <AddButton onClick={() => addItem(cat.id)} label="Add Item" />
              </div>
            </ListItem>
          ))}
        </div>
        <AddButton onClick={addCategory} label="Add Category" />
      </Section>
    </div>
  )
}
