import React, { useEffect } from 'react';
import styles from './ExerciseRoutineCopyForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { Form, Field } from 'react-final-form';
import { ErrorContainer } from '../shared/ErrorContainer';
import { required } from '../validations/FormValidation';
import ComboBoxInput from '../shared/ComboBoxInput';
import { getExercisesAsync } from '../../redux/actions/exercisesAction';
import {
  createExerciseRoutineAsync,
  getExerciseWithRoutineIdAsync,
  unsetAction,
} from '../../redux/actions/exerciseRoutineAction';

const initialState = {
  routineId: '',
};

export const ExerciseRoutineCopyForm = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getExercisesAsync());
  }, []);
  
  const { list: routines, selectedRoutine, error, isLoading  } = useSelector(
    (state) => state.routines
  );
  const { list: excercisesInRoutine } = useSelector(
    (state) => state.exerciseRoutines
  );

  const routineFiltred = routines.filter(i =>  i.name != undefined||null||"")

  const handleFormSubmit = async (routine) => {
    dispatch(getExerciseWithRoutineIdAsync(routine.routineId))

    for (let i = 0; i < excercisesInRoutine.length; i++) {
      const exerciseRoutineCopy = {
          routineId: selectedRoutine._id,
          day: excercisesInRoutine[i].day,
          exerciseId: excercisesInRoutine[i].exerciseId._id,
          duration: excercisesInRoutine[i].duration,
          breakDuration: excercisesInRoutine[i].breakDuration,
          position: excercisesInRoutine[i].position,
      }
      dispatch(createExerciseRoutineAsync(exerciseRoutineCopy))
    }
    dispatch(unsetAction())
  };

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  return (
    <GenericModal>
      <>
        <h2>Copy exercise</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues= {initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.healthSet}>
                <Field name={"routineId"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Name of Routine" options={routineFiltred} optionsKey={"name"} optionsValue={"_id"}/>
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
                  Copy routine
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
