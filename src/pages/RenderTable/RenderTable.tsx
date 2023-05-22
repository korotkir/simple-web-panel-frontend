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
import { useNavigate } from 'react-router-dom';

const options: MUIDataTableOptions = {
  filterType: 'checkbox',
  elevation: 0,
  download: false,
  print: false,
  viewColumns: false,
  tableBodyHeight: '55vh',
  textLabels: {
    body: {
      noMatch: "Таблица пуста. Создайте новую запись для начала работы.",
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

interface FieldData {
  name: string,
  type: string
}

interface FormValues {
  tableName: string,
  codeName: string,
  description: string,
  columnsCount: any,
  columnsNames: any,
  desc: string,
  field1: FieldData | any,
}

function RenderTable(props:any) {
  const [loading, setLoading] = useState(true)
  let [columns, setColumns] = useState<any>([])
  let [data, setData] = useState([])
  let [tableName, setTableName] = useState('Без названия')
  let [renderData, setRenderData] = useState([])
  let [emptyTable, setEmptyTable] = useState('')
  let [isModal, setModal] = useState(false)
  let [status, setStatus] = useState(0)
  let [tableDesc, setTableDesc] = useState<string>('')
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormValues>({
    tableName: '',
    codeName: '',
    description: '',
    columnsCount: '',
    columnsNames: 0,
    desc: '',
    field1: '',
  })
  
  useEffect(() => {
    const apiuUrl = process.env.REACT_APP_API_URL
    const apiPort = process.env.REACT_APP_API_PORT

    axios.post(
      `${apiuUrl}:${apiPort}/renderTable`, 
      {collection: props.collection},
      {headers: {'Content-Type': 'application/json'}}
    )
      .then((res) => {
        setLoading(true)
        setTableName(res.data[0].tableName)
        setTableDesc(res.data[0].description)
        setColumns(res.data[0].columnsNames)
        setEmptyTable(res.data[0].field1)
        setFormData((prev) => ({
          ...prev,
          tableName: res.data[0].tableName, 
          codeName: res.data[0].codeName,
          description: res.data[0].description,
          columnsCount: res.data[0].columnsCount,
          columnsNames: res.data[0].columnsNames,
        }))
        setData(res.data)
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {console.error(err)})

  }, [props.collection, status])

  const render = emptyTable !== '' ? data.map(obj => {return Object.values(obj).filter((value, index) => index > 6 && index < 13)}) : []

  const showModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  // Обработчики формы создания записи
  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = event.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleSubmitRecordToDB = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const codeName = formData.codeName
    const apiUrl = process.env.REACT_APP_API_URL
    const apiPort = process.env.REACT_APP_API_PORT
    
    axios.post(
      `${apiUrl}:${apiPort}/newRecord`, 
      formData,
      {headers: {'Content-Type': 'application/json'}}
    )
      .then((res) => {
        setStatus((prev) => prev + 1)
        setFormData({
          tableName: '',
          codeName: '',
          description: '',
          columnsCount: '',
          columnsNames: 0,
          desc: '',
          field1: '',
        })
        closeModal()
      })
      .catch((err) => {
        // Если ошибка отрисовываем заглушку (500) 
        // или алертим что коллекция с таким именем уже существует
        console.error(err)
      })
  
  }

  const DataTable = () => (
    <div className={styles.Categories}>
      <div className={styles.TemplateHeader}>
      <div className={styles.Top}>
          <h1 className={styles.PageTitle}>{tableName}</h1>
          <SmallButton onClick={showModal}>Создать запись</SmallButton>
      </div>
          <PageInformation records={data.length} description={tableDesc} />
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
          
          <form className={styles.Form} onSubmit={handleSubmitRecordToDB}>
            {
              columns.map((el:any, key:any) => {
                return (
                  <label key={key}>
                    <span className={styles.LabelSpan}>
                      <b>{key + 1}. {el}</b>
                    </span>
                    <textarea 
                      name={`field${key + 1}`}
                      value={formData[`field${key + 1}` as keyof FormValues]}
                      onChange={handleChangeForm} 
                    />
                  </label>
                )
              })
            }
            <div className={styles.submitButton}>
            <BigButton type="submit">Создать</BigButton>
          </div>
          </form>
          
      </ModalWindow>
    </div>
  )
}

export default RenderTable