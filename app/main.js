import { windowConfig, webPreferences, dialogConfig } from './config';
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const Store = require('electron-store');
const path = require('path');
const fs = require('fs');

const isDev = () => {
    return !app.isPackaged;
};

const electronStore = new Store(windowConfig);

let mainWindow;

const createMainWindow = () => {
    const { width, height, x, y } = electronStore.get('bounds');
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
            electronStore.set('bounds', mainWindow.getBounds());
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
