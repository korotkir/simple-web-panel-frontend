import Modal from 'react-modal'

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
      contentLabel="Example Modal"
    >
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>Создать запись</h2>
        <button 
          style={{
            backgroundColor: '#357ebd', 
            color: 'white', 
            border: 'none',
            width: '20px',
            height: '20px',
          }} 
          onClick={props.closeModal}>X</button>
      </div>
      <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <label>
        <span style={{marginRight: '100px'}}>ФИО:</span>
        <textarea 
          //className={styles.Input}  
          name='name' 
        />
      </label>
      <label>
        <span style={{marginRight: '100px'}}>Пол:</span>
        <textarea 
          //className={styles.Input}  
          name='name'
        />
      </label>
      <label>
        <span style={{marginRight: '70px'}}>Возраст:</span>
        <textarea 
          //className={styles.Input}  
          name='name'
        />
      </label>
      <button 
          style={{
            backgroundColor: '#357ebd', 
            color: 'white', 
            border: 'none',
            width: '100px',
            height: '50px',
          }} 
          onClick={props.closeModal}>Создать</button>
      </form>
    </Modal>
  )
}