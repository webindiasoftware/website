import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useSubmissions } from './useSubmissions'

export default function AdminDashboard() {
  const { data } = useData()
  const { submissions } = useSubmissions()
  const publishedPosts = data.blog.posts.filter(p => p.published).length
  const totalSubmissions = submissions.length
  const unreadSubmissions = submissions.filter(s => !s.read).length

  const stats = [
    { label: 'Blog Posts', value: publishedPosts, icon: 'article', link: '/admin/blog', color: 'text-blue-600' },
    { label: 'Services', value: data.services.coreServices.length, icon: 'build', link: '/admin/services', color: 'text-green-600' },
    { label: 'Products', value: data.products.items.length, icon: 'inventory_2', link: '/admin/products', color: 'text-purple-600' },
    { label: 'Submissions', value: totalSubmissions, icon: 'mail', link: '/admin/contacts', color: 'text-[#106F89]', badge: unreadSubmissions },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-[#1b1c1c]">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your site content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon, link, color, badge }) => (
          <Link key={label} to={link} className="bg-white border border-gray-200 p-5 hover:border-[#1b1c1c] transition-colors block">
            <div className="flex items-start justify-between">
              <span className={`material-symbols-outlined text-2xl ${color}`}>{icon}</span>
              {badge > 0 && (
                <span className="text-xs bg-[#106F89] text-white px-2 py-0.5 font-bold">{badge} new</span>
              )}
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black text-[#1b1c1c]">{value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { to: '/admin/blog', label: 'Write New Blog Post', icon: 'edit' },
              { to: '/admin/contacts', label: 'View Contact Submissions', icon: 'inbox' },
              { to: '/admin/home', label: 'Edit Home Page', icon: 'home' },
              { to: '/admin/settings', label: 'Company Settings', icon: 'settings' },
            ].map(({ to, label, icon }) => (
              <Link key={to} to={to} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-sm font-medium text-[#1b1c1c] border border-transparent hover:border-gray-200">
                <span className="material-symbols-outlined text-gray-400 text-base">{icon}</span>
                {label}
                <span className="material-symbols-outlined text-gray-300 text-base ml-auto">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent submissions */}
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Recent Submissions</h2>
          {submissions.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No submissions yet</p>
          ) : (
            <div className="space-y-3">
              {submissions.slice(0, 4).map((s) => (
                <div key={s._id} className="border-b border-gray-100 pb-3">
                  <div className="font-medium text-sm text-[#1b1c1c]">{s.name}</div>
                  <div className="text-xs text-gray-400">{s.email} · {s.sector}</div>
                </div>
              ))}
              {submissions.length > 4 && (
                <Link to="/admin/contacts" className="text-xs text-[#106F89] font-bold uppercase tracking-wider">
                  View all {submissions.length} →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
