import React from 'react';
import getConfig from 'next/config';

import styles from './achievements.module.css';
import {Achievement} from "../../server/models/achievement";

interface IAchievementsProps {
    achievements: Achievement[];
}

export function Achievements({achievements}: IAchievementsProps) {
    const {publicRuntimeConfig} = getConfig();
    return (
        <div className={styles.achievementsContainer}>
            {achievements.map(el => {
                return (
                    <div className={styles.achievement} key={el.id}>
                        <img src={`${publicRuntimeConfig.staticBasePath}pictures/${el.image}`}
                             className={styles.achievement__image} alt={el.name} />
                        <div className={styles.achievement__info}>
                            <p className={styles.achievement__infoDesc}>Вы получили достижение</p>
                            <p className={styles.achievement__infoName}>{el.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}
