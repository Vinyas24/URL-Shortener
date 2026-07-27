import { useState } from 'react'
import { Link2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import UrlForm from '../components/UrlForm'
import ResultCard from '../components/ResultCard'
import Toast from '../components/Toast'
import { useShorten } from '../hooks/useShorten'
import styles from '../styles/AppPage.module.css'

export default function AppPage() {
  const { status, shortUrl, errorMessage, fieldErrors, shorten, reset } = useShorten()
  const [toastVisible, setToastVisible] = useState(false)

  function handleCopied() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className={styles.main}>
        <div className={`container ${styles.content}`}>

          <div className={styles.header}>
            <div className={styles.iconBadge} aria-hidden="true">
              <Link2 size={28} />
            </div>
            <h1 className={styles.title}>
              Shorten a <span className="gradient-text">URL</span>
            </h1>
            <p className={styles.subtitle}>
              Paste your long link below and get a clean short URL instantly.
            </p>
          </div>

          <div className={`glass ${styles.card}`}>
            <UrlForm
              onSubmit={shorten}
              status={status}
              fieldErrors={fieldErrors}
              errorMessage={errorMessage}
            />

            {status === 'success' && (
              <div className={styles.resultWrapper}>
                <div className={styles.divider} aria-hidden="true" />
                <ResultCard
                  shortUrl={shortUrl}
                  onReset={reset}
                  onCopied={handleCopied}
                />
              </div>
            )}
          </div>

          <div className={styles.steps}>
            {[
              { n: '1', label: 'Paste your URL' },
              { n: '2', label: 'Click Shorten' },
              { n: '3', label: 'Share your link' },
            ].map(({ n, label }) => (
              <div key={n} className={styles.step}>
                <span className={styles.stepNum}>{n}</span>
                <span className={styles.stepLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Toast message="Copied to clipboard!" visible={toastVisible} />
    </div>
  )
}
