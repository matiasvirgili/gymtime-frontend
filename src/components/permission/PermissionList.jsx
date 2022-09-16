import React from 'react';
import PropTypes from 'prop-types';
import { Permission } from './Permission';
import { useSelector } from 'react-redux';

export const PermissionList = ({ permissions }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id);

  return permissions.map((pm) => (
    <Permission key={pm._id} permission={pm} isLoggedIn={isLoggedIn}/>
   ));
};

PermissionList.propTypes = {
  permissions: PropTypes.array.isRequired,
};
