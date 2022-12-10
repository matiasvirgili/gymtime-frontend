import React, { useEffect } from 'react';
import { PermissionList } from './PermissionList';
import styles from './PermissionScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { PermissionForm } from './PermissionForm';
import { getPermissionsAsync, setCreateAction } from '../../redux/actions/permissionAction';

export const PermissionScreen = () => {
  const dispatch = useDispatch();
  const {
    list: permissions,
    isLoading,
    actionInProgress,
    selectedPermission,
  } = useSelector((state) => state.permissions);

  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };

  useEffect(() => {
    dispatch(getPermissionsAsync());
  }, []);

  return (
    <div>
      <h2>Permissions</h2>
      {
        credentials.user &&
      <button className={styles.newButton} onClick={handleAddClick}>
        New Permission
      </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <PermissionForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete permission={selectedPermission} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.permissions} >
        <PermissionList permissions={permissions}/>
      </div>
    </div>
  );
};
