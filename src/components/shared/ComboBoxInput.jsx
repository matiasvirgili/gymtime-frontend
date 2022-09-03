import {React, useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { FormControl, InputLabel } from '@mui/material';
import { Box } from '@mui/system';

export default function ComboBoxInput({ input, options, label}) {
    const [selected, setSelected] = useState(input.value);

    const selectionChangeHandler = (event) => {
      setSelected(event.target.value);
    };

    return (
      <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label={label}
          onChange={selectionChangeHandler}
          {...input}
        >
          {options.map((item, index) => <MenuItem key={index} value={item.role}>{item.role}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
    );
  }

  ComboBoxInput.propTypes = {
    input: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
  }