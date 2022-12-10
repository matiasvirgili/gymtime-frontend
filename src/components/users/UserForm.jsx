import React, { useEffect } from 'react';
import styles from './UserForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserAsync,
  createUserAsync,
  unsetAction,
} from '../../redux/actions/usersAction';
import {
  getPermissionsAsync
} from '../../redux/actions/permissionAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE, CREATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { CheckboxInput } from '../shared/CheckBoxInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import ComboBoxInput from '../shared/ComboBoxInput';
import {
  mustBeNumber,
  required,
  mustBe8Digit,
  composeValidators,
  isEmail
} from '../validations/FormValidation';

const initialState = {
  name: '',
  lastName: '',
  phone: '',
  dni: '',
  email: '',
  password: '',
  permissionRole: '',
  status: ''
};

export const UserForm = () => {
  const { actionInProgress, selectedUser, isLoading, error } =
    useSelector((state) => state.users);

  const { list: permissionsList } =
  useSelector((state) => state.permissions);

  const dispatch = useDispatch();

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleFormSubmit = (user) => {
    if (actionInProgress === UPDATE) {
      user._id = selectedUser._id;
      user.status ? (user.status = true) : (user.status = false)
      dispatch(updateUserAsync(user));
    } else {
      user.status ? (user.status = true) : (user.status = false)
      dispatch(createUserAsync(user));
    }
  };

  useEffect(() => {
    dispatch(getPermissionsAsync());
  }, []);

  return (
    <GenericModal>
      <>
        <h2 className={styles.actionTitle}>{action} User</h2>
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
                <Field name="phone" validate={composeValidators(required, mustBeNumber)}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Phone" />
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
                <Field name="email" validate={composeValidators(required, isEmail)}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Email" />
                  )}
                </Field>
              </div>
              {actionInProgress === CREATE && <div>
                <Field name="password" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Password" />
                  )}
                </Field>
              </div>}
              <div>
                <Field name="permissionRole" type="combobox" validate={required}>
                  {({input}) => (
                    <ComboBoxInput input={input} label="Role" options={permissionsList} optionsKey="role" optionsValue={"role"}/>
                  )}
                </Field>
              </div>
              <div>
                <Field name="status" type="checkbox">
                  {({input}) => (
                   <CheckboxInput input={input} name="Status" />
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
