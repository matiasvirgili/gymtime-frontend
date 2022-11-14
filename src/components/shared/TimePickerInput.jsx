import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const TimePickersInput= ({ input, label }) => {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label={label}
        type="time"
        className={classes.textField}
        {...input}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}

TimePickersInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
};
