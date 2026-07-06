import { useCallback, useEffect, useState } from 'react'
import { getSubmissions, deleteSubmission, ApiError } from '../api/client'

function handleAuthError(err) {
  if (err instanceof ApiError && err.status === 401) {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
  }
}

// Shared loader for contact form submissions, used by the dashboard and the
// submissions inbox. Submissions live in their own backend collection (not the
// Content model) since they're user-generated records, not editable site copy.
export function useSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('admin_token')
      const data = await getSubmissions(token)
      setSubmissions(data)
    } catch (err) {
      handleAuthError(err)
      setError(err.message || 'Failed to load submissions.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const remove = async (id) => {
    const token = localStorage.getItem('admin_token')
    try {
      await deleteSubmission(id, token)
      setSubmissions((s) => s.filter((x) => x._id !== id))
    } catch (err) {
      handleAuthError(err)
      throw err
    }
  }

  return { submissions, loading, error, remove, reload: load }
}
