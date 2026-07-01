import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import ProductDetail from './pages/ProductDetail'
import AdminLayout from './admin/AdminLayout'
import AdminGuard from './admin/AdminGuard'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminHome from './admin/AdminHome'
import AdminAbout from './admin/AdminAbout'
import AdminServices from './admin/AdminServices'
import AdminProducts from './admin/AdminProducts'
import AdminBlog from './admin/AdminBlog'
import AdminContacts from './admin/AdminContacts'
import AdminGlobal from './admin/AdminGlobal'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="settings" element={<AdminGlobal />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
