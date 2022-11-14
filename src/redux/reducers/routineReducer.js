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
  ROUTINE_SET_ROUTINEEXERCISE_ACTION,
  ROUTINE_UNSET_ACTION,
} from '../types/routineType';
import { UPDATE, DELETE, CREATE, NONE, LIST } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedRoutine: null
};

export const routineReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_ROUTINE:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedRoutine: null,
      };
    case USER_UPDATE_ROUTINE:
      return {
        ...state,
        error: '',
        list: state.list.map((routine) =>
        routine._id === action.payload._id ? action.payload : routine
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedRoutine: null,
      };
    case USER_DELETE_ROUTINE:
      return {
        ...state,
        error: '',
        list: state.list.filter((routine) => routine._id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedRoutine: null,
      };
    case USER_SET_ALL_ROUTINES:
      return { 
        ...state, 
        list: action.payload, 
        error: '', 
        isLoading: false 
      };
    case ROUTINE_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case ROUTINE_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case ROUTINE_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case ROUTINE_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedRoutine: { ...action.payload },
      };
    case ROUTINE_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedRoutine: { ...action.payload },
      };
    case ROUTINE_SET_ROUTINEEXERCISE_ACTION:
      return {
        ...state,
        actionInProgress: LIST,
        selectedRoutine: { ...action.payload },
      };
    case ROUTINE_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedRoutine: null,
        error: '',
      };
    default:
      return state;
  }
};
