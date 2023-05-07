import Modal from 'react-modal'
import SmallButton from '../../UI/Buttons/SmallButton/SmallButton';
import BigButton from '../../UI/Buttons/BigButton/BigButton';
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
      //onAfterOpen={afterOpenModal}
      style={customStyles}
    >
      <div className={styles.Header}>
        <h2>Создать запись</h2>
        <SmallButton onClick={props.closeModal} width={"30px"}>X</SmallButton>
      </div>
      <form className={styles.Form}>
     
        <label>
          <span className={styles.LabelSpan}>ФИО:</span>
          <textarea name='name' />
        </label>
      
      <BigButton>Создать</BigButton>
      </form>
    </Modal>
  )
}