import { computed } from 'mobx';
import { HarService } from '@services';

export default class Store {
    constructor() {}

    setPageSlug(pageSlug) {
        this.PageSlug = pageSlug;
    }

    setPageLabel(PageLabel) {
        this.PageLabel = PageLabel;
    }

    setHarFileData(harData) {
        this.harData = JSON.parse(harData);
    }
}
