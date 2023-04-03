import React from 'react'
import NavList from '../../components/NavList/NavList'
import styles from './styles/Sidebar.module.css'

import { LogOutOutline } from 'react-ionicons'

interface pages {
  title: string,
  icon: string,
  link: string,
}

function Sidebar() {

  const pages = [
    {title: 'Главная', icon: 'home', link: '/'},
    {title: 'Новости', icon: 'document', link: '/news'},
    {title: 'Новая категория', icon: 'add', link: '/new'},
    {title: 'Настройки', icon: 'settings', link: '/settings'},
  ]

  return (
    <div className={styles.Sidebar}>
      <div className={styles.Logo}>LOGO</div>
      
      <div className={styles.Nav}>
        <NavList pages={pages}/>
      </div>

        {/* <div className={styles.SignOut}>
            <LogOutOutline width="24px" height="24px" color="black" />
            <span className={styles.NavTitle}>Sign out</span>
        </div> */}
      
    </div>
  )
}

export default Sidebar