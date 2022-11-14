import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHealthsWithUserIdAsync } from '../../redux/actions/healthAction';
import 'antd/dist/antd.css'
import {Line} from '@ant-design/charts';
import styles from './HomeStyle.module.css';

export const GraphicsIMC = (userId) => {
    const dispatch = useDispatch();

    const {
        list: healths
    } = useSelector((state) => state.healths);

    useEffect(()=>{
        dispatch(getHealthsWithUserIdAsync(userId.userId))
    }, [])

    ///////////REORGANIZACION DE DATOS PARA EL GRAFICO////////////
    healths.sort((a, b) => {
      if(new Date(a.day).getTime() > new Date(b.day).getTime()) return 1 
      else return -1})
    let arrayHealthForGraphic = []
    for (let i = 0; i < healths.length; i++) {
      const Month = healths[i]?.day?.split("T", 1)?.[0]
      const IMC = healths[i]?.imc
      const objectNew = {Month, IMC}
      arrayHealthForGraphic.push(objectNew)
    }
    //////////////////////////////////////////////////////////////
    const configuration={
     data: arrayHealthForGraphic,
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
        <div className={styles.graphics}>
            <br/><br />
            <Line {...configuration}/>
        </div>
      </>
    )
};