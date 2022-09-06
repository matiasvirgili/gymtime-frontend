import React from 'react';
import PropTypes from 'prop-types';
import { WorkoutEvent } from './WorkoutEvent';
import { useSelector } from 'react-redux';

export const WorkoutEventList = ({ workoutEvents }) => {
  const isLoggedIn = useSelector(
    (state) => state.users?.credentials?.user?._id
  );
  return workoutEvents.map((us) => (
    <WorkoutEvent
      key={us._id}
      user={us}
      isLoggedIn={isLoggedIn}
      workoutEvent={us}
    />
  ));
};

WorkoutEventList.propTypes = {
  workoutEvents: PropTypes.array.isRequired,
};
