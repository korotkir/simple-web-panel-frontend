import { Information } from 'react-ionicons'
import styles from './styles/News.module.css'
import PageInformation from '../../components/PageInformation/PageInformation'
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import axios from 'axios';
import { useEffect, useState } from 'react';

// const columns = ["Название", "Категория", "Дата публикации", "Текст"];

// const data = [
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston", "Test Corp", "Dallas", "TX"],
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston", "Test Corp", "Dallas", "TX"],
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston", "Test Corp", "Dallas", "TX"],
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston", "Test Corp", "Dallas", "TX"],
// ];

// const options: MUIDataTableOptions = {
//   filterType: 'checkbox',
//   elevation: 0,
//   download: false,
//   print: false,
//   viewColumns: false,
// };

const options = {
  filterType: 'checkbox',
  elevation: 0,
  download: false,
  print: false,
  viewColumns: false,
  tableBodyHeight: '50%',
};

function News() {
  const [loading, setLoading] = useState(true)
  let [columns, setColumns] = useState({})
  let [data, setData] = useState([])
  
  useEffect(() => {
    axios.get('http://80.87.110.126:3000/posts')
      .then((res) => {

        setColumns(Object.keys(res.data[0]))

        setData(res.data)
        
        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div className={styles.Container}>
      <div className={styles.Categories}>
        <div className={styles.TemplateHeader}>
          <h1 className={styles.PageTitle}>Новости</h1>
          <PageInformation records={20} categories={5} />
        </div>  
        <div className={styles.Table}>
          {
            !loading &&
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
            
          }
          
        </div>
          
        
        
      
    </div>
  </div>
  )
}

export default News