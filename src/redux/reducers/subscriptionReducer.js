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
import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedSubscription: null,
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_SUBSCRIPTION:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedSubscription: null,
      };
    case USER_UPDATE_SUBSCRIPTION:
      return {
        ...state,
        error: '',
        list: state.list.map((subscription) =>
        subscription._id === action.payload._id ? action.payload : subscription
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedSubscription: null,
      };
    case USER_DELETE_SUBSCRIPTION:
      return {
        ...state,
        error: '',
        list: state.list.filter((subscription) => subscription._id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedSubscription: null,
      };
    case USER_SET_ALL_SUBSCRIPTIONS:
      return { ...state, list: action.payload, error: '', isLoading: false };
    case SUBSCRIPTION_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case SUBSCRIPTION_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case SUBSCRIPTION_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case SUBSCRIPTION_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedSubscription: { ...action.payload },
      };
    case SUBSCRIPTION_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedSubscription: { ...action.payload },
      };
    case SUBSCRIPTION_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedSubscription: null,
        error: '',
      };
    default:
      return state;
  }
};
