import React from 'react';
import PropTypes from 'prop-types';
import { Health } from './Health';
import { useSelector } from 'react-redux'

export const HealthList = ({ healths }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id);

  return healths.map((htls) => (
    <Health key={htls._id} health={htls} isLoggedIn={isLoggedIn}/>
  ));
};

HealthList.propTypes = {
  healths: PropTypes.array.isRequired,
};
