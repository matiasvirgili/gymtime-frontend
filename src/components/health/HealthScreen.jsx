import React, {useEffect} from 'react';
import { HealthList } from './HealthList';
import styles from './HealthScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CONSULT, CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { HealthForm } from './HealthForm';
import { 
  getHealthsAsync, 
  getHealthsWithUserIdAsync, 
  setCreateAction 
} from '../../redux/actions/healthAction';
import { getPermissionsWithRoleAsync } from '../../redux/actions/permissionAction';

export const HealthScreen = () => {
  const dispatch = useDispatch();
  const {
    list: healths,
    isLoading,
    actionInProgress,
    selectedHealth,
  } = useSelector((state) => state.healths);
  
  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };
  
  const { permissionUser } = useSelector(
    (state) => state.permissions
  );
  let permissionsConvert 
  if(permissionUser != null){
    permissionsConvert  = permissionUser[0]
  }

  useEffect(()=>{
    if(permissionsConvert?.healthsView && permissionsConvert?.healthsAction) {
      dispatch(getHealthsAsync());
    }
    if(permissionsConvert?.healthsView && !permissionsConvert?.healthsAction) {
      const actuallyUserLogged = JSON.parse(localStorage.getItem('user')) 
      dispatch(getHealthsWithUserIdAsync(actuallyUserLogged?._id));
    }
    if(permissionsConvert== null){
      const user = JSON.parse(localStorage.getItem('user')) 
      dispatch(getPermissionsWithRoleAsync(user?.permissionRole))
    }
}, [permissionsConvert]);

  return (
    <div>
      <h2>Healths</h2>
      {(credentials.user && permissionsConvert?.healthsAction) &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New Health
        </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE || actionInProgress === CONSULT) && (
        <HealthForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete health={selectedHealth} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.healths}>
        <HealthList healths={healths} />
      </div>
    </div>
  );
};
