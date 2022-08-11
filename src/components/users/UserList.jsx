import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';
import { useSelector } from 'react-redux'

export const UserList = ({ users }) => {
  const {
    user
  } = useSelector((state) => state.users.credentials);
  return users.map((us) => (
    <User key={us._id} user={us} isLoggedIn={user?._id}/>
  ));
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};
