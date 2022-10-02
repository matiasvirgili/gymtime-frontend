import axios from 'axios';
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
  POST_UNSET_ACTION,
} from '../types/postType';
import { getConfig } from '../../helpers/axiosConfig';

export const createPost = (post) => {
  return {
      type: USER_CREATE_POST,
      payload: post,
  };
};

export const updatePost = (post) => {
  return {
      type: USER_UPDATE_POST,
      payload: post,
  };
};
export const deletePost = (postId) => {
  return {
      type: USER_DELETE_POST,
      payload: postId,
  };
};
export const setPosts = (posts) => {
  return {
      type: USER_SET_ALL_POSTS,
      payload: posts,
  };
};
export const setError = (error) => {
  return {
      type: POST_SET_ERROR,
      payload: error,
  };
};
export const setLoadingTrue = () => {
  return {
      type: POST_SET_LOADING_TRUE,
  };
};
export const setCreateAction = () => {
  return {
      type: POST_SET_CREATE_ACTION,
  };
};
export const setDeleteAction = (post) => {
  return {
      type: POST_SET_DELETE_ACTION,
      payload: post,
  };
};
export const setUpdateAction = (post) => {
  return {
      type: POST_SET_UPDATE_ACTION,
      payload: post,
  };
};
export const unsetAction = () => {
  return {
      type: POST_UNSET_ACTION,
  };
};

export const getPostsAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/post`
    );
    if (res.status === 200) {
      let posts = [];
      for (let i = 0; i < res.data.length; i++) {
        posts.push(res.data[i]);
      }
      dispatch(setPosts(posts));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const deletePostAsync = (postId) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.delete(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/post/${postId}`,
      getConfig()
    );
    if (res.status === 200) {
      dispatch(deletePost(postId));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error));
  }
};
export const createPostAsync = (post) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/post`,
      post,
      getConfig()
    );
    if (res.status === 201) {
      return dispatch(createPost(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};
export const updatePostAsync = (post) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try { 
    const res = await axios.put(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_BACKEND_URL_PORT}/post/${post._id}`,
      post,
      getConfig()
    );
    if (res.status === 200) {
      return dispatch(updatePost(res.data.data));
    }
  } catch (error) {
    return dispatch(setError(error?.response?.data?.error));
  }
};