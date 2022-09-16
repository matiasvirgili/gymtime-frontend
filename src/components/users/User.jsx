import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './User.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/usersAction';

export const User = ({ user, isLoggedIn }) => {
  const { name, lastName, dni, phone, _id} = user;
  const dispatch = useDispatch();
  
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>Full name</span>
        <span className={styles.content}>{name + ' ' + lastName}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>DNI</span>
        <span className={styles.content}>{dni}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Phone</span>
        <span className={styles.content}>{phone}</span>
      </div>
      {
        isLoggedIn &&
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(user))}
          />
          {
            isLoggedIn != _id &&
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(user))}
            />
          }
          
        </div>
      }
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
