import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHealthsWithUserIdAsync } from '../../redux/actions/healthAction';
import { Pie, G2 } from '@ant-design/plots';
import styles from './GraphicsMacros.module.css'
import { GraphicsIMCActual } from './GraphicsIMCActual';

export const GraphicsMacros = (userId) => {
    const dispatch = useDispatch();
    const G = G2.getEngine('canvas');

    const {
        list: healths
    } = useSelector((state) => state.healths);

    useEffect(()=>{
        dispatch(getHealthsWithUserIdAsync(userId.userId))
    }, [])

    ///////////REORGANIZACION DE DATOS PARA EL GRAFICO////////////
    var healthsOrdenDeFecha = healths?.sort((a, b) => {
        if(new Date(a.day).getTime() < new Date(b.day).getTime()) return 1 
        else return -1})
    var actualHealthMacros = healthsOrdenDeFecha.find(i => i.macroCheck === true)
    const arrayHealth = [
        {type: "Carbohydrates", value: actualHealthMacros?.macros?.carbohydrates},
        {type: "Fats", value: actualHealthMacros?.macros?.fats},
        {type: "Protein", value: actualHealthMacros?.macros?.protein}
    ]
    //////////////////////////////////////////////////////////////

    const configuration={
        appendPadding: 10,
        data: arrayHealth,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        legend: false,
        label: {
        type: 'spider',
        labelHeight: 40,
        formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
            type: 'circle',
            attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                r: 5,
                fill: mappingData.color,
            },
            });
            group.addShape({
            type: 'text',
            attrs: {
                x: 10,
                y: 8,
                text: `${data.type}`,
                fill: mappingData.color,
            },
            });
            group.addShape({
            type: 'text',
            attrs: {
                x: 0,
                y: 25,
                text: `${data.value?.toFixed(2)} grms - ${(data.percent * 100)?.toFixed(2)}%`,
                fill: 'rgba(255, 255, 255, 0.65)',
                fontWeight: 700,
            },
            });
            return group;
        },
        },
        interactions: [
        {
            type: 'element-selected',
        },
        {
            type: 'element-active',
        },
        ],
    }

    return (
        (healths[0]?.macroCheck == true) && (
        <>
            <div className={styles.divContainerMacros}>
                <div className={styles.divBasal}>
                    <h1 className={styles.h1}>Basal Metabolic Rate</h1>
                    <div className={styles.divBasalASpan}>
                        <span className={styles.basal}>{(actualHealthMacros?.macros?.tmb)?.toFixed(2)} Kilocalories</span>
                    </div>
                </div>
                <div className={styles.graphics}>
                    <Pie {...configuration} className={styles.pie}/>;
                    <GraphicsIMCActual className={styles.gauge}/>
                </div>
            </div>
        </>
        )
    )
};