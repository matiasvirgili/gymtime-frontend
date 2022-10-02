import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Subscription.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/subscriptionAction';

export const Subscription = ({ subscription, isLoggedIn }) => {
  const { _id, userId, dayOfSubscription, dayOfExpiration, typeOfSubscription } = subscription;

  const dispatch = useDispatch();

  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>User</span>
        <span className={styles.content}>{userId.name + ' ' + userId.lastName}</span>
      </div>
      <div className={styles.column}>
      <span className={styles.title}>Day of subscription</span>
        <span className={styles.content}>{dayOfSubscription.slice(0, 10)}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Day of expiration</span>
        <span className={styles.content}>{dayOfExpiration.slice(0, 10)}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Type of subscription</span>
        <span className={styles.content}>{typeOfSubscription}</span>
      </div>
      {
        isLoggedIn &&
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(subscription))}
          />
        {
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={() => dispatch(setDeleteAction(subscription))}
          />
        }          
        </div>
      }
    </div>
  );
};

Subscription.propTypes = {
  subscription: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired
};
