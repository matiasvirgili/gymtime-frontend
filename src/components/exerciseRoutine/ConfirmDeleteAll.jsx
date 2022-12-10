import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteAllExerciseRoutineAsync,
  unsetAction,
} from '../../redux/actions/exerciseRoutineAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDeleteAll = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.exerciseRoutines);
  const { selectedRoutine} = useSelector(
    (state) => state.routines
  );
  const handleCancel = () => dispatch(unsetAction());
  
  const handleDelete =  () => {
    dispatch(deleteAllExerciseRoutineAsync(selectedRoutine._id))
    if(error == ''){
      dispatch(unsetAction())
    }
  }

  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a Exercise</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete all exercise permanently`}</p>
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

