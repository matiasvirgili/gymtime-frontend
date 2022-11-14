import {
  USER_CREATE_EXERCISE,
  USER_UPDATE_EXERCISE,
  USER_DELETE_EXERCISE,
  USER_SET_ALL_EXERCISES,
  EXERCISE_SET_ERROR,
  EXERCISE_SET_LOADING_TRUE,
  EXERCISE_SET_CREATE_ACTION,
  EXERCISE_SET_UPDATE_ACTION,
  EXERCISE_SET_DELETE_ACTION,
  EXERCISE_UNSET_ACTION,
} from '../types/exercisesType';
import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedExercise: null,
};

export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_EXERCISE:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedExercise: null,
      };
    case USER_UPDATE_EXERCISE:
      return {
        ...state,
        error: '',
        list: state.list.map((exercise) =>
          exercise._id === action.payload._id ? action.payload : exercise
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedExercise: null,
      };
    case USER_DELETE_EXERCISE:
      return {
        ...state,
        error: '',
        list: state.list.filter((exercise) => exercise._id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedExercise: null,
      };
    case USER_SET_ALL_EXERCISES:
      return { ...state, list: action.payload, error: '', isLoading: false };
    case EXERCISE_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case EXERCISE_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case EXERCISE_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case EXERCISE_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedExercise: { ...action.payload },
      };
    case EXERCISE_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedExercise: { ...action.payload },
      };
    case EXERCISE_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedExercise: null,
        error: '',
      };
    default:
      return state;
  }
};
