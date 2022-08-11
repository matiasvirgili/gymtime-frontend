import axios from 'axios';
import {
  USER_CREATE_USER,
  USER_UPDATE_USER,
  USER_DELETE_USER,
  USER_SET_ALL_USERS,
  USER_SET_ERROR,
  USER_SET_LOADING_TRUE,
  USER_SET_CREATE_ACTION,
  USER_SET_UPDATE_ACTION,
  USER_SET_DELETE_ACTION,
  USER_UNSET_ACTION,
  USER_LOGIN,
  SET_USER_CREDENTIALS,
  LOGOUT,
} from '../types/usersType.js';
import { getConfig } from '../../helpers/axiosConfig';

export const createUser = (user) => {
  return {
    type: USER_CREATE_USER,
    payload: user,
  };
};
export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  return {
    type: LOGOUT,
  };
};
export const updateUser = (user) => {
  return {
    type: USER_UPDATE_USER,
    payload: user,
  };
};
export const deleteUser = (userId) => {
  return {
    type: USER_DELETE_USER,
    payload: userId,
  };
};
export const setUsers = (users) => {
  return {
    type: USER_SET_ALL_USERS,
    payload: users,
  };
};
export const setError = (error) => {
  return {
    type: USER_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: USER_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: USER_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (user) => {
  return {
    type: USER_SET_DELETE_ACTION,
    payload: user,
  };
};
export const setUpdateAction = (user) => {
  return {
    type: USER_SET_UPDATE_ACTION,
    payload: user,
  };
};
export const unsetAction = () => {
  return {
    type: USER_UNSET_ACTION,
  };
};
export const userLoginAction = (credentials) => {
  return {
    type: USER_LOGIN,
    payload: credentials,
  };
};
export const setUserCredentials = (user) => {
  return {
    type: SET_USER_CREDENTIALS,
    payload: user,
  };
};
export const login = (email, password, history) => async (dispatch) => {
  dispatch(setLoadingTrue());
  const payload = { email, password };
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/users/login`,
      payload
    );

    if (res.status === 200) {
      const { data } = res;
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(userLoginAction(data));
      history.replace('/home');
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const getUsersAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/users`
    );
    if (res.status === 200) {
      let users = [];
      for (let i = 0; i < res.data.length; i++) {
        users.push(res.data[i]);
      }
      dispatch(setUsers(users));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteUserAsync = (userId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/users/${userId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteUser(userId));
    }
  } catch (error) {
    if (error.message === 'auth_error') {
      return dispatch(logout());
    }
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createUserAsync = (user) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/users`,
      user,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createUser(res.data.data));
    }
  } catch (error) {
    if (error.message === 'auth_error') {
      return dispatch(logout());
    }
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateUserAsync = (user) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/users/${user._id}`,
      user,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updateUser(res.data.data));
    }
  } catch (error) {
    if (error.message === 'auth_error') {
      return dispatch(logout());
    }
    return dispatch(setError(error?.response?.data?.error));
  }
};
