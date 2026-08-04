const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export async function createShortUrl(originalUrl, customCode) {
  const body = { originalUrl }
  if (customCode && customCode.trim()) body.customCode = customCode.trim()

  const response = await fetch(`${API_BASE}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return { data, status: response.status }
}
