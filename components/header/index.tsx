import Link from 'next/link';
import React from 'react';

import styles from './header.module.css';
import getConfig from 'next/config';

export default function Header() {
    const {publicRuntimeConfig} = getConfig();
    console.info(publicRuntimeConfig);
    return (
        <div className={styles.header}>
            <Link href="/" as="/">
                <a className={styles.header__mainPage}>
                    <img src={`${publicRuntimeConfig.staticBasePath}pictures/logo.svg`}  alt="Main Page"/>
                    <img src={`${publicRuntimeConfig.staticBasePath}pictures/telltail.svg`}  alt="Main Page"/>
                </a>
            </Link>
        </div>

    );
}
