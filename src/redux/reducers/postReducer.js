import {
    USER_CREATE_POST,
    USER_UPDATE_POST,
    USER_DELETE_POST,
    USER_SET_ALL_POSTS,
    POST_SET_ERROR,
    POST_SET_LOADING_TRUE,
    POST_SET_CREATE_ACTION,
    POST_SET_UPDATE_ACTION,
    POST_SET_DELETE_ACTION,
    POST_UNSET_ACTION
  } from '../types/postType';
  import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

    const initialState = {
    list: [],
    error: '',
    isLoading: false,
    actionInProgress: NONE,
    selectedPost: null,
    };

    export const postReducer = (state = initialState, action) => {
        switch (action.type) {
          case USER_CREATE_POST:
            return {
              ...state,
              error: '',
              list: [...state.list, action.payload],
              isLoading: false,
              actionInProgress: NONE,
              selectedPost: null,
            };
          case USER_UPDATE_POST:
            return {
              ...state,
              error: '',
              list: state.list.map((post) =>
              post._id === action.payload._id ? action.payload : post
              ),
              isLoading: false,
              actionInProgress: NONE,
              selectedPost: null,
            };
          case USER_DELETE_POST:
            return {
              ...state,
              error: '',
              list: state.list.filter((post) => post._id !== action.payload),
              isLoading: false,
              actionInProgress: NONE,
              selectedPost: null,
            };
          case USER_SET_ALL_POSTS:
            return { 
            ...state, 
            list: action.payload, 
            error: '', 
            isLoading: false 
            };
          case POST_SET_ERROR:
            return {
              ...state,
              error: action.payload || 'An error ocurred',
              isLoading: false,
            };
          case POST_SET_LOADING_TRUE:
            return {
              ...state,
              isLoading: true,
            };
          case POST_SET_CREATE_ACTION:
            return {
              ...state,
              actionInProgress: CREATE,
            };
          case POST_SET_UPDATE_ACTION:
            return {
              ...state,
              actionInProgress: UPDATE,
              selectedPost: { ...action.payload },
            };
          case POST_SET_DELETE_ACTION:
            return {
              ...state,
              actionInProgress: DELETE,
              selectedPost: { ...action.payload },
            };
          case POST_UNSET_ACTION:
            return {
              ...state,
              actionInProgress: NONE,
              selectedPost: null,
              error: '',
            };
          default:
            return state;
        }
    };