import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { exerciseReducer } from './exercisesReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  exercises: exerciseReducer,
});
