import styles from './styles/Template.module.css'
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import RenderTable from '../../pages/RenderTable/RenderTable'
import NotFound from '../../pages/NotFound/NotFound';
import { useSelector } from 'react-redux';

export default function Template() {
  const routes = useSelector((state: any) => state.transfer.menuElements)
  const links = routes.map((el:any) => el.link)
  const location = useLocation().pathname
  const collection = location.replace(new RegExp("/simple-web-panel-frontend"), '')

  return (
      links.includes(location) ? <RenderTable collection={collection}/> : <NotFound />
  )
}