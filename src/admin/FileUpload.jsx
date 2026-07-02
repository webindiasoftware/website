import { useRef, useState } from 'react'
import { uploadAdminFile } from './persistContent'

// Drag-and-drop (or click-to-browse) upload for an image/video field. Stores
// just the resulting URL — same shape as the old plain "Image URL" text field
// it replaces, so callers still receive a plain string via onChange.
export function FileUpload({ label, value, onChange, kind = 'image' }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const accept = kind === 'video' ? 'video/*' : 'image/*'

  const doUpload = async (file) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadAdminFile(file)
      onChange(url)
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{label}</span>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); doUpload(e.dataTransfer.files?.[0]) }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed p-4 text-center cursor-pointer text-sm transition-colors ${
          dragging ? 'border-[#106F89] bg-[#106F89]/5' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className="text-gray-500">
          {uploading ? 'Uploading…' : value ? 'Click or drop to replace' : `Drag & drop a ${kind}, or click to browse`}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => doUpload(e.target.files?.[0])}
        />
      </div>

      {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}

      {value && kind === 'image' && (
        <img src={value} alt={label} className="h-24 w-auto object-cover border border-gray-200 mt-2" />
      )}
      {value && kind === 'video' && (
        <video src={value} controls className="h-32 w-auto border border-gray-200 mt-2" />
      )}
    </div>
  )
}
