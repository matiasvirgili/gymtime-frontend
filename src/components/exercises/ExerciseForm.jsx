import React from 'react';
import styles from './ExerciseForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateExerciseAsync,
  createExerciseAsync,
  unsetAction,
} from '../../redux/actions/exercisesAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import {
  required
} from '../validations/FormValidation';
import ComboBoxInput from '../shared/ComboBoxInput';

const initialState = {
  name: '',
  area: '',
  expecifyMuscle: '',
};

export const ExerciseForm = () => {
  const { actionInProgress, selectedExercise, isLoading, error } = useSelector(
    (state) => state.exercises
  );

  const dispatch = useDispatch();

  let action =
    actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleFormSubmit = (exercise) => {
    if (actionInProgress === UPDATE) {
      exercise._id = selectedExercise._id;
      dispatch(updateExerciseAsync(exercise));
    } else {
      dispatch(createExerciseAsync(exercise));
    }
  };

  const optionsArea=[
    {"area": "Pecho"}, 
    {"area": "Triceps"}, 
    {"area": "Biceps"}, 
    {"area": "Trapecios"}, 
    {"area": "Hombros"}, 
    {"area": "Abdominales"},
    {"area": "Isquiotibiales"},
    {"area": "Cuadriceps "}, 
    {"area": "Pantorrillas"}, 
  ]

  return (
    <GenericModal>
      <>
        <h2 className={styles.actionTitle}>{action} Exercise</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues={selectedExercise || initialState}
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
              <div className={styles.healthSet}>
                <Field name={"area"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Area" options={optionsArea} optionsKey={"area"} optionsValue={"area"}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="expecifyMuscle" validate={required}>
                  {({ input, meta }) => (
                    <TextInput
                      input={input}
                      meta={meta}
                      name="Expecify Muscle"
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
