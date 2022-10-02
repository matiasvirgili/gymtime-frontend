import axios from 'axios';
import {
  USER_CREATE_SUBSCRIPTION,
  USER_UPDATE_SUBSCRIPTION,
  USER_DELETE_SUBSCRIPTION,
  USER_SET_ALL_SUBSCRIPTIONS,
  SUBSCRIPTION_SET_ERROR,
  SUBSCRIPTION_SET_LOADING_TRUE,
  SUBSCRIPTION_SET_CREATE_ACTION,
  SUBSCRIPTION_SET_UPDATE_ACTION,
  SUBSCRIPTION_SET_DELETE_ACTION,
  SUBSCRIPTION_UNSET_ACTION,
} from '../types/subscriptionType';
import { getConfig } from '../../helpers/axiosConfig';

export const createSubscription = (subscription) => {
  return {
      type: USER_CREATE_SUBSCRIPTION,
      payload: subscription,
  };
};

export const updateSubscription = (subscription) => {
  return {
      type: USER_UPDATE_SUBSCRIPTION,
      payload: subscription,
  };
};
export const deleteSubscription = (subscriptionId) => {
  return {
      type: USER_DELETE_SUBSCRIPTION,
      payload: subscriptionId,
  };
};
export const setSubscriptions = (subscriptions) => {
  return {
      type: USER_SET_ALL_SUBSCRIPTIONS,
      payload: subscriptions,
  };
};
export const setError = (error) => {
  return {
      type: SUBSCRIPTION_SET_ERROR,
      payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
      type: SUBSCRIPTION_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
      type: SUBSCRIPTION_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (subscription) => {
  return {
      type: SUBSCRIPTION_SET_DELETE_ACTION,
      payload: subscription,
  };
};
export const setUpdateAction = (subscription) => {
  return {
      type: SUBSCRIPTION_SET_UPDATE_ACTION,
      payload: subscription,
  };
};
export const unsetAction = () => {
  return {
      type: SUBSCRIPTION_UNSET_ACTION,
  };
};

export const getSubscriptionsAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/subscription`
    );
    if (res.status === 200) {
      let subscriptions = [];
      for (let i = 0; i < res.data.length; i++) {
        subscriptions.push(res.data[i]);
      }
      dispatch(setSubscriptions(subscriptions));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deleteSubscriptionAsync = (subscriptionId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/subscription/${subscriptionId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deleteSubscription(subscriptionId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createSubscriptionAsync = (subscription) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/subscription`,
      subscription,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createSubscription(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updateSubscriptionAsync = (subscription) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try { 
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/subscription/${subscription._id}`,
      subscription,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updateSubscription(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};