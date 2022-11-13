import {
    USER_CREATE_VALORATION,
    USER_UPDATE_VALORATION,
    USER_DELETE_VALORATION,
    USER_SET_ALL_VALORATIONS,
    VALORATION_SET_ERROR,
    VALORATION_SET_LOADING_TRUE,
    VALORATION_UNSET_ACTION
  } from '../types/valorationType';
  import { NONE } from '../types/modalTypes';

    const initialState = {
    list: [],
    error: '',
    isLoading: false,
    actionInProgress: NONE,
    selectedValoration: null,
    };

    export const valorationReducer = (state = initialState, action) => {
        switch (action.type) {
          case USER_CREATE_VALORATION:
            return {
              ...state,
              error: '',
              list: [...state.list, action.payload],
              isLoading: false,
              actionInProgress: NONE,
              selectedValoration: null,
            };
          case USER_UPDATE_VALORATION:
            return {
              ...state,
              error: '',
              list: state.list.map((valoration) =>
              valoration._id === action.payload._id ? action.payload : valoration
              ),
              isLoading: false,
              actionInProgress: NONE,
              selectedValoration: null,
            };
          case USER_DELETE_VALORATION:
            return {
              ...state,
              error: '',
              list: state.list.filter((valoration) => valoration._id !== action.payload),
              isLoading: false,
              actionInProgress: NONE,
              selectedValoration: null,
            };
          case USER_SET_ALL_VALORATIONS:
            return { 
            ...state, 
            list: action.payload, 
            error: '', 
            isLoading: false 
            };
          case VALORATION_SET_ERROR:
            return {
              ...state,
              error: action.payload || 'An error ocurred',
              isLoading: false,
            };
          case VALORATION_SET_LOADING_TRUE:
            return {
              ...state,
              isLoading: true,
            };
          case VALORATION_UNSET_ACTION:
            return {
              ...state,
              actionInProgress: NONE,
              selectedValoration: null,
              error: '',
            };
          default:
            return state;
        }
    };