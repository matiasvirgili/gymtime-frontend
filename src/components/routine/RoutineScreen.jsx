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
  setCreateAction as setCreateActionRoutine,
} from '../../redux/actions/routineAction';

export const RoutineScreen = () => {
  const dispatch = useDispatch();
  const {
    list: routines,
    isLoading,
    actionInProgress,
    selectedRoutine,
  } = useSelector((state) => state.routines);

  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateActionRoutine());
  };

  useEffect(() => {
    dispatch(getRoutineAsync());
  }, []);
  
  return (
    <div>
      <h2>Routines</h2>
        
      {credentials.user &&
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
      <RoutineList routines={routines}/>
    </div>
  );
};
