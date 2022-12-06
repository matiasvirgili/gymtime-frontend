import React from 'react';
import {Box, FormControlLabel,Checkbox} from '@mui/material';
import PropTypes from 'prop-types';

export const CheckboxInput = ({input, name, disabled}) => {
  return (
      <Box>
        <FormControlLabel
        label = {name}
        disabled = {disabled}
        control={<Checkbox {...input}/>}
        />
      </Box>
  );
};

CheckboxInput.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.string,
};