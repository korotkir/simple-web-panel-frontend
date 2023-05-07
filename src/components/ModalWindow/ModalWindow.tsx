import Modal from 'react-modal'
import SmallButton from '../../UI/Buttons/SmallButton/SmallButton';
import styles from './styles/ModalWindow.module.css'

export default function ModalWindow(props:any) {
  const customStyles = {
    content: {
      top: '40%',
      left: '60%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={props.open}
      ariaHideApp={false}
      style={customStyles}
    >
      {props.children}
    </Modal>
  )
}