import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function AdminContacts() {
  const { data, dispatch } = useData()
  const [selected, setSelected] = useState(null)

  const del = (id) => {
    if (confirm('Delete this submission?')) {
      dispatch({ type: 'DELETE_SUBMISSION', payload: id })
      if (selected?.id === id) setSelected(null)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Contact Submissions</h1>
        <p className="text-sm text-gray-500 mt-1">{data.contactSubmissions.length} total submissions</p>
      </div>

      {data.contactSubmissions.length === 0 ? (
        <div className="bg-white border border-gray-200 p-16 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-200 block mb-4">inbox</span>
          <p className="text-gray-400 text-sm">No contact form submissions yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Submissions</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-150 overflow-y-auto">
              {data.contactSubmissions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selected?.id === s.id ? 'bg-gray-100' : ''}`}
                >
                  <div className="font-semibold text-sm text-[#1b1c1c]">{s.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.email}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 font-bold uppercase ${s.urgency === 'critical' ? 'bg-primary-fixed text-[#106F89]' : 'bg-gray-100 text-gray-500'}`}>
                      {s.urgency}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(s.submittedAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-2 bg-white border border-gray-200">
            {!selected ? (
              <div className="flex items-center justify-center h-64 text-gray-300 text-sm">
                Select a submission to view details
              </div>
            ) : (
              <div>
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-[#1b1c1c]">{selected.name}</h2>
                  <button onClick={() => del(selected.id)} className="text-gray-300 hover:text-[#106F89] transition-colors flex items-center gap-1 text-xs font-bold uppercase">
                    <span className="material-symbols-outlined text-base">delete</span>
                    Delete
                  </button>
                </div>
                <div className="p-6 space-y-5">
                  {[
                    { label: 'Email', value: selected.email },
                    { label: 'Sector', value: selected.sector },
                    { label: 'Urgency', value: selected.urgency },
                    { label: 'Submitted', value: new Date(selected.submittedAt).toLocaleString() },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</div>
                      <div className="text-sm text-[#1b1c1c] font-medium">{value}</div>
                    </div>
                  ))}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Technical Brief</div>
                    <div className="text-sm text-[#1b1c1c] bg-gray-50 p-4 border border-gray-200 leading-relaxed whitespace-pre-wrap">
                      {selected.brief || '—'}
                    </div>
                  </div>
                  <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 bg-[#1b1c1c] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-[#106F89] transition-colors">
                    <span className="material-symbols-outlined text-base">mail</span>
                    Reply via Email
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
