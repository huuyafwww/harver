const pagesInfo = {
    index: {},
};

const SidebarConfig = require('./sidebar').Config;

const dialogOptions = {
    title: 'open folder',
    properties: ['openDirectory'],
};

const timeFormatOption = 'YYYY年MM月DD日 HH時mm分ss秒';

export { pagesInfo, SidebarConfig, dialogOptions, timeFormatOption };
