import React, {useEffect} from 'react';
import { SubscriptionsList } from './SubscriptionList';
import styles from './SubscriptionScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { SubscriptionForm } from './SubscriptionForm';
import { getSubscriptionsAsync, setCreateAction } from '../../redux/actions/subscriptionAction';

export const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const {
    list: subscriptions,
    isLoading,
    actionInProgress,
    selectedSubscription,
  } = useSelector((state) => state.subscriptions);
  
  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };
  
  useEffect(()=>{
    dispatch(getSubscriptionsAsync());
  }, [])

  return (
    <div>
      <h2>Subscriptions</h2>
      {
        credentials.user &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New Subscription
        </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <SubscriptionForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete post={selectedSubscription} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <div className={styles.subscriptions}>
        <SubscriptionsList subscriptions={subscriptions} />
      </div>
    </div>
  );
};
