import React from 'react';
import PropTypes from 'prop-types';
import { Exercise } from './Exercise';
import { useSelector } from 'react-redux';

export const ExerciseList = ({ exercises }) => {
  const isLoggedIn = useSelector(
    (state) => state.users?.credentials?.user?._id
  );
  return exercises.map((us) => (
    <Exercise key={us._id} user={us} isLoggedIn={isLoggedIn} exerciese={us} />
  ));
};

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
};
