import React, {useEffect} from 'react';
import { WorkoutEventsList } from './WorkoutEventList';
import styles from './WorkoutEventScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, LIST, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { WorkoutEventForm } from './WorkoutEventForm';
import { ListOfParticipantsForm } from './ListOfParticipantsForm';
import { getWorkoutEventAsync, setCreateAction } from '../../redux/actions/workoutEventAction';

export const WorkoutEventScreen = () => {
  const dispatch = useDispatch();
  const {
    list: workoutEvents,
    isLoading,
    actionInProgress,
    selectedWorkoutEvent,
  } = useSelector((state) => state.workoutEvents);
  
  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };
  
  useEffect(()=>{
    dispatch(getWorkoutEventAsync());
  }, [])

  return (
    <div>
      <h2>Workout Events</h2>
      {
        credentials.user &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New Workout Events
        </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <WorkoutEventForm />
      )}
      {(actionInProgress === LIST) && (
        <ListOfParticipantsForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete post={selectedWorkoutEvent} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.workouts}>
        <WorkoutEventsList workoutEvents={workoutEvents} />
      </div>
    </div>
  );
};
