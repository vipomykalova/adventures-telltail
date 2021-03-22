import React from 'react';
import Link from "next/link";

import styles from './actions.module.css';
import {Action} from "../../server/models/action";

interface IActionsProps {
    actions: Action[];
    adventure: string;

    firstScene?: number;
}

export function Actions({actions, adventure, firstScene}: IActionsProps) {
    const toBeginScene = {pathname: '/scene', query: {adventure: adventure, sceneId: firstScene}};
    return (
        <div className={styles.actions}>
            {actions.length ? actions.map(el => {
                const href = {pathname: '/scene', query: {adventure: adventure, sceneId: el.nextSceneId}};
                return (
                    <Link as={`/games/${adventure}/${el.nextSceneId}`} href={href} key={el.name}>
                        <a className={styles.actions__link}>
                            <div className={styles.actions__linkName}>{el.name}</div>
                        </a>
                    </Link>
                );
            }) :
                    <Link as={`/games/${adventure}/${firstScene}`} href={toBeginScene} key={firstScene}>
                        <a className={styles.actions__link}>
                            <div className={styles.actions__linkName}>Начать заново</div>
                        </a>
                    </Link>
            }
        </div>
    );
}
