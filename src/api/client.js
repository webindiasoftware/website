import { API_URL } from '../config/env.js'

const BASE_URL = API_URL

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(body.error || `Request failed (${res.status})`, res.status)
  return body
}

export function getContent(key) {
  return request(`/content/${key}`).then((r) => r.data)
}

export function login(email, password) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }).then((r) => r.token)
}

export function saveContent(key, data, token) {
  return request(`/admin/content/${key}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data }),
  }).then((r) => r.data)
}

export function submitContact(payload) {
  return request('/submissions', { method: 'POST', body: JSON.stringify(payload) }).then((r) => r.data)
}

export function getSubmissions(token) {
  return request('/admin/submissions', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data)
}

export function deleteSubmission(id, token) {
  return request(`/admin/submissions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}

// Bypasses `request()` — a FormData body must not get a manual Content-Type,
// the browser sets the multipart boundary itself.
export async function uploadFile(file, token) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE_URL}/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(body.error || `Upload failed (${res.status})`, res.status)
  return body.url
}
