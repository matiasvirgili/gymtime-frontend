import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Exercise-routine.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/exerciseRoutineAction';

export const ExerciseRoutine = ({ exerciseRoutine = {}, isLoggedIn }) => {
  const { routineId, breakDuration, duration, _id, exerciseId } =
    exerciseRoutine;
  const dispatch = useDispatch();
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>Routine</span>
        <span className={styles.content}>{routineId}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Break Duration</span>
        <span className={styles.content}>{breakDuration}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Duration</span>
        <span className={styles.content}>{duration}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Exercise</span>
        <span className={styles.content}>{exerciseId}</span>
      </div>
      {isLoggedIn && (
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(exerciseRoutine))}
          />
          {isLoggedIn != _id && (
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(exerciseRoutine))}
            />
          )}
        </div>
      )}
    </div>
  );
};

ExerciseRoutine.propTypes = {
  exerciseRoutine: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
