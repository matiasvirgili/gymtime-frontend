import React, { useEffect } from 'react';
import { GenericModal } from '../shared/GenericModal';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  unsetAction,
} from '../../redux/actions/workoutEventAction';
import styles from './ListOfParticipantsForm.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';
import {
  getEventMembersListAsync,
} from '../../redux/actions/eventMemberAction';

export const ListOfParticipantsForm = () => {

  const dispatch = useDispatch();
  const { error, selectedWorkoutEvent } = useSelector((state) => state.workoutEvents);

  const {
    list: eventMembers
  } = useSelector((state) => state.eventMembers);

  useEffect(()=>{
    dispatch(getEventMembersListAsync(selectedWorkoutEvent._id));
  }, [])

  const handleCancel = () => dispatch(unsetAction());
  
  return (
    <GenericModal>
      <>
        <h2>List of participants:</h2>
        <div>
          {error && <ErrorContainer message={error} />}
          {eventMembers.map((evntMmb) => (
              <p key={evntMmb._id} >{`${evntMmb.userId.lastName}, ${evntMmb.userId.name}`}</p>
          ))}
        </div>

        <div className={styles.actionsContainer}>
          <Button onClick={handleCancel} variant="outlined" disableRipple>
            Cancel
          </Button>
        </div>
      </>
    </GenericModal>
  );
};
