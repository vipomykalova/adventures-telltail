import Link from 'next/link';
import React from "react";

import styles from './hashTags.module.css';
import {HashTag} from "../../server/models/hashTag";

interface IHashTagsProps {
    hashTags?: HashTag[];
}

export function HashTags({hashTags}: IHashTagsProps) {
    return (
        <div className={styles.hashTags}>
            {hashTags ? hashTags.map(hashTag => {
                const href = {pathname: '/', query: {hashTag: hashTag.enName}};
                return (
                    <Link as={`/${hashTag.enName}`} href={href} key={`${hashTag.enName}`}>
                        <a className={styles.hashTags__link}>
                            <div className={styles.hashTags__linkName}>#{hashTag.ruName}</div>
                        </a>
                    </Link>
                );
            }) : null}
        </div>
    );

}
