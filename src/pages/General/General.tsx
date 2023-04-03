import styles from './styles/General.module.css'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import defaultAvatar from './image/default_avatar.png'
import Pen from './image/pen.svg'
import User1 from './image/user1.png'
import User2 from './image/user2.png'
import UserCard from '../../UI/UserCard/UserCard';

function General() {
  return (
    <div className={styles.Container}>
      <div className={styles.WorkspaceInfo}>
        <div className={styles.Header}>
            <div className={styles.Avatar}>
              <img width={140} height={140} src={defaultAvatar} alt="" />
            </div>
            <div className={styles.Title}>
              <EditText 
                style={{fontSize: '42px', fontWeight: 700}} 
                defaultValue='Workspace name' 
                editButtonContent={<img style={{marginTop: '7px', marginLeft: '16px'}} src={Pen} alt="edit" />}
                showEditButton/>
            </div>
        </div>
        <div className={styles.Users}>
          <div className={styles.UsersTitle}>Workspace users</div>
          <div className={styles.UsersCards}>
            <UserCard username='Иван Иванов' employers='Депутат' avatar={User1}/>
            <UserCard username='Ксения Петрова' employers='Маркетолог' avatar={User2}/>
          </div>
        </div>
        <div className={styles.Settings}></div>
      </div>
    </div>
  )
}

export default General