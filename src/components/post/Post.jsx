import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Post.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/postAction';

export const Post = ({ post, isLoggedIn }) => {
  const { _id, userId, date, description, likes } = post;

  const dispatch = useDispatch();

  return (
    <div className={styles.container} key={_id}>
      <div className={styles.column}>
        <span className={styles.content}>{userId.name + ' ' + userId.lastName}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.content}>{description}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.content}>{date.slice(0, 10)}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.content}>Likes: {likes}</span>
      </div>
      {
        (isLoggedIn == userId._id) &&
        <div className={styles.actions}>
          <EditIcon
            className={styles.editIcon}
            onClick={() => dispatch(setUpdateAction(post))}
          />
        {
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={() => dispatch(setDeleteAction(post))}
          />
        }          
        </div>
      }
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.string.isRequired
};
