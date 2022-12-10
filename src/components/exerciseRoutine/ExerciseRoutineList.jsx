import React from 'react';
import PropTypes from 'prop-types';
import { ExerciseRoutine } from './ExerciseRoutine';
import { useSelector } from 'react-redux';
import styles from './ExerciseRoutineList.module.css';

export const ExerciseRoutineList = ({ exerciseRoutines }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id);

  const excercisesMonday = exerciseRoutines.filter(i => i.day === "Monday")
  excercisesMonday.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)

  const excercisesTuesday = exerciseRoutines.filter(i => i.day === "Tuesday")
  excercisesTuesday.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)

  const excercisesWednesday = exerciseRoutines.filter(i => i.day === "Wednesday")
  excercisesWednesday.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)

  const excercisesThursday = exerciseRoutines.filter(i => i.day === "Thursday")
  excercisesThursday.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)

  const excercisesFriday = exerciseRoutines.filter(i => i.day === "Friday")
  excercisesFriday.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)

  const excercisesSaturday  = exerciseRoutines.filter(i => i.day === "Saturday")
  excercisesSaturday.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)

  const excercisesSunday = exerciseRoutines.filter(i => i.day === "Sunday")
  excercisesSunday.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)

  return ( 
    <div className={styles.contenedor}>
      {excercisesMonday.length > 0  && <p className={styles.day}>Monday</p>}
      {excercisesMonday.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesTuesday.length > 0  && <p className={styles.day}>Tuesday</p>}
      {excercisesTuesday.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesWednesday.length > 0  && <p className={styles.day}>Wednesday</p>}
      {excercisesWednesday.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesThursday.length > 0  && <p className={styles.day}>Thursday</p>}
      {excercisesThursday.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesFriday.length > 0  && <p className={styles.day}>Friday</p>}
      {excercisesFriday.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesSaturday.length > 0  && <p className={styles.day}>Saturday</p>}
      {excercisesSaturday.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesSunday.length > 0  && <p className={styles.day}>Sunday</p>}
      {excercisesSunday.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
    </div>
  )
};

ExerciseRoutineList.propTypes = {
  exerciseRoutines: PropTypes.array.isRequired,
};

