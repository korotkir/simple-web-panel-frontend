import styles from './styles/SmallButton.module.css'

export default function SmallButton(props:any) {
  return (
    <button 
      className={styles.SmallButton}
      style={{width: props.width || '120px'}}
      onClick={props.onClick}
      disabled={props.fields?.length > 5 ? true : false || false}
      >
        {props.children}
    </button>
  )
}