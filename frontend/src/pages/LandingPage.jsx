import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '../components/Navbar'
import styles from '../styles/LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.root}>

      <Navbar transparent />

      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />
      <div className={styles.blob4} aria-hidden="true" />

      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <main className={styles.hero}>
        <div className={styles.inner}>

          <h1 className={styles.headline}>
            <span className={styles.line1}>Paste long.</span>
            <span className={styles.line2}>
              Get&nbsp;<span className={styles.accent}>short.</span>
            </span>
          </h1>

          <p className={styles.sub}>
            Turn any URL into a clean, shareable link in seconds.
            <br className={styles.br} />
            No account needed. No friction.
          </p>

          <div className={styles.actions}>
            <Button asChild className={styles.cta} id="hero-cta">
              <Link to="/app">
                Shorten your link 
              </Link>
            </Button>
          </div>

        </div>
      </main>

    </div>
  )
}
