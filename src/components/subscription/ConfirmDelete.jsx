import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deleteSubscriptionAsync,
  unsetAction,
} from '../../redux/actions/subscriptionAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const { isLoading, error, selectedSubscription } = useSelector((state) => state.subscriptions);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deleteSubscriptionAsync(selectedSubscription._id));

  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a Subscription</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete the subscription of ${selectedSubscription.userId.lastName}, ${selectedSubscription.userId.name} on ${selectedSubscription.dayOfSubscription.split("T", 1)?.[0]} permanently`}</p>
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

