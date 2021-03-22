import Link from 'next/link';
import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import getConfig from 'next/config';

import styles from './adventures.module.css';
import {Adventure} from "../../server/models/adventure";
import {HashTags} from '../hashTags';

interface IAdventuresProps {
    adventure: Adventure;
    isObserved: boolean;
    onIntersection(arg: {isIntersecting: boolean}): void;
}

export default function Adventures({adventure, isObserved, onIntersection}: IAdventuresProps) {
    const {publicRuntimeConfig} = getConfig();
    const imageLink = adventure.image ?
        `${publicRuntimeConfig.staticBasePath}pictures/${adventure.image}` :
        `${publicRuntimeConfig.staticBasePath}pictures/default.jpeg`;

    const href = {pathname: '/scene', query: {adventure: adventure.enName, sceneId: adventure.firstSceneId}};

    const image = <Link as={`/games/${adventure.enName}/${adventure.firstSceneId}`} href={href}>
        <a className={styles.adventure__imageLink}>
            <img src={imageLink} className={styles.adventure__image} alt={adventure.ruName} />
        </a></Link>;

    const name = <Link as={`/games/${adventure.enName}/${adventure.firstSceneId}`} href={href}>
        <a className={styles.adventure__infoNameLink}>
            <div className={styles.adventure__name}>{adventure.ruName}</div>
        </a></Link>;

    return (
        <div className={styles.adventure} key={adventure.enName}>
            {image}
            <div className={styles.adventure__info}>
                {isObserved ?
                    <Observer onChange={onIntersection}>
                        {name}
                    </Observer> : name}
                <div className={styles.adventure__infoDesc}>{adventure.description}</div>
                <HashTags hashTags={adventure.hashTags} />
            </div>
        </div>
    );

}
