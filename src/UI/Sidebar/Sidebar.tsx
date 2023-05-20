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
    {title: 'Настройки', icon: 'settings', link: '/settings'},
    {title: 'Новая категория', icon: 'add', link: '/new'},
  ]

  const [menuElements, setMenuElements] = useState<MenuElement[]>([])

  const categoryList = useSelector((state: any) => state.transfer.categoryList)

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL
    const apiPort = process.env.REACT_APP_API_PORT

    console.log(`${apiUrl}:${apiPort}/collectionList`)

    axios.get(`${apiUrl}:${apiPort}/collectionList`)
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
    </div>
  )
}

export default Sidebar