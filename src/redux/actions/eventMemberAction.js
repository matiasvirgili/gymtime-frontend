import axios from 'axios';
import {
  USER_CREATE_EVENTMEMBER,
  USER_DELETE_EVENTMEMBER,
  USER_SET_ALL_EVENTMEMBERS,
  EVENTMEMBERS_SET_ERROR,
  EVENTMEMBERS_SET_LOADING_TRUE
  } from '../types/event-memberType';
import { getConfig } from '../../helpers/axiosConfig';

export const createWorkoutEvent = (eventMember) => {
  return {
    type: USER_CREATE_EVENTMEMBER,
    payload: eventMember,
  };
};
export const deleteWorkoutEvent = (eventMemberId) => {
  return {
    type: USER_DELETE_EVENTMEMBER,
    payload: eventMemberId,
  };
};
export const setEventMembers = (eventMembers) => {
  return {
    type: USER_SET_ALL_EVENTMEMBERS,
    payload: eventMembers,
  };
};
export const setError = (error) => {
  return {
    type: EVENTMEMBERS_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: EVENTMEMBERS_SET_LOADING_TRUE,
  };
};

export const getEventMembersAsync = (userId, workoutEvent) => async (dispatch) => {
  try { 
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/eventmembers?userId=${userId}&workoutEvent=${workoutEvent}`
    );
    if (res.status === 200) {
      let eventMember = [];
      for (let i = 0; i < res.data.length; i++) {
        eventMember.push(res.data[i]);
      }
      dispatch(setEventMembers(eventMember));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const getEventMembersListAsync = (workoutEventID) => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/eventmembers/list?workoutEvent=${workoutEventID}`
    );
    if (res.status === 200) {
      let eventMember = [];
      for (let i = 0; i < res.data.length; i++) {
        eventMember.push(res.data[i]);
      }
      dispatch(setEventMembers(eventMember));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteEventMemberAsync = (eventMemberId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/eventmembers/${eventMemberId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteWorkoutEvent(eventMemberId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createEventMemberAsync = (eventMember) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/eventmembers`,
      eventMember,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createWorkoutEvent(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
