import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'

/* ─────────────────────────────────────────────────────────────
   Rich product data keyed by slug
   ───────────────────────────────────────────────────────────── */
const richProductDetails = {
  fitbuddy: {
    name: 'FitBuddy',
    badge: 'v4.2 Active',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    category: 'Fitness & Wellness',
    tagline: 'Next-Gen Fitness Hub Automation & Billing',
    heroDesc: 'Streamline gym operations with biometric check-ins, automated billing cycles, class scheduling, and real-time member analytics. Built for modern fitness businesses that demand precision.',
    heroImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    capabilities: [
      {
        title: 'Biometric Check-in Engine',
        desc: 'Low-latency fingerprint and face-ID validation at entry points with instant membership status display.',
        icon: 'fingerprint',
        img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80'
      },
      {
        title: 'Smart Class Scheduler',
        desc: 'Cross-platform booking with capacity monitoring, waitlist automation, and trainer assignment logic.',
        icon: 'calendar_month',
        img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80'
      },
      {
        title: 'Revenue Analytics',
        desc: 'ML-driven subscription renewal forecasting, churn prediction, and automated payment reconciliation.',
        icon: 'trending_up',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80'
      }
    ],
    spotlight1: {
      title: 'Member Lifecycle Management',
      desc: 'Track every member from first visit to long-term retention. Automated onboarding flows, progress tracking dashboards, and personalized communication pipelines ensure no member falls through the cracks.',
      bullets: ['Automated welcome sequences', 'BMI & fitness progress charts', 'Renewal reminder workflows', 'Referral program tracking'],
      img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=700&q=80'
    },
    spotlight2: {
      title: 'Multi-Branch Operations Control',
      desc: 'Manage unlimited gym locations from a single command center. Centralized inventory, staff scheduling, and financial reporting with branch-level granularity.',
      bullets: ['Unified dashboard across locations', 'Staff shift management', 'Equipment maintenance logs', 'Cross-branch membership transfers'],
      img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=700&q=80'
    },
    specs: {
      database: { label: 'Database Layer', value: 'PostgreSQL 15 + Redis Cache', icon: 'database' },
      api: { label: 'API Protocol', value: 'REST + WebSocket Live Feeds', icon: 'api' },
      hosting: { label: 'Hosting Environment', value: 'AWS ECS Fargate (Auto-Scale)', icon: 'cloud' },
      uptime: { label: 'Uptime Target', value: '99.95% SLA Guarantee', icon: 'verified' }
    }
  },
  skirlworks: {
    name: 'SkirlWorks',
    badge: 'Active',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    category: 'Operations & Workflow',
    tagline: 'Integrated Operations & Work Intelligence Platform',
    heroDesc: 'Visually structure deliverables, track pipeline status, and automate quotes. SkirlWorks unifies project management, resource allocation, and client communications into one powerful platform.',
    heroImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    capabilities: [
      {
        title: 'Algorithmic Job Dispatch',
        desc: 'Optimized job allocations based on skill matching, location proximity, and workload balancing algorithms.',
        icon: 'account_tree',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80'
      },
      {
        title: 'Predictive Work Intelligence',
        desc: 'ML-driven workflow bottleneck detection, resource utilization scoring, and delivery prediction models.',
        icon: 'analytics',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80'
      },
      {
        title: 'Dynamic Quote Builder',
        desc: 'Multi-constraint pricing engine that generates accurate service estimates based on scope, timeline, and resources.',
        icon: 'description',
        img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80'
      }
    ],
    spotlight1: {
      title: 'Pipeline Visualization Engine',
      desc: 'Interactive job flow charts displaying pipeline states, trigger conditions, and dependency maps. Real-time status updates keep every stakeholder aligned on project health.',
      bullets: ['Drag-and-drop pipeline builder', 'Milestone dependency tracking', 'Automated status notifications', 'Custom pipeline templates'],
      img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80'
    },
    spotlight2: {
      title: 'Team Performance Dashboard',
      desc: 'Granular engineering metrics with automated complexity scoring, velocity tracking, and resource utilization analysis across all active projects.',
      bullets: ['Sprint velocity analytics', 'Individual contribution metrics', 'Capacity planning forecasts', 'Burndown chart automation'],
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80'
    },
    specs: {
      database: { label: 'Database Layer', value: 'MongoDB Atlas + Elasticsearch', icon: 'database' },
      api: { label: 'API Protocol', value: 'GraphQL + gRPC Microservices', icon: 'api' },
      hosting: { label: 'Hosting Environment', value: 'GCP Cloud Run (Serverless)', icon: 'cloud' },
      uptime: { label: 'Uptime Target', value: '99.9% SLA Guarantee', icon: 'verified' }
    }
  },
  skirlhrms: {
    name: 'SkirlHRMS',
    badge: 'Enterprise Ready',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    category: 'Human Resources',
    tagline: 'Workforce Analytics & Payroll Scaling Engine',
    heroDesc: 'Unify staff registries, clock-in locations, tax computation systems, and compliance audits. SkirlHRMS delivers end-to-end human capital management for enterprises of any scale.',
    heroImg: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    capabilities: [
      {
        title: 'Advanced Shift Dispatch',
        desc: 'Automated scheduling and allocation engine supporting global timezones, holidays, and labor law compliance.',
        icon: 'schedule',
        img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80'
      },
      {
        title: 'Geo-Fenced Attendance',
        desc: 'Mobile-first punch system with GPS validation, site perimeter checks, and real-time attendance dashboards.',
        icon: 'location_on',
        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80'
      },
      {
        title: 'Multi-Constraint Payroll',
        desc: 'Dynamic tax computation, deduction matrices, and automated wire transfers supporting multi-currency operations.',
        icon: 'account_balance_wallet',
        img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80'
      }
    ],
    spotlight1: {
      title: 'Employee Lifecycle Portal',
      desc: 'From onboarding documentation to exit interviews, manage the complete employee journey with configurable workflow templates and automated compliance checkpoints.',
      bullets: ['Digital onboarding workflows', 'Performance review cycles', 'Training & certification tracking', 'Exit process automation'],
      img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80'
    },
    spotlight2: {
      title: 'Compliance & Audit Engine',
      desc: 'Built-in regulatory compliance frameworks for labor laws, tax codes, and industry standards. Automated audit trails ensure every action is traceable and documented.',
      bullets: ['Labor law compliance checks', 'Automated tax filing', 'Immutable audit logs', 'Custom policy enforcement'],
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80'
    },
    specs: {
      database: { label: 'Database Layer', value: 'PostgreSQL 15 + TimescaleDB', icon: 'database' },
      api: { label: 'API Protocol', value: 'REST API v3 + OAuth 2.0', icon: 'api' },
      hosting: { label: 'Hosting Environment', value: 'Azure Kubernetes Service', icon: 'cloud' },
      uptime: { label: 'Uptime Target', value: '99.99% SLA Guarantee', icon: 'verified' }
    }
  },
  skirlmms: {
    name: 'SkirlMMS',
    badge: 'Active',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    category: 'Merchant & Payments',
    tagline: 'Merchant Networks & Settlement Portal',
    heroDesc: 'Onboard merchant tiers, track rate configurations, and protect transactional integrity. SkirlMMS provides enterprise-grade merchant lifecycle management with real-time settlement processing.',
    heroImg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    capabilities: [
      {
        title: 'Automated KYC Engine',
        desc: 'Business verification automation with document OCR, compliance scoring, and digital contract signature workflows.',
        icon: 'person_add',
        img: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=500&q=80'
      },
      {
        title: 'Real-Time Settlement',
        desc: 'Instant monitoring of network payments, batch settlements, and merchant payout schedules with full reconciliation.',
        icon: 'point_of_sale',
        img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80'
      },
      {
        title: 'Fraud Risk Scoring',
        desc: 'Transaction velocity analysis, anomaly detection, and automated card ban triggers for zero-tolerance fraud protection.',
        icon: 'security',
        img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80'
      }
    ],
    spotlight1: {
      title: 'Merchant Tier Management',
      desc: 'Configure custom pricing tiers, volume-based discounts, and regional rate schedules. Automated tier upgrades based on transaction volume thresholds.',
      bullets: ['Custom pricing matrices', 'Volume-based tier automation', 'Regional rate configuration', 'Contract renewal workflows'],
      img: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=700&q=80'
    },
    spotlight2: {
      title: 'Terminal Fleet Management',
      desc: 'Monitor physical POS terminal health, firmware versions, and connectivity status across your entire merchant network from a unified dashboard.',
      bullets: ['Live terminal health monitoring', 'OTA firmware updates', 'Network diagnostics', 'Replacement workflow automation'],
      img: 'https://images.unsplash.com/photo-1556742205-e10c9486e506?w=700&q=80'
    },
    specs: {
      database: { label: 'Database Layer', value: 'CockroachDB (Distributed)', icon: 'database' },
      api: { label: 'API Protocol', value: 'REST + ISO 8583 Gateway', icon: 'api' },
      hosting: { label: 'Hosting Environment', value: 'AWS EKS Multi-Region', icon: 'cloud' },
      uptime: { label: 'Uptime Target', value: '99.999% SLA Guarantee', icon: 'verified' }
    }
  },
  skirlerp: {
    name: 'SkirlERP',
    badge: 'Enterprise Ready',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    category: 'Enterprise Resource Planning',
    tagline: 'Unified Enterprise Resource & Inventory Planning',
    heroDesc: 'GAAP-compliant double-entry ledgers, warehouse inventory synchronization, and multi-depot logistics. SkirlERP delivers complete financial and operational control for complex enterprise environments.',
    heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    capabilities: [
      {
        title: 'Resource Allocation Engine',
        desc: 'Optimized inventory routing across multiple warehouses with demand forecasting and automatic reorder triggers.',
        icon: 'hub',
        img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80'
      },
      {
        title: 'Double-Entry Ledger',
        desc: 'GAAP-compliant journal management with automated balance sheet generation, cashflow tracking, and fiscal reporting.',
        icon: 'balance',
        img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80'
      },
      {
        title: 'Logistics Orchestration',
        desc: 'Dynamic shipping route optimization, carrier management, and real-time freight tracking across global supply chains.',
        icon: 'local_shipping',
        img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=500&q=80'
      }
    ],
    spotlight1: {
      title: 'Financial Command Center',
      desc: 'Centralized financial oversight with real-time P&L statements, automated tax calculations, and multi-entity consolidation for group-level reporting.',
      bullets: ['Real-time P&L dashboards', 'Multi-currency support', 'Automated tax computation', 'Group consolidation reporting'],
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80'
    },
    spotlight2: {
      title: 'Supply Chain Intelligence',
      desc: 'End-to-end supply chain visibility with predictive stock-out alerts, supplier performance scoring, and automated procurement workflows.',
      bullets: ['Predictive stock-out alerts', 'Supplier scorecards', 'Automated PO generation', 'Quality inspection workflows'],
      img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80'
    },
    specs: {
      database: { label: 'Database Layer', value: 'Oracle 19c + Redis Cluster', icon: 'database' },
      api: { label: 'API Protocol', value: 'REST + SOAP (Legacy Bridge)', icon: 'api' },
      hosting: { label: 'Hosting Environment', value: 'On-Prem + Azure Hybrid', icon: 'cloud' },
      uptime: { label: 'Uptime Target', value: '99.99% SLA Guarantee', icon: 'verified' }
    }
  }
}

