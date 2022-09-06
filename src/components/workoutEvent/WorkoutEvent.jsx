import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './WorkoutEvent.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/workoutEventAction';

export const WorkoutEvent = ({ workoutEvent = {}, isLoggedIn }) => {
  const { name, places, duration, location, theme, members, _id } =
    workoutEvent;
  const dispatch = useDispatch();
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>Name</span>
        <span className={styles.content}>{name}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Places</span>
        <span className={styles.content}>{places}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Duration</span>
        <span className={styles.content}>{duration}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Location</span>
        <span className={styles.content}>{location}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Theme</span>
        <span className={styles.content}>{theme}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Members</span>
        <span className={styles.content}>{members}</span>
      </div>

      {isLoggedIn && (
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(workoutEvent))}
          />
          {isLoggedIn != _id && (
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(workoutEvent))}
            />
          )}
        </div>
      )}
    </div>
  );
};

WorkoutEvent.propTypes = {
  workoutEvent: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
