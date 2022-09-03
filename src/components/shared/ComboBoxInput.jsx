import {React, useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';


export default function ComboBoxInput({ input, options}) {
    const [selected, setSelected] = useState(input.value);

    const selectionChangeHandler = (event) => {
      setSelected(event.target.value);
    };

    return (
      <Select
        value={selected}
        onChange={selectionChangeHandler}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        {...input}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {options.map((item, index) => <MenuItem key={index} value={item.role}>{item.role}</MenuItem>)}
      </Select>
    );
  }

  ComboBoxInput.propTypes = {
    input: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
  }