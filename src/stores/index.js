import { computed, observable, action, toJS } from 'mobx';
import { HarService } from '@services';
import { SettingsConfig } from '@config';

export default class Store {
    constructor() {}

    setIpcRenderer(ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
    }

    setPageSlug(pageSlug) {
        this.PageSlug = pageSlug;
    }

    setPageLabel(PageLabel) {
        this.PageLabel = PageLabel;
    }

    setHarFileData(harData) {
        this.harData = JSON.parse(harData);
    }

    @observable Settings = SettingsConfig.inits;

    @computed get savedSettings() {
        return this.Settings;
    }

    @action setSettings(Settings) {
        this.Settings = Settings;
    }

    editSettings(type, name, value) {
        this.Settings[type][name] = value;
    }

    saveSettings() {
        const Settings = toJS(this.Settings);
        this.ipcRenderer.send('saveSettings', Settings);
    }

    @computed get isColumnDisplayRow() {
        return this.Settings.Basic.displayRow === 'Column';
    }
}
