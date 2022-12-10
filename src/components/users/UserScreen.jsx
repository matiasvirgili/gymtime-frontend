import React, {useEffect} from 'react';
import { UserList } from './UserList';
import styles from './UserScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { UserForm } from './UserForm';
import { getUsersAsync, setCreateAction } from '../../redux/actions/usersAction';

export const UserScreen = () => {
  const dispatch = useDispatch();
  const {
    list: users,
    isLoading,
    actionInProgress,
    selectedUser,
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };
  
  useEffect(()=>{
    dispatch(getUsersAsync());
  }, [])

  return (
    <div>
      <h2>Users</h2>
      {
        credentials.user &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New User
        </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <UserForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete user={selectedUser} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.users}>
        <UserList users={users}/>
      </div>
    </div>
  );
};
