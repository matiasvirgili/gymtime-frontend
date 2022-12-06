import axios from 'axios';
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
} from '../types/permissionType.js';
import { getConfig } from '../../helpers/axiosConfig';

export const createPermission = (permission) => {
  return {
    type: USER_CREATE_PERMISSION,
    payload: permission,
  };
};

export const updatePermission = (permission) => {
  return {
    type: USER_UPDATE_PERMISSION,
    payload: permission,
  };
};
export const deletePermission = (permissionId) => {
  return {
    type: USER_DELETE_PERMISSION,
    payload: permissionId,
  };
};
export const setPermissions = (permissions) => {
  return {
    type: USER_SET_ALL_PERMISSIONS,
    payload: permissions,
  };
};
export const setUserPermissions = (permissions) => {
  return {
    type: USER_SET_USER_PERMISSIONS,
    payload: permissions,
  };
};
export const setError = (error) => {
  return {
    type: PERMISSION_SET_ERROR,
    payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
    type: PERMISSION_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
    type: PERMISSION_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (permission) => {
  return {
    type: PERMISSION_SET_DELETE_ACTION,
    payload: permission,
  };
};
export const setUpdateAction = (permission) => {
  return {
    type: PERMISSION_SET_UPDATE_ACTION,
    payload: permission,
  };
};
export const unsetAction = () => {
  return {
    type: PERMISSION_UNSET_ACTION,
  };
};

export const getPermissionsAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/permission`
    );
    if (res.status === 200) {
      let permissions = [];
      for (let i = 0; i < res.data.length; i++) {
        permissions.push(res.data[i]);
      }
      dispatch(setPermissions(permissions));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const getPermissionsWithRoleAsync = (role) => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/permission?role=${role}`
    );
    if (res.status === 200) {
      let permissions = [];
      for (let i = 0; i < res.data.length; i++) {
        permissions.push(res.data[i]);
      }
      await dispatch(setUserPermissions(permissions));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deletePermissionAsync = (permissionId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/permission/${permissionId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deletePermission(permissionId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createPermissionAsync = (permission) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    Object.keys(permission).map(function(key){    
      if(permission[key] == ""){
        permission[key] = false
      }
    })
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/permission`,
      permission,
      getConfig()
    );
    if (res.status === 201) {
      const user = JSON.parse(localStorage?.getItem('user')) 
      dispatch(getPermissionsWithRoleAsync(user?.permissionRole))
      return dispatch(createPermission(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updatePermissionAsync = (permission) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try { 
    Object.keys(permission).map(function(key){    
      if(permission[key] == ""){
        permission[key] = false
      }
    })
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/permission/${permission._id}`,
      permission,
      getConfig()
    );
    if (res.status === 200) {
      const user = JSON.parse(localStorage?.getItem('user')) 
      dispatch(getPermissionsWithRoleAsync(user?.permissionRole))
      return dispatch(updatePermission(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
