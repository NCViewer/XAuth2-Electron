/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Set environment for development
process.env.NODE_ENV = 'development';

import electron from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

// Enable dev tools, but don't automatically show
import electronDebug from 'electron-debug'
electronDebug({ showDevTools: false });

// Install `vue-devtools`
electron.app.on('ready', () => {

    // let installExtension = require('electron-devtools-installer');
    installExtension(VUEJS_DEVTOOLS)
        .then( (name) => console.log(`Added Extension: ${name}`) )
        .catch( (err) => {
            console.log('Unable to install `vue-devtools`: \n', err);
        });
});

// Require `main` process to boot app
require('./index');
