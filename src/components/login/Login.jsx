import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import styles from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setUserCredentials } from '../../redux/actions/usersAction';

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '50px 0' };

  useEffect(() => {
    const userSerialized = localStorage.getItem('user');
    if (userSerialized) {
      const user = JSON.parse(userSerialized);
      dispatch(setUserCredentials(user));
      history.push('/home');
    }
    return () => {};
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return alert('Email or Password incorrect');
    dispatch(login(email, password, history));
  };

  return (
    <Grid>
      <nav className={styles.nav}>
        <h1>Users App</h1>
        <div className={styles.containerActions}>
          <button>Sign In</button>
          <button>Sign Up</button>
        </div>
      </nav>
      <Paper elevation={10} className={styles.paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          style={{ marginTop: '1.1rem' }}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Paper>
    </Grid>
  );
};
