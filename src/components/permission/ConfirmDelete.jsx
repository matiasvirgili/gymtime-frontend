import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deletePermissionAsync,
  unsetAction,
} from '../../redux/actions/permissionAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = ({ permission }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.permissions);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deletePermissionAsync(permission._id));
 
  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a Permission</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete ${permission.role} permanently`}</p>
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
  permission: PropTypes.object.isRequired,
};
