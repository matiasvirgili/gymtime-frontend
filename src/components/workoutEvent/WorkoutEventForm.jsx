import React from 'react';
import styles from './WorkoutEventForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateWorkoutEventAsync,
  createWorkoutEventAsync,
  unsetAction
} from '../../redux/actions/workoutEventAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import ComboBoxInput from '../shared/ComboBoxInput';
import { TimePickersInput } from '../shared/TimePickerInput';
import { required, mustBeNumber, composeValidators } from '../validations/FormValidation';

const initialState = {
  name: '',
  places: '',
  placesOccupied: '',
  duration: '',
  location: '',
  classroom: '',
  day: '',
  hour: ''
};

export const WorkoutEventForm = () => {
  const dispatch = useDispatch();

  const { actionInProgress, selectedWorkoutEvent, isLoading, error } =
    useSelector((state) => state.workoutEvents);

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleFormSubmit = (workoutEvent) => {
    if (actionInProgress === UPDATE) {
      workoutEvent.placesOccupied = selectedWorkoutEvent.placesOccupied
      workoutEvent._id = selectedWorkoutEvent._id;
      dispatch(updateWorkoutEventAsync(workoutEvent));
    } else {
      workoutEvent.placesOccupied = 0
      dispatch(createWorkoutEventAsync(workoutEvent));
    }
  };

  const optionsDay=[
    {"day": "Monday"}, 
    {"day": "Tuesday"}, 
    {"day": "Wednesday"}, 
    {"day": "Thursday"},
    {"day": "Friday"},
    {"day": "Saturday"},
    {"day": "Sunday"}
  ]

  const optionsLocation=[
    {"location": "Pellegrini"}, 
    {"location": "Oroño"}, 
    {"location": "Avellaneda"}, 
  ]

  const optionsClassroom=[
    {"classroom": 1}, 
    {"classroom": 2}, 
    {"classroom": 3}, 
  ]

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
                  {({input, meta }) => (
                    <TextInput input={input} meta={meta} name="Name" disabled = {false} />
                  )}
                </Field>
              </div>
              <div>
                <Field name={"location"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Location" options={optionsLocation} optionsKey={"location"} optionsValue={"location"}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name={"classroom"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Classroom" options={optionsClassroom} optionsKey={"classroom"} optionsValue={"classroom"}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="places" validate={composeValidators(required, mustBeNumber)}>
                  {({input, meta }) => (
                    <TextInput input={input} meta={meta} name="Places" disabled = {false} />
                  )}
                </Field>
              </div>
              <div>
                <Field name={"day"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Day" options={optionsDay} optionsKey={"day"} optionsValue={"day"}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="startHour" validate={required}>
                  {({input }) => (
                    <TimePickersInput input={input} label="Start Hour" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="finalHour" validate={required}>
                  {({input}) => (
                    <TimePickersInput input={input} label="Final Hour" />
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
