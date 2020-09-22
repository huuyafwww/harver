const Config = {
    resultColumn: {
        Url: {
            title: 'Url',
            params: ['request', 'url'],
        },
        Method: {
            title: 'Method',
            params: ['request', 'method'],
        },
        Status: {
            title: 'Status',
            params: ['response', 'status'],
        },
        MimeType: {
            title: 'MIME Type',
            params: ['response', 'content', 'mimeType'],
        },
        ResourceType: {
            title: 'Resource Type',
            params: ['_resourceType'],
        },
        Size: {
            title: 'Size',
            params: ['response', 'content', 'size'],
        },
    },
    isShow: {
        Url: true,
        Method: true,
        Status: true,
        MimeType: true,
        ResourceType: true,
        Size: true,
        Waterfall: false,
    },
    toggleIcon: {
        Url: {
            label: 'Url',
        },
        Method: {
            label: 'Method',
        },
        Status: {
            label: 'Status',
        },
        MimeType: {
            label: 'MIME Type',
        },
        ResourceType: {
            label: 'Resource Type',
        },
        Size: {
            label: 'Size',
        },
        Waterfall: {
            label: 'Waterfall',
        },
    },
};

export { Config };
