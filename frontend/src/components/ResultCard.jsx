import { useState } from 'react'
import { Copy, Check, ExternalLink, RotateCcw } from 'lucide-react'
import styles from '../styles/ResultCard.module.css'

export default function ResultCard({ shortUrl, onReset, onCopied }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const el = document.createElement('textarea')
      el.value = shortUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className={`glass ${styles.card}`} role="region" aria-label="Shortened URL result">
      <div className={styles.header}>
        <div className={styles.successBadge}>
          <Check size={14} />
          <span>Link created!</span>
        </div>
      </div>

      <div className={styles.urlRow}>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shortUrl}
          id="result-short-url"
          aria-label={`Short URL: ${shortUrl}`}
        >
          {shortUrl}
          <ExternalLink size={14} className={styles.externalIcon} />
        </a>

        <button
          id="copy-btn"
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy short URL to clipboard'}
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <button
        id="shorten-another-btn"
        className={styles.resetLink}
        onClick={onReset}
        aria-label="Shorten another URL"
      >
        <RotateCcw size={13} />
        Shorten another URL
      </button>
    </div>
  )
}
