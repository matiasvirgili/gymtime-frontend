import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export const NumberInput = ({ input, meta, name, disabled, value }) => {
  return (
    <TextField
    type="number"
    value = {value}
    {...input}
    autoComplete="off"
    label={name}
    required
    error={meta.error && meta.touched}
    helperText={meta.touched && meta.error}
    size="small"
    fullWidth
      margin="normal"
      disabled = {disabled}
    />
  );
};

NumberInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};
