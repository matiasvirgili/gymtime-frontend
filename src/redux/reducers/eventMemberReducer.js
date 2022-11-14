import {
  USER_CREATE_EVENTMEMBER,
  USER_DELETE_EVENTMEMBER,
  USER_SET_ALL_EVENTMEMBERS,
  EVENTMEMBERS_SET_ERROR,
  EVENTMEMBERS_SET_LOADING_TRUE
  } from '../types/event-memberType';
  import { NONE } from '../types/modalTypes';

    const initialState = {
    list: [],
    error: '',
    isLoading: false,
    actionInProgress: NONE,
    selectedEventMember: null,
    };

    export const eventMemberReducer = (state = initialState, action) => {
        switch (action.type) {
          case USER_CREATE_EVENTMEMBER:
            return {
              ...state,
              error: '',
              list: [...state.list, action.payload],
              isLoading: false,
              actionInProgress: NONE,
              selectedEventMember: null,
            };
          case USER_DELETE_EVENTMEMBER:
            return {
              ...state,
              error: '',
              list: state.list.filter((EventMember) => EventMember._id !== action.payload),
              isLoading: false,
              actionInProgress: NONE,
              selectedEventMember: null,
            };
          case USER_SET_ALL_EVENTMEMBERS:
            return { 
            ...state, 
            list: action.payload, 
            error: '', 
            isLoading: false 
            };
          case EVENTMEMBERS_SET_ERROR:
            return {
              ...state,
              error: action.payload || 'An error ocurred',
              isLoading: false,
            };
          case EVENTMEMBERS_SET_LOADING_TRUE:
            return {
              ...state,
              isLoading: true,
            };
          default:
            return state;
        }
    };