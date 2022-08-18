import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export const CheckboxInput = ({ input, meta }) => {
  return (
    <Checkbox
      type="checkbox"
      {...input}
      autoComplete="off"
      required
      error={meta.error && meta.touched}
      helperText={meta.touched && meta.error}
      size="small"
      fullWidth
      margin="normal"
    />
  );
};

CheckboxInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};