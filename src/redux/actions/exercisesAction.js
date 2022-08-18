import axios from 'axios';
import {
  EXERCISE_CREATE_EXERCISE,
  EXERCISE_UPDATE_EXERCISE,
  EXERCISE_DELETE_EXERCISE,
  EXERCISE_SET_ALL_EXERCISES,
  EXERCISE_SET_ERROR,
  EXERCISE_SET_LOADING_TRUE,
  EXERCISE_SET_CREATE_ACTION,
  EXERCISE_SET_UPDATE_ACTION,
  EXERCISE_SET_DELETE_ACTION,
  EXERCISE_UNSET_ACTION,
} from '../types/exercisesType.js';
import { getConfig } from '../../helpers/axiosConfig';

export const createExercise = (exercise) => {
  return {
    type: EXERCISE_CREATE_EXERCISE,
    payload: exercise,
  };
};

export const updateExercise = (exercise) => {
  return {
    type: EXERCISE_UPDATE_EXERCISE,
    payload: EXERCISE,
  };
};
export const deleteExercise = (exerciseId) => {
  return {
    type: EXERCISE_DELETE_EXERCISE,
    payload: EXERCISEId,
  };
};
export const setExercises = (exercises) => {
  return {
    type: EXERCISE_SET_ALL_EXERCISES,
    payload: exercises,
  };
};
export const setError = (error) => {
  return {
    type: EXERCISE_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: EXERCISE_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: EXERCISE_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (exercise) => {
  return {
    type: EXERCISE_SET_DELETE_ACTION,
    payload: exercise,
  };
};
export const setUpdateAction = (exercise) => {
  return {
    type: EXERCISE_SET_UPDATE_ACTION,
    payload: exercise,
  };
};
export const unsetAction = () => {
  return {
    type: EXERCISE_UNSET_ACTION,
  };
};

export const getExercisesAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exercises`
    );
    if (res.status === 200) {
      let exercises = [];
      for (let i = 0; i < res.data.length; i++) {
        exercises.push(res.data[i]);
      }
      dispatch(setEXERCISEs(exercises));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteExerciseAsync = (exerciseId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exercises/${exerciseId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteExercise(exerciseId));
    }
  } catch (error) {
    if (error.message === 'auth_error') {
      return dispatch(logout());
    }
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createExerciseAsync = (exercise) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exercises`,
      exercise,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createExercise(res.data.data));
    }
  } catch (error) {
    if (error.message === 'auth_error') {
      return dispatch(logout());
    }
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateExerciseAsync = (exercise) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exercise/${exercise._id}`,
      exercise,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updateExercise(res.data.data));
    }
  } catch (error) {
    if (error.message === 'auth_error') {
      return dispatch(logout());
    }
    return dispatch(setError(error?.response?.data?.error));
  }
};
