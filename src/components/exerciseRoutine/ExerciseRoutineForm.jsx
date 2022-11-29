import React, { useEffect } from 'react';
import styles from './ExerciseRoutineForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateExerciseRoutineAsync, } from '../../redux/actions/exerciseRoutineAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { ErrorContainer } from '../shared/ErrorContainer';
import { required } from '../validations/FormValidation';
import ComboBoxInput from '../shared/ComboBoxInput';
import { getExercisesAsync } from '../../redux/actions/exercisesAction';
import { TextInput } from '../shared/TextInput';
import { NumberInput } from '../shared/NumberInput';
import { TimePickersInput } from '../shared/TimePickerInput';
import {
  createExerciseRoutineAsync,
  unsetAction,
} from '../../redux/actions/exerciseRoutineAction';

const initialState = {
  routineId: '',
  day: '',
  exerciseId: '',
  duration: '',
  breakDuration: '',
  position: '1',
};

const optionsDay=[
  {"day": "Lunes"}, 
  {"day": "Martes"}, 
  {"day": "Miercoles"}, 
  {"day": "Jueves"},
  {"day": "Viernes"},
  {"day": "Sabado"},
  {"day": "Domingo"}
]
export const ExerciseRoutineForm = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getExercisesAsync());
  }, []);
  
  const { actionInProgress, selectedExerciseRoutine, isLoading, error } = useSelector(
    (state) => state.exerciseRoutines
  );

  const { selectedRoutine } =
  useSelector((state) => state.routines);

  const { list: exerciseList } =
  useSelector((state) => state.exercises);

  const handleFormSubmit = (exerciseRoutine) => {
    if (actionInProgress === UPDATE) {
      exerciseRoutine._id = selectedExerciseRoutine._id;
      dispatch(updateExerciseRoutineAsync(exerciseRoutine));
    } else {
      exerciseRoutine.routineId = selectedRoutine._id;
      dispatch(createExerciseRoutineAsync(exerciseRoutine));
    }
  };
  const handleCancel = () => {
    dispatch(unsetAction());
  };

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  return (
    <GenericModal>
      <>
        <h2>{action} Exercise</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues= {selectedExerciseRoutine? {
            ...selectedExerciseRoutine,
            exerciseId : selectedExerciseRoutine.exerciseId._id
          } : initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.healthSet}>
                <Field name={"day"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Day" options={optionsDay} optionsKey={"day"} optionsValue={"day"}/>
                  )}
                </Field>
              </div>
              <div className={styles.healthSet}>
                <Field name={"exerciseId"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Exercise" options={exerciseList} optionsKey={"name"} optionsValue={"_id"}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="duration" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Duration" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="breakDuration" validate={required}>
                  {({input }) => (
                    <TimePickersInput input={input} label="Break duration in Minutes/Second" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="position" validate={required}>
                  {({ input, meta }) => (
                    <NumberInput input={input} meta={meta} name="Position" />
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
