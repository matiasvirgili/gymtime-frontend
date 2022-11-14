import React from 'react';
import PropTypes from 'prop-types';
import { WorkoutEvent } from './WorkoutEvent';
import { useSelector } from 'react-redux'

export const WorkoutEventsList = ({ workoutEvents }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id); 
  
  return workoutEvents.map((wkoes) => (
    <WorkoutEvent key={wkoes._id} workoutEvent={wkoes} isLoggedIn={isLoggedIn}/>
  ));
};

WorkoutEventsList.propTypes = {
  workoutEvents: PropTypes.array.isRequired,
};
