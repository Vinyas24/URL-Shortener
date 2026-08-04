import { useState } from 'react'
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
    <div className={styles.root}>

      <Navbar transparent />

      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <main className={styles.main}>
        <div className={`container ${styles.content}`}>

          <div className={styles.header}>
            <h1 className={styles.title}>
              Shorten a <span className="gradient-text">URL</span>
            </h1>
            <p className={styles.subtitle}>
              Paste your long link below and get a clean short URL instantly.
            </p>
          </div>

          <div className={`glass ${styles.card}`}>
            <UrlForm
              onSubmit={(url, customCode) => shorten(url, customCode)}
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

        </div>
      </main>

      <Toast message="Copied to clipboard!" visible={toastVisible} />
    </div>
  )
}
