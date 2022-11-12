import React, {useEffect} from 'react';
import { HealthList } from './HealthList';
import styles from './HealthScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { HealthForm } from './HealthForm';
import { 
  getHealthsAsync, 
  setCreateAction 
} from '../../redux/actions/healthAction';

export const HealthScreen = () => {
  const dispatch = useDispatch();
  const {
    list: healths,
    isLoading,
    actionInProgress,
    selectedHealth,
  } = useSelector((state) => state.healths);
  
  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };
  
  useEffect(()=>{
    dispatch(getHealthsAsync());
  }, [])

  return (
    <div>
      <h2>Healths</h2>
      {
        credentials.user &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New Health
        </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <HealthForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete health={selectedHealth} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <HealthList healths={healths} />
    </div>
  );
};
