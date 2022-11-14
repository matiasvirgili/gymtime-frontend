import axios from 'axios';
import {
  USER_CREATE_WORKOUTEVENT,
  USER_UPDATE_WORKOUTEVENT,
  USER_DELETE_WORKOUTEVENT,
  USER_SET_ALL_WORKOUTEVENTS,
  WORKOUTEVENT_SET_ERROR,
  WORKOUTEVENT_SET_LOADING_TRUE,
  WORKOUTEVENT_SET_CREATE_ACTION,
  WORKOUTEVENT_SET_UPDATE_ACTION,
  WORKOUTEVENT_SET_DELETE_ACTION,
  WORKOUTEVENT_SET_LISTPARTICIPANTS_ACTION,
  WORKOUTEVENT_UNSET_ACTION,
} from '../types/workoutEventType';
import { getConfig } from '../../helpers/axiosConfig';

export const createWorkoutEvent = (workoutEvent) => {
  return {
    type: USER_CREATE_WORKOUTEVENT,
    payload: workoutEvent,
  };
};

export const updateWorkoutEvent = (workoutEvent) => {
  return {
    type: USER_UPDATE_WORKOUTEVENT,
    payload: workoutEvent,
  };
};
export const deleteWorkoutEvent = (workoutEventId) => {
  return {
    type: USER_DELETE_WORKOUTEVENT,
    payload: workoutEventId,
  };
};
export const setWorkoutEvents = (workoutEvents) => {
  return {
    type: USER_SET_ALL_WORKOUTEVENTS,
    payload: workoutEvents,
  };
};
export const setError = (error) => {
  return {
    type: WORKOUTEVENT_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: WORKOUTEVENT_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: WORKOUTEVENT_SET_CREATE_ACTION,
  };
};
export const setUpdateAction = (workoutEvents) => {
  return {
    type: WORKOUTEVENT_SET_UPDATE_ACTION,
    payload: workoutEvents,
  };
};
export const setDeleteAction = (workoutEvents) => {
  return {
    type: WORKOUTEVENT_SET_DELETE_ACTION,
    payload: workoutEvents,
  };
};
export const setListparticipantsAction = (workoutEvents) => {
  return {
    type: WORKOUTEVENT_SET_LISTPARTICIPANTS_ACTION,
    payload: workoutEvents,
  };
};
export const unsetAction = () => {
  return {
    type: WORKOUTEVENT_UNSET_ACTION,
  };
};

export const getWorkoutEventAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/workoutevents`
    );
    if (res.status === 200) {
      let workoutEvent = [];
      for (let i = 0; i < res.data.length; i++) {
        workoutEvent.push(res.data[i]);
      }
      dispatch(setWorkoutEvents(workoutEvent));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteWorkoutEventAsync = (workoutEventId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/workoutEvents/${workoutEventId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteWorkoutEvent(workoutEventId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createWorkoutEventAsync = (workoutEvent) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/workoutevents`,
      workoutEvent,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createWorkoutEvent(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateWorkoutEventAsync = (workoutEvent) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/workoutevents/${workoutEvent._id}`,
      workoutEvent,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updateWorkoutEvent(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
