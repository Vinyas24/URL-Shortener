import { Link, useLocation } from 'react-router-dom'
import { Scissors } from 'lucide-react'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const isApp = pathname === '/app'

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="Sniplink home">
          <span className={styles.logoIcon}><Scissors size={18} /></span>
          <span className={styles.logoText}>Sniplink</span>
        </Link>

        <div className={styles.actions}>
          {!isApp && (
            <Link to="/app" className="btn-primary" id="nav-get-started">
              Get Started
            </Link>
          )}
          {isApp && (
            <Link to="/" className="btn-ghost" id="nav-home">
              ← Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
