import { saveContent, uploadFile, ApiError } from '../api/client'

function handleAuthError(err) {
  if (err instanceof ApiError && err.status === 401) {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
  }
}

// Persists a content section to the backend, using the admin's stored JWT.
// On a 401 (missing/expired token) it clears the token and bounces to login
// instead of leaving the admin stuck on a silently-failing Save button.
export async function persistContent(key, payload) {
  const token = localStorage.getItem('admin_token')
  try {
    await saveContent(key, payload, token)
  } catch (err) {
    handleAuthError(err)
    throw err
  }
}

// Uploads an image/video file and returns its public URL, same 401 handling as above.
export async function uploadAdminFile(file) {
  const token = localStorage.getItem('admin_token')
  try {
    return await uploadFile(file, token)
  } catch (err) {
    handleAuthError(err)
    throw err
  }
}
