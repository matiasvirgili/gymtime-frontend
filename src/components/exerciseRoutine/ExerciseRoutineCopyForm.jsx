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
  getExerciseWithRoutineIdAndCopy,
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


  const routineFiltred = routines.filter(i =>  {
    if((i.name != undefined || i.name != null || i.name !="")) return i}
   )


  const handleFormSubmit = (routine) => {
    dispatch(getExerciseWithRoutineIdAndCopy(routine.routineId, selectedRoutine._id))

    dispatch(unsetAction())
  };

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  return (
    <GenericModal>
      <>
        <h2 className={styles.actionTitle}>Copy exercise</h2>
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
