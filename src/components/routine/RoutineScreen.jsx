import React, { useEffect } from 'react';
import { RoutineList } from './RoutineList';
import styles from './RoutineScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { RoutineForm } from './RoutineForm';
import {
  getRoutineAsync,
  getRoutineWithUserIdAsync,
  setCreateAction as setCreateActionRoutine,
} from '../../redux/actions/routineAction';
import { getPermissionsWithRoleAsync } from '../../redux/actions/permissionAction';

export const RoutineScreen = () => {
  const dispatch = useDispatch();
  const {
    list: routines,
    isLoading,
    actionInProgress,
    selectedRoutine,
  } = useSelector((state) => state.routines);


  const { permissionUser } = useSelector(
    (state) => state.permissions
  );
  let permissionsConvert 
  if(permissionUser != null){
    permissionsConvert  = permissionUser[0]
  }

  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateActionRoutine());
  };

  useEffect(() => {
      if(permissionsConvert?.routinesView && permissionsConvert?.routinesAction) {
        dispatch(getRoutineAsync())
      }
      if(permissionsConvert?.routinesView && !permissionsConvert?.routinesAction) {
        const actuallyUserLogged = JSON.parse(localStorage.getItem('user')) 
        dispatch(getRoutineWithUserIdAsync(actuallyUserLogged?._id))
      }
      if(permissionsConvert== null){
        const user = JSON.parse(localStorage.getItem('user')) 
        dispatch(getPermissionsWithRoleAsync(user?.permissionRole))
      }
  }, [permissionsConvert]);
  
  return (
    <div>
      <h2>Routines</h2>
        
      {(credentials.user && permissionsConvert?.routinesAction) &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New Routine
        </button>
      } 
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <RoutineForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete routine={selectedRoutine} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.routines}>
        <RoutineList routines={routines}/>
      </div>
    </div>
  );
};
