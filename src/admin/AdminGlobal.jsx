import { useState } from 'react'
import { useData } from '../context/DataContext'
import { SaveButton, Section, Field } from './shared'

export default function AdminGlobal() {
  const { data, dispatch } = useData()
  const [form, setForm] = useState({ ...data.global })
  const [saved, setSaved] = useState(false)

  const set = (key) => (e) => { setForm(f => ({ ...f, [key]: e.target.value })); setSaved(false) }

  const save = () => {
    dispatch({ type: 'SET_GLOBAL', payload: form })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Company Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Global information used across all pages</p>
        </div>
        <SaveButton onSave={save} saved={saved} />
      </div>

      <Section title="Brand">
        <Field label="Company Name" value={form.companyName} onChange={set('companyName')} />
        <Field label="Tagline" value={form.tagline} onChange={set('tagline')} rows={2} />
      </Section>

      <Section title="Contact Information">
        <Field label="Phone" value={form.phone} onChange={set('phone')} />
        <Field label="Email" value={form.email} onChange={set('email')} type="email" />
        <Field label="Address" value={form.address} onChange={set('address')} rows={3} />
      </Section>
    </div>
  )
}
