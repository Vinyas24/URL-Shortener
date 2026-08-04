import { useState } from 'react'
import { Copy, Check, ExternalLink, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import styles from '../styles/ResultCard.module.css'

export default function ResultCard({ shortUrl, onReset, onCopied }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl)
    } catch {
      const el = document.createElement('textarea')
      el.value = shortUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    onCopied?.()
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className={styles.card} role="region" aria-label="Shortened URL result">
      <div className={styles.header}>
        <Badge className={styles.successBadge}>
          <Check size={11} />
          Link created!
        </Badge>
      </div>

      <Separator className={styles.sep} />

      <div className={styles.urlRow}>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shortUrl}
          id="result-short-url"
          aria-label={`Short URL: ${shortUrl}`}
        >
          <span className={styles.urlText}>{shortUrl}</span>
          <ExternalLink size={13} className={styles.externalIcon} />
        </a>

        <Button
          id="copy-btn"
          variant={copied ? 'default' : 'outline'}
          size="sm"
          onClick={handleCopy}
          className={copied ? styles.copiedBtn : styles.copyBtn}
          aria-label={copied ? 'Copied!' : 'Copy short URL to clipboard'}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </Button>
      </div>

      <Button
        id="shorten-another-btn"
        variant="ghost"
        size="sm"
        onClick={onReset}
        className={styles.resetBtn}
        aria-label="Shorten another URL"
      >
        <RotateCcw size={13} />
        Shorten another URL
      </Button>
    </div>
  )
}
