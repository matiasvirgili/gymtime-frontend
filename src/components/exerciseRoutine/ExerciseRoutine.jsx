import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './ExerciseRoutine.module.css';
import { useDispatch } from 'react-redux';
import {
  setUpdateAction,
  setDeleteAction,
} from '../../redux/actions/exerciseRoutineAction';

export const ExerciseRoutine = ({ exerciseRoutine , isLoggedIn }) => {
  const { exerciseId, duration, breakDuration, _id } = exerciseRoutine;
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.container} key={_id}>
        <div className={styles.column}>
          <span className={styles.title}>Exercise</span>
          <span className={styles.content}>{exerciseId.name}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Duration</span>
          <span className={styles.content}>{duration}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Break duration</span>
          <span className={styles.content}>{breakDuration}</span>
        </div>

        {isLoggedIn && (
          <div className={styles.actions}>
            <EditIcon
              className={styles.editIcon}
              onClick={() => dispatch(setUpdateAction(exerciseRoutine))}
            />
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(exerciseRoutine))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ExerciseRoutine.propTypes = {
  exerciseRoutine: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
