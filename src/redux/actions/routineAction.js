import axios from 'axios';
import {
  USER_CREATE_ROUTINE,
  USER_UPDATE_ROUTINE,
  USER_DELETE_ROUTINE,
  USER_SET_ALL_ROUTINES,
  ROUTINE_SET_ERROR,
  ROUTINE_SET_LOADING_TRUE,
  ROUTINE_SET_CREATE_ACTION,
  ROUTINE_SET_UPDATE_ACTION,
  ROUTINE_SET_DELETE_ACTION,
  ROUTINE_UNSET_ACTION,
  ROUTINE_SET_ROUTINEEXERCISE_ACTION
} from '../types/routineType';
import { getConfig } from '../../helpers/axiosConfig';

export const createRoutine = (routine) => {
  return {
    type: USER_CREATE_ROUTINE,
    payload: routine,
  };
};
export const updateRoutine = (routine) => {
  return {
    type: USER_UPDATE_ROUTINE,
    payload: routine,
  };
};
export const deleteRoutine = (routineId) => {
  return {
    type: USER_DELETE_ROUTINE,
    payload: routineId,
  };
};
export const setRoutine = (routines) => {
  return {
    type: USER_SET_ALL_ROUTINES,
    payload: routines,
  };
};
export const setError = (error) => {
  return {
    type: ROUTINE_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: ROUTINE_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: ROUTINE_SET_CREATE_ACTION,
  };
};
export const setUpdateAction = (routine) => {
  return {
    type: ROUTINE_SET_UPDATE_ACTION,
    payload: routine,
  };
};
export const setDeleteAction = (routine) => {
  return {
    type: ROUTINE_SET_DELETE_ACTION,
    payload: routine,
  };
};
export const setRoutineExerciseAction = (routine) => {
  return {
    type: ROUTINE_SET_ROUTINEEXERCISE_ACTION,
    payload: routine,
  };
};
export const unsetAction = () => {
  return {
    type: ROUTINE_UNSET_ACTION,
  };
};

export const getRoutineAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/routines`
    );
    if (res.status === 200) {
      let routine = [];
      for (let i = 0; i < res.data.length; i++) {
        routine.push(res.data[i]);
      }
      dispatch(setRoutine(routine));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};

export const getRoutineWithUserIdAsync = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/routines?userId=${userId}`
    );
    if (res.status === 200) {
      let routine = [];
      for (let i = 0; i < res.data.length; i++) {
        routine.push(res.data[i]);
      }
      dispatch(setRoutine(routine));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};

export const createRoutineAsync = (routine) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/routines`,
      routine,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createRoutine(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};

export const updateRoutineAsync = (routine) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/routines/${routine._id}`,
      routine,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updateRoutine(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};

export const deleteRoutineAsync = (routineId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/routines/${routineId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteRoutine(routineId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};

