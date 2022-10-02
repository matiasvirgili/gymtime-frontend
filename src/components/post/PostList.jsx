import React from 'react';
import PropTypes from 'prop-types';
import { Post } from './Post';
import { useSelector } from 'react-redux'

export const PostList = ({ posts }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id); 
  
  return posts.map((pst) => (
    <Post key={pst._id} post={pst} isLoggedIn={isLoggedIn}/>
  ));
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
