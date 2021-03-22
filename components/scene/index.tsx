import React from 'react';
import getConfig from 'next/config';

import {SceneData} from "types";
import {Achievements} from "../achievements";
import {Actions} from '../actions';

interface ISceneProps {
    data: SceneData;
}

import styles from './scene.module.css';

export default function Scene({data}: ISceneProps) {
    const {publicRuntimeConfig} = getConfig();
    const image = data.scene.image ?
        <img src={`${publicRuntimeConfig.staticBasePath}pictures/${data.scene.image}`}
             className={styles.scene__image} alt="Scene Picture" />
        : null;
    const description = data.scene.description ?
        (data.scene.image ? <p className={`scene__description scene__description_${data.scene.descPosition}`}>
            {data.scene.description}</p> : <p className="scene__description
            scene__description_upLeft
            scene__description_isBlack">{data.scene.description}</p>) :
        null;
    const achievements = data.scene.achievements ? <Achievements achievements={data.scene.achievements} /> : null;
    const actions = <Actions actions={data.actions} adventure={data.adventureName} firstScene={data.firstScene} />;
    return (
        <div className={styles.container}>
            <div className={styles.scene}>
                <div className={styles.scene__imgDescContainer}>
                    {image}
                    {description}
                </div>
                {achievements}
            </div>
            {actions}
        </div>
    );
}
