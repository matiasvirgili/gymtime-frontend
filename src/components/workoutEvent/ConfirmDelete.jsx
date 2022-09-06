import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteWorkoutEvent,
  unsetAction,
} from '../../redux/actions/workoutEventAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = ({ workoutEvent }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.workoutEvents);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deleteWorkoutEvent(workoutEvent._id));

  return (
    <GenericModal>
      <>
        <h2>You are about to delete a Workout Event</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete ${workoutEvent.name} permanently`}</p>
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

ConfirmDelete.propTypes = {
  workoutEvent: PropTypes.object.isRequired,
};
