import React from 'react';
import PropTypes from 'prop-types';
import { Post } from './Post';
import { useSelector } from 'react-redux'

export const PostList = ({ posts, valorations }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user); 

  return posts.map((pst) => (
    <Post key={pst._id} post={pst} isLoggedIn={isLoggedIn} valorations={valorations}/>
  ));
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
