import styles from '../styles/Spinner.module.css'

export default function Spinner({ size = 18 }) {
  return (
    <span
      className={styles.spinner}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    />
  )
}
