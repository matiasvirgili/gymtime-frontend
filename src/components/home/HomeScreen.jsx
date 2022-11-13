import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHealthsWithUserIdAsync } from '../../redux/actions/healthAction';
import { getUsersAsync } from '../../redux/actions/usersAction';
import { Line } from '@ant-design/charts';
import styles from './HomeStyle.module.css';

export const HomeScreen = () => {
 
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getUsersAsync());
    dispatch(getHealthsWithUserIdAsync(credentials.userId._id))
  }, [])

  const {
    credentials
  } = useSelector((state) => state.users);

  const {
    list: healths
  } = useSelector((state) => state.healths);

  const configuration={
    data: healths,
    title:{
      visible:true,
      text: "IMC per month"
    },
    xField: 'Month',
    yField: 'IMC',
    color: '#2593fc',
    point:{
      visible: true,
      size: 5,
      shape: 'diamond',
      style:{
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2
      }
    }
  }


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
        <div className={styles.graphics}>
          <div>
            <br/><br />
            <Line>{...configuration}</Line>
          </div>
        </div>
      </div>
    </>
  )
};