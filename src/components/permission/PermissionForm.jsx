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
  users: '',
  permissions: '',
  exercises: '',
  routinesAction: '',
  routinesView: '',
  healthsAction: '',
  healthsView: '',
  subscriptions: '',
  lessons: '',
  workout: ''
};

export const PermissionForm = () => {
  const { actionInProgress, selectedPermission, isLoading, error  } = useSelector(
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
        <h2 className={styles.actionTitle}>{action} Permission</h2>
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
              <div className={styles.permissionCombo}>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="users" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Users" />
                      )}
                    </Field>
                  </div>
                </div>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="permissions" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Permissions" />
                      )}
                    </Field>
                  </div>
                </div>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="exercises" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Exercises" />
                      )}
                    </Field>
                  </div>
                </div>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="routinesAction" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Actions in routines" />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="routinesView" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="View of routines" />
                      )}
                    </Field>
                  </div>
                </div>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="healthsAction" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Action in healths" />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="healthsView" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="View of healths" />
                      )}
                    </Field>
                  </div>
                </div>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="subscriptions" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Subscriptions" />
                      )}
                    </Field>
                  </div>
                </div>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="lessons" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Lessons" />
                      )}
                    </Field>
                  </div>
                </div>
                <div className={styles.permissionSet}>
                  <div>
                    <Field name="workout" type="checkbox">
                      {({input}) => (
                      <CheckboxInput input={input} name="Workout" />
                      )}
                    </Field>
                  </div>
                </div>
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
