import { computed } from 'mobx';

export default class Store {
    constructor() {}

    @computed get nowPageSlug() {
        return this.pageSlug;
    }

    setPageSlug(pageSlug) {
        this.pageSlug = pageSlug;
    }

    @computed get nowPageLabel() {
        return this.PageLabel;
    }

    setPageLabel(PageLabel) {
        this.PageLabel = PageLabel;
    }

    @computed get Data() {
        return this.harData;
    }

    setHarFileData(harData) {
        this.harData = harData;
    }
}
