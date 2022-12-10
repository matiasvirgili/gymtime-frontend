import React, { useEffect } from 'react';
import styles from './RoutineForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  createRoutineAsync,
  updateRoutineAsync,
  unsetAction,
} from '../../redux/actions/routineAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { ErrorContainer } from '../shared/ErrorContainer';
import {
  required
} from '../validations/FormValidation';
import ComboBoxInput from '../shared/ComboBoxInput';
import { getUsersAsync } from '../../redux/actions/usersAction';
import { getExercisesAsync } from '../../redux/actions/exercisesAction';
import { TextInput } from '../shared/TextInput';


export const RoutineForm = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExercisesAsync());
    dispatch(getUsersAsync());
  }, []);


  const { actionInProgress, selectedRoutine, isLoading, error } = useSelector(
    (state) => state.routines
  );

  const { list: userList } =
  useSelector((state) => state.users);

  const userFormated = userList.map(item => {
    return {
      _id: item._id,
      userName: `${item.name} ${item.lastName}`
    }
  })

  const handleFormSubmit = (routine) => {
    if (actionInProgress === UPDATE) {
      routine._id = selectedRoutine._id;
      routine.userId = routine.userId._id
      dispatch(updateRoutineAsync(routine));
    } else {
      routine.userId = routine.userId._id
      dispatch(createRoutineAsync(routine));
    }
  };
  const handleCancel = () => {
    dispatch(unsetAction());
  };

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const initialState = {
    userId: '',
    name: '',
  };

  return (
    <GenericModal>
      <>
        <h2 className={styles.actionTitle}>{action} Exercise</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues= {selectedRoutine || initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.healthSet}>
                <Field name={"userId._id"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="User" options={userFormated} optionsKey={"userName"} optionsValue={"_id"}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Name of Routine" />
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
