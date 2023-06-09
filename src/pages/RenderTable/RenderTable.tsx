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
import { TrashOutline } from 'react-ionicons'
import { useDispatch } from 'react-redux';
import { deletedCategories } from '../../reducers/componentTransferReducer';


interface FieldData {
  name: string,
  type: string
}

interface FormValues {
  date: any,
  tableName: string,
  codeName: string,
  description: string,
  columnsCount: any,
  columnsNames: any,
  desc: string,
  field1: FieldData | any,
}

interface Data {
  "_id": string,
  "field1": string
}

function RenderTable(props:any) {
  const apiUrl = process.env.REACT_APP_API_URL
  const apiPort = process.env.REACT_APP_API_PORT
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  let [columns, setColumns] = useState<any>([])
  let [data, setData] = useState<Data[]>([])
  let [tableName, setTableName] = useState('Без названия')
  let [renderData, setRenderData] = useState([])
  let [emptyTable, setEmptyTable] = useState('')
  let [isModal, setModal] = useState(false)
  let [status, setStatus] = useState(0)
  let [tableDesc, setTableDesc] = useState<string>('')
  let [codeName, setCodeName] = useState<string>('')
  const [deleteCollectionWarning, setDeleteCollectionWarning] = useState<boolean>(false)
  
  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    elevation: 0,
    download: false,
    print: false,
    viewColumns: false,
    tableBodyHeight: '55vh',
    onRowsDelete: onRowsDelete,
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
      selectedRows: {
        text: "выделена (-ы)",
        delete: "Удалить",
        deleteAria: "Удалить выделенные строки",
      },
    }
  };

  function onRowsDelete(rowsDeleted:any) {
    const deletedIds = rowsDeleted.data.map((row:any) => row.dataIndex + 1);
    console.log("Удаленные идентификаторы:", deletedIds);

    deletedIds.forEach((deletedIndex: number) => {
      const deletedRecord = data[deletedIndex];
      const deletedRecordID = deletedRecord._id;
      
      axios.post(
        `${apiUrl}:${apiPort}/deleteRecord`, 
        {tableName: codeName, recordID: deletedRecordID},
        {headers: {'Content-Type': 'application/json'}}
      )
        .then((res) => {})
        .catch((err) => {console.error(err)})
      // Здесь вы можете выполнить запрос на удаление записи из коллекции MongoDB,
      // используя полученный идентификатор deletedRecordId
    });
  }

  const [formData, setFormData] = useState<FormValues>({
    date: undefined,
    tableName: '',
    codeName: '',
    description: '',
    columnsCount: '',
    columnsNames: 0,
    desc: '',
    field1: '',
  })
  
  useEffect(() => {

    axios.post(
      `${apiUrl}:${apiPort}/renderTable`, 
      {collection: props.collection},
      {headers: {'Content-Type': 'application/json'}}
    )
      .then((res) => {
        console.log(res.data[0])
        setLoading(false)
        setCodeName(res.data[0].codeName)
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
        //setLoading(false)
      })
      .catch((err) => {console.error(err)})

  }, [props.collection, status])
  console.log(data)
  const render = data.filter((el, i) => el.field1 !== '').map(obj => {return Object.values(obj).filter((value, index) => index > 7 && index < 14)})

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
    
    axios.post(
      `${apiUrl}:${apiPort}/newRecord`, 
      {...formData, date: new Date()},
      {headers: {'Content-Type': 'application/json'}}
    )
      .then((res) => {
        setStatus((prev) => prev + 1)
        setFormData({
          date: undefined,
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

  const handleRemoveCollection = () => {
    console.log(codeName)

    axios.post(
      `${apiUrl}:${apiPort}/removeCollection`, 
      {codeName},
      {headers: {'Content-Type': 'application/json'}}
    )
      .then((res) => {
        dispatch(deletedCategories(codeName))
        navigate('/main')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const DeleteCollectionModal = () => {
    return (
      <ModalWindow open={deleteCollectionWarning}>
        <h2>Удалить коллекцию "{tableName}" ?</h2>
        <div className={styles.ButtonBlock}>
          <SmallButton onClick={() => setDeleteCollectionWarning(false)}>Отмена</SmallButton>
          <SmallButton onClick={handleRemoveCollection}>Удалить</SmallButton>
        </div>
      </ModalWindow>
    )
  }

  const DataTable = () => (
    <div className={styles.Categories}>
      <div className={styles.TemplateHeader}>
      <div className={styles.Top}>
          <div className={styles.PagesTitleBlock}>
            <h1 className={styles.PageTitle}>
              {tableName}
            </h1>
            <a className={styles.Trash} onClick={() => setDeleteCollectionWarning(true)}>
              <TrashOutline  color="gray" width={'20px'} />
            </a>
          </div>
          
          <SmallButton onClick={showModal}>Создать запись</SmallButton>
      </div>
          <PageInformation records={data.length - 1} description={tableDesc} />
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
      <DeleteCollectionModal />
    </div>
  )
}

export default RenderTable