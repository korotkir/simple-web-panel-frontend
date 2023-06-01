import React from 'react'
import NavList from '../../components/NavList/NavList'
import styles from './styles/Sidebar.module.css'
import { useEffect, useState } from 'react'
import { LogOutOutline } from 'react-ionicons'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addMenuElements } from '../../reducers/componentTransferReducer';

interface MenuElement {
  title: string,
  icon: string,
  link: string,
}

function Sidebar() {
  const dispatch = useDispatch()
  const categoryList = useSelector((state: any) => state.transfer.categoryList)
  const deletedCategories = useSelector((state: any) => state.transfer.deletedCategories)
  // перписать на useState
  const linksList = useSelector((state: any) => state.transfer.menuElements)
  

  const pages: MenuElement[] = [
    {title: 'Главная', icon: 'home', link: '/main'},
    {title: 'Новая категория', icon: 'add', link: '/new'},
  ]

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL
    const apiPort = process.env.REACT_APP_API_PORT

    axios.get(`${apiUrl}:${apiPort}/collectionList`)
    .then((res) => {
      const loadData: MenuElement[] = res.data.map((el: any, index: number, arr: any) => {
        const keys:any = Object.keys(el)
        const icon = 'document'
        const link = el[keys]
        return {title: el[keys], icon, link: `/${keys[0]}`} 
      })
      dispatch(addMenuElements([...pages, ...loadData]))
    })
    .catch(err => console.log(err))
  }, [categoryList, deletedCategories])

  return (
    <div className={styles.Sidebar}>
      <div className={styles.Logo}>SWP</div>
      <div className={styles.Nav}>
        <NavList pages={linksList}/>
      </div>
    </div>
  )
}

export default Sidebar