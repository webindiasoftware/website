import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field, ListItem, AddButton } from './shared'
import { FileUpload } from './FileUpload'

let nextId = 200

export default function AdminAbout() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data.about)))
  const [saved, setSaved] = useState(false)

  const touch = () => setSaved(false)
  const setNested = (section, key) => (e) => { setForm(f => ({ ...f, [section]: { ...f[section], [key]: e.target.value } })); touch() }

  const updateList = (key, id, field, val) => { setForm(f => ({ ...f, [key]: f[key].map(i => i.id === id ? { ...i, [field]: val } : i) })); touch() }
  const deleteFromList = (key, id) => { setForm(f => ({ ...f, [key]: f[key].filter(i => i.id !== id) })); touch() }
  const addToList = (key, tpl) => { setForm(f => ({ ...f, [key]: [...f[key], { id: nextId++, ...tpl }] })); touch() }

  const save = () => {
    dispatch({ type: 'SET_ABOUT', payload: form })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">About Page</h1>
          <p className="text-sm text-gray-500 mt-1">Edit about page content</p>
        </div>
        <SaveButton onSave={save} saved={saved} />
      </div>

      <Section title="Hero">
        <Field label="Badge Text" value={form.hero.badge} onChange={setNested('hero', 'badge')} />
        <Field label="Headline" value={form.hero.headline} onChange={setNested('hero', 'headline')} />
        <Field label="Subtext" value={form.hero.subtext} onChange={setNested('hero', 'subtext')} rows={3} />
      </Section>

      <Section title="Our Story">
        <Field label="Section Headline" value={form.story.headline} onChange={setNested('story', 'headline')} />
        <Field label="Title" value={form.story.title} onChange={setNested('story', 'title')} />
        <Field label="Paragraph 1" value={form.story.body1} onChange={setNested('story', 'body1')} rows={4} />
        <Field label="Paragraph 2" value={form.story.body2} onChange={setNested('story', 'body2')} rows={4} />
        <div className="mt-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Timeline Cards</span>
          <div className="space-y-3">
            {form.timeline.map((t, i) => (
              <ListItem key={t.id} index={i} onDelete={() => deleteFromList('timeline', t.id)}>
                <Field label="Title" value={t.title} onChange={e => updateList('timeline', t.id, 'title', e.target.value)} />
                <Field label="Description" value={t.desc} onChange={e => updateList('timeline', t.id, 'desc', e.target.value)} rows={2} />
              </ListItem>
            ))}
          </div>
          <AddButton onClick={() => addToList('timeline', { title: 'New Milestone', desc: 'Milestone description.' })} label="Add Timeline Card" />
        </div>
      </Section>

      <Section title="Core Values">
        <Field label="Section Heading" value={form.pillarsIntro.heading} onChange={setNested('pillarsIntro', 'heading')} />
        <Field label="Section Subtext" value={form.pillarsIntro.subtext} onChange={setNested('pillarsIntro', 'subtext')} rows={2} />
        <div className="space-y-3">
          {form.values.map((v, i) => (
            <ListItem key={v.id} index={i} onDelete={() => deleteFromList('values', v.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Icon" value={v.icon} onChange={e => updateList('values', v.id, 'icon', e.target.value)} />
                <Field label="Title" value={v.title} onChange={e => updateList('values', v.id, 'title', e.target.value)} />
              </div>
              <Field label="Description" value={v.desc} onChange={e => updateList('values', v.id, 'desc', e.target.value)} rows={2} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={() => addToList('values', { icon: 'star', title: 'New Value', desc: 'Value description.' })} label="Add Value" />
      </Section>

      <Section title="Leadership Team">
        <Field label="Section Heading" value={form.leadershipIntro.heading} onChange={setNested('leadershipIntro', 'heading')} />
        <Field label="Section Subtext" value={form.leadershipIntro.subtext} onChange={setNested('leadershipIntro', 'subtext')} rows={2} />
        <div className="space-y-3 mt-4">
          {form.leaders.map((l, i) => (
            <ListItem key={l.id} index={i} onDelete={() => deleteFromList('leaders', l.id)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" value={l.name} onChange={e => updateList('leaders', l.id, 'name', e.target.value)} />
                <Field label="Role" value={l.role} onChange={e => updateList('leaders', l.id, 'role', e.target.value)} />
              </div>
              <FileUpload label="Photo" kind="image" value={l.img} onChange={(url) => updateList('leaders', l.id, 'img', url)} />
            </ListItem>
          ))}
        </div>
        <AddButton onClick={() => addToList('leaders', { name: 'New Member', role: 'Role Title', img: '' })} label="Add Team Member" />
      </Section>

      <Section title="CTA Section">
        <Field label="Headline" value={form.cta.headline} onChange={setNested('cta', 'headline')} />
        <Field label="Body" value={form.cta.body} onChange={setNested('cta', 'body')} rows={2} />
        <Field label="Button Text" value={form.cta.ctaText} onChange={setNested('cta', 'ctaText')} />
      </Section>
    </div>
  )
}
