import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Permission.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/permissionAction';

export const Permission = ({ permission = {}, isLoggedIn }) => {
  const { role, _id } = permission;
  const dispatch = useDispatch();
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>Role</span>
        <span className={styles.content}>{role}</span>
      </div>
      {isLoggedIn && (
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(permission))}
          />
          {
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(permission))}
            />
          }
        </div>
      )}
    </div>
  );
};

Permission.propTypes = {
  permission: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
