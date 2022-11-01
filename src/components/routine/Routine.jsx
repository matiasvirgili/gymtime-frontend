import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon, FaListAlt as ListExercises } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Routine.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
  setRoutineExerciseAction
} from '../../redux/actions/routineAction';
import { NavLink } from 'react-router-dom';

export const Routine = ({ routines , isLoggedIn }) => {
  const { userId, _id } = routines;
  const dispatch = useDispatch();
  
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>User</span>
        <span className={styles.content}>{userId.name + ' ' + userId.lastName}</span>
      </div>
      {isLoggedIn && (
        <div className={styles.actions}>
          <NavLink to="/exerciseroutines" className={styles.link}>
            <ListExercises
              className={styles.listIcon}
              onClick={() => dispatch(setRoutineExerciseAction(routines))
              }
            />
          </NavLink>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(routines))}
          />
          {isLoggedIn != _id && (
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(routines))}
            />
          )}
        </div>
      )}
    </div>
  );
};

Routine.propTypes = {
  routines: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
