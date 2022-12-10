import React, { useEffect } from 'react';
import { ExerciseList } from './ExerciseList';
import styles from './ExerciseScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { ExerciseForm } from './ExerciseForm';
import {
  getExercisesAsync,
  setCreateAction,
} from '../../redux/actions/exercisesAction';

export const ExerciseScreen = () => {
  const dispatch = useDispatch();
  const {
    list: exercises,
    isLoading,
    actionInProgress,
    selectedExercise,
  } = useSelector((state) => state.exercises);

  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };

  useEffect(() => {
    dispatch(getExercisesAsync());
  }, []);
  
  return (
    <div>
      <h2>Exercises</h2>
      {
        credentials.user &&
        <button className={styles.newButton} onClick={handleAddClick}>
        New Exercise
      </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <ExerciseForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete exercise={selectedExercise} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.exercises}>
        <ExerciseList exercises={exercises} />
      </div>
    </div>
  );
};
