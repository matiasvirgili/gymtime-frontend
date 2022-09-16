import React, { useEffect } from 'react';
import { setUserCredentials } from './redux/actions/usersAction';
import { MainRouter } from './routers/MainRouter';
import './Gymtime.module.css';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function GymTimeApp() {
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    const userSerialized = localStorage.getItem('user');
    if (userSerialized) {
      const user = JSON.parse(userSerialized)
      dispatch(setUserCredentials(user))
      history.push('/home')
    }
    return () => {};
  }, []);
  return <MainRouter />;
}

export default GymTimeApp;