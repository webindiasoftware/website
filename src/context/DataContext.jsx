import { createContext, useContext, useReducer, useEffect } from 'react'

const KEY = 'softskirl_cms_v1'

export const initial = {
  global: {
    companyName: 'softskirl',
    tagline: 'Precision engineering for the digital age. We build software that defines industries.',
    phone: '+91 9875463415',
    email: 'info@softskirl.com',
    address: 'Delta Tower, J1-8, EP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091',
  },
  home: {
    hero: {
      headline: 'Empowering Businesses With Innovative IT Solutions',
      subtext: 'Softskirl Infotech provides professional software development, mobile apps, ERP solutions, and digital services to help your business grow faster and smarter.',
      // cta1Text: 'Explore Services', cta1Link: '/services',
      cta2Text: 'View Products', cta2Link: '/products',
    },
    services: [
      { id: 1, icon: 'code', title: 'Website Development', desc: 'Custom websites and SEO-optimized code for maximum visibility and architectural cleanness.' },
      { id: 2, icon: 'smartphone', title: 'Mobile App Development', desc: 'High-performance Android and iOS apps built with Flutter & React Native for seamless experiences.' },
      { id: 3, icon: 'shopping_cart', title: 'eCommerce Solutions', desc: 'Secure, scalable marketplaces with easy payment integrations and real-time inventory management.' },
      { id: 4, icon: 'layers', title: 'ERP & Custom Software', desc: 'Business automation tools and robust ERP systems designed for optimized enterprise operations.' },
    ],
    products: [
      { id: 1, name: 'FitBuddy', badge: 'v2.4', badgeDark: false, desc: 'All-in-one gym management software for members, trainers, payroll, and scheduling.', img: 'https://lh3.googleusercontent.com/aida/AP1WRLvBOR8qWIpevIk924W_aZtWNLZSbXLbHKD4WIUln-LdDKfQKhf71nnC0vAKE3Et6jU97xAv31rQldDpegRzUYFAKlxxAmPJE6W3ksLnFvYLIm_MBQpMgg56jrk3evnQ6shVN8MaxWdz_lmEOxYrgo7qEKxjtvzuqOILttceTHiRIuXoNXYW6v3r2sG6gUkNEtwCJZriZoNWuxNFzIEjw6ynVsp0nMMAWPxjqfqZIrUM9bLht9CBFLB4uK5W' },
      { id: 2, name: 'ERP Solutions', badge: 'Enterprise', badgeDark: true, desc: 'Comprehensive ERP for finance, HR, sales, and multi-branch management across global scales.', img: 'https://lh3.googleusercontent.com/aida/AP1WRLvNPpCUbXeEKqhgrUdAiKWWM5A-vg5AJM7Zpc-02dtOzJ57sJHmG5xARB2-VhIOyxpiEfAMptYg-7SX0VVD2v8JacKX7r4nr5Oh6mI22csUfJK5htlTHi39pbjRMt-iewsXrZw2Tw4gu7yvEwrAo8OoA8kkz2sFAxv2jenBGmZ3Xdt_cHDjtdKCUFtosnmL8DrnvTOgAZS49VENDKcFM7fx0vUS1QGItuC68khInfpEdRj2Ruj5ZVtgMA4' },
      { id: 3, name: 'ProdIQ', badge: 'New Release', badgeDark: true, desc: 'ProdIQ is a smart platform to streamline and manage your product lifecycle efficiently.', img: 'https://lh3.googleusercontent.com/aida/AP1WRLtmGYgLonyEANeWb2PRqao9ngF2iLwVJvooXDpUdoPrTW7WK-qWiMMNu0tI9K_-KMG9k0_xpywMa3r7BvbAJ-SAZ59R3IK1FhUB1wj0GyjkPAq56WxtvnB6wfj8yCqqDAJLQBHgb7nXhKSD74Drx2Uy0yhbzkHYtSFpxh6TKEb07rJiFJFPuHsZU2qIbEEgx8ENjWcxOctq7oy3YF1HQGykUCarH0Gp8mVJ6jqLM4c-nFH42BBRZeFUlUQ6' },
    ],
    industries: [
      { id: 1, icon: 'business', label: 'Corporate' },
      { id: 2, icon: 'storefront', label: 'Retail' },
      { id: 3, icon: 'medical_services', label: 'Healthcare' },
      { id: 4, icon: 'school', label: 'Education' },
      { id: 5, icon: 'factory', label: 'Manufacturing' },
      { id: 6, icon: 'flight', label: 'Travel' },
    ],
    whyUs: {
      headline: 'Why Choose Us',
      body: 'Continuous support, upgrades, and maintenance for smooth business operations. Our architectural approach ensures every line of code serves a purpose.',
      checklist: ['ISO 9001 CERTIFIED PROCESSES', '24/7 MISSION-CRITICAL SUPPORT', 'AGILE-LEAN DEVELOPMENT CYCLES'],
      cards: [
        { id: 1, icon: 'headset_mic', title: '24/7 Support', desc: 'Technical assistance anytime you need. We are always online to ensure your uptime.', dark: false },
        { id: 2, icon: 'verified_user', title: 'Secure & Reliable', desc: 'Industry best practices for your safety. Data integrity is our primary directive.', dark: true },
        { id: 3, icon: 'bolt', title: 'Fast Delivery', desc: 'Timely delivery without compromising quality. Kinetic speed for modern markets.', dark: false },
        { id: 4, icon: 'rocket_launch', title: 'Scalable Solutions', desc: 'Software that grows with your business. Built to expand from startup to enterprise.', dark: false },
      ],
    },
    testimonials: [
      { id: 1, text: 'Softskirl Infotech developed our ERP system, streamlining operations efficiently. Their precision and engineering mindset changed how we think about tech.', author: 'Rajesh Kumar, CEO' },
      { id: 2, text: 'Their mobile app team delivered a high-quality app with great UX/UI. The project was delivered ahead of schedule with flawless execution.', author: 'Priya Sharma, Product Manager' },
      { id: 3, text: 'Excellent support and quick responses. Highly recommend Softskirl Infotech for any enterprise-grade IT transformation.', author: 'Aman Verma, CTO' },
    ],
    cta: { headline: 'Ready to Start Your Project?', body: "Contact us today to discuss your requirements and get a free quote. Let's build something exceptional together.", ctaText: 'Get a Free Quote' },
  },
  about: {
    hero: { badge: 'EST. 2014', headline: 'ARCHITECTING PRECISION', subtext: "Engineering the digital infrastructure of tomorrow with unyielding technical integrity. We build systems that don't just function—they perform at the edge of possibility." },
    story: {
      headline: 'THE EVOLUTION', title: 'From Code to Core Infrastructure',
      body1: 'Softskirl began as a boutique engineering laboratory focused on high-concurrency architecture. Our founders recognized a critical gap in the enterprise market: the need for software that balances radical innovation with surgical precision.',
      body2: 'Over the last decade, we have evolved into a global powerhouse, architecting mission-critical platforms for Fortune 500 tech firms and government agencies. Our methodology is rooted in the Swiss-Modern philosophy—removing the superfluous to reveal the high-performance core.',
    },
    values: [
      { id: 1, icon: 'rocket_launch', title: 'Radical Innovation', desc: "We don't iterate; we leap. Our teams are empowered to challenge legacy constraints and build the impossible." },
      { id: 2, icon: 'security', title: 'Technical Integrity', desc: 'Precision is non-negotiable. Every system is built for 99.999% uptime and impenetrable security from day one.' },
      { id: 3, icon: 'groups', title: 'Client Centricity', desc: 'Your goals are our benchmarks. We operate as a high-performance extension of your core engineering team.' },
    ],
    leaders: [
      { id: 1, name: 'Souvik', role: 'Founder & CEO', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOoAFo28WxwyKshixKuAbHHzhr6fePeCud08K2B2XSiK1lN_Va57d6fHyRs5GazVHKtvSBbZH8WjXtTwue8oyfaXuSB4te0O2KVmjXjrVhmN8vZRtJUBgei0niEDTvcEvMYYRyoYn7IBrwxq_AwLLX1K26lAwjvR9gX3zFnZA4sjih9HS3RXct1_2py4Ee_wX3GgrA7MyNt6YUacf7oUIxWL4JQtL8LDYZT5pGuTFgtUjv7mW4p0c0W1hD2cJKAk1k_7ot8YUJ2Ken' },
      { id: 2, name: 'Elias Thorne', role: 'Chief Architect', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2lCaj2yysIZpB8kIZ_Md5R88MCo4l_iVX-L5ePFmcrKZ1P6HSTL_VBj5ztE0Tp5km_BCJnGbkiXBTKBpi0Sx80kZdfsTSHqDMMYe5fXbrfXt_kcGIQ-rpkxYWzoFwoJxcrJAjfDdgNlEjSLmZoVuo8EcTsF56cCU4SXCKH2LTThXdeYRHjAS2B7mHBPoic6Uz_pgc2_lYSe7RqypYWuIpeQkwb-UHIOln7VoEvuH9poqfESPXQvzOHTSIJZDAM7Z5_KrPPHnyDuK_' },
      { id: 3, name: 'Sarah Chen', role: 'VP of Engineering', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwzSPYc7Cf7M_WNp1ZEoJ4CxwG2sNM1uNxWLQaXOj7NxTLQYPIkRUKgxWSoj3q_UIUtNK0CAiQuQjpriYKC8fwgTEwxVZpK3stDM2ypy6czSDkVAsVgTO4VmX0OT5YFQn5zb6vvG7NDsXL80BW15ovD3FBWdwlUSonkorTnQon9KLHv8POiTt9tvs70oSgoj9WjQDJQzfZijL7-VNhdYrx3ihnYpwDVTS7-16t5EENz4V24G1b2J3cO7V0FnCDlwLmC_Wg6vKvVcUz' },
      { id: 4, name: 'Marcus Vane', role: 'Head of Strategy', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDES0Z7NbGdzNWsk5eInDchQLaB2yLCjEBXm6jO1etDbguUFit0-hTPEtgR58tN0mNxe_9zyPN7-sA0ghtZy0NfjmoGVfGWfy7CYAF1whHbJfLtl9meu-BobriBYHJVHr0gnOHjL_BqxNmH-B5a4HHWGjIVT3NUzPfdTBPEFkweFBWXBVE0_A8bP11p-9217mh2wxZaxsP0E_ypFD0UtkgdzkkvpCbLkV9-Ufi96ZweI6wQLvVwGXOTZ-dGMvejE4J4V67HotSQiNod' },
    ],
    cta: { headline: 'Build With Us', body: "Join the companies that trust Softskirl to architect their digital future. Let's engineer something exceptional together.", ctaText: 'Get in Touch' },
  },
  services: {
    hero: { badge: 'Strategic IT Engineering', headline: 'Professional IT Services for Scalable Growth.', subtext: 'We deliver high-precision digital infrastructure that helps enterprise businesses scale at velocity. Our Swiss-Modern philosophy ensures clarity, performance, and industrial-grade reliability.' },
    coreServices: [
      { id: 1, icon: 'terminal', title: 'Website Development', desc: 'Custom high-speed corporate architectures, optimized for lighthouse scoring and global distribution.' },
      { id: 2, icon: 'smartphone', title: 'Mobile App Development', desc: 'Native performance across iOS and Android utilizing modern frameworks for maximum code reusability.' },
      { id: 3, icon: 'shopping_cart', title: 'eCommerce Development', desc: 'Multi-vendor marketplace logic with secure payment orchestration and inventory synchronization.' },
      { id: 4, icon: 'database', title: 'Custom Software & ERP', desc: 'Deep organizational automation, CRM integration, and bespoke ERP solutions for complex workflows.' },
      { id: 5, icon: 'architecture', title: 'UI/UX Design', desc: 'Objective-led design systems rooted in Swiss typography and architectural structural principles.' },
      { id: 6, icon: 'cloud', title: 'API & Cloud Integration', desc: 'Seamless cloud infrastructure orchestration, third-party API tunneling, and low-latency data sync.' },
    ],
    cta: { headline: 'Ready to Start?', body: 'Scale your business infrastructure with precision-engineered IT solutions. Request a technical audit and get a custom quote today.', ctaText: 'Get a Free Quote' },
  },
  products: {
    hero: { headline: 'Engineered Solutions', subtext: "At Softskirl, we don't just write code; we architect performance. Our suite of professional-grade tools is designed to accelerate business growth through absolute reliability and kinetic precision." },
    items: [
      { id: 1, name: 'FitBuddy',   icon: 'fitness_center', url: '', status: 'V.4.2 Active',      desc: 'Complete gym & fitness club automation with member app and billing. Streamline operations with structural order and real-time synchronization.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLECML5wfbWtIJWyepYJm3T4lQNheb-JrmcVty1sAmeugeeM73hYETd8drCEp9Se4wShXzO9ZuuOw8PU07Iz8UmXPaoA4YVZE-QTdG1nCZR2N-a3GJq3BzV5cd7aOIWuOMLPUPlEl_GZRYIi9fnLqKnr_bukuxKNS0nSRlwIziC_KttIR-o2pZdkHo9DKsrCrjRQGz3h8rw9He48_ZOKcoeUHPBfzz08CN9xRTxCXKT2lWea39bgx-GCay7UnX46eYHZKostIctc4x' },
      { id: 2, name: 'SkirlWorks', icon: 'work_history',   url: '', status: 'Active',            desc: 'End-to-end business management suite for growing enterprises. Automate workflows and unify your operations on one platform.', img: '' },
      { id: 3, name: 'SkirlHRMS', icon: 'people',          url: '', status: 'Enterprise Ready',  desc: 'Human resource management system for payroll, attendance, recruitment, and employee lifecycle management.', img: '' },
      { id: 4, name: 'SkirlMMS',  icon: 'storefront',      url: '', status: 'Active',            desc: 'Merchant management system to onboard, manage, and monitor your merchant network at scale.', img: '' },
      { id: 5, name: 'SkirlERP',  icon: 'account_tree',    url: '', status: 'Enterprise Ready',  desc: 'Comprehensive ERP for finance, HR, and sales management. Designed for large-scale operations requiring absolute precision.', img: '' },
    ],
    standards: [
      { id: 1, icon: 'bolt', title: 'High Performance', desc: 'Optimization at the kernel level ensuring sub-millisecond response times for even the most complex data sets.' },
      { id: 2, icon: 'security', title: 'Top-notch Security', desc: 'Military-grade encryption standards integrated into every structural layer of the application architecture.' },
      { id: 3, icon: 'devices', title: 'Mobile Friendly', desc: 'Responsive systems that maintain structural integrity across every viewport size and device resolution.' },
      { id: 4, icon: 'support_agent', title: '24x7 Support', desc: 'Our elite engineering team is on standby 24/7 to ensure your systems remain operational and efficient.' },
    ],
    cta: { headline: 'Ready to Start Your Project?', body: 'Join the ranks of high-performance enterprises leveraging Softskirl technology to redefine their operational capabilities.', ctaText: 'Get a Free Quote' },
  },
  blog: {
    featured: { slug: 'erp-transformation', category: 'ERP SYSTEMS', title: 'How ERP Software Transforms Business Operations', excerpt: 'An in-depth exploration of how next-generation enterprise resource planning systems are leveraging AI to automate complex logistical workflows and drive operational efficiency.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7ssQUoXWIM4tPsvXp35RDsntHBrNVOusJzfs8aOWjOQs-__kxXOA6PW2s2qyA5JydmH1yrhccZPQtnEnqeWrZGnGHxrp3prdLPuWCPRPFubYHtnIQljPIp_LAISMUPlJt5pwZuCGlPK-VAUy4oSVQ0aV3dWWfyHmmsMs3MhHYybURCaeN5ocwJ3fs5Y22DG63FBM3XInh_Wpn3ZwvIQ8ddiqJP6medCHH7pglhlfps-V6r1Ff31hSGb_qFBihwwlh8gHKib9lf5C2' },
    posts: [
      { id: 1, slug: 'gym-software', category: 'FITNESS SOFTWARE', title: 'Why Every Gym Needs Modern Membership Software in 2025', excerpt: 'Optimizing retention through automated billing and biometric integration.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvAEb92Tbmw4-O6R7YuC9lMBOXf1cb9goBnq3X6oWHrAGyBCiqLfr6cUFUJKrYTkzSfKFGGPnp-e8p4ThBOCblPPH47y7JPRFyrF0Ok6AXc7eoAY_pMuSNZAYIiU2-XCt9coewaF-hqBi1j-l5WmQAEichRs3I7Z8zS-X4Lp_3Z1xQ1YanDJ2HBe6uUoppW5D3Fm-lPQybAgmzYWqYpdEbRkL5_4Cchltt__laDS0jLZXSYfBDA4ZP0UQP_2aWQW-zYR-Jt6s5wdv9', date: '2024-10-24', published: true, content: 'Managing a gym can be challenging, especially when tracking member attendance, subscriptions, and progress. FitBuddy membership software simplifies everything, providing a centralized platform for gym owners and trainers.\n\nWith automated billing, class scheduling, and performance tracking, FitBuddy ensures that your gym operates efficiently while enhancing member experience. Trainers can record daily progress, BMI changes, and provide personalized workout plans easily.\n\nIntegration with mobile apps allows members to check schedules, book sessions, and monitor their progress, reducing administrative overhead for gym management.' },
      { id: 2, slug: 'insurance-management', category: 'INSURANCE TECH', title: 'Insurance Management Software: Full Automation Guide', excerpt: 'Streamlining claims processing and policy lifecycle management with low-code solutions.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQR_fbTXmC7zShFILZ33Ax4sQWKMar9m2jmnwt0yCxb_p-ldqbmCxVRKKy5udTWskk-hJlXbKvJZ4mmwUSFFPaaYn-rAT8nMA_c8HRKZnM9X2EYrM6CxK8HLb9Bfu1cNK0NcptYr0-cSPFLBiGpUNOGrsyBsf6Ap11F7qDHkqX1nPMrn09wmHexBz2YC3qB_Wqpt7rWYsgmh2njMYNA3kdUC7b7aUpyUS2g1R2o4-P7DmHaRVrKOqS8duPe_jlMVgEwtDLUzUOicxo', date: '2024-10-08', published: true, content: 'Modern insurance companies face enormous pressure to streamline operations while maintaining compliance with evolving regulations. Our insurance management software addresses these challenges head-on.\n\nThe platform automates claims processing from intake to settlement, reducing manual intervention by up to 80%. Policy lifecycle management becomes transparent and auditable with our structured workflow engine.\n\nLow-code configuration allows business users to adapt workflows without developer intervention, accelerating time-to-market for new insurance products.' },
      { id: 3, slug: 'hyper-automation', category: 'AUTOMATION', title: 'The Shift to Hyper-Automation in Global Supply Chains', excerpt: 'Defining the new standard for resilience in industrial enterprise operations.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3FdBeqMArpt297RZflMbIQWkVw9WFXLb58EF_XzixUSMGQ3R17hdJ7H-ShHTMg5zpW5LJuinwvW9Kczbek9hWSOG6N1ZbP_6K_A4eWp7Z3Elhwz5g7u3G10ecVZKmkVBsUMinC4AqQfW20bNoLyi1Qf4iBurMnkMWJNB9lEstfGW1aCtRbolpcOWcQrVp7nnRYHKEj0a0CaogCOkEbGMSiQ_6dXtkGL4LjTWfrzuO02qv8nCNWpnmTyH5woeUtHiwO2TLBHM0vBKw', date: '2024-10-05', published: true, content: 'Hyper-automation represents the convergence of robotic process automation, artificial intelligence, and machine learning to automate complex business processes end-to-end.\n\nIn global supply chains, this means real-time inventory optimization, predictive demand forecasting, and autonomous procurement workflows. Companies adopting hyper-automation report 40-60% reduction in operational costs.\n\nThe key to successful implementation is a phased approach: starting with high-volume, rule-based processes and progressively introducing AI decision layers as organizational maturity grows.' },
    ],
  },
  contactSubmissions: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_GLOBAL': return { ...state, global: { ...state.global, ...action.payload } }
    case 'SET_HOME': return { ...state, home: { ...state.home, ...action.payload } }
    case 'SET_ABOUT': return { ...state, about: { ...state.about, ...action.payload } }
    case 'SET_SERVICES': return { ...state, services: { ...state.services, ...action.payload } }
    case 'SET_PRODUCTS': return { ...state, products: { ...state.products, ...action.payload } }
    case 'SET_BLOG_FEATURED': return { ...state, blog: { ...state.blog, featured: { ...state.blog.featured, ...action.payload } } }
    case 'ADD_POST': return { ...state, blog: { ...state.blog, posts: [...state.blog.posts, action.payload] } }
    case 'UPDATE_POST': return { ...state, blog: { ...state.blog, posts: state.blog.posts.map(p => p.id === action.payload.id ? action.payload : p) } }
    case 'DELETE_POST': return { ...state, blog: { ...state.blog, posts: state.blog.posts.filter(p => p.id !== action.payload) } }
    case 'ADD_SUBMISSION': return { ...state, contactSubmissions: [action.payload, ...state.contactSubmissions] }
    case 'DELETE_SUBMISSION': return { ...state, contactSubmissions: state.contactSubmissions.filter(s => s.id !== action.payload) }
    case 'RESET': return initial
    default: return state
  }
}

const DataCtx = createContext(null)

export function DataProvider({ children }) {
  const stored = (() => {
    try {
      const s = localStorage.getItem(KEY)
      if (!s) return null
      const parsed = JSON.parse(s)
      // If stored products don't have the icon/url fields, reset products to initial
      if (!parsed?.products?.items?.[0]?.icon) {
        return { ...parsed, products: initial.products }
      }
      return parsed
    } catch { return null }
  })()
  const [data, dispatch] = useReducer(reducer, stored || initial)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
  }, [data])

  return <DataCtx.Provider value={{ data, dispatch }}>{children}</DataCtx.Provider>
}

export function useData() {
  return useContext(DataCtx)
}
