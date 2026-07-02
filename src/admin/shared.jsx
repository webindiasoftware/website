// Shared admin UI components

export function PageHeader({ title, subtitle, onSave, saved }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {onSave && (
        <button
          onClick={onSave}
          className="bg-[#1b1c1c] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-[#106F89] transition-colors flex items-center gap-2"
        >
          {saved ? <><span className="material-symbols-outlined text-base">check</span> Saved</> : <><span className="material-symbols-outlined text-base">save</span> Save Changes</>}
        </button>
      )}
    </div>
  )
}

export function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 mb-6">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  )
}

export function Field({ label, value, onChange, type = 'text', rows, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{label}</span>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#1b1c1c] resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#1b1c1c]"
        />
      )}
    </label>
  )
}

export function ListItem({ children, onDelete, index }) {
  return (
    <div className="border border-gray-200 p-4 relative">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-bold text-gray-400 mt-1 shrink-0">#{index + 1}</span>
        <div className="flex-1 space-y-3">{children}</div>
        <button
          onClick={onDelete}
          className="text-gray-300 hover:text-[#106F89] transition-colors shrink-0 mt-1"
          title="Delete"
        >
          <span className="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
    </div>
  )
}

export function AddButton({ onClick, label = 'Add Item' }) {
  return (
    <button
      onClick={onClick}
      className="w-full border border-dashed border-gray-300 py-3 text-sm text-gray-400 hover:border-[#1b1c1c] hover:text-[#1b1c1c] transition-colors flex items-center justify-center gap-2 font-medium"
    >
      <span className="material-symbols-outlined text-base">add</span>
      {label}
    </button>
  )
}

export function SaveButton({ onSave, saved, saving }) {
  return (
    <button
      onClick={onSave}
      disabled={saving}
      className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 disabled:opacity-50 ${
        saved ? 'bg-green-600 text-white' : 'bg-[#1b1c1c] text-white hover:bg-[#106F89]'
      }`}
    >
      <span className="material-symbols-outlined text-base">{saved ? 'check' : 'save'}</span>
      {saving ? 'Saving…' : saved ? 'Saved!' : 'Save'}
    </button>
  )
}
