import { Navigate, Outlet } from 'react-router-dom'

export default function AdminGuard() {
  const isAuth = localStorage.getItem('admin_auth') === '1'
  if (!isAuth) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
