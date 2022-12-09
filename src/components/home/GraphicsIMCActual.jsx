import React from 'react';
import {  useSelector } from 'react-redux';
import 'antd/dist/antd.css'
import {Gauge} from '@ant-design/charts';
import styles from './GraphicsIMCActual.module.css'

export const GraphicsIMCActual = () => {

    const {
        list: healths
    } = useSelector((state) => state.healths);

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
              color: "white"
            },
          },
        },
    };
  return (
    (healths.length != 0) && (
      <>
        <Gauge {...configuration} className={styles.gauge}/>
      </>
    )
  )
};