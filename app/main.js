import { windowConfig, webPreferences, dialogConfig } from './config';
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const Config = require('electron-config');
const path = require('path');
const fs = require('fs');

const isDev = () => {
    return !app.isPackaged;
};

const electronConfig = new Config(windowConfig);

let mainWindow;

const createMainWindow = () => {
    const { width, height, x, y } = electronConfig.get('bounds');
    mainWindow = new BrowserWindow({
        width,
        height,
        x,
        y,
        webPreferences,
    });

    mainWindow.loadURL('http://localhost:8000/');
    // loadURL(mainWindow);

    // mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

    mainWindow.webContents.openDevTools();

    ['resize', 'move'].forEach(ev => {
        mainWindow.on(ev, () => {
            electronConfig.set('bounds', mainWindow.getBounds());
        });
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
};

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', createMainWindow);

ipcMain.on('OpenHarFile', event => {
    dialog.showOpenDialog(mainWindow, dialogConfig).then(file => {
        readFile(event, file.filePaths[0]);
    });
});

const readFile = (event, filepath) => {
    fs.readFile(filepath, 'utf-8', (err, data) => {
        err && console.log(err.stack);
        event.sender.send('fileData', data);
    });
};
