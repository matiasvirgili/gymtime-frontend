import React from 'react';
import PropTypes from 'prop-types';
import { ExerciseRoutine } from './ExerciseRoutine';
import { useSelector } from 'react-redux';

export const ExerciseRoutineList = ({ exerciseRoutines }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id);

  const excercisesLunes = exerciseRoutines.filter(i => i.day === "Lunes")
  excercisesLunes.sort((e1, e2) =>  e1.position > e2.position ? 1 : -1)
  const excercisesMartes = exerciseRoutines.filter(i => i.day === "Martes")
  const excercisesMiercoles = exerciseRoutines.filter(i => i.day === "Miercoles")
  const excercisesJueves = exerciseRoutines.filter(i => i.day === "Jueves")
  const excercisesViernes = exerciseRoutines.filter(i => i.day === "Viernes")
  const excercisesSabado = exerciseRoutines.filter(i => i.day === "Sabado")
  const excercisesDomingo = exerciseRoutines.filter(i => i.day === "Domingo")

  return ( 
    <div>
      {excercisesLunes.length > 0  && <p>Lunes</p>}
      {excercisesLunes.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesMartes.length > 0  && <p>Martes</p>}
      {excercisesMartes.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesMiercoles.length > 0  && <p>Miercoles</p>}
      {excercisesMiercoles.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesJueves.length > 0  && <p>Jueves</p>}
      {excercisesJueves.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesViernes.length > 0  && <p>Viernes</p>}
      {excercisesViernes.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesSabado.length > 0  && <p>Sabado</p>}
      {excercisesSabado.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
      {excercisesDomingo.length > 0  && <p>Domingo</p>}
      {excercisesDomingo.map((exercRou) => (
        <ExerciseRoutine key={exercRou._id} exerciseRoutine={exercRou} isLoggedIn={isLoggedIn}/>
      ))}
    </div>
  )
};

ExerciseRoutineList.propTypes = {
  exerciseRoutines: PropTypes.array.isRequired,
};
