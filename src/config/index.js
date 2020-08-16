const pagesInfo = {
    index: {},
};

const SidebarConfig = require('./sidebar').Config;

const SettingsConfig = require('./settings').Config;

const dialogOptions = {
    title: 'open folder',
    properties: ['openDirectory'],
};

const timeFormatOption = 'YYYY年MM月DD日 HH時mm分ss秒';

const sizes = ['B', 'KB', 'MB', 'GB'];

const copyTextConfig = {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

const timelineChartConfig = [
    { type: 'string', id: 'Row Label' },
    { type: 'string', id: 'Bar Label' },
    { type: 'string', role: 'tooltip' },
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'End' },
];

export {
    pagesInfo,
    SidebarConfig,
    SettingsConfig,
    dialogOptions,
    timeFormatOption,
    sizes,
    copyTextConfig,
    timelineChartConfig,
};
