import {React, useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { Box } from '@mui/system';

export default function ComboBoxInput({ input, options, label, optionsKey, optionsValue, disabled}) {
    const [selected, setSelected] = useState(input.value);

    const selectionChangeHandler = (event) => {
      setSelected(event.target.value);
    };

    return (
      <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          disabled = {disabled}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label={label}
          onChange={selectionChangeHandler}
          {...input}
        >
          {options.map((item, index) => 
            <MenuItem key={index} value={item[optionsValue]}>{item[optionsKey]}</MenuItem>
          )}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </Box>
    );
  }

  ComboBoxInput.propTypes = {
    input: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    optionsKey: PropTypes.string.isRequired,
    optionsValue: PropTypes.string.isRequired,
    disabled: PropTypes.string
  }