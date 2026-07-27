import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import styles from '../styles/Toast.module.css'

export default function Toast({ message, visible }) {
  const [shouldRender, setShouldRender] = useState(visible)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), 350)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!shouldRender) return null

  return (
    <div
      className={`${styles.toast} ${visible ? styles.toastIn : styles.toastOut}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon}><Check size={15} /></span>
      <span>{message || 'Copied to clipboard!'}</span>
    </div>
  )
}
