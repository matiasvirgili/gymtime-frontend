import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteHealthAsync,
  unsetAction,
} from '../../redux/actions/healthAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = ({ health }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.healths);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deleteHealthAsync(health._id));

  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a Health</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete the health of ${health.userId.lastName}, ${health.userId.name} on ${health.day.split("T", 1)?.[0]} permanently`}</p>
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
  health: PropTypes.object.isRequired,
};
