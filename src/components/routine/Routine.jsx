import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon, FaListAlt as ListExercises } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Routine.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
  setRoutineExerciseAction
} from '../../redux/actions/routineAction';
import { NavLink } from 'react-router-dom';

export const Routine = ({ routines , isLoggedIn }) => {
  const { name, userId, _id } = routines;
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
        <span className={styles.content}>{userId?.name + ' ' + userId?.lastName}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Routine</span>
        <span className={styles.content}>{name}</span>
      </div>
      <div className={styles.actions}>
      {isLoggedIn && (
          <NavLink to="/exerciseroutines" className={styles.link}>
            <ListExercises
              className={styles.listIcon}
              onClick={() => dispatch(setRoutineExerciseAction(routines))
              }
            />
          </NavLink>
      )}
      {permissionsConvert?.routinesAction && (
        <>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(routines))}
          />
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={() => dispatch(setDeleteAction(routines))}
          />
        </>
      )}
      </div>
    </div>
  );
};

Routine.propTypes = {
  routines: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
