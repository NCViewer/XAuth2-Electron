import { app, BrowserWindow, dialog } from 'electron' // eslint-disable-line

import electronDebug from 'electron-debug'

// Install `electron-debug` with `devtron`
electronDebug({ showDevTools: true });

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:9080' :
    `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 720,
        width: 1280,
        useContentSize: true,
        title: 'G28.io',
        backgroundColor: '#607D8B',
        icon: `${__static}/logo.png`,
        webPreferences: {
            // nativeWindowOpen: true,
        },
    });

    mainWindow.loadURL(winURL);

    mainWindow.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

//*
import { autoUpdater } from 'electron-updater';

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.on('update-downloaded', () => {

    console.log('update-downloaded latest, Then quitAndInstall');

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
        dialog.showMessageBox({
            type: 'info',
            title: 'Found Updates',
            message: 'Found updates, do you want update now?',
            buttons: ['Sure', 'No']
        }, (buttonIndex) => {
            if (buttonIndex === 0) {
                const isSilent = true;
                const isForceRunAfter = true;
                autoUpdater.quitAndInstall(isSilent, isForceRunAfter);
            }
            else {
                updater.enabled = true
                updater = null
            }
        })
    }
});

app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') { autoUpdater.checkForUpdates() }

    console.log(process.env.NODE_ENV);
    
    createWindow();
});
//*/
