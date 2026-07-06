import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { getContent } from '../api/client'

const KEY = 'softskirl_cms_v1'

// Sections backed by the real backend (Content collection). Everything else
// in `initial` (about, global) stays localStorage-only. Contact submissions live
// in their own backend collection, fetched separately via useSubmissions.
const BACKEND_KEYS = ['home', 'services', 'products', 'navbarProducts', 'blog', 'productDetails']

export const initial = {
  global: {
    companyName: 'softskirl',
    logo: '',
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
      heroVideo: '',
    },
    servicesIntro: {
      heading: 'When digital infrastructure is optimized, growth is limitless',
      subtext: 'At Softskirl, we align code, mobile architectures, and enterprise custom software to build systems where performance drives scaling—turning complexity into clean digital velocity.',
    },
    services: [
      { id: 1, icon: 'code', title: 'Website Development', desc: 'Custom websites and SEO-optimized code for maximum visibility and architectural cleanness. We build high-speed corporate architectures optimized for global scaling.', bgImage: 'https://images.unsplash.com/photo-1547658719-da2b8116c1d0?auto=format&fit=crop&w=600&q=80' },
      { id: 2, icon: 'smartphone', title: 'Mobile App Development', desc: 'High-performance Android and iOS apps built with Flutter & React Native for seamless experiences. Native performance across viewports with reusable design structures.', bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80' },
      { id: 3, icon: 'shopping_cart', title: 'eCommerce Solutions', desc: 'Secure, scalable marketplaces with easy payment integrations and real-time inventory management. Multi-vendor transactional logic with full security audits.', bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80' },
      { id: 4, icon: 'layers', title: 'ERP & Custom Software', desc: 'Business automation tools and robust ERP systems designed for optimized enterprise operations. Deep organizational flows built for complex enterprise requirements.', bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    ],
    productsIntro: {
      heading: 'Our Products',
      subtext: 'Advanced software solutions to streamline your business workflows.',
    },
    products: [
      { id: 1, name: 'FitBuddy', badge: 'v2.4', badgeDark: false, desc: 'All-in-one gym management software for members, trainers, payroll, and scheduling.', img: 'https://lh3.googleusercontent.com/aida/AP1WRLvBOR8qWIpevIk924W_aZtWNLZSbXLbHKD4WIUln-LdDKfQKhf71nnC0vAKE3Et6jU97xAv31rQldDpegRzUYFAKlxxAmPJE6W3ksLnFvYLIm_MBQpMgg56jrk3evnQ6shVN8MaxWdz_lmEOxYrgo7qEKxjtvzuqOILttceTHiRIuXoNXYW6v3r2sG6gUkNEtwCJZriZoNWuxNFzIEjw6ynVsp0nMMAWPxjqfqZIrUM9bLht9CBFLB4uK5W' },
      { id: 2, name: 'ERP Solutions', badge: 'Enterprise', badgeDark: true, desc: 'Comprehensive ERP for finance, HR, sales, and multi-branch management across global scales.', img: 'https://lh3.googleusercontent.com/aida/AP1WRLvNPpCUbXeEKqhgrUdAiKWWM5A-vg5AJM7Zpc-02dtOzJ57sJHmG5xARB2-VhIOyxpiEfAMptYg-7SX0VVD2v8JacKX7r4nr5Oh6mI22csUfJK5htlTHi39pbjRMt-iewsXrZw2Tw4gu7yvEwrAo8OoA8kkz2sFAxv2jenBGmZ3Xdt_cHDjtdKCUFtosnmL8DrnvTOgAZS49VENDKcFM7fx0vUS1QGItuC68khInfpEdRj2Ruj5ZVtgMA4' },
      { id: 3, name: 'ProdIQ', badge: 'New Release', badgeDark: true, desc: 'ProdIQ is a smart platform to streamline and manage your product lifecycle efficiently.', img: 'https://lh3.googleusercontent.com/aida/AP1WRLtmGYgLonyEANeWb2PRqao9ngF2iLwVJvooXDpUdoPrTW7WK-qWiMMNu0tI9K_-KMG9k0_xpywMa3r7BvbAJ-SAZ59R3IK1FhUB1wj0GyjkPAq56WxtvnB6wfj8yCqqDAJLQBHgb7nXhKSD74Drx2Uy0yhbzkHYtSFpxh6TKEb07rJiFJFPuHsZU2qIbEEgx8ENjWcxOctq7oy3YF1HQGykUCarH0Gp8mVJ6jqLM4c-nFH42BBRZeFUlUQ6' },
    ],
    industriesIntro: {
      heading: 'Industries We Serve',
      subtext: 'Trusted across multiple sectors to help businesses grow efficiently.',
    },
    industries: [
      { id: 1, icon: 'business', label: 'Corporate', desc: 'Enterprise-level digital solutions including secure intranet networks, high-concurrency cloud databases, and bespoke administration portals.', caseStudy: 'FinTech Group Multi-Branch Cloud Sync', image: '' },
      { id: 2, icon: 'storefront', label: 'Retail', desc: 'Omnichannel e-commerce platforms, POS integrations, and real-time inventory systems for seamless commerce operations.', caseStudy: 'SaaS POS Integration for National Apparel Chain', image: '' },
      { id: 3, icon: 'medical_services', label: 'Healthcare', desc: 'HIPAA-compliant telemedicine platforms, EMR synchronizations, and secure diagnostic portals for patient care.', caseStudy: 'Low-Latency Video Telehealth System', image: '' },
      { id: 4, icon: 'school', label: 'Education', desc: 'LMS developments, virtual classroom spaces, student performance tracking systems, and online testing portals.', caseStudy: 'State University Smart LMS Implementation', image: '' },
      { id: 5, icon: 'factory', label: 'Manufacturing', desc: 'Manufacturing IT solutions (e.g., Optimizing floor-to-cloud efficiency with custom MES and IIoT platforms).', caseStudy: 'Case Study: Automotive OEM Tech Upgrade', image: '' },
      { id: 6, icon: 'flight', label: 'Travel', desc: 'Global booking engine integrations, ticket reservation logic, flight status tracking APIs, and CRM dashboards.', caseStudy: 'Airlines API Tunneling and Booking Redesign', image: '' },
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
    cta: {
      headline: 'Start Your Next Project',
      body: 'Have a customized requirement or enterprise software architecture to build? Contact us today to deploy your sandbox systems.',
      formHeading: 'Get a Response in 2 Hours',
      ctaText: 'Submit Brief',
      phone: '+91 33 4004 8122',
      email: 'direct-inquiry@softskirl.com',
    },
  },
  about: {
    hero: { badge: 'EST. 2014', headline: 'ARCHITECTING PRECISION', subtext: "Engineering the digital infrastructure of tomorrow with unyielding technical integrity. We build systems that don't just function—they perform at the edge of possibility." },
    story: {
      headline: 'THE EVOLUTION', title: 'From Code to Core Infrastructure',
      body1: 'Softskirl began as a boutique engineering laboratory focused on high-concurrency architecture. Our founders recognized a critical gap in the enterprise market: the need for software that balances radical innovation with surgical precision.',
      body2: 'Over the last decade, we have evolved into a global powerhouse, architecting mission-critical platforms for Fortune 500 tech firms and government agencies. Our methodology is rooted in the Swiss-Modern philosophy—removing the superfluous to reveal the high-performance core.',
    },
    timeline: [
      { id: 1, title: 'Origins', desc: 'Founded in a high-stakes silicon environment focused on performance tuning.' },
      { id: 2, title: 'Transformation', desc: 'Scaled into a full-spectrum digital infrastructure firm serving global enterprises.' },
    ],
    pillarsIntro: {
      heading: 'DNA OF PERFORMANCE',
      subtext: 'Our foundational pillars define every line of code we ship.',
    },
    values: [
      { id: 1, icon: 'rocket_launch', title: 'Radical Innovation', desc: "We don't iterate; we leap. Our teams are empowered to challenge legacy constraints and build the impossible." },
      { id: 2, icon: 'security', title: 'Technical Integrity', desc: 'Precision is non-negotiable. Every system is built for 99.999% uptime and impenetrable security from day one.' },
      { id: 3, icon: 'groups', title: 'Client Centricity', desc: 'Your goals are our benchmarks. We operate as a high-performance extension of your core engineering team.' },
    ],
    leadershipIntro: {
      heading: 'EXECUTIVE LEADERSHIP',
      subtext: 'The minds behind the kinetic engine.',
    },
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
    heroButtons: { primaryText: 'View Ecosystem', secondaryText: 'Read Case Studies' },
    coreIntro: {
      heading: 'Core Competencies',
      subtext: 'Precision modules built for high-performance enterprise applications.',
    },
    coreServices: [
      { id: 1, icon: 'terminal', title: 'Website Development', desc: 'Custom high-speed corporate architectures, optimized for lighthouse scoring and global distribution.' },
      { id: 2, icon: 'smartphone', title: 'Mobile App Development', desc: 'Native performance across iOS and Android utilizing modern frameworks for maximum code reusability.' },
      { id: 3, icon: 'shopping_cart', title: 'eCommerce Development', desc: 'Multi-vendor marketplace logic with secure payment orchestration and inventory synchronization.' },
      { id: 4, icon: 'database', title: 'Custom Software & ERP', desc: 'Deep organizational automation, CRM integration, and bespoke ERP solutions for complex workflows.' },
      { id: 5, icon: 'architecture', title: 'UI/UX Design', desc: 'Objective-led design systems rooted in Swiss typography and architectural structural principles.' },
      { id: 6, icon: 'cloud', title: 'API & Cloud Integration', desc: 'Seamless cloud infrastructure orchestration, third-party API tunneling, and low-latency data sync.' },
    ],
    deepDive: {
      architecture: {
        heading: 'High-Performance Architecture',
        body: 'Our engineering team prioritizes structural integrity over stylistic trends. We build systems that handle traffic surges with sub-millisecond latency through aggressive caching and intelligent load balancing.',
        bullets: ['Microservices Orchestration', 'Stateless Logic Processing', 'Redundant Failover Systems'],
      },
      security: {
        heading: 'Secure Data Isolation',
        body: "Security isn't a feature; it's the foundation. Our multi-tenancy model ensures cryptographic isolation for every client, preventing cross-domain vulnerabilities and ensuring compliance with global standards.",
        buttonText: 'Review Security Protocol',
        stats: [
          { id: 1, value: '256-bit', label: 'Encryption' },
          { id: 2, value: '99.9%', label: 'Durability' },
          { id: 3, value: 'MTLS', label: 'Auth Flow' },
          { id: 4, value: 'Zero', label: 'Trust Model' },
        ],
      },
    },
    standOut: {
      heading: 'Why Our Services Stand Out',
      stats: [
        { id: 1, value: '99.9%', title: 'Uptime Guarantee', desc: 'Precision monitoring and redundant failovers ensure zero-downtime performance.' },
        { id: 2, value: '24/7', title: 'Continuous Support', desc: 'Expert architectural consultation available around the clock for priority systems.' },
        { id: 3, value: '0ms', title: 'API Latency', desc: 'Sub-millisecond data execution.' },
        { id: 4, value: '', title: 'Precision Deployment', desc: 'Every line of code undergoes automated security audits and performance stress testing before reaching production.' },
        { id: 5, value: '', title: 'Global Reach', desc: '' },
      ],
    },
    cta: { headline: 'Ready to Start?', body: 'Scale your business infrastructure with precision-engineered IT solutions. Request a technical audit and get a custom quote today.', ctaText: 'Get a Free Quote' },
  },
  products: {
    hero: { headline: 'Engineered Solutions', subtext: "At Softskirl, we don't just write code; we architect performance. Our suite of professional-grade tools is designed to accelerate business growth through absolute reliability and kinetic precision." },
    heroButtons: { primaryText: 'Explore Catalog', secondaryText: 'Technical Specs' },
    ecosystemHeading: 'Core Ecosystem',
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
    standardIntro: {
      heading: 'The Softskirl Standard',
      subtext: 'Built on a foundation of Swiss engineering principles, prioritizing clarity and performance over decoration.',
    },
    cta: { headline: 'Ready to Start Your Project?', body: 'Join the ranks of high-performance enterprises leveraging Softskirl technology to redefine their operational capabilities.', ctaText: 'Get a Free Quote' },
    ctaSecondaryButtonText: 'Book a Technical Demo',
    detailPage: {
      notFound: { heading: 'Product Not Found', body: 'The product you are looking for does not exist or has been removed.', buttonText: 'Return to Home' },
      heroButtons: { primaryText: 'Request Demo', secondaryText: 'Tech Specs' },
      capabilitiesLabel: 'Core Capabilities',
      capabilitiesHeading: 'Built for Performance at Scale',
      spotlight1Label: 'Feature Spotlight',
      spotlight2Label: 'Deep Dive',
      specsLabel: 'Technical Architecture',
      specsHeading: 'Infrastructure Specs',
      additionalSpecs: [
        { id: 1, label: 'Response Time', value: '<50ms' },
        { id: 2, label: 'Data Encryption', value: 'AES-256' },
        { id: 3, label: 'Compliance', value: 'SOC 2 Type II' },
        { id: 4, label: 'Support', value: '24/7 SLA' },
      ],
      formHeading: 'Interested in {name}?',
      formBody: 'Fill in your details and our solutions team will reach out within 24 hours.',
      formSuccessMessage: "Your query has been submitted successfully. We'll get back to you shortly.",
      formButtonText: 'Send Inquiry',
    },
  },
  navbarProducts: [
    {
      id: 1,
      title: 'Operations',
      items: [
        { id: 1, name: 'SkirlWorks', desc: 'End-to-end business management suite for growing enterprises', icon: 'work_history', bgColor: 'bg-[#f3e8ff]', iconColor: 'text-[#a855f7]', url: '/products/skirlworks' },
        { id: 2, name: 'SkirlMMS', desc: 'Merchant management system to onboard, manage, and monitor networks', icon: 'storefront', bgColor: 'bg-[#e6f7f4]', iconColor: 'text-[#14b8a6]', url: '/products/skirlmms' },
      ],
    },
    {
      id: 2,
      title: 'Enterprise',
      items: [
        { id: 1, name: 'SkirlHRMS', desc: 'Human resource management system for payroll and attendance', icon: 'people', bgColor: 'bg-[#dbeafe]', iconColor: 'text-[#3b82f6]', url: '/products/skirlhrms' },
        { id: 2, name: 'SkirlERP', desc: 'Comprehensive ERP for finance, HR, and sales management', icon: 'account_tree', bgColor: 'bg-[#ffedd5]', iconColor: 'text-[#f97316]', url: '/products/skirlerp' },
      ],
    },
    {
      id: 3,
      title: 'Specialized',
      items: [
        { id: 1, name: 'FitBuddy', desc: 'Gym & fitness club automation with member app and billing', icon: 'fitness_center', bgColor: 'bg-[#fce7f3]', iconColor: 'text-[#ec4899]', url: '/products/fitbuddy' },
      ],
    },
  ],
  productDetails: {
    fitbuddy: {
      name: 'FitBuddy', badge: 'v4.2 Active', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      category: 'Fitness & Wellness', tagline: 'Next-Gen Fitness Hub Automation & Billing',
      heroDesc: 'Streamline gym operations with biometric check-ins, automated billing cycles, class scheduling, and real-time member analytics. Built for modern fitness businesses that demand precision.',
      heroImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      capabilities: [
        { title: 'Biometric Check-in Engine', desc: 'Low-latency fingerprint and face-ID validation at entry points with instant membership status display.', icon: 'fingerprint', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80' },
        { title: 'Smart Class Scheduler', desc: 'Cross-platform booking with capacity monitoring, waitlist automation, and trainer assignment logic.', icon: 'calendar_month', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80' },
        { title: 'Revenue Analytics', desc: 'ML-driven subscription renewal forecasting, churn prediction, and automated payment reconciliation.', icon: 'trending_up', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
      ],
      spotlight1: { title: 'Member Lifecycle Management', desc: 'Track every member from first visit to long-term retention. Automated onboarding flows, progress tracking dashboards, and personalized communication pipelines ensure no member falls through the cracks.', bullets: ['Automated welcome sequences', 'BMI & fitness progress charts', 'Renewal reminder workflows', 'Referral program tracking'], img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=700&q=80' },
      spotlight2: { title: 'Multi-Branch Operations Control', desc: 'Manage unlimited gym locations from a single command center. Centralized inventory, staff scheduling, and financial reporting with branch-level granularity.', bullets: ['Unified dashboard across locations', 'Staff shift management', 'Equipment maintenance logs', 'Cross-branch membership transfers'], img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=700&q=80' },
      specs: {
        database: { label: 'Database Layer', value: 'PostgreSQL 15 + Redis Cache', icon: 'database' },
        api: { label: 'API Protocol', value: 'REST + WebSocket Live Feeds', icon: 'api' },
        hosting: { label: 'Hosting Environment', value: 'AWS ECS Fargate (Auto-Scale)', icon: 'cloud' },
        uptime: { label: 'Uptime Target', value: '99.95% SLA Guarantee', icon: 'verified' },
      },
    },
    skirlworks: {
      name: 'SkirlWorks', badge: 'Active', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      category: 'Operations & Workflow', tagline: 'Integrated Operations & Work Intelligence Platform',
      heroDesc: 'Visually structure deliverables, track pipeline status, and automate quotes. SkirlWorks unifies project management, resource allocation, and client communications into one powerful platform.',
      heroImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      capabilities: [
        { title: 'Algorithmic Job Dispatch', desc: 'Optimized job allocations based on skill matching, location proximity, and workload balancing algorithms.', icon: 'account_tree', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80' },
        { title: 'Predictive Work Intelligence', desc: 'ML-driven workflow bottleneck detection, resource utilization scoring, and delivery prediction models.', icon: 'analytics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
        { title: 'Dynamic Quote Builder', desc: 'Multi-constraint pricing engine that generates accurate service estimates based on scope, timeline, and resources.', icon: 'description', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80' },
      ],
      spotlight1: { title: 'Pipeline Visualization Engine', desc: 'Interactive job flow charts displaying pipeline states, trigger conditions, and dependency maps. Real-time status updates keep every stakeholder aligned on project health.', bullets: ['Drag-and-drop pipeline builder', 'Milestone dependency tracking', 'Automated status notifications', 'Custom pipeline templates'], img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80' },
      spotlight2: { title: 'Team Performance Dashboard', desc: 'Granular engineering metrics with automated complexity scoring, velocity tracking, and resource utilization analysis across all active projects.', bullets: ['Sprint velocity analytics', 'Individual contribution metrics', 'Capacity planning forecasts', 'Burndown chart automation'], img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80' },
      specs: {
        database: { label: 'Database Layer', value: 'MongoDB Atlas + Elasticsearch', icon: 'database' },
        api: { label: 'API Protocol', value: 'GraphQL + gRPC Microservices', icon: 'api' },
        hosting: { label: 'Hosting Environment', value: 'GCP Cloud Run (Serverless)', icon: 'cloud' },
        uptime: { label: 'Uptime Target', value: '99.9% SLA Guarantee', icon: 'verified' },
      },
    },
    skirlhrms: {
      name: 'SkirlHRMS', badge: 'Enterprise Ready', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      category: 'Human Resources', tagline: 'Workforce Analytics & Payroll Scaling Engine',
      heroDesc: 'Unify staff registries, clock-in locations, tax computation systems, and compliance audits. SkirlHRMS delivers end-to-end human capital management for enterprises of any scale.',
      heroImg: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
      capabilities: [
        { title: 'Advanced Shift Dispatch', desc: 'Automated scheduling and allocation engine supporting global timezones, holidays, and labor law compliance.', icon: 'schedule', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80' },
        { title: 'Geo-Fenced Attendance', desc: 'Mobile-first punch system with GPS validation, site perimeter checks, and real-time attendance dashboards.', icon: 'location_on', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80' },
        { title: 'Multi-Constraint Payroll', desc: 'Dynamic tax computation, deduction matrices, and automated wire transfers supporting multi-currency operations.', icon: 'account_balance_wallet', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80' },
      ],
      spotlight1: { title: 'Employee Lifecycle Portal', desc: 'From onboarding documentation to exit interviews, manage the complete employee journey with configurable workflow templates and automated compliance checkpoints.', bullets: ['Digital onboarding workflows', 'Performance review cycles', 'Training & certification tracking', 'Exit process automation'], img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80' },
      spotlight2: { title: 'Compliance & Audit Engine', desc: 'Built-in regulatory compliance frameworks for labor laws, tax codes, and industry standards. Automated audit trails ensure every action is traceable and documented.', bullets: ['Labor law compliance checks', 'Automated tax filing', 'Immutable audit logs', 'Custom policy enforcement'], img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80' },
      specs: {
        database: { label: 'Database Layer', value: 'PostgreSQL 15 + TimescaleDB', icon: 'database' },
        api: { label: 'API Protocol', value: 'REST API v3 + OAuth 2.0', icon: 'api' },
        hosting: { label: 'Hosting Environment', value: 'Azure Kubernetes Service', icon: 'cloud' },
        uptime: { label: 'Uptime Target', value: '99.99% SLA Guarantee', icon: 'verified' },
      },
    },
    skirlmms: {
      name: 'SkirlMMS', badge: 'Active', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      category: 'Merchant & Payments', tagline: 'Merchant Networks & Settlement Portal',
      heroDesc: 'Onboard merchant tiers, track rate configurations, and protect transactional integrity. SkirlMMS provides enterprise-grade merchant lifecycle management with real-time settlement processing.',
      heroImg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      capabilities: [
        { title: 'Automated KYC Engine', desc: 'Business verification automation with document OCR, compliance scoring, and digital contract signature workflows.', icon: 'person_add', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=500&q=80' },
        { title: 'Real-Time Settlement', desc: 'Instant monitoring of network payments, batch settlements, and merchant payout schedules with full reconciliation.', icon: 'point_of_sale', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80' },
        { title: 'Fraud Risk Scoring', desc: 'Transaction velocity analysis, anomaly detection, and automated card ban triggers for zero-tolerance fraud protection.', icon: 'security', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80' },
      ],
      spotlight1: { title: 'Merchant Tier Management', desc: 'Configure custom pricing tiers, volume-based discounts, and regional rate schedules. Automated tier upgrades based on transaction volume thresholds.', bullets: ['Custom pricing matrices', 'Volume-based tier automation', 'Regional rate configuration', 'Contract renewal workflows'], img: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=700&q=80' },
      spotlight2: { title: 'Terminal Fleet Management', desc: 'Monitor physical POS terminal health, firmware versions, and connectivity status across your entire merchant network from a unified dashboard.', bullets: ['Live terminal health monitoring', 'OTA firmware updates', 'Network diagnostics', 'Replacement workflow automation'], img: 'https://images.unsplash.com/photo-1556742205-e10c9486e506?w=700&q=80' },
      specs: {
        database: { label: 'Database Layer', value: 'CockroachDB (Distributed)', icon: 'database' },
        api: { label: 'API Protocol', value: 'REST + ISO 8583 Gateway', icon: 'api' },
        hosting: { label: 'Hosting Environment', value: 'AWS EKS Multi-Region', icon: 'cloud' },
        uptime: { label: 'Uptime Target', value: '99.999% SLA Guarantee', icon: 'verified' },
      },
    },
    skirlerp: {
      name: 'SkirlERP', badge: 'Enterprise Ready', badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      category: 'Enterprise Resource Planning', tagline: 'Unified Enterprise Resource & Inventory Planning',
      heroDesc: 'GAAP-compliant double-entry ledgers, warehouse inventory synchronization, and multi-depot logistics. SkirlERP delivers complete financial and operational control for complex enterprise environments.',
      heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      capabilities: [
        { title: 'Resource Allocation Engine', desc: 'Optimized inventory routing across multiple warehouses with demand forecasting and automatic reorder triggers.', icon: 'hub', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80' },
        { title: 'Double-Entry Ledger', desc: 'GAAP-compliant journal management with automated balance sheet generation, cashflow tracking, and fiscal reporting.', icon: 'balance', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80' },
        { title: 'Logistics Orchestration', desc: 'Dynamic shipping route optimization, carrier management, and real-time freight tracking across global supply chains.', icon: 'local_shipping', img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=500&q=80' },
      ],
      spotlight1: { title: 'Financial Command Center', desc: 'Centralized financial oversight with real-time P&L statements, automated tax calculations, and multi-entity consolidation for group-level reporting.', bullets: ['Real-time P&L dashboards', 'Multi-currency support', 'Automated tax computation', 'Group consolidation reporting'], img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80' },
      spotlight2: { title: 'Supply Chain Intelligence', desc: 'End-to-end supply chain visibility with predictive stock-out alerts, supplier performance scoring, and automated procurement workflows.', bullets: ['Predictive stock-out alerts', 'Supplier scorecards', 'Automated PO generation', 'Quality inspection workflows'], img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80' },
      specs: {
        database: { label: 'Database Layer', value: 'Oracle 19c + Redis Cluster', icon: 'database' },
        api: { label: 'API Protocol', value: 'REST + SOAP (Legacy Bridge)', icon: 'api' },
        hosting: { label: 'Hosting Environment', value: 'On-Prem + Azure Hybrid', icon: 'cloud' },
        uptime: { label: 'Uptime Target', value: '99.99% SLA Guarantee', icon: 'verified' },
      },
    },
  },
  blog: {
    hero: {
      heading: 'ENGINEERED INSIGHTS',
      subtext: 'Technical analysis and strategic perspectives on the future of enterprise automation.',
    },
    featuredCtaText: 'Read Full Analysis',
    gridCtaText: 'Read Analysis',
    subscribe: {
      heading: 'STAY INFORMED',
      body: 'Receive technical whitepapers and executive summaries directly in your inbox. No fluff, just engineering.',
      placeholder: 'ENTER EMAIL ADDRESS',
      buttonText: 'SUBSCRIBE',
    },
    tags: ['#SoftskiRL', '#EnterpriseIT', '#Engineering', '#Innovation', '#Software'],
    sidebarCta: {
      heading: 'Ready to Modernize?',
      body: 'Transform your operations with a custom-tailored solution. Request a live technical walkthrough today.',
      primaryButtonText: 'Request a Demo',
      secondaryButtonText: 'Contact Sales',
    },
    relatedHeading: 'Related Analysis',
    bottomCta: {
      heading: 'Interested in Learning More?',
      body: 'Get in touch with us to discuss how our solutions can transform your operations.',
      buttonText: 'Get in Touch',
    },
    featured: { slug: 'erp-transformation', category: 'ERP SYSTEMS', title: 'How ERP Software Transforms Business Operations', excerpt: 'An in-depth exploration of how next-generation enterprise resource planning systems are leveraging AI to automate complex logistical workflows and drive operational efficiency.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7ssQUoXWIM4tPsvXp35RDsntHBrNVOusJzfs8aOWjOQs-__kxXOA6PW2s2qyA5JydmH1yrhccZPQtnEnqeWrZGnGHxrp3prdLPuWCPRPFubYHtnIQljPIp_LAISMUPlJt5pwZuCGlPK-VAUy4oSVQ0aV3dWWfyHmmsMs3MhHYybURCaeN5ocwJ3fs5Y22DG63FBM3XInh_Wpn3ZwvIQ8ddiqJP6medCHH7pglhlfps-V6r1Ff31hSGb_qFBihwwlh8gHKib9lf5C2' },
    posts: [
      { id: 1, slug: 'gym-software', category: 'FITNESS SOFTWARE', title: 'Why Every Gym Needs Modern Membership Software in 2025', excerpt: 'Optimizing retention through automated billing and biometric integration.', readTime: '5 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvAEb92Tbmw4-O6R7YuC9lMBOXf1cb9goBnq3X6oWHrAGyBCiqLfr6cUFUJKrYTkzSfKFGGPnp-e8p4ThBOCblPPH47y7JPRFyrF0Ok6AXc7eoAY_pMuSNZAYIiU2-XCt9coewaF-hqBi1j-l5WmQAEichRs3I7Z8zS-X4Lp_3Z1xQ1YanDJ2HBe6uUoppW5D3Fm-lPQybAgmzYWqYpdEbRkL5_4Cchltt__laDS0jLZXSYfBDA4ZP0UQP_2aWQW-zYR-Jt6s5wdv9', date: '2024-10-24', published: true, content: 'Managing a gym can be challenging, especially when tracking member attendance, subscriptions, and progress. FitBuddy membership software simplifies everything, providing a centralized platform for gym owners and trainers.\n\nWith automated billing, class scheduling, and performance tracking, FitBuddy ensures that your gym operates efficiently while enhancing member experience. Trainers can record daily progress, BMI changes, and provide personalized workout plans easily.\n\nIntegration with mobile apps allows members to check schedules, book sessions, and monitor their progress, reducing administrative overhead for gym management.' },
      { id: 2, slug: 'insurance-management', category: 'INSURANCE TECH', title: 'Insurance Management Software: Full Automation Guide', excerpt: 'Streamlining claims processing and policy lifecycle management with low-code solutions.', readTime: '5 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQR_fbTXmC7zShFILZ33Ax4sQWKMar9m2jmnwt0yCxb_p-ldqbmCxVRKKy5udTWskk-hJlXbKvJZ4mmwUSFFPaaYn-rAT8nMA_c8HRKZnM9X2EYrM6CxK8HLb9Bfu1cNK0NcptYr0-cSPFLBiGpUNOGrsyBsf6Ap11F7qDHkqX1nPMrn09wmHexBz2YC3qB_Wqpt7rWYsgmh2njMYNA3kdUC7b7aUpyUS2g1R2o4-P7DmHaRVrKOqS8duPe_jlMVgEwtDLUzUOicxo', date: '2024-10-08', published: true, content: 'Modern insurance companies face enormous pressure to streamline operations while maintaining compliance with evolving regulations. Our insurance management software addresses these challenges head-on.\n\nThe platform automates claims processing from intake to settlement, reducing manual intervention by up to 80%. Policy lifecycle management becomes transparent and auditable with our structured workflow engine.\n\nLow-code configuration allows business users to adapt workflows without developer intervention, accelerating time-to-market for new insurance products.' },
      { id: 3, slug: 'hyper-automation', category: 'AUTOMATION', title: 'The Shift to Hyper-Automation in Global Supply Chains', excerpt: 'Defining the new standard for resilience in industrial enterprise operations.', readTime: '5 min read', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3FdBeqMArpt297RZflMbIQWkVw9WFXLb58EF_XzixUSMGQ3R17hdJ7H-ShHTMg5zpW5LJuinwvW9Kczbek9hWSOG6N1ZbP_6K_A4eWp7Z3Elhwz5g7u3G10ecVZKmkVBsUMinC4AqQfW20bNoLyi1Qf4iBurMnkMWJNB9lEstfGW1aCtRbolpcOWcQrVp7nnRYHKEj0a0CaogCOkEbGMSiQ_6dXtkGL4LjTWfrzuO02qv8nCNWpnmTyH5woeUtHiwO2TLBHM0vBKw', date: '2024-10-05', published: true, content: 'Hyper-automation represents the convergence of robotic process automation, artificial intelligence, and machine learning to automate complex business processes end-to-end.\n\nIn global supply chains, this means real-time inventory optimization, predictive demand forecasting, and autonomous procurement workflows. Companies adopting hyper-automation report 40-60% reduction in operational costs.\n\nThe key to successful implementation is a phased approach: starting with high-volume, rule-based processes and progressively introducing AI decision layers as organizational maturity grows.' },
    ],
  },
  contact: {
    hero: {
      heading: 'CONNECT WITH ENGINEERING',
      subtext: 'High-performance reliability meets precision infrastructure. Our team is standing by to integrate your next enterprise solution.',
    },
    cardLabels: { operations: 'Operations', directInquiry: 'Direct Inquiry', headquarters: 'Headquarters' },
    security: {
      heading: '256-Bit Data Integrity',
      body: 'All inquiries are handled via encrypted pipelines. Our 24/7 technical support ensures zero-latency response for critical infrastructure needs.',
    },
    form: {
      heading: 'Start Your Project',
      successMessage: "Your request has been submitted. We'll be in touch shortly.",
      disclaimer: 'By submitting, you agree to our strict data privacy and non-disclosure agreements.',
      buttonText: 'Submit Request',
      sectorLabel: 'Industry Sector',
      sectorOptions: ['AEROSPACE & DEFENSE', 'FINTECH INFRASTRUCTURE', 'DATA ANALYTICS', 'SYSTEM ARCHITECTURE', 'HEALTHCARE', 'RETAIL & ECOMMERCE'],
      urgencyLabel: 'Project Urgency',
    },
    map: {
      heading: 'Technical Hub: Kolkata',
      body: "Our primary engineering facility is located in the heart of Sector V, the region's technology epicenter.",
      buttonText: 'Get Directions',
    },
    trustBadges: [
      { id: 1, title: '99.9% Uptime SLA', desc: 'Guaranteed operational continuity for all enterprise-level deployments and support cycles.' },
      { id: 2, title: 'ISO 27001 Certified', desc: 'Global standards in information security management systems and data governance.' },
      { id: 3, title: 'Global Network', desc: 'Strategically positioned engineering hubs to provide localized support across 14 time zones.' },
    ],
  },
  footer: {
    navLinks: [
      { id: 1, label: 'Home', to: '/' },
      { id: 2, label: 'Services', to: '/services' },
      { id: 3, label: 'Products', to: '/products' },
      { id: 4, label: 'About', to: '/about' },
      { id: 5, label: 'Blog', to: '/blog' },
    ],
    legalPages: [
      { id: 1, slug: 'privacy-policy', title: 'Privacy Policy', content: '<p>This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.</p>' },
      { id: 2, slug: 'terms-of-service', title: 'Terms of Service', content: '<p>By accessing and using this website, you agree to be bound by these Terms of Service.</p>' },
      { id: 3, slug: 'cookie-policy', title: 'Cookie Policy', content: '<p>We use cookies to improve your browsing experience and analyze site traffic.</p>' },
      { id: 4, slug: 'security-standards', title: 'Security Standards', content: '<p>We follow industry-standard security practices to protect your data and our systems.</p>' },
    ],
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_GLOBAL': return { ...state, global: { ...state.global, ...action.payload } }
    case 'SET_HOME': return { ...state, home: { ...state.home, ...action.payload } }
    case 'SET_ABOUT': return { ...state, about: { ...state.about, ...action.payload } }
    case 'SET_CONTACT': return { ...state, contact: { ...state.contact, ...action.payload } }
    case 'SET_FOOTER': return { ...state, footer: { ...state.footer, ...action.payload } }
    case 'SET_SERVICES': return { ...state, services: { ...state.services, ...action.payload } }
    case 'SET_PRODUCTS': return { ...state, products: { ...state.products, ...action.payload } }
    // Plain-replace (not merge) — navbarProducts is an array and productDetails needs
    // real key deletion when an admin removes an entry; a shallow spread-merge can't do that.
    case 'SET_NAVBAR_PRODUCTS': return { ...state, navbarProducts: action.payload }
    case 'SET_PRODUCT_DETAILS': return { ...state, productDetails: action.payload }
    case 'SET_BLOG': return { ...state, blog: { ...state.blog, ...action.payload } }
    case 'SET_BLOG_FEATURED': return { ...state, blog: { ...state.blog, featured: { ...state.blog.featured, ...action.payload } } }
    case 'ADD_POST': return { ...state, blog: { ...state.blog, posts: [...state.blog.posts, action.payload] } }
    case 'UPDATE_POST': return { ...state, blog: { ...state.blog, posts: state.blog.posts.map(p => p.id === action.payload.id ? action.payload : p) } }
    case 'DELETE_POST': return { ...state, blog: { ...state.blog, posts: state.blog.posts.filter(p => p.id !== action.payload) } }
    case 'RESET': return initial
    default: return state
  }
}

// Fills in top-level keys missing from a cached section (added to `defaults` after the
// user's last visit) without touching any value the cached section already has.
function backfillSection(current, defaults) {
  if (!current) return defaults
  const result = { ...current }
  for (const key of Object.keys(defaults)) {
    if (result[key] === undefined) result[key] = defaults[key]
  }
  return result
}

const DataCtx = createContext(null)

const ACTION_FOR_KEY = {
  home: 'SET_HOME',
  services: 'SET_SERVICES',
  products: 'SET_PRODUCTS',
  navbarProducts: 'SET_NAVBAR_PRODUCTS',
  blog: 'SET_BLOG',
  productDetails: 'SET_PRODUCT_DETAILS',
}

export function DataProvider({ children }) {
  const stored = (() => {
    try {
      const s = localStorage.getItem(KEY)
      if (!s) return null
      const parsed = JSON.parse(s)
      // Merge over `initial` so sections added after a user's last visit (e.g. navbarProducts,
      // productDetails) exist even if their cached blob predates them.
      const merged = { ...initial, ...parsed }
      // Backfill new top-level keys added to a section after a user's last visit
      // (e.g. servicesIntro, industriesIntro, deepDive) without touching existing values.
      merged.global = backfillSection(merged.global, initial.global)
      merged.home = backfillSection(merged.home, initial.home)
      merged.about = backfillSection(merged.about, initial.about)
      merged.services = backfillSection(merged.services, initial.services)
      merged.products = backfillSection(merged.products, initial.products)
      merged.blog = backfillSection(merged.blog, initial.blog)
      // Array items whose shape gained new required fields — reset wholesale rather than
      // patch individual entries, since these fields didn't exist to customize before.
      if (!merged.products?.items?.[0]?.icon) merged.products.items = initial.products.items
      if (!merged.home?.services?.[0]?.bgImage) merged.home.services = initial.home.services
      if (!merged.home?.industries?.[0]?.desc) merged.home.industries = initial.home.industries
      if (!merged.home?.cta?.phone) merged.home.cta = initial.home.cta
      return merged
    } catch { return null }
  })()
  const [data, dispatch] = useReducer(reducer, stored || initial)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
  }, [data])

  // Hydrate the backend-backed sections on mount. Each key is independent — one
  // failing (e.g. backend down) must not block the others or blank the site.
  useEffect(() => {
    Promise.allSettled(BACKEND_KEYS.map((key) => getContent(key))).then((results) => {
      results.forEach((result, i) => {
        const key = BACKEND_KEYS[i]
        if (result.status === 'fulfilled') {
          dispatch({ type: ACTION_FOR_KEY[key], payload: result.value })
        } else {
          console.warn(`Could not load "${key}" from backend, using local defaults:`, result.reason?.message)
        }
      })
      setLoading(false)
    })
  }, [])

  return <DataCtx.Provider value={{ data, dispatch, loading }}>{children}</DataCtx.Provider>
}

export function useData() {
  return useContext(DataCtx)
}
