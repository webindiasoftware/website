// Flip this to switch the whole app between local and live backend.
export const isProduction = true

const LOCAL_API_URL = 'http://localhost:5000/api'
const PRODUCTION_API_URL = 'https://darkslategrey-rook-627450.hostingersite.com/api'

export const API_URL = isProduction ? PRODUCTION_API_URL : LOCAL_API_URL
