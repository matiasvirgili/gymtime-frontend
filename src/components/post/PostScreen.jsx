import React, {useEffect} from 'react';
import { PostList } from './PostList';
import styles from './PostScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { PostForm } from './PostForm';
import { getPostsAsync, setCreateAction } from '../../redux/actions/postAction';
import { getValorationsWithPostIdAsync } from '../../redux/actions/valorationAction';

export const PostScreen = () => {
  const dispatch = useDispatch();
  const {
    list: posts,
    isLoading,
    actionInProgress,
    selectedPost,
  } = useSelector((state) => state.posts);
  
  const {
    credentials
  } = useSelector((state) => state.users);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };
  
  useEffect(()=>{
    dispatch(getPostsAsync());
    dispatch(getValorationsWithPostIdAsync(''))
  }, [])


  const { list: valorationList } =
  useSelector((state) => state.valorations);

  return (
    <div>
      <h2>Posts</h2>
      {
        credentials.user &&
        <button className={styles.newButton} onClick={handleAddClick}>
          New Post
        </button>
      }
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <PostForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete post={selectedPost} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )} 
      <div className={styles.list}>
        <PostList posts={posts} valorations = {valorationList} />
      </div>
    </div>
  );
};
