import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css'
import styles from './HomeStyle.module.css';
import { getUsersAsync } from '../../redux/actions/usersAction';
import {GraphicsIMC} from './GraphicsIMC';
import { GraphicsMacros } from './GraphicsMacros';
import { GraphicsIMCActual } from './GraphicsIMCActual';

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
        <div className={styles.personalInformation}>
          <div>Personal information:</div>
          <div>
            <span>Name:</span>
            <span>{credentials?.user?.lastName}, {credentials?.user?.name}</span>
          </div>
          <div>
            <span>DNI:</span>
            <span>{credentials?.user?.dni}</span>
          </div>
          <div>
            <span>Email:</span>
            <span>{credentials?.user?.email}</span>
          </div>
          <div>
            <span>Phone:</span>
            <span>{credentials?.user?.phone}</span>
          </div>
          <div>
            <span>Permission:</span>
            <span>{credentials?.user?.permissionRole}</span>
          </div>
        </div>
        {credentials.user &&
        <>
          <div className={styles.graphicsGlobal}>
            <div className= {styles.graphicsMacroAndImc}>
              <div className={styles.graphicsMacros}>
                <GraphicsMacros userId = {credentials?.user?._id}  />
              </div>
              <div className={styles.graphicsIMCActual}>
                <GraphicsIMCActual userId = {credentials?.user?._id}  />
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