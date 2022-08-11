import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

export const ErrorContainer = ({ message }) => {
  return <Alert severity="error">{message}</Alert>;
};

ErrorContainer.propTypes = {
  message: PropTypes.string.isRequired,
};
