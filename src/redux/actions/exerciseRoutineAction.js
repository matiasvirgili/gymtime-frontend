import axios from 'axios';
import {
  USER_CREATE_EXERCISEROUTINE,
  USER_UPDATE_EXERCISEROUTINE,
  USER_DELETE_EXERCISEROUTINE,
  USER_SET_ALL_EXERCISEROUTINES,
  EXERCISEROUTINE_SET_ERROR,
  EXERCISEROUTINE_SET_LOADING_TRUE,
  EXERCISEROUTINE_SET_CREATE_ACTION,
  EXERCISEROUTINE_SET_UPDATE_ACTION,
  EXERCISEROUTINE_SET_DELETE_ACTION,
  EXERCISEROUTINE_SET_DELETEALLROUTINE_ACTION,
  EXERCISEROUTINE_SET_COPYROUTINE_ACTION,
  EXERCISEROUTINE_UNSET_ACTION,
} from '../types/exercisesRoutineType';
import { getConfig } from '../../helpers/axiosConfig';

export const createExerciseRoutine = (exerciseRoutine) => {
  return {
    type: USER_CREATE_EXERCISEROUTINE,
    payload: exerciseRoutine,
  };
};

export const updateExerciseRoutine = (exerciseRoutine) => {
  return {
    type: USER_UPDATE_EXERCISEROUTINE,
    payload: exerciseRoutine,
  };
};
export const deleteExerciseRoutine = (exerciseRoutineId) => {
  return {
    type: USER_DELETE_EXERCISEROUTINE,
    payload: exerciseRoutineId,
  };
};
export const setExerciseRoutine = (exerciseRoutines) => {
  return {
    type: USER_SET_ALL_EXERCISEROUTINES,
    payload: exerciseRoutines,
  };
};
export const setError = (error) => {
  return {
    type: EXERCISEROUTINE_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: EXERCISEROUTINE_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: EXERCISEROUTINE_SET_CREATE_ACTION,
  };
};
export const setUpdateAction = (exerciseRoutine) => {
  return {
    type: EXERCISEROUTINE_SET_UPDATE_ACTION,
    payload: exerciseRoutine,
  };
};
export const setDeleteAction = (exerciseRoutine) => {
  return {
    type: EXERCISEROUTINE_SET_DELETE_ACTION,
    payload: exerciseRoutine,
  };
};
export const setDeleteAllAction = (exerciseRoutine) => {
  return {
    type: EXERCISEROUTINE_SET_DELETEALLROUTINE_ACTION,
    payload: exerciseRoutine,
  };
};
export const setCopyAction = (routine) => {
  return {
    type: EXERCISEROUTINE_SET_COPYROUTINE_ACTION,
    payload: routine,
  };
};
export const unsetAction = () => {
  return {
    type: EXERCISEROUTINE_UNSET_ACTION,
  };
};


export const getExerciseWithRoutineIdAndCopy = (routineId, newRoutine) => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exerciseroutines?routineId=${routineId}`
    );
    if (res.status === 200) {
      let exerciseRoutine = [];
      for (let i = 0; i < res.data.length; i++) {
        exerciseRoutine.push(res.data[i]);
        let exerciseRoutineCopy = {
          routineId: newRoutine,
          day: exerciseRoutine[i].day,
          exerciseId: exerciseRoutine[i].exerciseId._id,
          duration: exerciseRoutine[i].duration,
          breakDuration: exerciseRoutine[i].breakDuration,
          position: exerciseRoutine[i].position,
        }
        await dispatch(createExerciseRoutineAsync(exerciseRoutineCopy))
      }
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const getExerciseWithRoutineIdAsync = (routineId) => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exerciseroutines?routineId=${routineId}`
    );
    if (res.status === 200) {
      let exerciseRoutine = [];
      for (let i = 0; i < res.data.length; i++) {
        exerciseRoutine.push(res.data[i]);
      }
      await dispatch(setExerciseRoutine(exerciseRoutine));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createExerciseRoutineAsync = (exerciseRoutine) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exerciseroutines`,
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
export const updateExerciseRoutineAsync = (exerciseRoutine) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exerciseroutines/${exerciseRoutine._id}`,
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
export const deleteExerciseRoutineAsync = (exerciseRoutineId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exerciseroutines/${exerciseRoutineId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteExerciseRoutine(exerciseRoutineId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteAllExerciseRoutineAsync = (routineId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/exerciseroutines?routineId=${routineId}`
    );
    if (res.status === 200) {
      let exerciseRoutine = [];
      for (let i = 0; i < res.data.length; i++) {
        exerciseRoutine.push(res.data[i]);
        await dispatch(deleteExerciseRoutineAsync(exerciseRoutine[i]._id))
      }
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};

