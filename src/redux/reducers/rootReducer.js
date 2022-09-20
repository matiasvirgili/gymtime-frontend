import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { exerciseReducer } from './exercisesReducer';
import { permissionReducer } from './permissionReducer';
import { healthReducer } from './healthReducer';
import { ExerciseRoutineReducer } from './exercise-routineReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  exercises: exerciseReducer,
  permissions: permissionReducer,
  healths: healthReducer,
  exerciseReducers: ExerciseRoutineReducer,
});
