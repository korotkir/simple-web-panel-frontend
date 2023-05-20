import styles from './styles/PageInformation.module.css'

export default function PageInformation(props: { records:number, description:string }) {
  return (
    <div className={styles.PageInformation}>
        <div className={styles.RecordsCount}>
          <div className={styles.Records}>{props.records}</div>
          <div className={styles.RecordsTitle}>Записей</div>
        </div>
        <div className={styles.Separator} />
        {/* <div className={styles.CategoriesCount}>
          <div className={styles.Categories}>{props.categories}</div>
          <div className={styles.CategoriesTitle}>Категорий</div>
        </div> */}
        <div className={styles.TableDescription}>
          <p>{props.description || 'Описание отсутствует'}</p>
        </div>

      </div>
  )
}