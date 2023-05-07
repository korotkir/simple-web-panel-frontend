import { HomeOutline, DocumentOutline, SettingsOutline, AddOutline, LogOutOutline } from 'react-ionicons'
import { Link, NavLink } from 'react-router-dom'
import styles from './styles/NavList.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function NavList(props: {pages: Array<any>}) {

  const renderIcon = (element:any, active:boolean) => {
    switch(element.icon) {
      case 'home':
        return <HomeOutline width="24px" height="24px" color={active ? "white" : "black"} />
      case 'settings':
        return <SettingsOutline width="24px" height="24px" color={active ? "white" : "black"} />
      case 'add':
        return <AddOutline width="24px" height="24px" color={active ? "white" : "black"} />
      default:
        return <DocumentOutline width="24px" height="24px" color={active ? "white" : "black"} />
    }
  }

  return (
      <ul className={styles.NavList}>
        {
          props.pages.map((el,key) => {
            return (
              <li key={key}>
                <NavLink 
                  to={el.link}
                  className={({isActive}) => isActive ? styles.NavItemActive : styles.NavItem}
                  children={({isActive}) => {
                    return (
                      <>
                        {renderIcon(el, isActive)}
                        <span className={styles.NavTitle}>{el.title}</span>
                      </>
                    )  
                  }} 
                />
            </li>
            )
          })
        }
      </ul>
  )
}