'use strict';

const config = require('config');

module.exports = {
    publicRuntimeConfig: {
        staticBasePath: config.get('staticBasePath')
    },
    distDir: 'dist/client/_next',
    useFileSystemPublicRoutes: false
};
