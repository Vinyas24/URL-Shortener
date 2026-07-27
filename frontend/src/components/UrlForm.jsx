import { useState } from 'react'
import { Link2, Zap } from 'lucide-react'
import Spinner from './Spinner'
import styles from '../styles/UrlForm.module.css'

export default function UrlForm({ onSubmit, status, fieldErrors, errorMessage }) {
  const [url, setUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (url.trim()) onSubmit(url.trim())
  }

  const isLoading = status === 'loading'
  const hasFieldError = fieldErrors?.originalUrl
  const hasGeneralError = status === 'error' && !hasFieldError && errorMessage

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.inputRow}>
        <div className={`${styles.inputWrapper} ${hasFieldError ? styles.inputError : ''}`}>
          <Link2 className={styles.inputIcon} size={18} />
          <input
            id="url-input"
            type="url"
            className={styles.input}
            placeholder="Paste your long URL here..."
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
            aria-label="Long URL to shorten"
            aria-describedby={hasFieldError ? 'url-error' : undefined}
          />
        </div>
        <button
          id="shorten-btn"
          type="submit"
          className={`btn-primary ${styles.submitBtn}`}
          disabled={isLoading || !url.trim()}
          aria-label="Shorten URL"
        >
          {isLoading ? (
            <>
              <Spinner size={17} />
              <span>Shortening…</span>
            </>
          ) : (
            <>
              <Zap size={17} />
              <span>Shorten</span>
            </>
          )}
        </button>
      </div>

      {hasFieldError && (
        <p id="url-error" className={styles.fieldError} role="alert">
          ⚠ {fieldErrors.originalUrl}
        </p>
      )}

      {hasGeneralError && (
        <p className={styles.generalError} role="alert">
          ⚠ {errorMessage}
        </p>
      )}
    </form>
  )
}
