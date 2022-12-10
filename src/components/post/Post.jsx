import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Post.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/postAction';
import { Box } from '@mui/system';
import { Rating } from '@mui/material';
import { createValorationAsync, updateValorationAsync } from '../../redux/actions/valorationAction';

export const Post = ({ post, isLoggedIn, valorations}) => {
  const { 
    _id, 
    userId, 
    date, 
    description,
    type
  } = post;

  const valorationsExist = valorations.filter(i => i.postId === post._id && i.userId === isLoggedIn._id)

  //PROMEDIO DE VALORACIONES PARA LA ASIGNACION EN VALUES DE LAS VALORACIONES
  let valorationsArray = valorations.filter(i => i.postId === post._id)
  let sumaDeValorations = 0
  for (let i = 0; i < valorationsArray.length; i++) {
    sumaDeValorations += parseInt(valorationsArray[i].valoration)
  }
  const valorationProm = sumaDeValorations / valorationsArray.length
  ///////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const valorationChange = (newValue) => {
    const objValorationNew = {
      _id: valorationsExist[0]?._id,
      userId: isLoggedIn._id,
      postId: post._id,
      valoration: newValue || valorationsExist[0].valoration,
    }
    if(valorationsExist.length != 0){
      dispatch(updateValorationAsync(objValorationNew))
    }
    else {
      dispatch(createValorationAsync(objValorationNew))
    }
  }

  return (
    <div className={styles.fondoBlanco}>
      <div className={
        (type == "Nutrition") ?  (styles.containerNutrition) : (
          (type == "Routine") ? (styles.containerRoutine) : (
            (type == "Suggestion") ? ((styles.containerSuggestion)) : (
              (type == "Complaints") ? (styles.containerComplaints) : ("")
            )
          )
        )
        } 
        key={_id}
      >
        {
          (isLoggedIn?._id == userId._id) &&
          <div className={styles.actions}>
            <EditIcon
              className={styles.editIcon}
              onClick={() => dispatch(setUpdateAction(post))}
            />
          {
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={() => dispatch(setDeleteAction(post))}
            />
          }          
          </div>
        }
        <div className={styles.column}>
          <span className={styles.title}>User</span>
          <span className={styles.content}>{userId.name + ' ' + userId.lastName}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Description</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Date</span>
          <span className={styles.content}>{date.slice(0, 10)}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Valoration</span>
            <Box>
              <Rating
                  name="simple-controlled"
                  value={valorationProm}
                  onChange={ (event, newValue) => {
                    valorationChange(newValue)
                  }}
              />
            </Box>
            {valorationsExist.length != 0 && 
              <span className={styles.voted}>Voted!</span>
            }
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.object.isRequired,
  valorations: PropTypes.array.isRequired
};
