import React from 'react';
import Modal from '@mui/material/Modal';
import styles from './GenericModal.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { unsetAction } from '../../redux/actions/usersAction';

export const GenericModal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <Modal open={true} onClose={() => dispatch(unsetAction())}>
      <div className={styles.wrapper}>{children}</div>
    </Modal>
  );
};

GenericModal.propTypes = {
  children: PropTypes.object,
};
