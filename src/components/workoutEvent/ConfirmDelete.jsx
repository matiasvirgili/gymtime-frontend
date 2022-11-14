import React, { useEffect } from 'react';
import { GenericModal } from '../shared/GenericModal';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteWorkoutEventAsync,
  unsetAction,
} from '../../redux/actions/workoutEventAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';
import { deleteEventMemberAsync, getEventMembersAsync } from '../../redux/actions/eventMemberAction';

export const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const { isLoading, error, selectedWorkoutEvent } = useSelector((state) => state.workoutEvents);

  const {
    list: eventMembers,
  } = useSelector((state) => state.eventMembers);
  
  useEffect(()=>{
    dispatch(getEventMembersAsync("", selectedWorkoutEvent._id));
  }, [])

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => {
    if (eventMembers.length) {
      for (let i = 0; i < eventMembers.length; i++) {
        dispatch(deleteEventMemberAsync(eventMembers[i]._id))
      }
    }
    dispatch(deleteWorkoutEventAsync(selectedWorkoutEvent._id));
  }

  return (
    <GenericModal>
      <>
        <h2>You are about to delete a Workout Event</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete permanently the workout Event of ${selectedWorkoutEvent.name},`}</p>
        <p>{`Day: ${selectedWorkoutEvent.day},`}</p>
        <p>{`Location: ${selectedWorkoutEvent.location}`}</p>
        <p>Are you sure?</p>
        <div className={styles.actionsContainer}>
          <Button
            onClick={handleDelete}
            variant="contained"
            disableRipple
            color="error"
            loading={isLoading}
          >
            Delete
          </Button>
          <Button onClick={handleCancel} variant="outlined" disableRipple>
            Cancel
          </Button>
        </div>
      </>
    </GenericModal>
  );
};
