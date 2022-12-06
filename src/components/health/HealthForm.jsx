import React, { useEffect } from 'react';
import styles from './HealthForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateHealthAsync,
  createHealthAsync,
  unsetAction
} from '../../redux/actions/healthAction';
import { 
  getUsersAsync 
} from '../../redux/actions/usersAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { CONSULT, UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { CheckboxInput } from '../shared/CheckBoxInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import ComboBoxInput from '../shared/ComboBoxInput';
import {
  mustBeNumber,
  required,
  composeValidators,
} from '../validations/FormValidation';


const hoy = new Date()
var fecha =   hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() ;

const initialState = {
  userId: '',
  height: '',
  weight: '',
  age: '',
  sex: '',
  day: fecha,
  macroCheck: '',
  stage: '',
  activity: ''
};

export const HealthForm = () => {
  const { actionInProgress, selectedHealth, isLoading, error } =
    useSelector((state) => state.healths);

  const { list: userList } =
    useSelector((state) => state.users);

  const userFormated = userList.map(item => {
    return {
      _id: item._id,
      userName: `${item.name} ${item.lastName}`
    }
  })

  const dispatch = useDispatch();

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleFormSubmit = (health) => {
    if (actionInProgress === UPDATE) {
      health._id = selectedHealth._id;
      dispatch(updateHealthAsync(health));
    } else {
      health._id = initialState.userId._id;
      if(!initialState.macroCheck) health.macroCheck = false;
      dispatch(createHealthAsync(health));
    }
  };

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const optionsSex=[
    {"sex":"Male"},
    {"sex": "Female"}
  ]

  const optionsStage=[
    {"stage": "Volume"}, 
    {"stage": "Definition"}
  ]

  const optionsActivity=[
    {"activity":  "1.2"}, 
    {"activity": "1.85"}, 
    {"activity": "2.20"}, 
    {"activity": "2.40"}
  ]

  return (
    <GenericModal>
      <>
        <h2>{action} Health</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues= {selectedHealth? {...selectedHealth, day : selectedHealth.day.split("T", 1)?.[0]} : initialState }
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="day">
                  {({input, meta }) => (
                    <TextInput value = {fecha} input={input} meta={meta} name="Day" disabled = {true} />
                  )}
                </Field>
              </div>
              <div className={styles.healthSet}>
                <Field name={"userId._id"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="User" options={userFormated} optionsKey={"userName"} optionsValue={"_id"} disabled={!(actionInProgress != CONSULT)}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="height" validate={composeValidators(required, mustBeNumber)}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Height" disabled={!(actionInProgress != CONSULT)}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="weight" validate={composeValidators(required, mustBeNumber)}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Weight" disabled={!(actionInProgress != CONSULT)}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="age" validate={composeValidators(required, mustBeNumber)}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Age" disabled={!(actionInProgress != CONSULT)}/>
                  )}
                </Field>
              </div>
              <div className={styles.healthSet}>
                <Field name="sex" validate={required}>
                {({input}) => (
                   <ComboBoxInput input={input} label="Sex" options={optionsSex} optionsKey="sex" optionsValue={"sex"} disabled={!(actionInProgress != CONSULT)}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="macroCheck" type="checkbox">
                  {({input}) => (
                   <CheckboxInput input={input} name="Macros"  disabled={!(actionInProgress != CONSULT)}/>
                  )}
                </Field>
                {values.macroCheck &&
                  <div>
                    <div className={styles.healthSet}>
                      <Field name="stage" validate={required}>
                      {({input}) => (
                        <ComboBoxInput input={input} label="Stage" options={optionsStage} optionsKey="stage" optionsValue={"stage"}  disabled={!(actionInProgress != CONSULT)}/>
                      )}
                      </Field>
                    </div>
                    <div className={styles.healthSet}>
                      <Field name="activity" validate={required}>
                      {({input}) => (
                        <ComboBoxInput input={input} label="Activity" options={optionsActivity} optionsKey="activity" optionsValue={"activity"}  disabled={!(actionInProgress != CONSULT)}/>
                      )}
                      </Field>
                    </div>
                  </div>
                }
              </div>
    
              <div className={styles.actionsContainer}>
                {actionInProgress != CONSULT && (
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
                )}
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
