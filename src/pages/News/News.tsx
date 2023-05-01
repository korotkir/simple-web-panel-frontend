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
  
  useEffect(() => {
    axios.get('http://80.87.110.126:3000/posts')
      .then((res) => {

        setColumns(Object.keys(res.data[0]).filter(el => el != '_id'))

        const filterData = res.data.map((element: any) => {
          delete element["_id"]
          return element
        })

        setData(filterData)

        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [])

  const DataTable = () => (
    <div className={styles.Categories}>
      <div className={styles.TemplateHeader}>
          <h1 className={styles.PageTitle}>Новости</h1>
          <PageInformation records={data.length} categories={0} />
        </div>  
        <div className={styles.Table}>
          <MUIDataTable
              title={""}
              data={
                data.map((el) => {
                  return [...Object.values(el)]
                })
              }
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