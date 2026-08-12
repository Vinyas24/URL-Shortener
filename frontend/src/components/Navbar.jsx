import { Link, useLocation } from 'react-router-dom'
import { Scissors, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import styles from '../styles/Navbar.module.css'

export default function Navbar({ transparent = false }) {
  const { pathname } = useLocation()
  const isApp = pathname === '/app'

  return (
    <nav
      className={`${styles.nav} ${transparent ? styles.navTransparent : styles.navSolid}`}
      aria-label="Main navigation"
    >
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="ShortURL home">
          <span className={styles.logoIcon}>
            <Scissors size={27} />
          </span>
          <span className={styles.logoText}>ShortURL</span>
        </Link>

        <div className={styles.actions}>
          {!isApp && (
            <Button
              asChild
              size="sm"
              className={transparent ? styles.ctaTransparent : ''}
              id="nav-get-started"
            >
              <Link to="/app">Get Started</Link>
            </Button>
          )}
          {isApp && (
            <Button asChild variant="ghost" size="sm" id="nav-home">
              <Link to="/">
                <ArrowLeft size={15} />
                Home
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
