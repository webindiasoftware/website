import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { data } = useData()
  const { companyName, logo, tagline } = data.global
  const { navLinks, legalPages } = data.footer

  return (
    <footer className="bg-surface-main border-t border-border-bold w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-16 px-5 md:px-12 max-w-container-max mx-auto">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="text-headline-md font-headline-md text-on-background mb-6 font-black tracking-tighter">
            {logo ? <img src={logo} alt={companyName} className="h-9 w-auto" /> : companyName}
          </div>
          <p className="font-body-md text-body-md text-secondary mb-6">{tagline}</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bento-border flex items-center justify-center hover:bg-on-background hover:text-on-primary transition-colors" aria-label="LinkedIn">
              <span className="material-symbols-outlined text-sm">link</span>
            </a>
            <a href="#" className="w-10 h-10 bento-border flex items-center justify-center hover:bg-on-background hover:text-on-primary transition-colors" aria-label="Share">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-label-bold text-label-bold uppercase mb-6 tracking-wider">Navigation</h4>
          <ul className="space-y-4">
            {navLinks.map(({ id, to, label }) => (
              <li key={id}>
                <Link to={to} className="font-body-md text-body-md text-on-background hover:text-primary transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-label-bold text-label-bold uppercase mb-6 tracking-wider">Legal</h4>
          <ul className="space-y-4">
            {legalPages.map(({ id, slug, title }) => (
              <li key={id}>
                <Link to={`/legal/${slug}`} className="font-body-md text-body-md text-on-background hover:text-primary transition-colors">{title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-label-bold text-label-bold uppercase mb-6 tracking-wider">Stay Connected</h4>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="bg-surface-muted border border-border-bold px-4 py-2 w-full font-body-md text-body-md focus:ring-0 focus:outline-none focus:border-on-background"
            />
            <button onClick={() => setEmail('')} className="bg-on-background text-on-primary px-4 py-2 hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="mt-6 p-4 bg-surface-muted border border-border-faint">
            <p className="font-label-sm text-label-sm uppercase text-secondary">System Status</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-label-bold text-label-bold">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-faint py-8 px-5 md:px-12 max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-body-md text-body-md text-secondary">
            © {new Date().getFullYear()} {companyName}. All rights reserved. Precision Engineering.
          </div>
          <div className="flex gap-6 font-label-sm text-label-sm uppercase tracking-tighter opacity-40">
            <span>London</span><span>/</span><span>Singapore</span><span>/</span><span>Silicon Valley</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
