import React, {useEffect} from 'react';
import { EventMemberList } from './EventMemberList';
import styles from './EventMemberScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { getWorkoutEventAsync } from '../../redux/actions/workoutEventAction';
import { ErrorContainer } from '../shared/ErrorContainer';

export const EventMemberScreen = () => {
  const dispatch = useDispatch();
  const {
    list: workoutEvents,
    isLoading
  } = useSelector((state) => state.workoutEvents);
  
  const {
    error
  } = useSelector((state) => state.eventMembers);
  
  useEffect(()=>{
    dispatch(getWorkoutEventAsync());
  }, [])

  return (
    <div>
      <h2>Events Member</h2>
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      {error && <ErrorContainer message={error} />}
      <div className={styles.eventMembers}>
        <EventMemberList workoutEvents={workoutEvents} />
      </div>
    </div>
  );
};
