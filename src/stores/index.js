import { computed, observable, action, toJS } from 'mobx';
import { SettingsConfig } from '@config';

export default class Store {
    constructor() {
        this.onLoadNewHarFile = false;
    }

    @observable pageLink = 'Home';

    @computed get nowPageLink() {
        return this.pageLink;
    }

    @action pageLinkToggle(pageLink) {
        this.pageLink = pageLink;
    }

    @observable isLoadFirstHarFile = false;

    @computed get LoadFirstHarFile() {
        return this.isLoadFirstHarFile;
    }

    @action onLoadFirstHarFile() {
        this.isLoadFirstHarFile = true;
    }

    @observable isLoadedHarFile = true;
    @observable isOpenPageInfo = true;
    @observable isOpenPageResult = false;

    @computed get nowOpenStatus() {
        const { isLoadedHarFile, isOpenPageInfo, isOpenPageResult } = this;
        return { isLoadedHarFile, isOpenPageInfo, isOpenPageResult };
    }

    @action changeOpenStatus(toggleVarName) {
        this[toggleVarName] = !this[toggleVarName];
    }

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
