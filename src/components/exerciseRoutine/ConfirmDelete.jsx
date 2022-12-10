import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteExerciseRoutineAsync,
  unsetAction,
} from '../../redux/actions/exerciseRoutineAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = ({ exerciseRoutine }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.exerciseRoutines);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deleteExerciseRoutineAsync(exerciseRoutine._id));

  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a Exercise</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete ${exerciseRoutine.exerciseId.name} on ${exerciseRoutine.day} permanently`}</p>
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
  exerciseRoutine: PropTypes.object.isRequired,
};
