import { useParams, Navigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import useScrollReveal from '../hooks/useScrollReveal'

export default function LegalPage() {
  const { slug } = useParams()
  const { data } = useData()

  const page = data.footer.legalPages.find((p) => p.slug === slug)
  if (!page) return <Navigate to="/" replace />

  const heroRef = useScrollReveal()

  return (
    <main className="w-full max-w-container-max mx-auto px-5 md:px-12 py-16 md:py-24">
      <header ref={heroRef} className="mb-12 max-w-3xl">
        <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background leading-tight">
          {page.title}
        </h1>
      </header>
      <div className="rich-content font-body-md text-body-md text-on-surface max-w-3xl" dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  )
}
