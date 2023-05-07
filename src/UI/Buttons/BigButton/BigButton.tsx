import styles from './styles/BigButton.module.css'

export default function BigButton(props:any) {
  return (
    <button
      className={styles.BigButton}
      disabled={props.disabled || false}
      type={props.type}
    >Создать страницу</button>
  )
}