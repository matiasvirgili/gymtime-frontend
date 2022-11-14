import axios from 'axios';
import {
    USER_CREATE_VALORATION,
    USER_UPDATE_VALORATION,
    USER_DELETE_VALORATION,
    USER_SET_ALL_VALORATIONS,
    VALORATION_SET_ERROR,
    VALORATION_SET_LOADING_TRUE,
    VALORATION_UNSET_ACTION
  } from '../types/valorationType';
import { getConfig } from '../../helpers/axiosConfig';

export const createValoration = (valoration) => {
  return {
      type: USER_CREATE_VALORATION,
      payload: valoration,
  };
};

export const updateValoration = (valoration) => {
  return {
      type: USER_UPDATE_VALORATION,
      payload: valoration,
  };
};
export const deleteValoration = (valorationId) => {
  return {
      type: USER_DELETE_VALORATION,
      payload: valorationId,
  };
};
export const setValorations = (valorations) => {
  return {
      type: USER_SET_ALL_VALORATIONS,
      payload: valorations,
  };
};
export const setError = (error) => {
  return {
      type: VALORATION_SET_ERROR,
      payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
      type: VALORATION_SET_LOADING_TRUE,
  };
};
export const unsetAction = () => {
  return {
      type: VALORATION_UNSET_ACTION,
  };
};

export const getValorationsWithPostIdAsync = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/valoration?postId=${postId}`
    );
    if (res.status === 200) {
      let valorations = [];
      for (let i = 0; i < res.data.length; i++) {
        valorations.push(res.data[i]);
      }
      dispatch(setValorations(valorations));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createValorationAsync = (valoration) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/valoration`,
      valoration,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createValoration(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateValorationAsync = (valoration) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try { 
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/valoration/${valoration._id}`,
      valoration,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updateValoration(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteValorationAsync = (valorationId) => async (dispatch) => {
    dispatch(setLoadingTrue());
    try {
      const res = await axios.delete(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_URL_PORT}/valoration/${valorationId}`,
        getConfig()
      );
      if (res.status === 200) {
        dispatch(deleteValoration(valorationId));
      }
    } catch (error) {
      dispatch(setError(error?.response?.data?.error));
    }
  };