import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, ApiError } from '../api/client'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const token = await login(form.email, form.password)
      localStorage.setItem('admin_token', token)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const set = (key) => (e) => { setForm(f => ({ ...f, [key]: e.target.value })); setError('') }

  return (
    <div className="min-h-screen bg-[#1b1c1c] flex items-center justify-center px-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white p-10">
          {/* Brand */}
          <div className="mb-8">
            <div className="text-2xl font-black tracking-tighter text-[#1b1c1c]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              softskirl
              <span className="text-[#106F89] text-xs font-bold uppercase tracking-widest ml-2 align-middle">admin</span>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">Content Management</p>
          </div>

          <div className="w-8 h-0.5 bg-[#106F89] mb-8"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="admin@softskirl.com"
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1b1c1c] placeholder:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={set('password')}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1b1c1c] placeholder:text-gray-300"
              />
            </div>

            {error && (
              <p className="text-xs text-[#106F89] font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b1c1c] text-white py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-[#106F89] transition-colors duration-200 mt-2 disabled:opacity-50"
            >
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6 uppercase tracking-widest">
          © {new Date().getFullYear()} softskirl
        </p>
      </div>
    </div>
  )
}