export default function ProductDetail() {
  const { slug } = useParams()
  const { data, dispatch } = useData()

  const [form, setForm] = useState({ name: '', phone: '', countrySelect: 'India', countryInput: '', companyName: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const normalizedSlug = slug ? slug.toLowerCase() : ''
  const dbProduct = data.products?.items?.find(p => p.name.toLowerCase() === normalizedSlug)
  const product = richProductDetails[normalizedSlug]

  const reveal1 = useScrollReveal()
  const reveal2 = useScrollReveal()
  const reveal3 = useScrollReveal()
  const reveal4 = useScrollReveal()
  const reveal5 = useScrollReveal()
  const reveal6 = useScrollReveal()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_SUBMISSION',
      payload: {
        id: Date.now(),
        name: form.name,
        email: `${form.name.replace(/\s+/g, '').toLowerCase()}@company.com`,
        sector: `${(product?.name || slug).toUpperCase()} INQUIRY`,
        urgency: 'standard',
        brief: `Company: ${form.companyName}\nPhone: ${form.phone}\nCountry (Select): ${form.countrySelect}\nCountry (Input): ${form.countryInput}\n\nMessage:\n${form.message}`,
        submittedAt: new Date().toISOString(),
        read: false
      }
    })
    setSubmitted(true)
    setForm({ name: '', phone: '', countrySelect: 'India', countryInput: '', companyName: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  // ── 404 fallback ──
  if (!product) {
    return (
      <main className="py-32 px-5 text-center">
        <div className="max-w-md mx-auto">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-6">error</span>
          <h1 className="text-3xl font-black uppercase text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8 font-medium">The product you are looking for does not exist or has been removed.</p>
          <Link to="/" className="bg-[#106F89] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#0B263F] transition-colors inline-block rounded-xl">
            Return to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-0 bg-white">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO (Split Layout)
          ═══════════════════════════════════════════════════════ */}
      <section ref={reveal1} className="relative overflow-hidden bg-gradient-to-br from-[#0B263F] via-[#0e3350] to-[#106F89]">

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#106F89]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#106F89]/8 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.04]" />
        </div>

        <div className="relative max-w-container-max mx-auto px-5 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Copy */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border ${product.badgeColor}`}>
                  {product.badge}
                </span>
                <span className="text-white/50 text-[11px] font-bold uppercase tracking-widest">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
                {product.name}
              </h1>

              <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed mb-4">
                {product.tagline}
              </p>

              <p className="text-sm md:text-base text-white/40 leading-relaxed mb-10 max-w-lg">
                {product.heroDesc}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#query-form"
                  className="bg-white text-[#0B263F] px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/20 flex items-center gap-2 group"
                >
                  Request Demo
                  <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                </a>
                <a
                  href="#specs"
                  className="border border-white/20 text-white/80 px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
                >
                  Tech Specs
                  <span className="material-symbols-outlined text-base">description</span>
                </a>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="relative">
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl shadow-black/40 border border-white/10 group">
                {/* Browser chrome bar */}
                <div className="bg-[#1a1a2e] px-5 py-3.5 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 bg-white/[0.07] rounded-lg px-4 py-1 text-[10px] text-white/30 font-mono tracking-wider text-center truncate">
                    app.softskirl.com/{normalizedSlug}/dashboard
                  </div>
                </div>
                <img
                  src={product.heroImg}
                  alt={`${product.name} Dashboard`}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl shadow-black/10 border border-gray-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">System Status</p>
                    <p className="text-sm font-extrabold text-gray-900">All Systems Operational</p>
                  </div>
                </div>
              </div>

              {/* Floating uptime badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-black/10 border border-gray-100 hidden md:block">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Uptime</p>
                <p className="text-2xl font-black text-[#106F89] leading-none mt-0.5">99.9%</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — CORE CAPABILITIES BENTO
          ═══════════════════════════════════════════════════════ */}
      <section ref={reveal2} className="py-24 px-5 md:px-12 bg-white">
        <div className="max-w-container-max mx-auto">

          <div className="text-center mb-16">
            <p className="text-[12px] font-bold text-[#106F89] uppercase tracking-[0.2em] mb-3">Core Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0B263F] tracking-tight leading-tight">
              Built for Performance at Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.capabilities.map((cap, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                {/* Capability Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={cap.img}
                    alt={cap.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-[#106F89] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {cap.icon}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Capability Text */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0B263F] mb-2 group-hover:text-[#106F89] transition-colors duration-200">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — SPOTLIGHT 1 (Text Left / Image Right)
          ═══════════════════════════════════════════════════════ */}
      <section ref={reveal3} className="py-24 px-5 md:px-12 bg-slate-50">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — Text */}
            <div>
              <p className="text-[12px] font-bold text-[#106F89] uppercase tracking-[0.2em] mb-4">Feature Spotlight</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B263F] tracking-tight leading-tight mb-6">
                {product.spotlight1.title}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
                {product.spotlight1.desc}
              </p>
              <ul className="space-y-3.5">
                {product.spotlight1.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-semibold">
                    <span className="w-6 h-6 rounded-lg bg-[#106F89]/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#106F89] text-sm">check</span>
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                <img
                  src={product.spotlight1.img}
                  alt={product.spotlight1.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl bg-[#106F89]/5" />
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — SPOTLIGHT 2 (Image Left / Text Right)
          ═══════════════════════════════════════════════════════ */}
      <section ref={reveal4} className="py-24 px-5 md:px-12 bg-white">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — Image */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                <img
                  src={product.spotlight2.img}
                  alt={product.spotlight2.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full rounded-3xl bg-[#0B263F]/5" />
            </div>

            {/* Right — Text */}
            <div className="order-1 lg:order-2">
              <p className="text-[12px] font-bold text-[#106F89] uppercase tracking-[0.2em] mb-4">Deep Dive</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B263F] tracking-tight leading-tight mb-6">
                {product.spotlight2.title}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
                {product.spotlight2.desc}
              </p>
              <ul className="space-y-3.5">
                {product.spotlight2.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-semibold">
                    <span className="w-6 h-6 rounded-lg bg-[#0B263F]/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#0B263F] text-sm">check</span>
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — SPECS SHEET BENTO
          ═══════════════════════════════════════════════════════ */}
      <section id="specs" ref={reveal5} className="py-24 px-5 md:px-12 bg-[#0B263F]">
        <div className="max-w-container-max mx-auto">

          <div className="text-center mb-16">
            <p className="text-[12px] font-bold text-[#106F89] uppercase tracking-[0.2em] mb-3">Technical Architecture</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Infrastructure Specs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(product.specs).map((spec, i) => (
              <div
                key={i}
                className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#106F89]/20 flex items-center justify-center mb-5 group-hover:bg-[#106F89]/30 transition-colors duration-300">
                  <span className="material-symbols-outlined text-[#106F89] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {spec.icon}
                  </span>
                </div>
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2">{spec.label}</p>
                <p className="text-base font-bold text-white/90 leading-snug">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Additional details row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Response Time', value: '<50ms', icon: 'speed' },
              { label: 'Data Encryption', value: 'AES-256', icon: 'lock' },
              { label: 'Compliance', value: 'SOC 2 Type II', icon: 'shield' },
              { label: 'Support', value: '24/7 SLA', icon: 'support_agent' }
            ].map((item, i) => (
              <div key={i} className="text-center py-6">
                <span className="material-symbols-outlined text-[#106F89] text-3xl mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
                <p className="text-xl md:text-2xl font-black text-white mb-1">{item.value}</p>
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — CONTACT / QUERY FORM
          ═══════════════════════════════════════════════════════ */}
      <section id="query-form" ref={reveal6} className="py-24 px-5 md:px-12 bg-slate-50">
        <div className="max-w-[680px] mx-auto">

          <div className="bg-white border border-gray-100 rounded-[28px] p-8 md:p-12 shadow-xl">

            <div className="text-center mb-10">
              <div className="w-14 h-14 rounded-2xl bg-[#106F89]/10 flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-[#106F89] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#0B263F] tracking-tight leading-snug mb-2">
                Interested in {product.name}?
              </h2>
              <p className="text-gray-400 text-sm font-medium">
                Fill in your details and our solutions team will reach out within 24 hours.
              </p>
            </div>

            {submitted && (
              <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-sm flex items-center gap-2 rounded-xl">
                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                Your query has been submitted successfully. We'll get back to you shortly.
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-800 placeholder-gray-300 text-sm focus:outline-none focus:border-[#106F89] focus:ring-1 focus:ring-[#106F89]/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-800 placeholder-gray-300 text-sm focus:outline-none focus:border-[#106F89] focus:ring-1 focus:ring-[#106F89]/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Country</label>
                <select
                  name="countrySelect"
                  value={form.countrySelect}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#106F89] cursor-pointer"
                >
                  {['India', 'United States', 'United Kingdom', 'Germany', 'Singapore', 'Australia', 'Canada', 'Other'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">State / Region</label>
                  <input
                    name="countryInput"
                    type="text"
                    required
                    value={form.countryInput}
                    onChange={handleChange}
                    placeholder="e.g. West Bengal"
                    className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-800 placeholder-gray-300 text-sm focus:outline-none focus:border-[#106F89] focus:ring-1 focus:ring-[#106F89]/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Company Name</label>
                  <input
                    name="companyName"
                    type="text"
                    required
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Softskirl Labs"
                    className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-800 placeholder-gray-300 text-sm focus:outline-none focus:border-[#106F89] focus:ring-1 focus:ring-[#106F89]/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements, team size, and timeline..."
                  className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-800 placeholder-gray-300 text-sm focus:outline-none focus:border-[#106F89] focus:ring-1 focus:ring-[#106F89]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#106F89] hover:bg-[#0B263F] text-white font-bold text-sm uppercase tracking-wider py-4.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#106F89]/20 hover:shadow-[#0B263F]/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                Send Inquiry
                <span className="material-symbols-outlined text-base">send</span>
              </button>

            </form>
          </div>

        </div>
      </section>

    </main>
  )
}
