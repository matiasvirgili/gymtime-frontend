import axios from 'axios';
import {
  USER_CREATE_HEALTH,
  USER_UPDATE_HEALTH,
  USER_DELETE_HEALTH,
  USER_SET_ALL_HEALTHS,
  HEALTH_SET_ERROR,
  HEALTH_SET_LOADING_TRUE,
  HEALTH_SET_CREATE_ACTION,
  HEALTH_SET_UPDATE_ACTION,
  HEALTH_SET_DELETE_ACTION,
  HEALTH_SET_CONSULT_ACTION,
  HEALTH_UNSET_ACTION,
} from '../types/healthType';
import { getConfig } from '../../helpers/axiosConfig';

export const createHealth = (health) => {
  return {
      type: USER_CREATE_HEALTH,
      payload: health,
  };
};

export const updateHealth = (health) => {
  return {
      type: USER_UPDATE_HEALTH,
      payload: health,
  };
};
export const deleteHealth = (healthId) => {
  return {
      type: USER_DELETE_HEALTH,
      payload: healthId,
  };
};
export const setHealths = (healths) => {
  return {
      type: USER_SET_ALL_HEALTHS,
      payload: healths,
  };
};
export const setError = (error) => {
  return {
      type: HEALTH_SET_ERROR,
      payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
      type: HEALTH_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
      type: HEALTH_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (health) => {
  return {
      type: HEALTH_SET_DELETE_ACTION,
      payload: health,
  };
};
export const setUpdateAction = (health) => {
  return {
      type: HEALTH_SET_UPDATE_ACTION,
      payload: health,
  };
};
export const setConsultAction = (health) => {
  return {
      type: HEALTH_SET_CONSULT_ACTION,
      payload: health,
  };
};
export const unsetAction = () => {
  return {
      type: HEALTH_UNSET_ACTION,
  };
};

export const getHealthsAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/health`
    );
    if (res.status === 200) {
      let healths = [];
      for (let i = 0; i < res.data.length; i++) {
          healths.push(res.data[i]);
      }
      dispatch(setHealths(healths));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const getHealthsWithUserIdAsync = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/health?userId=${userId}`
    );
    if (res.status === 200) {
      let healths = [];
      for (let i = 0; i < res.data.length; i++) {
          healths.push(res.data[i]);
      }
      await dispatch(setHealths(healths));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteHealthAsync = (healthId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/health/${healthId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteHealth(healthId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createHealthAsync = (health) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/health`,
      health,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createHealth(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateHealthAsync = (health) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try { 
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/health/${health._id}`,
      health,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updateHealth(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};