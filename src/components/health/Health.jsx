import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Health.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setConsultAction,
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/healthAction';
import { AiFillEye } from "react-icons/ai";

export const Health = ({ health, isLoggedIn }) => {
  const { _id, userId, day } = health;
  const dispatch = useDispatch();
  
  const { permissionUser } = useSelector(
    (state) => state.permissions
  );
  let permissionsConvert 
  if(permissionUser != null){
    permissionsConvert  = permissionUser[0]
  }

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
      <div className={styles.actions}>
        <AiFillEye
          className={styles.editIcon}
          onClick={() => dispatch(setConsultAction(health))}
        />
        {(isLoggedIn && permissionsConvert?.routinesAction) &&
          <>
            <EditIcon
              className={styles.editIcon}
              onClick={() => dispatch(setUpdateAction(health))}
            />
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(health))}
            />
          </>
        }
      </div>
    </div>
  );
};

Health.propTypes = {
  health: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
