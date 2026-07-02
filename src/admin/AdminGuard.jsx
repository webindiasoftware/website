import { Navigate, Outlet } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function AdminGuard() {
  const { loading } = useData()
  const isAuth = !!localStorage.getItem('admin_token')
  if (!isAuth) return <Navigate to="/admin/login" replace />

  // Wait for the backend-backed sections to hydrate before mounting admin edit
  // pages — otherwise their local form state can snapshot stale defaults and a
  // Save would overwrite real content with them.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Loading content…
      </div>
    )
  }

  return <Outlet />
}
