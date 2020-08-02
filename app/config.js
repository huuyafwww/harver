const windowConfig = {
    defaults: {
        bounds: {
            width: 800,
            height: 600,
        },
    },
};

const webPreferences = {
    nodeIntegration: true,
    webviewTag: false,
    nodeIntegrationInWorker: true,
};

const dialogConfig = {
    properties: ['openFile'],
    title: 'Select a har file.',
    filters: [
        {
            name: 'har file',
            extensions: ['har'],
        },
    ],
};

export { windowConfig, webPreferences, dialogConfig };
