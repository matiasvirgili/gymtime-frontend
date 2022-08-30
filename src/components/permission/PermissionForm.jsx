import React from 'react';
import styles from './PermissionForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updatePermissionAsync,
  createPermissionAsync,
  unsetAction,
} from '../../redux/actions/permissionAction';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';
import { CheckboxInput } from '../shared/CheckBoxInput';
import {
  required
} from '../validations/FormValidation';

const initialState = {
  role: '',
  addUser: '',
  modifyUser: '',
  deleteUser: '',
  addHealth: '',
  modifyHealth: '',
  deleteHealth: '',
  addExcercises: '',
  modifyExcercises: '',
  deleteExcercises: '',
  addRoutines: '',
  modifyRoutines: '',
  deleteRoutines: '',
  addSuscription: '',
  modifySuscription: '',
  deleteSuscription: ''
};

export const PermissionForm = () => {
  const { actionInProgress, selectedPermission, isLoading, error } = useSelector(
    (state) => state.permissions
  );

  const dispatch = useDispatch();

  let action =
    actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleFormSubmit = (permission) => {
    if (actionInProgress === UPDATE) {
      permission._id = selectedPermission._id;
      dispatch(updatePermissionAsync(permission));
    } else {
      dispatch(createPermissionAsync(permission));
    }
  };

  return (
    <GenericModal>
      <>
        <h2>{action} Permission</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues={selectedPermission || initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="role" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Role" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="addUser" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Add User" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="modifyUser" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Modify User" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="deleteUser" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Delete User" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="addHealth" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Add Health" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="modifyHealth" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Modify Health" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="deleteHealth" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Delete Health" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="addExcercises" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Add Excercises" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="modifyExcercises" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Modify Excercises" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="deleteExcercises" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Delete Excercises" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="addRoutines" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Add Routines" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="modifyRoutines" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Modify Routines" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="deleteRoutines" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Delete Routines" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="addSuscription" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Add Suscription" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="modifySuscription" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Modify Suscription" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="deleteSuscription" type="checkbox">
                  {({input}) => (
                   <CheckboxInput  input={input} name="Delete Suscription" />
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
