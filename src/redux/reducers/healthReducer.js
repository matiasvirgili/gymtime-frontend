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
    HEALTH_UNSET_ACTION,
    HEALTH_SET_CONSULT_ACTION
  } from '../types/healthType';
  import { UPDATE, DELETE, CREATE, CONSULT, NONE } from '../types/modalTypes';

    const initialState = {
    list: [],
    error: '',
    isLoading: false,
    actionInProgress: NONE,
    selectedHealth: null,
    };

    export const healthReducer = (state = initialState, action) => {
        switch (action.type) {
          case USER_CREATE_HEALTH:
            return {
              ...state,
              error: '',
              list: [...state.list, action.payload],
              isLoading: false,
              actionInProgress: NONE,
              selectedHealth: null,
            };
          case USER_UPDATE_HEALTH:
            return {
              ...state,
              error: '',
              list: state.list.map((health) =>
                health._id === action.payload._id ? action.payload : health
              ),
              isLoading: false,
              actionInProgress: NONE,
              selectedHealth: null,
            };
          case USER_DELETE_HEALTH:
            return {
              ...state,
              error: '',
              list: state.list.filter((health) => health._id !== action.payload),
              isLoading: false,
              actionInProgress: NONE,
              selectedHealth: null,
            };
          case USER_SET_ALL_HEALTHS:
            return { 
            ...state, 
            list: action.payload, 
            error: '', 
            isLoading: false 
            };
          case HEALTH_SET_ERROR:
            return {
              ...state,
              error: action.payload || 'An error ocurred',
              isLoading: false,
            };
          case HEALTH_SET_LOADING_TRUE:
            return {
              ...state,
              isLoading: true,
            };
          case HEALTH_SET_CREATE_ACTION:
            return {
              ...state,
              actionInProgress: CREATE,
            };
          case HEALTH_SET_UPDATE_ACTION:
            return {
              ...state,
              actionInProgress: UPDATE,
              selectedHealth: { ...action.payload },
            };
          case HEALTH_SET_DELETE_ACTION:
            return {
              ...state,
              actionInProgress: DELETE,
              selectedHealth: { ...action.payload },
            };
          case HEALTH_SET_CONSULT_ACTION:
            return {
              ...state,
              actionInProgress: CONSULT,
              selectedHealth: { ...action.payload },
            };
          case HEALTH_UNSET_ACTION:
            return {
              ...state,
              actionInProgress: NONE,
              selectedHealth: null,
              error: '',
            };
          default:
            return state;
        }
    };