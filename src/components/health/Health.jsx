import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Health.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/healthAction';

export const Health = ({ health, isLoggedIn }) => {
  const { _id, userId, day } = health;
  const dispatch = useDispatch();
  
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>User</span>
        <span className={styles.content}>{userId.name + ' ' + userId.lastName}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Day</span>
        <span className={styles.content}>{day.slice(0, 10)}</span>
      </div>
      {
        isLoggedIn &&
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(health))}
          />
          {
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(health))}
            />
          }          
        </div>
      }
    </div>
  );
};

Health.propTypes = {
  health: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string
};
