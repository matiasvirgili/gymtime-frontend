import React from 'react';
import PropTypes from 'prop-types';
import { Exercise } from './Exercise';
import { useSelector } from 'react-redux';

export const ExerciseList = ({ exercises }) => {
  const isLoggedIn = useSelector(
    (state) => state.users?.credentials?.user?._id
  );
  
  return exercises.map((excer) => (
    <Exercise key={excer._id} exercises ={excer} isLoggedIn={isLoggedIn} />
  ));
};

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
};
