import axios from 'axios';
import {
  ER_CREATE_ER,
  ER_UPDATE_ER,
  ER_DELETE_ER,
  ER_SET_ALL_ERS,
  ER_SET_ERROR,
  ER_SET_LOADING_TRUE,
  ER_SET_CREATE_ACTION,
  ER_SET_UPDATE_ACTION,
  ER_SET_DELETE_ACTION,
  ER_UNSET_ACTION,
} from '../types/exercise-routineTypes';
import { getConfig } from '../../helpers/axiosConfig';

export const createExerciseRoutine = (exerciseRoutine) => {
  return {
    type: ER_CREATE_ER,
    payload: exerciseRoutine,
  };
};

export const updateExerciseRoutine = (exerciseRoutine) => {
  return {
    type: ER_UPDATE_ER,
    payload: exerciseRoutine,
  };
};
export const deleteExerciseRoutine = (exerciseRoutineId) => {
  return {
    type: ER_DELETE_ER,
    payload: exerciseRoutineId,
  };
};
export const setExerciseRoutines = (exerciseRoutines) => {
  return {
    type: ER_SET_ALL_ERS,
    payload: exerciseRoutines,
  };
};
export const setError = (error) => {
  return {
    type: ER_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: ER_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: ER_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (exerciseRoutine) => {
  return {
    type: ER_SET_DELETE_ACTION,
    payload: exerciseRoutine,
  };
};
export const setUpdateAction = (exerciseRoutine) => {
  return {
    type: ER_SET_UPDATE_ACTION,
    payload: exerciseRoutine,
  };
};
export const unsetAction = () => {
  return {
    type: ER_UNSET_ACTION,
  };
};

export const getExerciseRoutinesAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exercise-routine`
    );
    if (res.status === 200) {
      let exerciseRoutines = [];
      for (let i = 0; i < res.data.length; i++) {
        exerciseRoutines.push(res.data[i]);
      }
      dispatch(setExerciseRoutines(exerciseRoutines));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteExerciseRoutineAsync =
  (exerciseRoutineId) => async (dispatch) => {
    dispatch(setLoadingTrue());
    try {
      const res = await axios.delete(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_URL_PORT}/exercise-routine/${exerciseRoutineId}`,
        getConfig()
      );
      if (res.status === 200) {
        dispatch(deleteHealth(exerciseRoutineId));
      }
    } catch (error) {
      dispatch(setError(error?.response?.data?.error));
    }
  };
export const createExerciseRoutineAsync =
  (exerciseRoutine) => async (dispatch) => {
    dispatch(setLoadingTrue());
    try {
      const res = await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_URL_PORT}/exercise-routine`,
        exerciseRoutine,
        getConfig()
      );
      if (res.status === 201) {
        return dispatch(createExerciseRoutine(res.data.data));
      }
    } catch (error) {
      return dispatch(setError(error?.response?.data?.error));
    }
  };
export const updateExerciseRoutineAsync =
  (exerciseRoutine) => async (dispatch) => {
    dispatch(setLoadingTrue());
    try {
      const res = await axios.put(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_URL_PORT}/exercise-routine/${exerciseRoutine._id}`,
        exerciseRoutine,
        getConfig()
      );
      if (res.status === 200) {
        return dispatch(updateExerciseRoutine(res.data.data));
      }
    } catch (error) {
      return dispatch(setError(error?.response?.data?.error));
    }
  };
