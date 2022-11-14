import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHealthsWithUserIdAsync } from '../../redux/actions/healthAction';
import 'antd/dist/antd.css'
import {Gauge} from '@ant-design/charts';
import styles from './HomeStyle.module.css';

export const GraphicsIMCActual = (userId) => {
    const dispatch = useDispatch();

    const {
        list: healths
    } = useSelector((state) => state.healths);

    useEffect(()=>{
        dispatch(getHealthsWithUserIdAsync(userId.userId))
    }, [])

    ///////////REORGANIZACION DE DATOS PARA EL GRAFICO////////////
    healths?.sort((a, b) => {
      if(new Date(a.day).getTime() > new Date(b.day).getTime()) return -1 
      else return 1
    })
    const imcNumber = healths[0]?.imc;
    //////////////////////////////////////////////////////////////
    const configuration = {
        percent: (imcNumber/100)+0.084,
        range: {
          ticks: [0.117,0.333,0.5,0.667, 0.833, 1],
          color:  ['#009fea','#92c220',  '#fabf37', '#eb9818', '#e45b13' , '#d00c20'],
        },
        axis: {
          label: {
            formatter(v) {
              return Number(v)*30+15;
            },
          },
          subTickLine: {
            count: 5,
          }
        },
        indicator: {
          pointer: {
            style: {
              stroke: '#D0D0D0',
            },
          },
          pin: {
            style: {
              stroke: '#D0D0D0',
            },
          },
        },
        statistic: {
          content: {
            formatter: () => `IMC: ${(imcNumber)?.toFixed(2)}%`,
            style: {
              fontSize: '1.5rem',
              lineHeight: '1.5rem',
            },
          },
        },
    };
  
    return (
      <>
        <div className={styles.graphics}>
            <br/><br />
            <Gauge {...configuration}/>
        </div>
      </>
    )
};