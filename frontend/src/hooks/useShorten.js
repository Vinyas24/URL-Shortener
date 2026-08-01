import { useState } from 'react'
import { createShortUrl } from '../utils/api'

export function useShorten() {
  const [status, setStatus] = useState('idle')
  const [shortUrl, setShortUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  async function shorten(originalUrl) {
    setStatus('loading')
    setShortUrl('')
    setErrorMessage('')
    setFieldErrors({})

    try {
      const { data, status: httpStatus } = await createShortUrl(originalUrl)

      if (httpStatus === 200) {
        setShortUrl(data.shortUrl)
        setStatus('success')
      } else if (httpStatus === 400) {
        setFieldErrors(data.errors || {})
        setErrorMessage(data.message || 'Validation failed.')
        setStatus('error')
      } else {
        setErrorMessage(data.message || 'An unexpected error occurred.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Unable to reach the server. Please check your connection.')
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setShortUrl('')
    setErrorMessage('')
    setFieldErrors({})
  }

  return { status, shortUrl, errorMessage, fieldErrors, shorten, reset }
}
