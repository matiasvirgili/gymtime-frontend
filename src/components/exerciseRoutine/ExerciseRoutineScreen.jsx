import React, { useEffect } from 'react';
import { ExerciseRoutineList } from './ExerciseRoutineList';
import styles from './ExerciseRoutineScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { ExerciseRoutineForm } from './ExerciseRoutineForm';
import {
  getExerciseWithRoutineIdAsync,
  setCreateAction,
} from '../../redux/actions/exerciseRoutineAction';
import { NavLink } from 'react-router-dom';

export const ExerciseRoutineScreen = () => {
  const dispatch = useDispatch();
 
  const {
    list: exerciseRoutines,
    isLoading,
    actionInProgress,
    selectedExerciseRoutine,
  } = useSelector((state) => state.exerciseRoutines);

  const {
    selectedRoutine,
  } = useSelector((state) => state.routines);

  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };
  
  useEffect(() => {
    if (!selectedRoutine?._id) {
      location.href="/routines"
    } else{
      dispatch(getExerciseWithRoutineIdAsync(selectedRoutine?._id));
    }
  }, []);
  
  return (
    <div>
      <h2>Routines</h2>
      <NavLink to="/routines" className={styles.link}>
        <button className={styles.backButton}>
          Return
        </button>
      </NavLink>
      {credentials.user &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New Excercise
        </button>
      } 
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <ExerciseRoutineForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete exerciseRoutine={selectedExerciseRoutine} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <ExerciseRoutineList exerciseRoutines={exerciseRoutines}/>
    </div>
  );
};
