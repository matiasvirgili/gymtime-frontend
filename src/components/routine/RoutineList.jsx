import React from 'react';
import PropTypes from 'prop-types';
import { Routine } from './Routine';
import { useSelector } from 'react-redux';

export const RoutineList = ({ routines }) => {
  const isLoggedIn = useSelector(
    (state) => state.users?.credentials?.user?._id
  );

  return routines.map((rtns) => (
    <Routine key={rtns._id} routines={rtns} isLoggedIn={isLoggedIn} />
  ));
};

RoutineList.propTypes = {
  routines: PropTypes.array.isRequired,
};
