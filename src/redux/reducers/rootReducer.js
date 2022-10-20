import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { exerciseReducer } from './exercisesReducer';
import { workoutEventReducer } from './workoutEventReducer';
import { permissionReducer } from './permissionReducer';
import { healthReducer } from './healthReducer';
import { postReducer } from './postReducer';
import { subscriptionReducer } from './subscriptionReducer';
import { eventMemberReducer } from './eventMemberReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  exercises: exerciseReducer,
  workoutEvents: workoutEventReducer,
  permissions: permissionReducer,
  healths: healthReducer,
  posts: postReducer,
  subscriptions: subscriptionReducer,
  eventMembers: eventMemberReducer,
});
