import { Link } from 'react-router-dom'
import { ArrowRight, Link2, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import styles from '../styles/LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.root}>
      <Navbar />

      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={`container ${styles.grid}`}>

          <div className={styles.copy}>
            <div className={styles.tag}>
              <Link2 size={12} />
              <span>URL Shortener</span>
            </div>

            <h1 className={styles.headline}>
              Paste long.<br />
              <span className={styles.accent}>Get short.</span>
            </h1>

            <p className={styles.sub}>
              Turn any URL into a clean, shareable link in one click.
              No account. No friction.
            </p>

            <Link to="/app" className={styles.cta} id="hero-cta">
              Start for free
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.visual}>
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.card}>
              <div className={styles.cardSection}>
                <span className={styles.cardLabel}>Before</span>
                <span className={styles.cardLong}>
                  https://some-very-long-website.com/blog/article/how-to-make-urls-shorter
                </span>
              </div>

              <div className={styles.cardMid}>
                <div className={styles.midLine} />
                <span className={styles.midIcon}><Zap size={14} /></span>
                <div className={styles.midLine} />
              </div>

              <div className={styles.cardSection}>
                <span className={`${styles.cardLabel} ${styles.cardLabelAfter}`}>After</span>
                <span className={styles.cardShort}>snip.lk/<strong>WDFZIz</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span className={styles.footerBrand}>Sniplink</span>
          <span className={styles.footerCopy}>Built with Spring Boot + React</span>
        </div>
      </footer>
    </div>
  )
}
