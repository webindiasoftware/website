import { useEffect, useRef } from 'react'

export default function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('opacity-100', 'translate-y-0'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700')
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}
