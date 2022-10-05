import React from 'react';
import styles from './WorkoutEventForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateWorkoutEventAsync,
  createWorkoutEventAsync,
  unsetAction,
} from '../../redux/actions/workoutEventAction';
import Button from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import {
  mustBeNumber,
  required,
  composeValidators,
} from '../validations/FormValidation';

const initialState = {
  name: '',
  places: '',
  duration: '',
  location: '',
  theme: '',
  members: [],
};

export const WorkoutEventForm = () => {
  const { actionInProgress, selectedWorkoutEvent, isLoading, error } =
    useSelector((state) => state.workoutEvents);

  const dispatch = useDispatch();

  let action =
    actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const { list: userList } = useSelector((state) => state.users);

  const userFormated = userList.map((item) => {
    return {
      _id: item._id,
      userName: `${item.name} ${item.lastName}`,
    };
  });

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleFormSubmit = (workoutEvent) => {
    if (actionInProgress === UPDATE) {
      workoutEvent._id = selectedWorkoutEvent._id;
      dispatch(updateWorkoutEventAsync(workoutEvent));
    } else {
      dispatch(createWorkoutEventAsync(workoutEvent));
    }
  };

  return (
    <GenericModal>
      <>
        <h2>{action} Workout Event</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues={selectedWorkoutEvent || initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Name" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="places" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Places" />
                  )}
                </Field>
              </div>

              <div>
                <Field
                  name="duration"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Duration" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="location" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Location" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="theme" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Theme" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="members" validate={required}>
                  {({ input }) => (
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={userFormated}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...input}
                          {...params}
                          variant="standard"
                          label="Members"
                          placeholder="Select Members"
                        />
                      )}
                    />
                  )}
                </Field>
              </div>

              <div className={styles.actionsContainer}>
                <Button
                  disabled={submitting}
                  color="primary"
                  variant="contained"
                  disableRipple
                  type="submit"
                  loading={isLoading}
                  onClick={handleSubmit}
                >
                  {actionInProgress}
                </Button>
                <Button variant="outlined" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Form>
      </>
    </GenericModal>
  );
};
