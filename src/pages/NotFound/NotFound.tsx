import styles from './styles/NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.Container}>
      <p>К сожалению страница не найдена</p>
      <h1>404</h1>
    </div>
  )
}