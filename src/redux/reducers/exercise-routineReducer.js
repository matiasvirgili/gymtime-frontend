import {
  ER_CREATE_ER,
  ER_UPDATE_ER,
  ER_DELETE_ER,
  ER_SET_ALL_ERS,
  ER_SET_ERROR,
  ER_SET_LOADING_TRUE,
  ER_SET_CREATE_ACTION,
  ER_SET_UPDATE_ACTION,
  ER_SET_DELETE_ACTION,
  ER_UNSET_ACTION,
} from '../types/exercise-routineTypes';
import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedExerciseRoutine: null,
};

export const ExerciseRoutineReducer = (state = initialState, action) => {
  switch (action.type) {
    case ER_CREATE_ER:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedExerciseRoutine: null,
      };
    case ER_UPDATE_ER:
      return {
        ...state,
        error: '',
        list: state.list.map((exerciseRoutine) =>
          health._id === action.payload._id ? action.payload : exerciseRoutine
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedExerciseRoutine: null,
      };
    case ER_DELETE_ER:
      return {
        ...state,
        error: '',
        list: state.list.filter((health) => health._id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedExerciseRoutine: null,
      };
    case ER_SET_ALL_ERS:
      return {
        ...state,
        list: action.payload,
        error: '',
        isLoading: false,
      };
    case ER_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case ER_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case ER_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case ER_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedExerciseRoutine: { ...action.payload },
      };
    case ER_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedExerciseRoutine: { ...action.payload },
      };
    case ER_UNSET_ACTION:
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
