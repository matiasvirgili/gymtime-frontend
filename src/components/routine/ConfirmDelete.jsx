import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteRoutineAsync,
  unsetAction,
} from '../../redux/actions/routineAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = ({ routine }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.routines);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deleteRoutineAsync(routine._id));

  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a Routine</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete ${routine.userId.name} ${routine.userId.lastName} routine permanently`}</p>
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
  routine: PropTypes.object.isRequired,
};
