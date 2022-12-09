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
        <div className={styles.personalInformation}>
          <div className={styles.personalInformationLetter}>Personal information:</div>
          <div className={styles.personalInformationData}>
            <div className={styles.divName}>
              <span>Name:</span>
              <span>{credentials?.user?.lastName}, {credentials?.user?.name}</span>
            </div>
            <div className={styles.divDNI}>
              <span>DNI:</span>
              <span>{credentials?.user?.dni}</span>
            </div>
            <div className={styles.divEmail}>
              <span>Email:</span>
              <span>{credentials?.user?.email}</span>
            </div>
            <div className={styles.divPhone}>
              <span>Phone:</span>
              <span>{credentials?.user?.phone}</span>
            </div>
            <div className={styles.divPermission}>
              <span>Permission:</span>
              <span>{credentials?.user?.permissionRole}</span>
            </div>
          </div>
        </div>
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