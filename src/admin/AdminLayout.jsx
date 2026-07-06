import { useState } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: 'grid_view', end: true },
  { to: '/admin/home', label: 'Home Page', icon: 'home' },
  { to: '/admin/about', label: 'About Page', icon: 'person' },
  { to: '/admin/services', label: 'Services', icon: 'build' },
  { to: '/admin/products', label: 'Products', icon: 'inventory_2' },
  { to: '/admin/navbar-menu', label: 'Products Menu', icon: 'menu' },
  { to: '/admin/product-details', label: 'Product Details', icon: 'description' },
  { to: '/admin/blog', label: 'Blog', icon: 'article' },
  { to: '/admin/contact-page', label: 'Contact Page', icon: 'contact_page' },
  { to: '/admin/footer', label: 'Footer', icon: 'view_agenda' },
  { to: '/admin/contacts', label: 'Submissions', icon: 'mail' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-56 bg-[#1b1c1c] flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex md:shrink-0
      `}>
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-white/10">
          <span className="text-white font-black text-lg tracking-tighter">softskirl</span>
          <span className="ml-2 text-[#106F89] text-xs font-bold uppercase tracking-widest">admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {nav.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#106F89] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors py-2">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Site
          </Link>
          <button onClick={logout} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors py-2 w-full">
            <span className="material-symbols-outlined text-base">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
          <button onClick={() => setOpen(true)} className="text-gray-600">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-black text-base tracking-tighter">softskirl <span className="text-[#106F89] text-xs font-bold">admin</span></span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
