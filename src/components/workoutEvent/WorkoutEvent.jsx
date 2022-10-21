import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import { RiFileListFill } from "react-icons/ri";
import styles from './WorkoutEvent.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
  setListparticipantsAction,
} from '../../redux/actions/workoutEventAction';

export const WorkoutEvent = ({ workoutEvent, isLoggedIn }) => {
  const { _id, name, startHour, finalHour, location, classroom } = workoutEvent;

  const dispatch = useDispatch();
  
  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>Name</span>
        <span className={styles.content}>{name}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Start Hour</span>
        <span className={styles.content}>{startHour}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Final Hour</span>
        <span className={styles.content}>{finalHour}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Location</span>
        <span className={styles.content}>{location}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Classroom</span>
        <span className={styles.content}>{classroom}</span>
      </div>
      {
        isLoggedIn &&
        <div className={styles.actions}>
          <RiFileListFill
            className={styles.listfillIcon}
            onClick={() => dispatch(setListparticipantsAction(workoutEvent))}
          />      
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(workoutEvent))}
          />
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={() => dispatch(setDeleteAction(workoutEvent))}
          />  
        </div>
      }
    </div>
  );
};

WorkoutEvent.propTypes = {
  workoutEvent: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired
};
