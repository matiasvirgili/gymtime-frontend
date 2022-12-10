import React, { useEffect } from 'react';
import { ExerciseRoutineList } from './ExerciseRoutineList';
import styles from './ExerciseRoutineScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE, COPY, DELETE_ALL } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { ExerciseRoutineForm } from './ExerciseRoutineForm';
import { ExerciseRoutineCopyForm } from './ExerciseRoutineCopyForm';
import {
  getExerciseWithRoutineIdAsync,
  setCopyAction,
  setCreateAction,
  setDeleteAllAction,
} from '../../redux/actions/exerciseRoutineAction';
import { NavLink } from 'react-router-dom';
import { ConfirmDeleteAll } from './ConfirmDeleteAll';

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
  const handleCopyRoutineClick = () => {
    dispatch(setCopyAction(selectedRoutine))
  }
  const handleDeleteAllClick = () => {
    dispatch(setDeleteAllAction(selectedRoutine))
  }
  
  useEffect(() => {
    if (!selectedRoutine?._id) {
      location.href="/routines"
    } else{
      dispatch(getExerciseWithRoutineIdAsync(selectedRoutine?._id));
    }
  }, []);
  
  const { permissionUser } = useSelector(
    (state) => state.permissions
  );
  let permissionsConvert 
  if(permissionUser != null){
    permissionsConvert  = permissionUser[0]
  }

  return (
    <div>
      <div className={styles.topButtons}>
        <div>
          <NavLink to="/routines" className={styles.link}>
            <button className={styles.backButton}>
              Return
            </button>
          </NavLink>

          {(credentials.user && permissionsConvert?.routinesAction) &&
            <button className={styles.newButton} onClick={handleAddClick}>
              New Excercise
            </button>
          } 
        </div>
        <div>
          {(credentials.user && permissionsConvert?.routinesAction) &&
            <button className={styles.copyButton} onClick={handleCopyRoutineClick}>
              Copy routines
            </button>
          } 
          {(credentials.user && permissionsConvert?.routinesAction) &&
            <button className={styles.deleteButton} onClick={handleDeleteAllClick}>
              Delete all exercises
            </button>
          } 
        </div>
      </div>

      <h2>Routines</h2>
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <ExerciseRoutineForm />
      )}
      {(actionInProgress === COPY) && (
        <ExerciseRoutineCopyForm exerciseRoutines={exerciseRoutines}/>
      )}
      {(actionInProgress === DELETE_ALL) && (
        <ConfirmDeleteAll />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete exerciseRoutine={selectedExerciseRoutine} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.exerciseRoutine}>
        <ExerciseRoutineList exerciseRoutines={exerciseRoutines}/>
      </div>
    </div>
  );
};
