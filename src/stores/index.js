import { computed } from 'mobx';

export default class Store {
    constructor() {}

    @computed get nowPageSlug() {
        return this.pageSlug;
    }

    setPageSlug(pageSlug) {
        this.pageSlug = pageSlug;
    }
}
