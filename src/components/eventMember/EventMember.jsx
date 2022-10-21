import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './EventMember.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEventMembersAsync,
  createEventMemberAsync,
  deleteEventMemberAsync
} from '../../redux/actions/eventMemberAction';
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { updateWorkoutEventAsync } from '../../redux/actions/workoutEventAction';

export const EventMember = ({ workoutEvent, isLoggedIn }) => {
  const { _id, name} = workoutEvent;

  const dispatch = useDispatch();

  const eventMemberState = {
    userId: isLoggedIn,
    workoutEvent: _id
  }

  const {
    list: eventMembers,
  } = useSelector((state) => state.eventMembers);
  
  useEffect(()=>{
    dispatch(getEventMembersAsync(eventMemberState.userId, ""));
  }, [])
  
  const EventMemberCreated = eventMembers && eventMembers.filter(i => i.workoutEvent === eventMemberState.workoutEvent)

  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.title}>Name</span>
        <span className={styles.content}>{name}</span>
      </div>
        <div className={styles.actions} key={eventMemberState.workoutEvent}>
          {isLoggedIn && (
            <>
              {(!EventMemberCreated.length) && workoutEvent.places!=workoutEvent.placesOccupied &&(
                <button
                  disabled={!!EventMemberCreated.length}
                  onClick={async () => {
                    try {
                      workoutEvent.placesOccupied += 1
                      await dispatch(
                        createEventMemberAsync(eventMemberState), 
                        updateWorkoutEventAsync(workoutEvent)
                      )
                    } catch (error) {
                      return
                    } 
                  }}
                >
                  <BsPatchPlusFill
                    className={styles.editIcon}
                  />
                </button>
              )}
              {(!!EventMemberCreated.length) &&(
                <button
                  disabled={!EventMemberCreated.length}
                  onClick={async () => {
                    try {
                      workoutEvent.placesOccupied -= 1
                      await dispatch(
                        deleteEventMemberAsync(EventMemberCreated[0]._id),
                        updateWorkoutEventAsync(workoutEvent)
                      )
                    } catch (error) {
                      return
                    } 
                  }}
                >
                  <BsPatchMinusFill
                    className={styles.deleteIcon}
                /> 
                </button>  
              )}
            </>
          )
          }
        </div>
    </div>
  );
};

EventMember.propTypes = {
  workoutEvent: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired
};
