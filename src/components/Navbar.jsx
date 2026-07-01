import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'

const staticLinks = [
  { to: '/services', label: 'Services' },
  { to: '/blog',     label: 'Blog' },
  { to: '/about',    label: 'About' },
]

function NavLink({ to, children, isActive }) {
  return (
    <Link
      to={to}
      className={`relative font-label-bold text-label-bold uppercase tracking-wider transition-colors duration-200 group ${
        isActive ? 'text-primary' : 'text-on-background hover:text-primary'
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  )
}

const productCategories = [
  {
    title: 'Operations',
    items: [
      {
        name: 'SkirlWorks',
        desc: 'End-to-end business management suite for growing enterprises',
        icon: 'work_history',
        bgColor: 'bg-[#f3e8ff]',
        iconColor: 'text-[#a855f7]',
        url: '/products/skirlworks'
      },
      {
        name: 'SkirlMMS',
        desc: 'Merchant management system to onboard, manage, and monitor networks',
        icon: 'storefront',
        bgColor: 'bg-[#e6f7f4]',
        iconColor: 'text-[#14b8a6]',
        url: '/products/skirlmms'
      }
    ]
  },
  {
    title: 'Enterprise',
    items: [
      {
        name: 'SkirlHRMS',
        desc: 'Human resource management system for payroll and attendance',
        icon: 'people',
        bgColor: 'bg-[#dbeafe]',
        iconColor: 'text-[#3b82f6]',
        url: '/products/skirlhrms'
      },
      {
        name: 'SkirlERP',
        desc: 'Comprehensive ERP for finance, HR, and sales management',
        icon: 'account_tree',
        bgColor: 'bg-[#ffedd5]',
        iconColor: 'text-[#f97316]',
        url: '/products/skirlerp'
      }
    ]
  },
  {
    title: 'Specialized',
    items: [
      {
        name: 'FitBuddy',
        desc: 'Gym & fitness club automation with member app and billing',
        icon: 'fitness_center',
        bgColor: 'bg-[#fce7f3]',
        iconColor: 'text-[#ec4899]',
        url: '/products/fitbuddy'
      }
    ]
  }
]

export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false)
  const [dropOpen, setDropOpen]       = useState(false)
  const [mobileProds, setMobileProds] = useState(false)
  const { pathname } = useLocation()
  const { data }     = useData()
  const leaveTimer   = useRef(null)

  useEffect(() => { setIsOpen(false); setDropOpen(false) }, [pathname])
  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const openDrop   = () => { clearTimeout(leaveTimer.current); setDropOpen(true) }
  const startClose = () => { leaveTimer.current = setTimeout(() => setDropOpen(false), 150) }

  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)
  const isProductsActive = pathname.startsWith('/products')

  return (
    <header className="w-full sticky top-0 z-50 bg-surface-main border-b border-border-bold">
      <nav className="relative flex justify-between items-center h-20 px-5 md:px-12 max-w-container-max mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="text-headline-md font-headline-md font-black text-on-background tracking-tighter transition-opacity duration-200 hover:opacity-75"
        >
          {data.global.companyName}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">

          <NavLink to="/" isActive={isActive('/')}>Home</NavLink>

          {/* ── Products with dropdown ── */}
          <div
            onMouseEnter={openDrop}
            onMouseLeave={startClose}
          >
            {/* Trigger */}
            <button
              className={`relative flex items-center gap-0.5 font-label-bold text-label-bold uppercase tracking-wider transition-colors duration-200 group ${
                isProductsActive || dropOpen ? 'text-primary' : 'text-on-background hover:text-primary'
              }`}
            >
              Products
              <span
                className="material-symbols-outlined transition-transform duration-300 ease-out"
                style={{ fontSize: '18px', transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                expand_more
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                  isProductsActive || dropOpen ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            {/* ── Dropdown panel ── */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 shadow-2xl z-50 rounded-2xl p-8
                          transition-all duration-250 ease-out origin-top
                          ${dropOpen
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                          }`}
              style={{ width: '950px' }}
            >
              <div className="flex gap-8 divide-x divide-gray-100">
                {productCategories.map((category, catIdx) => (
                  <div
                    key={category.title}
                    className={`flex-1 ${
                      catIdx === 0 ? 'pr-8' : catIdx === 1 ? 'px-8' : 'pl-8'
                    }`}
                  >
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">
                      {category.title}
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                      {category.items.map((item, itemIdx) => (
                        <Link
                          key={item.name}
                          to={item.url}
                          onClick={() => setDropOpen(false)}
                          className="group flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50/30 hover:border-gray-200 hover:shadow-md transition-all duration-300 text-left"
                          style={{
                            opacity: dropOpen ? 1 : 0,
                            transform: dropOpen ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 250ms ease ${catIdx * 40 + itemIdx * 20}ms, transform 250ms ease ${catIdx * 40 + itemIdx * 20}ms, border-color 200ms, background-color 200ms, box-shadow 200ms`,
                          }}
                        >
                          {/* Icon container */}
                          <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${item.bgColor} ${item.iconColor} transition-transform duration-300 group-hover:scale-105`}>
                            <span
                              className="material-symbols-outlined text-[24px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {item.icon}
                            </span>
                          </div>

                          {/* Text content */}
                          <div className="min-w-0 flex-grow">
                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-150 text-[15px] flex items-center gap-1.5 leading-snug">
                              {item.name}
                              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-primary text-[12px] shrink-0">
                                arrow_forward
                              </span>
                            </h4>
                            <p className="text-[12px] text-gray-500 font-medium leading-relaxed mt-1">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {staticLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} isActive={isActive(to)}>{label}</NavLink>
          ))}

          <Link
            to="/contact"
            className="bg-on-background text-on-primary px-6 py-3 font-label-bold text-label-bold uppercase tracking-wider hover:bg-primary-container transition-colors duration-300 flex items-center gap-2 group"
          >
            Request Quote
            <span
              className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1"
              style={{ fontSize: '16px' }}
            >
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden text-on-background transition-transform duration-200 active:scale-90"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-4xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {isOpen && (
        <div className="md:hidden bg-surface-main border-b border-border-bold animate-[slideDown_0.25s_ease-out]">
          <div className="flex flex-col px-5 py-4 gap-1">
            <Link
              to="/"
              className={`font-label-bold text-label-bold uppercase tracking-wider py-3 border-b border-border-faint transition-colors duration-200 ${
                isActive('/') ? 'text-primary' : 'text-on-background hover:text-primary'
              }`}
            >
              Home
            </Link>

            {/* Mobile Products accordion */}
            <div className="border-b border-border-faint">
              <button
                onClick={() => setMobileProds((v) => !v)}
                className={`w-full flex justify-between items-center font-label-bold text-label-bold uppercase tracking-wider py-3 transition-colors duration-200 ${
                  isProductsActive ? 'text-primary' : 'text-on-background'
                }`}
              >
                Products
                <span
                  className="material-symbols-outlined transition-transform duration-300"
                  style={{ fontSize: '20px', transform: mobileProds ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>

              {mobileProds && (
                <div className="pb-4 flex flex-col gap-4 animate-[slideDown_0.2s_ease-out] pl-3 border-l border-border-faint mt-1">
                  {productCategories.map((category) => (
                    <div key={category.title} className="flex flex-col gap-2">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2">
                        {category.title}
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {category.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.url}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 py-2 px-2 hover:bg-surface-muted transition-all duration-200 border border-transparent hover:border-border-faint rounded-lg group text-left w-full"
                          >
                            <div className={`w-9 h-9 flex items-center justify-center ${item.bgColor} ${item.iconColor} shrink-0 rounded-lg`}>
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}
                              >
                                {item.icon}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-[13px] flex items-center gap-1" style={{ lineHeight: '1.2' }}>
                                {item.name}
                                <span className="material-symbols-outlined text-[10px] text-gray-400">
                                  arrow_forward
                                </span>
                              </div>
                              <div className="text-gray-500 text-[11px] mt-0.5 line-clamp-1">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {staticLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-label-bold text-label-bold uppercase tracking-wider py-3 border-b border-border-faint transition-colors duration-200 ${
                  isActive(to) ? 'text-primary' : 'text-on-background hover:text-primary'
                }`}
              >
                {label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="mt-3 bg-on-background text-on-primary px-6 py-3 font-label-bold text-label-bold uppercase tracking-wider text-center hover:bg-primary-container transition-colors duration-300 flex items-center justify-center gap-2 group"
            >
              Request Quote
              <span
                className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontSize: '16px' }}
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
