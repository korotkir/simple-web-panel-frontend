import styles from './styles/UserCard.module.css'

export default function UserCard(props: {username:string, employers:string, avatar:any}) {
  return (
    <div className={styles.UserCard}>
              <div className={styles.UserAvatar}>
                <img src={props.avatar} width={80} height={80} />
              </div>
              <div className={styles.UserName}>{props.username}</div>
              <div className={styles.Employers}>{props.employers}</div>
            </div>
  )
}