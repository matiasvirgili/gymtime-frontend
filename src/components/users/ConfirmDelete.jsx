import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteUserAsync,
  unsetAction,
} from '../../redux/actions/usersAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = ({ user }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.users);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deleteUserAsync(user._id));

  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a User</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete ${user.name} ${user.lastName} permanently`}</p>
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
  user: PropTypes.object.isRequired,
};
