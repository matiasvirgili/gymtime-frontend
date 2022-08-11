import React from 'react';
import styles from './UserForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserAsync,
  createUserAsync,
  unsetAction,
} from '../../redux/actions/usersAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE, CREATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import {
  mustBeNumber,
  required,
  mustBe8Digit,
  composeValidators,
} from '../validations/FormValidation';

const initialState = {
  name: '',
  lastName: '',
  telephone: '',
  direction: '',
  dni: '',
  email: '',
  password: ''
};

export const UserForm = () => {
  const { actionInProgress, selectedUser, isLoading, error } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleFormSubmit = (user) => {
    if (actionInProgress === UPDATE) {
      user._id = selectedUser._id;
      dispatch(updateUserAsync(user));
    } else {
      dispatch(createUserAsync(user));
    }
  };

  return (
    <GenericModal>
      <>
        <h2>{action} User</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues={selectedUser || initialState}

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
                <Field name="lastName" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Last Name" />
                  )}
                </Field>
              </div>

              <div>
                <Field name="telephone" validate={composeValidators(required, mustBeNumber)}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Phone" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="direction" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Address" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="dni" validate={composeValidators(required, mustBeNumber, mustBe8Digit)}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="DNI" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="email">
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Email" />
                  )}
                </Field>
              </div>
              {actionInProgress === CREATE && <div>
                <Field name="password">
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Password" />
                  )}
                </Field>
              </div>}
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
