import React from 'react';
import PropTypes from 'prop-types';
import { Exercise } from './Exercise';
import { useSelector } from 'react-redux';

export const ExerciseList = ({ exercises }) => {
  const { exercise } = useSelector((state) => state.exercises.credentials);
  return exercises.map((us) => (
    <Exercise key={us._id} user={us} isLoggedIn={exercise?._id} />
  ));
};

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
};
