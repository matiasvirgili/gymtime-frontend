import React, { useEffect } from 'react';
import styles from './PostForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updatePostAsync,
  createPostAsync,
  unsetAction
} from '../../redux/actions/postAction';
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

const initialState = {
  userId: '',
  date: fecha,
  description: '',
  type: '',
  promValoration: "0"
};

export const PostForm = () => {
  const dispatch = useDispatch();

  const { actionInProgress, selectedPost, isLoading, error } =
    useSelector((state) => state.posts);

  const {
    credentials
  } = useSelector((state) => state.users);

  let action = actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };


  const handleFormSubmit = (post) => {
    if (actionInProgress === UPDATE) {
      post.userId = credentials.user._id
      dispatch(updatePostAsync(post));
    } else {
      post.userId = credentials.user._id
      dispatch(createPostAsync(post));
    }
  };

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const optionsType=[
    {"type": "Nutrition"},
    {"type": "Routine"},
    {"type": "Suggestion"},
    {"type": "Complaints"}
  ]

  return (
    <GenericModal>
      <>
        <h2 className={styles.actionTitle}>{action} Post</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues= {selectedPost? {...selectedPost, date : selectedPost.date.split("T", 1)?.[0]} : initialState }
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="description" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Description" />
                  )}
                </Field>
              </div>
              <div className={styles.healthSet}>
                <Field name={"type"} validate={required}>
                  {({ input }) => (
                    <ComboBoxInput input={input} label="Type" options={optionsType} optionsKey={"type"} optionsValue={"type"}/>
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
