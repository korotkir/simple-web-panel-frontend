import styles from './styles/Sidebar.module.css'
import { HomeOutline, DocumentOutline, SettingsOutline, AddOutline, LogOutOutline } from 'react-ionicons'
import { Link, NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Logo}>LOGO</div>
      <div className={styles.Nav}>
      <ul className={styles.NavList}>
        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => isActive ? styles.NavItemActive : styles.NavItem}
            children={({isActive}) => {
              return (
                <>
                  <HomeOutline width="24px" height="24px" color={isActive ? "white" : "black"} />
                  <span className={styles.NavTitle}>General</span>
                </>
              )  
            }} 
          />
          </li>
        <li>
          <NavLink 
              to="/news" 
              className={({isActive}) => isActive ? styles.NavItemActive : styles.NavItem}
              children={({isActive}) => {
                return (
                  <>
                    <DocumentOutline width="24px" height="24px" color={isActive ? "white" : "black"} />
                    <span className={styles.NavTitle}>News</span>
                  </>
                )  
              }} 
            />
        </li>
        <li>
          <NavLink 
              to="/posts" 
              className={({isActive}) => isActive ? styles.NavItemActive : styles.NavItem}
              children={({isActive}) => {
                return (
                  <>
                    <DocumentOutline width="24px" height="24px" color={isActive ? "white" : "black"} />
                    <span className={styles.NavTitle}>News</span>
                  </>
                )  
              }} 
            />
        </li>
        <li>
          <NavLink 
              to="/settings" 
              className={({isActive}) => isActive ? styles.NavItemActive : styles.NavItem}
              children={({isActive}) => {
                return (
                  <>
                    <SettingsOutline width="24px" height="24px" color={isActive ? "white" : "black"} />
              <span className={styles.NavTitle}>Settings</span>
                  </>
                )  
              }} 
            />
        </li>
        <li>
          <NavLink 
              to="/new" 
              className={({isActive}) => isActive ? styles.NavItemActive : styles.NavItem}
              children={({isActive}) => {
                return (
                  <>
                      <AddOutline width="24px" height="24px" color={isActive ? "white" : "black"} />
                      <span className={styles.NavTitle}>Add Category</span>
                  </>
                )  
              }} 
            />
        </li>
        </ul>
        <div className={styles.SignOut}>
            <LogOutOutline width="24px" height="24px" color="black" />
            <span className={styles.NavTitle}>Sign out</span>
        </div>
      </div>
      
        
      
     
    </div>
  )
}

export default Sidebar