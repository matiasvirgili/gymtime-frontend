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
  EXERCISEROUTINE_SET_COPYROUTINE_ACTION,
  EXERCISEROUTINE_SET_DELETEALLROUTINE_ACTION,
  EXERCISEROUTINE_UNSET_ACTION,
} from '../types/exercisesRoutineType';
import { UPDATE, DELETE, CREATE, NONE, COPY, DELETE_ALL } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedExerciseRoutine: null
};

export const exerciseRoutineReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_EXERCISEROUTINE:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedExerciseRoutine: null,
      };
    case USER_UPDATE_EXERCISEROUTINE:
      return {
        ...state,
        error: '',
        list: state.list.map((exerciseRoutine) =>
        exerciseRoutine._id === action.payload._id ? action.payload : exerciseRoutine
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedExerciseRoutine: null,
      };
    case USER_DELETE_EXERCISEROUTINE:
      return {
        ...state,
        error: '',
        list: state.list.filter((exerciseRoutine) => exerciseRoutine._id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedExerciseRoutine: null,
      };
    case USER_SET_ALL_EXERCISEROUTINES:
      return { 
        ...state, 
        list: action.payload, 
        error: '', 
        isLoading: false 
      };
    case EXERCISEROUTINE_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case EXERCISEROUTINE_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case EXERCISEROUTINE_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case EXERCISEROUTINE_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedExerciseRoutine: { ...action.payload },
      };
    case EXERCISEROUTINE_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedExerciseRoutine: { ...action.payload },
      };
    case EXERCISEROUTINE_SET_DELETEALLROUTINE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE_ALL,
        selectedExerciseRoutine: { ...action.payload },
      };
    case EXERCISEROUTINE_SET_COPYROUTINE_ACTION:
      return {
        ...state,
        actionInProgress: COPY,
        selectedRoutine: { ...action.payload },
      };
    case EXERCISEROUTINE_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedExerciseRoutine: null,
        error: '',
      };
    default:
      return state;
  }
};
