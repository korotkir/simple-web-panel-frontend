import { Information } from 'react-ionicons'
import styles from './styles/News.module.css'
import PageInformation from '../../components/PageInformation/PageInformation'
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '.././../UI/Loader/Loader'

const options: MUIDataTableOptions = {
  filterType: 'checkbox',
  elevation: 0,
  download: false,
  print: false,
  viewColumns: false,
  tableBodyHeight: '50%',
};

function News() {
  const [loading, setLoading] = useState(true)
  let [columns, setColumns] = useState<any>({})
  let [data, setData] = useState([])
  let [tableName, setTableName] = useState('Без названиея')
  let [renderData, setRenderData] = useState([])
  
  useEffect(() => {
    axios.get('http://80.87.110.126:3000/test2')
      .then((res) => {
        setTableName(res.data[0].collectionName)

        setColumns(res.data[0].columnsNames)

        setData(res.data)

        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [])

  const DataTable = () => (
    <div className={styles.Categories}>
      <div className={styles.TemplateHeader}>
          <h1 className={styles.PageTitle}>{tableName}</h1>
          <PageInformation records={data.length} categories={0} />
        </div>  
        <div className={styles.Table}>
          <MUIDataTable
              title={""}
              data={
                data.map(obj => {
                  return Object.values(obj).filter((value, index) => index >= 5 && index <= 7);
              })}
              columns={columns}
              options={options}
            />
        </div>
    </div>
  )

  return (
    <div className={styles.Container}>
      { loading ? <Loader /> : <DataTable /> }  
    </div>
  )
}

export default News