import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import styles from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/usersAction';
import { ErrorContainer } from '../shared/ErrorContainer';
import logo from '../images/GymTimeLogo.png'

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error } =
  useSelector((state) => state.users);


  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '50px 0' };

  const handleLogin = async () => {
    if (!email || !password) return;
    dispatch(login(email, password, history));
  };

  return (
    <Grid>
      <nav className={styles.nav}>
        <img src={logo}></img>
        <h1>GymTime</h1>
      </nav>
      <Paper elevation={10} className={styles.paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 className={styles.textLogIn}>Sign In</h2>
        </Grid>
        {error && <ErrorContainer message={error} />}
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
