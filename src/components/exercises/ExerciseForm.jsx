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
  mustBeNumber,
  required,
  composeValidators,
} from '../validations/FormValidation';

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

  return (
    <GenericModal>
      <>
        <h2>{action} Exercise</h2>
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
              <div>
                <Field name="Area" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Area" />
                  )}
                </Field>
              </div>
              <div>
                <Field
                  name="expecifyMuscle"
                  validate={composeValidators(required, mustBeNumber)}
                >
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
