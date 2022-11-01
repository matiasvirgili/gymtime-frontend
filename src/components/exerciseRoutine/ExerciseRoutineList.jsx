import React from 'react';
import PropTypes from 'prop-types';
import { ExerciseRoutine } from './ExerciseRoutine';
import { useSelector } from 'react-redux';

export const ExerciseRoutineList = ({ exerciseRoutines }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id);

  return ( 
    exerciseRoutines.map((exercRou) => (
      <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn} />
    ))
  )
};

ExerciseRoutineList.propTypes = {
  exerciseRoutines: PropTypes.array.isRequired,
};
