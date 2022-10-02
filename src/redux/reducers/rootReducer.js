import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { exerciseReducer } from './exercisesReducer';
import { permissionReducer } from './permissionReducer';
import { healthReducer } from './healthReducer';
import { postReducer } from './postReducer';
import { subscriptionReducer } from './subscriptionReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  exercises: exerciseReducer,
  permissions: permissionReducer,
  healths: healthReducer,
  posts: postReducer,
  subscriptions: subscriptionReducer
});
