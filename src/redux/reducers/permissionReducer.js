import {
  USER_CREATE_PERMISSION,
  USER_UPDATE_PERMISSION,
  USER_DELETE_PERMISSION,
  USER_SET_ALL_PERMISSIONS,
  PERMISSION_SET_ERROR,
  PERMISSION_SET_LOADING_TRUE,
  PERMISSION_SET_CREATE_ACTION,
  PERMISSION_SET_UPDATE_ACTION,
  PERMISSION_SET_DELETE_ACTION,
  PERMISSION_UNSET_ACTION,
  USER_SET_USER_PERMISSIONS
} from '../types/permissionType';
import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedPermission: null,
  permissionUser: null
};

export const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_PERMISSION:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedPermission: null,
      };
    case USER_UPDATE_PERMISSION:
      return {
        ...state,
        error: '',
        list: state.list.map((permission) =>
          permission._id === action.payload._id ? action.payload : permission
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedPermission: null,
      };
    case USER_DELETE_PERMISSION:
      return {
        ...state,
        error: '',
        list: state.list.filter((permission) => permission._id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedPermission: null,
      };
    case USER_SET_ALL_PERMISSIONS:
      return { ...state, list: action.payload, error: '', isLoading: false };
      case USER_SET_USER_PERMISSIONS:
      return { ...state, permissionUser: action.payload, error: '', isLoading: false };
    case PERMISSION_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case PERMISSION_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case PERMISSION_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case PERMISSION_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedPermission: { ...action.payload },
      };
    case PERMISSION_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedPermission: { ...action.payload },
      };
    case PERMISSION_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedPermission: null,
        error: '',
      };
    default:
      return state;
  }
};
