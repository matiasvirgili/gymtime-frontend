import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Exercise.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/exercisesAction';

export const Exercise = ({ exercises , isLoggedIn }) => {
  const { name, area, expecifyMuscle, _id } = exercises;
  const dispatch = useDispatch();
  
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>Full Name</span>
        <span className={styles.content}>{name}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Area</span>
        <span className={styles.content}>{area}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Expecify Muscle</span>
        <span className={styles.content}>{expecifyMuscle}</span>
      </div>
      {isLoggedIn && (
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(exercises))}
          />
          {isLoggedIn != _id && (
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(exercises))}
            />
          )}
        </div>
      )}
    </div>
  );
};

Exercise.propTypes = {
  exercises: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};
