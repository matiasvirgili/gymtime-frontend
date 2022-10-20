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
  WORKOUTEVENT_UNSET_ACTION
  } from '../types/workoutEventType';
  import { UPDATE, DELETE, CREATE, NONE, LIST } from '../types/modalTypes';

    const initialState = {
    list: [],
    error: '',
    isLoading: false,
    actionInProgress: NONE,
    selectedWorkoutEvent: null,
    };

    export const workoutEventReducer = (state = initialState, action) => {
        switch (action.type) {
          case USER_CREATE_WORKOUTEVENT:
            return {
              ...state,
              error: '',
              list: [...state.list, action.payload],
              isLoading: false,
              actionInProgress: NONE,
              selectedWorkoutEvent: null,
            };
          case USER_UPDATE_WORKOUTEVENT:
            return {
              ...state,
              error: '',
              list: state.list.map((workoutEvent) =>
              workoutEvent._id === action.payload._id ? action.payload : workoutEvent
              ),
              isLoading: false,
              actionInProgress: NONE,
              selectedWorkoutEvent: null,
            };
          case USER_DELETE_WORKOUTEVENT:
            return {
              ...state,
              error: '',
              list: state.list.filter((workoutEvent) => workoutEvent._id !== action.payload),
              isLoading: false,
              actionInProgress: NONE,
              selectedWorkoutEvent: null,
            };
          case USER_SET_ALL_WORKOUTEVENTS:
            return { 
            ...state, 
            list: action.payload, 
            error: '', 
            isLoading: false 
            };
          case WORKOUTEVENT_SET_ERROR:
            return {
              ...state,
              error: action.payload || 'An error ocurred',
              isLoading: false,
            };
          case WORKOUTEVENT_SET_LOADING_TRUE:
            return {
              ...state,
              isLoading: true,
            };
          case WORKOUTEVENT_SET_CREATE_ACTION:
            return {
              ...state,
              actionInProgress: CREATE,
            };
          case WORKOUTEVENT_SET_UPDATE_ACTION:
            return {
              ...state,
              actionInProgress: UPDATE,
              selectedWorkoutEvent: { ...action.payload },
            };
          case WORKOUTEVENT_SET_DELETE_ACTION:
            return {
              ...state,
              actionInProgress: DELETE,
              selectedWorkoutEvent: { ...action.payload },
            };
          case WORKOUTEVENT_SET_LISTPARTICIPANTS_ACTION:
            return {
              ...state,
              actionInProgress: LIST,
              selectedWorkoutEvent: { ...action.payload },
            };
          case WORKOUTEVENT_UNSET_ACTION:
            return {
              ...state,
              actionInProgress: NONE,
              selectedWorkoutEvent: null,
              error: '',
            };
          default:
            return state;
        }
    };
