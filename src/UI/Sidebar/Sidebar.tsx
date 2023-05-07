import React from 'react'
import NavList from '../../components/NavList/NavList'
import styles from './styles/Sidebar.module.css'
import { useEffect, useState } from 'react'
import { LogOutOutline } from 'react-ionicons'
import axios from 'axios';
import { useSelector } from 'react-redux'

interface MenuElement {
  title: string,
  icon: string,
  link: string,
}

function Sidebar() {
  const pages: MenuElement[] = [
    {title: 'Главная', icon: 'home', link: '/'},
    //{title: 'Новости', icon: 'document', link: '/news'},
    {title: 'Настройки', icon: 'settings', link: '/settings'},
    {title: 'Новая категория', icon: 'add', link: '/new'},
  ]

  const [menuElements, setMenuElements] = useState<MenuElement[]>([])

  const categoryList = useSelector((state: any) => state.transfer.categoryList)

  useEffect(() => {
    axios.get('http://80.87.110.126:3000/collectionList')
    .then((res) => {
      const loadData: MenuElement[] = res.data.map((el: any, index: number, arr: any) => {
        const keys:any = Object.keys(el)
        const icon = 'document'
        const link = el[keys]
        return {title: el[keys], icon, link: `/${keys[0]}`} 
      })

      setMenuElements(() => [...pages, ...loadData])
    })
    .catch(err => console.log(err))
  }, [categoryList])

  return (
    <div className={styles.Sidebar}>
      <div className={styles.Logo}>LOGO</div>
      
      <div className={styles.Nav}>
        <NavList pages={menuElements}/>
      </div>

        {/* <div className={styles.SignOut}>
            <LogOutOutline width="24px" height="24px" color="black" />
            <span className={styles.NavTitle}>Sign out</span>
        </div> */}
      
    </div>
  )
}

export default Sidebar