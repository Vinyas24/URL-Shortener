import { useState } from 'react'
import { Link2, Zap, Pencil, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spinner from './Spinner'
import styles from '../styles/UrlForm.module.css'

export default function UrlForm({ onSubmit, status, fieldErrors, errorMessage }) {
  const [url, setUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [showCustomCode, setShowCustomCode] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (url.trim()) onSubmit(url.trim(), customCode.trim() || undefined)
  }

  const isLoading = status === 'loading'
  const hasUrlError = fieldErrors?.originalUrl
  const hasCustomCodeError = fieldErrors?.customCode
  const hasGeneralError = status === 'error' && !hasUrlError && !hasCustomCodeError && errorMessage

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>

      <div className={styles.inputRow}>
        <div className={`${styles.inputWrapper} ${hasUrlError ? styles.inputError : ''}`}>
          <Link2 className={styles.inputIcon} size={16} />
          <Input
            id="url-input"
            type="url"
            className={styles.urlInput}
            placeholder="Paste your long URL here…"
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
            aria-label="Long URL to shorten"
            aria-describedby={hasUrlError ? 'url-error' : undefined}
          />
        </div>
        <Button
          id="shorten-btn"
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading || !url.trim()}
          aria-label="Shorten URL"
        >
          {isLoading ? (
            <>
              <Spinner size={15} />
              Shortening…
            </>
          ) : (
            <>
              <Zap size={15} />
              Shorten
            </>
          )}
        </Button>
      </div>

      {hasUrlError && (
        <p id="url-error" className={styles.fieldError} role="alert">
          ⚠ {fieldErrors.originalUrl}
        </p>
      )}

      <Button
        type="button"
        id="custom-code-toggle"
        variant="ghost"
        size="sm"
        className={styles.toggleBtn}
        onClick={() => setShowCustomCode(v => !v)}
        aria-expanded={showCustomCode}
        aria-controls="custom-code-row"
        disabled={isLoading}
      >
        <Pencil size={13} />
        Custom code
        <ChevronDown
          size={13}
          className={`${styles.chevron} ${showCustomCode ? styles.chevronOpen : ''}`}
        />
      </Button>

      {showCustomCode && (
        <div id="custom-code-row" className={styles.customCodeRow}>
          <div className={`${styles.inputWrapper} ${hasCustomCodeError ? styles.inputError : ''}`}>
            <Pencil className={styles.inputIcon} size={14} />
            <Input
              id="custom-code-input"
              type="text"
              className={styles.urlInput}
              placeholder="(3–15 chars, letters, numbers, - or _)"
              value={customCode}
              onChange={e => setCustomCode(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
              spellCheck={false}
              maxLength={15}
              aria-label="Optional custom short code"
              aria-describedby={hasCustomCodeError ? 'custom-code-error' : undefined}
            />
          </div>
          {hasCustomCodeError && (
            <p id="custom-code-error" className={styles.fieldError} role="alert">
              ⚠ {fieldErrors.customCode}
            </p>
          )}
        </div>
      )}

      {hasGeneralError && (
        <p className={styles.generalError} role="alert">
          ⚠ {errorMessage}
        </p>
      )}
    </form>
  )
}
