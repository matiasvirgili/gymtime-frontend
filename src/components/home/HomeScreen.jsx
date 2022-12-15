import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css'
import styles from './HomeStyle.module.css';
import { getUsersAsync } from '../../redux/actions/usersAction';
import {GraphicsIMC} from './GraphicsIMC';
import { GraphicsMacros } from './GraphicsMacros';

export const HomeScreen = () => {
 
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getUsersAsync())
  }, [])
  
  const {
    credentials
  } = useSelector((state) => state.users);

  return (
    <>
      <div className={styles.homePage}>
        
        {credentials?.user &&
        <>
          <div className={styles.graphicsGlobal}>
            <div className= {styles.graphicsMacroAndImc}>
              <div className={styles.graphicsMacros}>
                <GraphicsMacros userId = {credentials?.user?._id}  />
              </div>

            </div>
            <div className={styles.graphicsIMC}>
              <GraphicsIMC userId = {credentials?.user?._id}  />
            </div>
          </div>
        </>
        }
      </div>
    </>
  )
};