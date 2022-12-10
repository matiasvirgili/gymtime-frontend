import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import {
  deletePostAsync,
  unsetAction,
} from '../../redux/actions/postAction';
import styles from './ConfirmDelete.module.css';
import { ErrorContainer } from '../shared/ErrorContainer';

export const ConfirmDelete = ({ post }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.posts);

  const handleCancel = () => dispatch(unsetAction());
  const handleDelete = () => dispatch(deletePostAsync(post._id));

  return (
    <GenericModal>
      <>
        <h2 className={styles.deleteObj}>You are about to delete a Post</h2>
        {error && <ErrorContainer message={error} />}
        <p>{`This will delete the post of ${post.userId.lastName}, ${post.userId.name} on ${post.date.split("T", 1)?.[0]} permanently`}</p>
        <p>Are you sure?</p>
        <div className={styles.actionsContainer}>
          <Button
            onClick={handleDelete}
            variant="contained"
            disableRipple
            color="error"
            loading={isLoading}
          >
            Delete
          </Button>
          <Button onClick={handleCancel} variant="outlined" disableRipple>
            Cancel
          </Button>
        </div>
      </>
    </GenericModal>
  );
};

ConfirmDelete.propTypes = {
  post: PropTypes.object.isRequired,
};
