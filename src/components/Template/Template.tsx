import styles from './styles/Template.module.css'
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import RenderTable from '../../pages/RenderTable/RenderTable'

export default function Template() {
  const location = useLocation().pathname

  return (
      <RenderTable collection={location}/>
  )
}