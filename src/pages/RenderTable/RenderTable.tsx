import { Information } from 'react-ionicons'
import styles from './styles/RenderTable.module.css'
import PageInformation from '../../components/PageInformation/PageInformation'
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../../UI/Loader/Loader'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import SmallButton from '../../UI/Buttons/SmallButton/SmallButton';
import BigButton from '../../UI/Buttons/BigButton/BigButton';

const options: MUIDataTableOptions = {
  filterType: 'checkbox',
  elevation: 0,
  download: false,
  print: false,
  viewColumns: false,
  tableBodyHeight: '55vh',
  textLabels: {
    body: {
      noMatch: "Таблица пуста. Создайте новую запись для начала работы :)",
      toolTip: "Сортировка",
      columnHeaderTooltip: column => `Sort for ${column.label}`
    },
    pagination: {
      next: "Следующая страница",
      previous: "Предыдущая страница",
      rowsPerPage: "Показывать по:",
      displayRows: "из",
    },
  }
};

function RenderTable(props:any) {
  const [loading, setLoading] = useState(true)
  let [columns, setColumns] = useState<any>([])
  let [data, setData] = useState([])
  let [tableName, setTableName] = useState('Без названия')
  let [renderData, setRenderData] = useState([])
  let [emptyTable, setEmptyTable] = useState('')
  let [isModal, setModal] = useState(false)

  const [formData, setFormData] = useState({})
  
  useEffect(() => {
    axios.post(
      'http://80.87.110.126:3000/renderTable', 
      {collection: props.collection},
      {headers: {'Content-Type': 'application/json'}}
    )
      .then((res) => {
        setLoading(true)
        console.log('Данные с сервера: ', res)
        setTableName(res.data[0].tableName)
        setColumns(res.data[0].columnsNames)
        setEmptyTable(res.data[0].field1)
        setFormData({
          tableName: res.data[0].tableName, 
          codeName: res.data[0].codeName,
          description: res.data[0].description,
          columnsCount: res.data[0].columnsCount,
          columnsNames: res.data[0].columnsNames,
        })
        setData(res.data)
        setLoading(false)

        console.log('formData:', formData)
      })
      .catch((err) => {console.error(err)})

  }, [props.collection])

  const render = emptyTable !== '' ? data.map(obj => {return Object.values(obj).filter((value, index) => index >= 6 && index <= 12)}) : []

  const showModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  // Обработчики формы создания записи
  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({...prev, field1: event.target.value}))
  }

  const handleSubmitRecordToDB = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Отправка формы на сервер: ', FormData)
  }

  const DataTable = () => (
    <div className={styles.Categories}>
      <div className={styles.TemplateHeader}>
      <div className={styles.Top}>
          <h1 className={styles.PageTitle}>{tableName}</h1>
          <SmallButton onClick={showModal}>Создать запись</SmallButton>
      </div>
          <PageInformation records={data.length} categories={0} />
        </div>  
        <div className={styles.Table}>
          <MUIDataTable
              title={""}
              data={render}
              columns={columns}
              options={options}
            />
        </div>
    </div>
  )

  return (
    <div className={styles.Container}>
      { loading ? <Loader /> : <DataTable /> }  
      <ModalWindow 
        open={isModal} 
      >
        <div className={styles.Header}>
          <h2>Создать запись</h2>
          <SmallButton onClick={closeModal} width={"30px"}>X</SmallButton>
        </div>
        <form className={styles.Form}>
          {
            columns.map((el:any, key:any) => {
              return (
                <label key={key}>
                  <span className={styles.LabelSpan}>
                    <b>{key + 1}. {el}</b>
                  </span>
                  <textarea 
                    name={`field${key+ 1}`}
                    // value={formData[`field${key + 1}` as keyof formData]}
                    onChange={handleChangeForm} 
                  />
                </label>
              )
            })
          }
        <BigButton type="submit" onClick={handleSubmitRecordToDB}>Создать</BigButton>
        </form>
      </ModalWindow>
    </div>
  )
}

export default RenderTable