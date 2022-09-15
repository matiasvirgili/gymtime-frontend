import React, { useEffect } from 'react';
import styles from './WorkoutEventScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { WorkoutEventForm } from './WorkoutEventForm';
import { WorkoutEventList } from './WorkoutEventList';
import {
  getWorkoutEventsAsync,
  setCreateAction,
} from '../../redux/actions/workoutEventAction';

export const WorkoutEventScreen = () => {
  const dispatch = useDispatch();
  const {
    list: workoutEvents,
    isLoading,
    actionInProgress,
    selectedWorkoutEvent,
  } = useSelector((state) => state.workoutEvents);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };

  useEffect(() => {
    dispatch(getWorkoutEventsAsync());
  }, []);

  return (
    <div>
      <h2>Workout Event</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New Workout Event
      </button>
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <WorkoutEventForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete workoutEvent={selectedWorkoutEvent} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <WorkoutEventList workoutEvents={workoutEvents} />
    </div>
  );
};
