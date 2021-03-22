import React, {Component, Fragment} from 'react';
import Head from 'next/head';

import Header from '../header';

export default class Layout extends Component {
    render() {
        return (
            <Fragment>
                <Head>
                    <title>TellTail</title>
                </Head>
                <Header />
                {/* eslint-disable-next-line react/prop-types */}
                {this.props.children}
            </Fragment>
        )
    }
}
