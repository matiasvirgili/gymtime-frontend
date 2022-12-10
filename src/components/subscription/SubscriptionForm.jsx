import React, { useEffect } from 'react';
import styles from './SubscriptionForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSubscriptionAsync,
  createSubscriptionAsync,
  unsetAction
} from '../../redux/actions/subscriptionAction';
import { 
  getUsersAsync 
} from '../../redux/actions/usersAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import ComboBoxInput from '../shared/ComboBoxInput';
import { required } from '../validations/FormValidation';

const hoy = new Date()
var fecha =   hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() ;

var dateFormated  = new Date(hoy.setMonth(hoy.getMonth()+1));
var fechaExpiracion =   dateFormated.getFullYear() + '-' + (dateFormated.getMonth()+1) + '-' + dateFormated.getDate() ;

const initialState = {
  userId: '',
  dayOfSubscription: fecha,
  dayOfExpiration: fechaExpiracion,
  typeOfSubscription: ''
};

export const SubscriptionForm = () => {
  const dispatch = useDispatch();

  const { actionInProgress, selectedSubscription, isLoading, error } =
    useSelector((state) => state.subscriptions);

  const { list: userList } =
    useSelector((state) => state.users);

  const userFormated = userList.map(item => {
    return {
      _id: item._id,
      userName: `${item.name} ${item.lastName}`
    }
  })

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };


  const handleFormSubmit = (subscription) => {
    if (actionInProgress === UPDATE) {
      subscription._id = selectedSubscription._id;
      dispatch(updateSubscriptionAsync(subscription));
    } else {
      subscription._id = initialState.userId._id;
      dispatch(createSubscriptionAsync(subscription));
    }
  };

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const optionsType=[
    {"typeOfSubscription": "1"},
    {"typeOfSubscription": "2"},
    {"typeOfSubscription": "3"}
  ]

  return (
    <GenericModal>
      <>
        <h2 className={styles.actionTitle}>{action} Subscription</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues= {selectedSubscription? {
            ...selectedSubscription, 
            dayOfSubscription : selectedSubscription.dayOfSubscription.split("T", 1)?.[0],
            dayOfExpiration : selectedSubscription.dayOfExpiration.split("T", 1)?.[0]
          } : initialState }
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
                <Field name="dayOfSubscription">
                  {({input, meta }) => (
                    <TextInput value = {fecha} input={input} meta={meta} name="Day of subscription" disabled = {true} />
                  )}
                </Field>
              </div>
              <div>
                <Field name="dayOfExpiration">
                  {({input, meta }) => (
                    <TextInput value = {fecha} input={input} meta={meta} name="Day of expiration" disabled = {true} />
                  )}
                </Field>
              </div>
              <div className={styles.healthSet}>
                <Field name={"typeOfSubscription"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Type of subscription" options={optionsType} optionsKey={"typeOfSubscription"} optionsValue={"typeOfSubscription"}/>
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
